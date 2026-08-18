import { Router, Request, Response, NextFunction } from 'express';
import { pool } from '../config/database'
import { ProdutoRepository } from '../repositories/ProdutoRepository';
import { ProdutoService } from '../services/produtoService';
import { IdParam, ProdutoController } from '../controllers/produtoContoller';
import { UpdateProdutoDto } from '../types/produto.types';

// Composição (Injeção de Dependência)
const repo = new ProdutoRepository(pool)
const service = new ProdutoService(repo)
const ctrl = new ProdutoController(service)

const produtoRoutes = Router();

produtoRoutes.get('/', (req: Request, res: Response, next: NextFunction) => ctrl.listar(req, res, next))
produtoRoutes.post('/', (req: Request, res: Response, next: NextFunction) => ctrl.criar(req, res, next))

produtoRoutes.get('/:id', (req: Request, res: Response, next: NextFunction) => ctrl.buscarPorId(req, res, next))
produtoRoutes.patch('/:id', (req: Request<IdParam, {}, UpdateProdutoDto>, res: Response, next: NextFunction) => ctrl.atualizar(req, res, next))
produtoRoutes.delete('/:id', (req: Request<IdParam>, res: Response, next: NextFunction) => ctrl.remover(req, res, next))

export default produtoRoutes;