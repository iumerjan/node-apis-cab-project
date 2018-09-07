export interface ICar {
    brand: string,
    car_number: string,
    model: string,
    number_of_seats: number,
    rate: number,
    color: string,
    car_type: string,
    is_deleted: boolean, // used for soft deletion of car
   
}