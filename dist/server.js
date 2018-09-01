"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = 3000;
// import { Db as Db } from "../data/db";
// Db.connect();
app_1.default.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});
//# sourceMappingURL=server.js.map