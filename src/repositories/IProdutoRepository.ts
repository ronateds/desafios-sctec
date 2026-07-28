import { Produto, CreateProdutoDTO, UpdateProdutoDTO } from '../types/produto.types';

export interface IProdutoRepository {
    findAll(): Promise<Produto[]>;
    findById(id: number): Promise<Produto | null>
    create(dto: CreateProdutoDTO): Promise<Produto | null>
    update(id: number, dto: UpdateProdutoDTO): Promise<Produto>
    delete(id: number): Promise<void>
}