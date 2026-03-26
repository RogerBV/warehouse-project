import { Category } from "../category/category.entity";
import { Movement } from "../movement/movement.entity";
export declare class Product {
    id: number;
    name: string;
    image_url: string;
    category: Category;
    movements: Movement[];
}
