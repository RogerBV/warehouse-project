import { Category } from "../category/category.entity";
import { InternalMovement } from "../movement/internal.movement.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    name: string;

    @Column({ length: 2000 })
    image_url: string;

    @ManyToOne(() => Category , category => category.products, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'category_id' })
    category: Category

    @OneToMany(() => InternalMovement, (movement) => movement.product)
    movements: InternalMovement[]
}