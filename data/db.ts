import * as mongoose from "mongoose";
var util = require("util");

export class Db {
    public static connect(): mongoose.Connection {
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

    private static mongooseInstance: any;
    private static mongooseConnection: mongoose.Connection;
}
