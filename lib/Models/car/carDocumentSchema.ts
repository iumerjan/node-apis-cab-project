import * as mongoose from "mongoose";
import { ICarDocument } from "./carDocument";

let carSchema = new mongoose.Schema(
    {
        brand: String,
        car_number: String,
        model: String,
        number_of_seats: Number,
        rate: Number,
        color: String,
        car_type: String,
        is_deleted: {
            type: Boolean,
            default: false
        }, // used for soft deletion of car
        
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

export let Car: mongoose.Model<ICarDocument> = mongoose.model<ICarDocument>("car", carSchema);
