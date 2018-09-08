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
class CarController {
    // Add a new car
    addNewCar(req, res, next) {
        let newCar = new carDocumentSchema_1.Car(req.body);
        carDocumentSchema_1.Car.findOne({ car_number: new RegExp(newCar.car_number, 'i') }, function (err, doc) {
            return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    // Get all cars
    getCars(req, res, next) {
        // perPage variable contains max number of items on each page, 
        var perPage = 8;
        // page variable contains current page number.
        var page = req.params.page || 1;
        carDocumentSchema_1.Car
            .find({})
            .skip((perPage * page) - perPage) // for each page we need to skip ((perPage * page) - perPage) values (on the first page the value of the skip should be 0):
            .limit(perPage) // output only perPage items
            .exec(function (err, cars) {
            // count all items in collection with count()
            carDocumentSchema_1.Car.count().exec(function (err, count) {
                if (err) {
                    res.send(err);
                }
                return res.status(200).send({
                    cars: cars,
                    current: page,
                    pages: Math.ceil(count / perPage)
                });
            });
        });
    }
    // Get a specific car
    getCarWithID(req, res, next) {
        carDocumentSchema_1.Car.findById(req.params.carId, function (err, doc) {
            if (err) {
                res.send(err);
            }
            return res.status(200).send(doc);
        });
    }
    // Soft delete a car
    // using PATCH verb because we have to change a flag only for soft deletion
    removeCar(req, res, next) {
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