"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
let carSchema = new mongoose.Schema({
    name: String,
    car_number: String,
    model: String,
    number_of_seats: Number,
    rate: Number,
    color: String,
    car_type: String,
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
exports.Property = mongoose.model("car", carSchema);
//# sourceMappingURL=carDocumentSchema.js.map