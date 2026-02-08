import { InternalMovement } from "../movement/internal.movement.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";


@Entity()
export class Warehouse {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 180 })
    address: string;

    @OneToMany(() => InternalMovement, (movement) => movement.warehouseOrigin)
    movementsOrigin: InternalMovement[];

    @OneToMany(() => InternalMovement, (movement) => movement.warehouseDestination)
    movementsDestination: InternalMovement[];
}