import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InternalMovement } from "./internal.movement.entity";
import { CreateInternalMovementDto } from "./dto/create-internal-movement.dto";

@Injectable()
export class InternalMovementService {
    constructor(
        @InjectRepository(InternalMovement)
        private readonly internalMovementRepository: Repository<InternalMovement>
    ) {}

    create(createInternalMovementDto: CreateInternalMovementDto): Promise<InternalMovement> {
        const movement = {
            date: createInternalMovementDto.date,
            count: createInternalMovementDto.count,
            product: {
                id: createInternalMovementDto.product_id
            },
            warehouseOrigin: {
                id: createInternalMovementDto.warehouseOrigin_id
            },
            warehouseDestination: {
                id: createInternalMovementDto.warehouseDestination_id
            }
        }
        return this.internalMovementRepository.save(movement);
    }

    findAll(): Promise<InternalMovement[]> {
        return this.internalMovementRepository.find();
    }
}