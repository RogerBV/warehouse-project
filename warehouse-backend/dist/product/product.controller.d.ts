import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProduct: CreateProductDto, image?: Express.Multer.File): Promise<import("./product.entity").Product>;
    findAll(): Promise<import("./product.entity").Product[]>;
    findOne(id: string): Promise<import("./product.entity").Product>;
}
