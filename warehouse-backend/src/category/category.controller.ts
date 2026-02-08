import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";

@ApiTags('Categories')
@Controller('Categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}

    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({ status: 201, description: 'New Category' })
    create(@Body() createCategory: CreateCategoryDto) {
        return this.categoryService.create(createCategory)
    }

    @Get()
    @ApiOperation({ summary: 'Get the list of categories' })
    @ApiResponse({ status: 200, description: 'List of categories' })
    findAll() {
        return this.categoryService.getCategories()
    }
}