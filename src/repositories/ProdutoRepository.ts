import { Pool } from 'pg';
import { Produto, CreateProdutoDTO, UpdateProdutoDTO } from '../types/produto.types';
import { IProdutoRepository } from './IProdutoRepository';

export class ProdutoRepository implements IProdutoRepository {
    constructor(private db: Pool) {}

    // findAll(): Promise<Produto[]>
    async findAll(): Promise<Produto[]> {
        const { rows } = await this.db.query<Produto>(
            'SELECT * FROM produtos WHERE ativo = true ORDER BY nome'
        )
        return rows
    }

    async findById(id: number): Promise<Produto | null> {
        const { rows } = await this.db.query<Produto>(
            'SELECT * FROM produtos WHERE id = $1', [id]
        )
        return rows[0] ?? null
    }

    async findByNome(nome: string): Promise<Produto | null> {
        const { rows } = await this.db.query<Produto>(
            'SELECT * FROM produtos WHERE nome = $1', [nome]
        )
        return rows[0] ?? null
    }

    async create(dto: CreateProdutoDTO): Promise<Produto | null> {
        const { rows } = await this.db.query<Produto>(
            `INSERT INTO produtos (nome, preco, estoque)
            VALUES ($1, $2, $3) RETURNING *`,
            [dto.nome, dto.preco, dto.estoque]
        )
        return rows[0] ?? null
    }

    async update(id: number, dto: UpdateProdutoDTO): Promise<Produto> {
        const { rows } = await this.db.query<Produto>(
            `UPDATE produtos
            SET nome = COALESCE($1, nome),
                preco = COALESCE($2, preco),
                estoque = COALESCE($3, estoque),
                ativo = COALESCE($4, ativo)
                WHERE id = $5 RETURNING *`,
            [dto.nome, dto.preco, dto.estoque, dto.ativo, id]
        )
        return rows[0]!
    }

    async delete(id: number): Promise<void> {
        await this.db.query<Produto>(
            'DELETE FROM produtos WHERE id = $1',
            [id]
        )
    }
}