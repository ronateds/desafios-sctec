import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Product } from "./Product";

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { length: 100, nullable: false, unique: true })
    nome!: string

    @Column('text', { nullable: false })
    descricao!: string

    @OneToMany(
        () => Product, //indica qual entidade está do outro lado do relacionamento
        product => product.category //indica qual property de Product representa o outro lado do relacionamento
    )
    products!: Product[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}