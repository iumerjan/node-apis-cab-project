import { CarController } from "../controllers/car/carController";
export class Routes {

    public carController: CarController = new CarController();
    public routes(app): void {
        
        // Add a new car
        app.route('/api/car')
            .post( this.carController.addNewCar);

        // Get all cars
        app.route('/api/car/:page')
            .get(this.carController.getCars);

        // Get a specific car
        app.route('/api/car/details/:carId')
            .get(this.carController.getCarWithID);

        // Soft delete a car
        // using PATCH verb because we have to change a flag only for soft delete
        app.route('/api/car/:carId')
            .patch(this.carController.removeCar);

    }

}