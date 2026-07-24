import { Router, Request, Response } from "express";
import { Produto } from "../types/produto.types";

const produtoRoutes = Router();

produtoRoutes.get("/", (req: Request, res: Response) => {
    const produtos: Produto[] = [
        {
            id: 1,
            nome: "Notebook Gamer",
            preco: 5000.00,
            estoque: 15,
            ativo: true,
            criadoEm: new Date()
        },
        {
            id: 2,
            nome: "Teclado Gamer",
            preco: 499.00,
            estoque: 20,
            ativo: true,
            criadoEm: new Date()
        },
        {
            id: 3,
            nome: "Mouse Gamer",
            preco: 200.00,
            estoque: 0,
            ativo: false,
            criadoEm: new Date()
        }
    ]

    if (!produtos) {
        res.status(200).json({
            message: "Nenhum produto cadastrado!"
        })
    }

    res.status(200).json(produtos)
});


export default produtoRoutes;