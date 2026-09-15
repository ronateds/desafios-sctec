import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Product } from '../entities/Product'
import { Like, MoreThan, Between } from "typeorm";
import { Category } from "../entities/Category";
import { AppError } from "../errors/AppError";

export class ProductController {

    async create(req: Request, res: Response): Promise<Response> {

        const productRepository = AppDataSource.getRepository(Product)
        const categoryRepository = AppDataSource.getRepository(Category)

        const { nome, descricao, preco, estoque, categoryId } = req.body

        const category = await categoryRepository.findOneBy({
            id: Number(categoryId)
        })

        if (!category) {
            throw new AppError('Categoria não encontrada', 404)
        }

        const product = productRepository.create({ nome, descricao, preco, estoque, category })

        const savedProduct = await productRepository.save(product) //persistência

        return res.status(201).json(savedProduct)
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product)

        const products = await productRepository.find({
            relations: {
                category: true
            }
        })

        return res.status(200).json(products)
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product)

        const id: number = Number(req.params.id)

        const product = await productRepository.findOne({
            where: { id },
            relations: {
                category: true
            }
        })

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' })
        }

        return res.status(200).json(product)
    }

    async update(req: Request, res: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product)

        const id: number = Number(req.params.id)

        const product = await productRepository.findOneBy({ id })

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' })
        }

        productRepository.merge(product, req.body)

        const updatedProduct = await productRepository.save(product)

        return res.status(200).json(updatedProduct)

    }

    async delete(req: Request, res: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product)

        const id: number = Number(req.params.id)

        const product = await productRepository.findOneBy({ id })

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' })
        }

        await productRepository.remove(product)

        return res.status(204).send()
    }

    async searchByName(req: Request, res: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product)

        const nome: string = String(req.query.nome || '')

        if (!nome.trim()) {
            return res.status(400).json({ message: 'O parâmetro "nome" é obrigatório' })
        }

        const products = await productRepository.find({
            where: {
                nome: Like(`%${ nome }%`)
            },
            relations: {
                category: true
            }
        })
        return res.status(200).json(products)
    }

    /*
        DESAFIO 02
            Criar GET /products/stock/available
            Retornar todos os produtos com estoque maior que 0
    */
    async findAvaliable(req: Request, res: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product)

        const products = await productRepository.find({
            where: {
                estoque: MoreThan(0)
            },
            relations: {
                category: true
            }
        })

        return res.status(200).json(products)
    }

    /*

    DESAFIO 03
        Criar GET /products/stock/empty
        Retornar todos os produtos com estoque igual a 0
    */
    async findOutOfStock(req: Request, res: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product)

        const products = await productRepository.find({
            where: {
                estoque: 0
            },
            relations: {
                category: true
            }
        })
        return res.status(200).json(products)
    }

    /*

        DESAFIO 04
            Criar GET /products/filter?min=10&max=100
            Retornar todos os produtos com preço entre min e max
    */

    async findByPriceRange(req: Request, res: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product)

        const min: number = Number(req.query.min)
        const max: number = Number(req.query.max)

        //Se min e max são números
        if (Number.isNaN(min) || Number.isNaN(max)) {
            return res.status(400).json({
                message: "Informe valores númericos para min e max"
            })
        }

        //Se min é maior que max
        if (min > max) {
            return res.status(400).json({
                message: "O valor mínimo não poder ser maior que o valor máximo"
            })
        }

        const products = await productRepository.find({
            where: {
                preco: Between(min, max)
            },
            relations: {
                category: true
            }
        })

        return res.json(products)
    }


}