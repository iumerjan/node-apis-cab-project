import { Car } from '../../Models/car/carDocumentSchema';
import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
const express = require('express');

const uuidv1 = require('uuid/v1');
var path = require('path');
var fs = require('fs');

export class CarController {

    // Add a new car

    public addNewCar(req, res, next) {

        let newCar = new Car(req.body);
        Car.findOne({ car_number: new RegExp(newCar.car_number, 'i') }, async function (err, doc) {
            if (err) {
                res.send(err);
            }
            // Check the car already exists with car number as it must be unique
            if (doc) {
                res.status(409).send({ message: `The car with the ${doc.car_number} already exists!` });
            }
            else {

                var uploadedFiles = req["files"];
                var dir = './FileStore';
                // newCar.car_image = req["files"]["path"];
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                var imageDir = dir + '/' + 'Images';
                if (!fs.existsSync(imageDir)) {
                    fs.mkdirSync(imageDir);
                }

                for (var index in uploadedFiles) {

                    var file = uploadedFiles[index];
                    var originalName = file["originalname"];
                    var oldPath = file["path"];
                    let ext = path.extname(originalName).toLowerCase();
                    // Prevent empty files to be uploaded
                    if (!file.size) {
                        res.status(409).send({ message: "File is empty! " });
                    }
                    // Prevent files to be uploaded larger than 2MB
                    if (file.size > 2 * 1024 * 1024) {
                        res.status(409).send({ message: "File must be less than 2 MB size!" });
                    }
                    // Prevent different formats files to be uploaded
                    if (!(ext === '.jpg' || ext === '.jpeg' || ext === ".png" || ext === ".tiff" || ext === ".bmp")) {
                        res.status(409).send({ message: "Only jpg, jpeg, png, tiff and bmp files are allowed!" });

                    }
                    // Generating Unique file name
                    let newFileName = uuidv1() + ext;

                    // Save Image
                    var newpath = imageDir + '/' + newFileName;
                    //  var newpath = imageDir + '/' + originalName;
                    //Save the file to the file store
                    await fs.rename(oldPath, newpath, async function (err) {
                        if (err) throw err;
                        originalName = newFileName;
                    });

                    newCar.images.push({
                        original_file_name: originalName,
                        size: file.size,
                        unique_file_name: newFileName,
                        path: newpath
                    });
                }
                // Save new car
                newCar.save((err, car) => {
                    if (err) {
                        res.send(err);
                    }
                    res.status(201).send(car);
                });

            }

        });
    }

    // Get all cars
    public getCars(req: Request, res: Response) {
        Car.find(function (err, doc) {
            if (err) {
                res.send(err);
            }
           
            return res.status(200).send(doc);
        });
    }

    // Get a specific car
    public getCarWithID(req: Request, res: Response) {
        Car.findById(req.params.carId, function (err, doc) {
            if (err) {
                res.send(err);
            }
            return res.status(200).send(doc);
        });
    }

    

    // Soft delete a car
    // using PATCH verb because we have to change a flag only for soft delete
    public removeCar(req: Request, res: Response) {
        Car.findOneAndUpdate({ _id: req.params.carId }, { is_deleted: true }, { new: true }, (err, doc) => {
            if (err) {
                res.send(err);
            }
            return res.status(200).send(doc);
        });
    }

}