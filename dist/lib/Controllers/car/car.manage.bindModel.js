"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
class CarBindingSchema {
}
CarBindingSchema.addCar = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        car_number: Joi.string().required(),
        rate: Joi.number().required(),
        model: Joi.string().required(),
        car_type: Joi.number().required(),
        number_of_seats: Joi.number().required(),
    })
};
exports.CarBindingSchema = CarBindingSchema;
//# sourceMappingURL=car.manage.bindModel.js.map