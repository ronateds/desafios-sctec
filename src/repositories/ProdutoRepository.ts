import { Pool } from 'pg'
import { Produto, CreateProdutoDto, UpdateProdutoDto } from '../types/produto.types'
import { IProdutoRepository } from './IProdutoRepository';

export class ProdutoRepository implements IProdutoRepository {

    constructor(private db: Pool) { }

    //findAll(): Promise<Produto[]>
    async findAll(): Promise<Produto[]> {
        const { rows } = await this.db.query<Produto>(
            'SELECT * FROM produtos WHERE ativo = true ORDER BY nome'
        )
        return rows
    }

    //findByID(id: number): Promise<Produto | null>
    async findById(id: number): Promise<Produto | null> {
        const { rows } = await this.db.query<Produto>(
            'SELECT * FROM produtos WHERE id = $1', [id]
        )
        return rows[0] ?? null
    }

    //findByNome(nome: string): Promise<Produto | null>
    async findByNome(nome: string): Promise<Produto | null> {
        const { rows } = await this.db.query<Produto>(
            'SELECT * FROM produtos WHERE nome ILIKE $1', [nome]
        )
        return rows[0] ?? null
    }

    //findByNomeParcial(nome: string): Promise<Produto[] | null>
    async findByNomeParcial(nome: string): Promise<Produto[] | null> {
        const { rows } = await this.db.query<Produto>(
            'SELECT * FROM produtos WHERE nome ILIKE $1 AND ativo = true ORDER BY nome',
            [`%${ nome }%`]
        )

        return rows ?? null
    }

    //create(dto: CreateProdutoDto): Promise<Produto>
    async create(dto: CreateProdutoDto): Promise<Produto> {
        const { rows } = await this.db.query<Produto>(
            `INSERT INTO produtos (nome, preco, estoque)
            VALUES ($1, $2, $3) RETURNING *`,
            [dto.nome, dto.preco, dto.estoque]
        )

        return rows[0]!
    }

    //update(id: number, dto: UpdateProdutoDto): Promise<Produto | null>
    async update(id: number, dto: UpdateProdutoDto): Promise<Produto | null> {
        const { rows } = await this.db.query<Produto>(
            `UPDATE produtos
            SET nome = COALESCE($1, nome),
                preco = COALESCE($2, preco),
                estoque = COALESCE($3, estoque),
                ativo = COALESCE($4, ativo)
                WHERE id = $5 RETURNING *`,
            [dto.nome, dto.preco, dto.estoque, dto.ativo, id]
        )
        return rows[0] ?? null
    }

    //delete(id: number): Promise<void>
    async delete(id: number): Promise<void> {
        await this.db.query(
            'DELETE FROM produtos WHERE id = $1',
            [id]
        )
    }
}