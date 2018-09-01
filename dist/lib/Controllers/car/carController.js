"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const carDocumentSchema_1 = require("../../Models/car/carDocumentSchema");
const express = require('express');
const uuidv1 = require('uuid/v1');
var path = require('path');
var fs = require('fs');
class CarController {
    // Add a new car
    addNewCar(req, res, next) {
        let newCar = new carDocumentSchema_1.Car(req.body);
        carDocumentSchema_1.Car.findOne({ car_number: new RegExp(newCar.car_number, 'i') }, function (err, doc) {
            return __awaiter(this, void 0, void 0, function* () {
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
                        //Save the file to the file store
                        yield fs.rename(oldPath, newpath, function (err) {
                            return __awaiter(this, void 0, void 0, function* () {
                                if (err)
                                    throw err;
                                originalName = newFileName;
                            });
                        });
                        newCar.images.push({
                            original_file_name: originalName,
                            size: file.size,
                            unique_file_name: newFileName,
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
        });
    }
    // Get all cars
    getCars(req, res) {
        carDocumentSchema_1.Car.find(function (err, doc) {
            if (err) {
                res.send(err);
            }
            return res.status(200).send(doc);
        });
    }
    // Get a specific car
    getCarWithID(req, res) {
        carDocumentSchema_1.Car.findById(req.params.carId, function (err, doc) {
            if (err) {
                res.send(err);
            }
            return res.status(200).send(doc);
        });
    }
    // Update a specific car
    updateCar(req, res) {
        var newCar = req, body;
        carDocumentSchema_1.Car.findOneAndUpdate({ _id: req.params.carId }, newCar, { new: true }, (err, doc) => {
            if (err) {
                res.send(err);
            }
            return res.status(200).send(doc);
        });
    }
    // Soft delete a car
    // using PATCH verb because we have to change a flag only for soft delete
    removeCar(req, res) {
        carDocumentSchema_1.Car.findOneAndUpdate({ _id: req.params.carId }, { is_deleted: true }, { new: true }, (err, doc) => {
            if (err) {
                res.send(err);
            }
            return res.status(200).send(doc);
        });
    }
}
exports.CarController = CarController;
//# sourceMappingURL=carController.js.map