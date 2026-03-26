import { Movement } from "../movement/movement.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";


@Entity()
export class Warehouse {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 180 })
    address: string;

    @OneToMany(() => Movement, (movement) => movement.warehouseOrigin)
    movementsOrigin: Movement[];

    @OneToMany(() => Movement, (movement) => movement.warehouseDestination)
    movementsDestination: Movement[];
}