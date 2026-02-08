import { Controller, Get, Post, Body } from "@nestjs/common";
import { WarehouseService } from "./warehouse.service";
import { Warehouse } from "./warehouse.entity";
import { CreateWarehouseDto } from "./dto/create-warehouse.dto";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('warehouses')
@Controller('warehouses')
export class WarehouseController {

    constructor(private readonly warehouseService: WarehouseService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new warehouse' })
    @ApiResponse({ status: 200, description: 'New Warehouse' })
    create(@Body() createWarehouse: CreateWarehouseDto): Promise<Warehouse> {
        return this.warehouseService.create(createWarehouse)
    }

    @Get()
    @ApiOperation({ summary: 'Get list of warehouses' })
    findAll(): Promise<Warehouse[]> {
        return this.warehouseService.getWarehouses();
    }
}