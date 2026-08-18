import { Produto, CreateProdutoDto, UpdateProdutoDto } from '../types/produto.types'

export interface IProdutoRepository {
    findAll(): Promise<Produto[]>;
    findById(id: number): Promise<Produto | null>;
    findByNome(nome: string): Promise<Produto | null>;
    findByNomeParcial(nome: string): Promise<Produto[] | null>
    create(dto: CreateProdutoDto): Promise<Produto>;
    update(id: number, dto: UpdateProdutoDto): Promise<Produto | null>;
    delete(id: number): Promise<void>;
}