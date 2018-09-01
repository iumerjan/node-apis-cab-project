import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { Routes } from "./routes/carRoutes";

class App {
    public app: express.Application;  
    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();  
        this.enableCORS();      
        this.routePrv.routes(this.app); 
    }

     enableCORS(){
        // Allow CORS
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS, PATCH');
            res.header('Access-Control-Allow-Headers', 'Content-Type,  X-Requested-With');
            next();
        });
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json({ limit: "50mb" }));
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

}

export default new App().app;