import { Produto, CreateProdutoDto, UpdateProdutoDto } from '../types/produto.types'
import { ProdutoRepository } from '../repositories/ProdutoRepository'
import { AppError } from '../types/AppError'

export class ProdutoService {
    constructor(private repo: ProdutoRepository) {
    }

    async listarTodos(filtros?: { nome?: string }): Promise<Produto[] | null> {

        if (filtros?.nome) {
            return this.repo.findByNomeParcial(filtros.nome)
        }

        const produtos = await this.repo.findAll()

        if (produtos.length === 0) {
            throw new AppError("Nenhum produto encontrado", 404)
        }
        return produtos
    }


    async buscarPorId(id: number): Promise<Produto> {
        const produto = await this.repo.findById(id)

        if (!produto) {
            throw new AppError('Produto não encontrado', 404)
        }

        return produto
    }

    async criar(dto: CreateProdutoDto): Promise<Produto> {
        //Regra de Negócio 1: preço deve ser positivo
        if (dto.preco <= 0) {
            throw new AppError('O preço dever ser maior que zero', 400)
        }

        //Regra de Negócio 2: nome deve ser único
        const existente = await this.repo.findByNome(dto.nome)
        if (existente) {
            throw new AppError(`Já existe um produto com o nome "${ dto.nome }"`, 409)
        }

        return this.repo.create(dto)
    }

    async atualizar(id: number, dto: UpdateProdutoDto): Promise<Produto | null> {
        await this.buscarPorId(id)

        //Regra de negócio: se o preço foi enviado, deve ser positivo
        if (dto.preco !== undefined && dto.preco <= 0) {
            throw new AppError("O preço deve ser maior que zero", 400);
        }

        return this.repo.update(id, dto)
    }

    async remover(id: number): Promise<void> {
        await this.buscarPorId(id)
        await this.repo.delete(id)
    }
}