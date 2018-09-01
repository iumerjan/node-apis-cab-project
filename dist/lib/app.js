"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const carRoutes_1 = require("./routes/carRoutes");
class App {
    constructor() {
        this.routePrv = new carRoutes_1.Routes();
        this.app = express();
        this.config();
        this.enableCORS();
        this.routePrv.routes(this.app);
    }
    enableCORS() {
        // Allow CORS
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS, PATCH');
            res.header('Access-Control-Allow-Headers', 'Content-Type,  X-Requested-With');
            next();
        });
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json({ limit: "50mb" }));
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map