import { Request, Response, NextFunction } from 'express';
import { ProdutoService } from '../services/produtoService';
import { CreateProdutoDto, UpdateProdutoDto } from '../types/produto.types';


export type IdParam = { id: string }

export class ProdutoController {
    constructor(private service: ProdutoService) { }

    // -- GET /api/v1/produtos || GET /api/v1/produtos?nome=abc
    async listar(req: Request<{}, {}, {}, { nome?: string }>, res: Response, next: NextFunction): Promise<void> {
        try {
            const produtos = await this.service.listarTodos(req.query.nome ? { nome: req.query.nome } : undefined)
            res.json(produtos)
        } catch (err) {
            next(err)
        }
    }

    // -- GET /api/v1/produtos/:id
    async buscarPorId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = Number(req.params.id)

            if (isNaN(id)) {
                res.status(400).json(
                    { error: 'O ID dever ser um número inteiro' }
                )
            }

            const produto = await this.service.buscarPorId(id)
            res.json(produto)
        } catch (err) {
            next(err)
        }
    }

    // -- POST /api/v1/produtos
    async criar(req: Request<{}, {}, CreateProdutoDto>, res: Response, next: NextFunction): Promise<void> {
        try {
            const { nome, preco, estoque } = req.body
            if (!nome || preco === undefined || estoque == undefined) {
                res.status(400).json(
                    { error: 'Os campos nome, preco e estoque são obrigatórios' }
                )
            }

            const novoProduto = await this.service.criar({ nome, preco, estoque })
            res.status(201).json(novoProduto)
        } catch (err) {
            next(err)
        }
    }

    // -- PATCH /api/v1/produtos/:id
    async atualizar(req: Request<IdParam, {}, UpdateProdutoDto>, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = Number(req.params.id)
            if (isNaN(id)) {
                res.status(400).json(
                    { error: 'O ID dever ser um número inteiro' }
                )
            }

            const produto = await this.service.atualizar(id, req.body)
            res.json(produto)
        } catch (err) {
            next(err)
        }
    }

    // -- DELETE /api/v1/produtos/:id
    async remover(req: Request<IdParam>, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = Number(req.params.id)
            if (isNaN(id)) {
                res.status(400).json(
                    { error: 'O ID dever ser um número inteiro' }
                )
            }
            await this.service.remover(id)
            res.status(204).send()
        } catch (err) {
            next(err)
        }
    }
}