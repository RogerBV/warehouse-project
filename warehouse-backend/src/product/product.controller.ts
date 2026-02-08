import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";

@ApiTags('products')
@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'New Product' })
    create (
        @Body() createProduct: CreateProductDto,
        @UploadedFile() image?: Express.Multer.File
    ) {
        return this.productService.create(createProduct, image)
    }

    @Get()
    @ApiOperation({ summary: 'Get list of products' })
    @ApiResponse({ status: 200, description: 'List of Products' })
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a product by id'})
    @ApiResponse({ status: 200, description: 'Product by id' })
    findOne(@Param('id') id: string) {
        return this.productService.findOne(id);
    }
}