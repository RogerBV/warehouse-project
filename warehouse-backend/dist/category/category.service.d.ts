import { Category } from "./category.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    create(category: CreateCategoryDto): Promise<CreateCategoryDto & Category>;
    getCategories(): Promise<Category[]>;
}
