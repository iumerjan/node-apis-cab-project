"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = 3000;
const db_1 = require("../data/db");
db_1.Db.connect();
app_1.default.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});
//# sourceMappingURL=server.js.map