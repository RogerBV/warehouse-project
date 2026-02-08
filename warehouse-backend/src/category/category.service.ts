import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    create(category: CreateCategoryDto) {
        return this.categoryRepository.save(category)
    }

    getCategories(): Promise<Category[]> {
        return this.categoryRepository.find()
    }
}