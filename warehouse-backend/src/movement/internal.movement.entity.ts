import { Product } from "../product/product.entity";
import { Warehouse } from "../warehouse/warehouse.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity() 
export class InternalMovement {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    date: Date;

    @Column()
    count: number;

    @ManyToOne(() => Product, (product) => product.movements)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @ManyToOne(() => Warehouse, (warehouse) => warehouse.movementsOrigin)
    @JoinColumn({ name: 'warehouse_origin_id' })
    warehouseOrigin: Warehouse;

    @ManyToOne(() => Warehouse, (warehouse) => warehouse.movementsDestination)
    @JoinColumn({ name: 'warehouse_destination_id' })
    warehouseDestination: Warehouse;
}