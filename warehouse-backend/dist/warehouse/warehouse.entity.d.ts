import { Movement } from "../movement/movement.entity";
export declare class Warehouse {
    id: number;
    name: string;
    address: string;
    movementsOrigin: Movement[];
    movementsDestination: Movement[];
}
