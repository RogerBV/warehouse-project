import { MovementService } from "./movement.service";
import { CreateMovementDto } from "./dto/create-movement.dto";
export declare class MovementController {
    private readonly movementService;
    constructor(movementService: MovementService);
    create(createMovement: CreateMovementDto): Promise<import("./movement.entity").Movement>;
    findAll(): Promise<import("./movement.entity").Movement[]>;
}
