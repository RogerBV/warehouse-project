import { Category } from "../category/category.entity";
import { InternalMovement } from "../movement/internal.movement.entity";
export declare class Product {
    id: number;
    name: string;
    image_url: string;
    category: Category;
    movements: InternalMovement[];
}
