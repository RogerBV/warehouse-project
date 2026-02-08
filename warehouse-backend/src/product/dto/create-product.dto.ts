import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Product 1', description: 'Name of the Product' })
    name: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Category Id' })
    category_id: number;

    @ApiProperty({ 
        type: 'string', 
        format: 'binary',
        description: 'Product image file',
        required: false 
    })
    image?: Express.Multer.File;
}