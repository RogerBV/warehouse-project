import { WarehouseService } from "./warehouse.service";
import { Warehouse } from "./warehouse.entity";
import { CreateWarehouseDto } from "./dto/create-warehouse.dto";
export declare class WarehouseController {
    private readonly warehouseService;
    constructor(warehouseService: WarehouseService);
    create(createWarehouse: CreateWarehouseDto): Promise<Warehouse>;
    findAll(): Promise<Warehouse[]>;
}
