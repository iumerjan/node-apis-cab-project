import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";

class App {

    public app: express.Application;
    public mongoUrl: string = 'mongodb://localhost/cab-rentaldb';  
    constructor() {
        this.app = express();
        this.config();  
        this.enableCORS();    
        //this.mongoSetup();  
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

    // private mongoSetup(): void{
    //     mongoose.Promise = global.Promise;
    //     mongoose.connect(this.mongoUrl);    
    // }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

export default new App().app;