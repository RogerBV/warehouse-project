import { Product } from "../product/product.entity";
import { Warehouse } from "../warehouse/warehouse.entity";
export declare class InternalMovement {
    id: number;
    date: Date;
    count: number;
    product: Product;
    warehouseOrigin: Warehouse;
    warehouseDestination: Warehouse;
}
