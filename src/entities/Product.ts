import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { length: 150, nullable: false, unique: true })
    nome!: string;

    @Column('varchar', { length: 255, nullable: false })
    descricao!: string;

    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    preco!: number;

    @Column('int', { default: 0 })
    estoque!: number;

    @ManyToOne(
        () => Category,
        category => category.products
    )
    @JoinColumn({ name: "categoryId" })
    category!: Category

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}