import * as mongoose from "mongoose";
import { ICar } from "./car";
export interface ICarDocument extends ICar, mongoose.Document {
}