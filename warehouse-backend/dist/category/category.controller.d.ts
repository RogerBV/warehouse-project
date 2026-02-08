import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategory: CreateCategoryDto): Promise<CreateCategoryDto & import("./category.entity").Category>;
    findAll(): Promise<import("./category.entity").Category[]>;
}
