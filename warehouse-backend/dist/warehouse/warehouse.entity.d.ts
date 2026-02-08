import { InternalMovement } from "../movement/internal.movement.entity";
export declare class Warehouse {
    id: number;
    name: string;
    address: string;
    movementsOrigin: InternalMovement[];
    movementsDestination: InternalMovement[];
}
