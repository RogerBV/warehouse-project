import { Product } from "./product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UploadService } from "../upload/upload.service";
export declare class ProductService {
    private readonly productRepository;
    private readonly uploadService;
    constructor(productRepository: Repository<Product>, uploadService: UploadService);
    create(productDto: CreateProductDto, image?: Express.Multer.File): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
}
