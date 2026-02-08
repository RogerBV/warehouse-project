import { Repository } from "typeorm";
import { InternalMovement } from "./internal.movement.entity";
import { CreateInternalMovementDto } from "./dto/create-internal-movement.dto";
export declare class InternalMovementService {
    private readonly internalMovementRepository;
    constructor(internalMovementRepository: Repository<InternalMovement>);
    create(createInternalMovementDto: CreateInternalMovementDto): Promise<InternalMovement>;
    findAll(): Promise<InternalMovement[]>;
}
