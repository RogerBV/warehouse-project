import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreateInternalMovementDto {
    
    @ApiProperty({ example: 1, description: 'Count' })
    @IsNotEmpty()
    @IsNumber()
    count: number;

    @ApiProperty({ example: 1, description: 'Count' })
    @IsDate()
    @ApiProperty({ example: '2021-01-01', description: 'Date' })
    @IsNotEmpty()
    date: Date;

    @ApiProperty({ example: 1, description: 'Product ID' })
    @IsNotEmpty()
    @IsNumber()
    product_id: number;

    @ApiProperty({ example: 1, description: 'Warehouse origin ID' })
    @IsNotEmpty()
    @IsNumber()
    warehouseOrigin_id: number;

    @ApiProperty({ example: 1, description: 'Warehouse destination ID' })
    @IsNotEmpty()
    @IsNumber()
    warehouseDestination_id: number;
    
}