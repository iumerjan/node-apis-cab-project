"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
var util = require("util");
class Db {
    static connect() {
        if (this.mongooseInstance) {
            return this.mongooseInstance;
        }
        this.mongooseConnection = mongoose.connection;
        this.mongooseConnection.once("open", () => {
            console.log("connected to the database");
        });
        let connectionString = util.format("mongodb://localhost:27017/%s", "cab-rental");
        console.log(connectionString);
        this.mongooseInstance = mongoose.connect(connectionString);
        return this.mongooseInstance;
    }
}
exports.Db = Db;
//# sourceMappingURL=db.js.map