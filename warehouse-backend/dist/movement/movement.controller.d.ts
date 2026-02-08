import { InternalMovementService } from "./internal.movement.service";
import { CreateInternalMovementDto } from "./dto/create-internal-movement.dto";
export declare class MovementController {
    private readonly internalMovementService;
    constructor(internalMovementService: InternalMovementService);
    create(createInternalMovement: CreateInternalMovementDto): Promise<import("./internal.movement.entity").InternalMovement>;
    findAll(): Promise<import("./internal.movement.entity").InternalMovement[]>;
}
