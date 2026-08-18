import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import produtoRoutes from './routes/produtoRoutes';
import { errorHandler } from './middlewares/erroHandler';

//Carregar .env antes de qualquer leitura de process.env
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware globais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/v1/produtos', produtoRoutes)

// Rota de health-check
app.get('/health-check', (req: Request, res: Response) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});

// Rota desconhecida 404
app.use((req: Request, res: Response) => res.status(404).json({ error: 'Rota não encontrada' }))

// middleware de tratamento de erros (deve ser o último middleware)
app.use(errorHandler)

//Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${ PORT }`)
});

export default app;