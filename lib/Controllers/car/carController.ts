import { Car } from '../../Models/car/carDocumentSchema';
import { Request, Response } from 'express';

export class CarController {

    // Add a new car
    public addNewCar(req, res, next) {

        let newCar = new Car(req.body);
        Car.findOne({ car_number: new RegExp(newCar.car_number, 'i') }, async function (err, doc) {
            if (err) {
                res.send(err);
            }
            // Check the car already exists!
            if (doc) {
                res.status(409).send({ message: `The car with the ${doc.car_number} already exists!` });
            }
            else {
              
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
    // using PATCH verb because we have to change a flag only for soft deletion
    public removeCar(req: Request, res: Response) {
        Car.findOneAndUpdate({ _id: req.params.carId }, { is_deleted: true }, { new: true }, (err, doc) => {
            if (err) {
                res.send(err);
            }
            return res.status(200).send(doc);
        });
    }

}