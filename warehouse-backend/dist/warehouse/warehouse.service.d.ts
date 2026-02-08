import { Warehouse } from "./warehouse.entity";
import { Repository } from "typeorm";
import { CreateWarehouseDto } from "./dto/create-warehouse.dto";
export declare class WarehouseService {
    private readonly warehouseRepository;
    constructor(warehouseRepository: Repository<Warehouse>);
    create(warehouse: CreateWarehouseDto): Promise<CreateWarehouseDto & Warehouse>;
    getWarehouses(): Promise<Warehouse[]>;
}
