import { Router, Request, Response } from 'express';
import { Produto } from '../types/produto.types';

const router = Router();

// Lista em memória (hardcoded)
const produtosEmMemmoria: Produto[] = [
    {
        id: 1,
        nome: 'Notebook Pro 16',
        preco: 4999.99,
        estoque: 10,
        ativo: true,
        criadoEm: new Date('2023-01-12T10:00:00Z')
    },
    {
        id: 1,
        nome: 'Mouser Gamer RGB',
        preco: 399.99,
        estoque: 25,
        ativo: true,
        criadoEm: new Date('2023-01-10T10:00:00Z')
    },
]

// GET /api/v1/produtos/ - busca todos os produtos
router.get('/', (req: Request<{}, Produto[], {}, {}>, res: Response<Produto[]>) => {
    res.json(produtosEmMemmoria);
})

// GET /api/v1/produtos/:id - busca por id
router.get('/:id', (req: Request<{id: string}>, res: Response<Produto | { error: string }>) => {
    const id = Number(req.params.id);

    if(isNaN(id)) {
        return res.status(400).json(
            { error: 'ID deve ser um número'}
        )
    }

    const produto = produtosEmMemmoria.find(p => p.id === id);

    if(!produto) {
        return res.status(400).json(
            { error: 'Produto não encontrado'}
        )
    }

    res.json(produto)
});

export default router