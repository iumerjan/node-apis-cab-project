
import * as mongoose from "mongoose";
import { ICarDocument } from "./carDocument";
import { Schema } from "mongoose";

let carSchema = new mongoose.Schema(
    {
        name: String,
        car_number: String,
        model: String,
        number_of_seats: Number,
        rate: Number,
        color: String,
        car_type: String,

    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

export let Property: mongoose.Model<ICarDocument> = mongoose.model<ICarDocument>("car", carSchema);