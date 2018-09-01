"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const carController_1 = require("../controllers/car/carController");
const multer = require('multer');
const uuidv1 = require('uuid/v1');
var path = require('path');
var fs = require('fs');
class Routes {
    constructor() {
        this.carController = new carController_1.CarController();
    }
    routes(app) {
        var multer = require('multer');
        var upload = multer({ dest: './FileStore/' });
        // Add a new car
        app.route('/api/car')
            .post(upload.any(), this.carController.addNewCar);
        // app.post('/api/car', upload.any(), function (req, res, next) {
        //     let newCar = new Car(req.body);
        //     Car.findOne({ car_number: new RegExp(newCar.car_number, 'i') }, async function (err, doc) {
        //         if (err) {
        //             res.send(err);
        //         }
        //         // Check the car already exists with car number as it must be unique
        //         if (doc) {
        //             res.status(409).send({ message: `The car with the ${doc.car_number} already exists!` });
        //         }
        //         else {
        //             var uploadedFiles = req["files"];
        //             var dir = './FileStore';
        //             // newCar.car_image = req["files"]["path"];
        //             if (!fs.existsSync(dir)) {
        //                 fs.mkdirSync(dir);
        //             }
        //             var imageDir = dir + '/' + 'Images';
        //             if (!fs.existsSync(imageDir)) {
        //                 fs.mkdirSync(imageDir);
        //             }
        //             for (var index in uploadedFiles) {
        //                 var file = uploadedFiles[index];
        //                 var originalName = file["originalname"];
        //                 var oldPath = file["path"];
        //                 let ext = path.extname(originalName).toLowerCase();
        //                 // Prevent empty files to be uploaded
        //                 if (!file.size) {
        //                     res.status(409).send({ message: "File is empty! " });
        //                 }
        //                 // Prevent files to be uploaded larger than 2MB
        //                 if (file.size > 2 * 1024 * 1024) {
        //                     res.status(409).send({ message: "File must be less than 2 MB size!" });
        //                 }
        //                  // Prevent different formats files to be uploaded
        //                 if (!(ext === '.jpg' || ext === '.jpeg' || ext === ".png" || ext === ".tiff" || ext === ".bmp")) {
        //                     res.status(409).send({ message: "Only jpg, jpeg, png, tiff and bmp files are allowed!" });
        //                 }
        //                 // Generating Unique file name
        //                 let newFileName = uuidv1() + ext;
        //                 // Save Image
        //                 var newpath = imageDir + '/' + newFileName;
        //                 //Save the file to the file store
        //                 await fs.rename(oldPath, newpath, async function (err) {
        //                     if (err) throw err;
        //                     originalName = newFileName;
        //                 });
        //                 newCar.images.push({
        //                     original_file_name: originalName,
        //                     size: file.size,
        //                     unique_file_name: newFileName,
        //                 });
        //             }
        //             // Save new car
        //             newCar.save((err, car) => {
        //                 if (err) {
        //                     res.send(err);
        //                 }
        //                 res.status(201).send(car);
        //             });
        //         }
        //     });
        // })
        // Get all cars
        app.route('/api/car')
            .get(this.carController.getCars);
        // Get a specific car
        app.route('/api/car/:carId')
            .get(this.carController.getCarWithID);
        // Update a specific car
        app.route('/api/car/:carId')
            .put(this.carController.updateCar);
        // Soft delete a car
        // using PATCH verb because we have to change a flag only for soft delete
        app.route('/api/car/:carId')
            .patch(this.carController.removeCar);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=carRoutes.js.map