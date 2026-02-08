import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UploadService } from "../upload/upload.service";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly uploadService: UploadService
    ) {}

    async create(productDto: CreateProductDto, image?: Express.Multer.File) {
        let imageUrl = '';
        if (image) {
            const { url } = await this.uploadService.uploadFile(image)
            imageUrl = url;
        } else {

        }

        const product = this.productRepository.create({
            name: productDto.name,
            category: { id: productDto.category_id },
            image_url: imageUrl,
        })
        return this.productRepository.save(product)
    }

    findAll(): Promise<Product[]> {
        return this.productRepository.find()
    }

    findOne(id: string): Promise<Product> {
        return this.productRepository.findOne({ where: { id: parseInt(id) } })
    }
}