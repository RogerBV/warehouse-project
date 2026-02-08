import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateWarehouseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Warehouse 1', description: 'Name of the warehouse' })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Address 1', description: 'Warehouse address' })
    address: string;
}