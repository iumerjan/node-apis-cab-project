export interface ICar {
    name: string,
    car_number: string,
    model: string,
    number_of_seats: number,
    rate: number,
    color: string,
    car_type: string,
    is_deleted: boolean, // used for soft deletion of car
    images: Array<{
        uploaded_by: string,
        original_file_name: string,
        unique_file_name: string,
        size: number,
        path: string,
    }>,
}