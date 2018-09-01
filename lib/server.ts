import app from "./app";
const PORT = 3000;
import { Db as Db } from "../data/db";

Db.connect();

app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
})