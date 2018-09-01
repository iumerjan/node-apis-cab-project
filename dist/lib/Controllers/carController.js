"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const carDocumentSchema_1 = require("./../Models/car/carDocumentSchema");
class CarController {
    // Add a new car
    addNewCar(req, res) {
        let newCar = new carDocumentSchema_1.Car(req.body);
        newCar.save((err, car) => {
            if (err) {
                res.send(err);
            }
            res.status(201).send(car);
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