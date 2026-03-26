import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Movement } from "./movement.entity";
import { CreateMovementDto } from "./dto/create-movement.dto";

@Injectable()
export class MovementService {
    constructor(
        @InjectRepository(Movement)
        private readonly movementRepository: Repository<Movement>
    ) {}

    create(createMovementDto: CreateMovementDto): Promise<Movement> {
        const movement = {
            date: createMovementDto.date,
            count: createMovementDto.count,
            product: {
                id: createMovementDto.product_id
            },
            warehouseOrigin: {
                id: createMovementDto.warehouseOrigin_id
            },
            warehouseDestination: {
                id: createMovementDto.warehouseDestination_id
            }
        }
        return this.movementRepository.save(movement);
    }

    findAll(): Promise<Movement[]> {
        return this.movementRepository.find();
    }
}