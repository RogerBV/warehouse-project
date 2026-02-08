import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Warehouse } from "./warehouse.entity";
import { Repository } from "typeorm";
import { CreateWarehouseDto } from "./dto/create-warehouse.dto";

@Injectable()
export class WarehouseService {

    constructor(
        @InjectRepository(Warehouse)
        private readonly warehouseRepository: Repository<Warehouse>
    ){}


    create(warehouse: CreateWarehouseDto) {
        return this.warehouseRepository.save(warehouse)
    }

    getWarehouses(): Promise<Warehouse[]> {
        return this.warehouseRepository.find();
    }
}