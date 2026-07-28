import express, { Express } from 'express';
import dotenv from 'dotenv';
import router from './routes/produtoRoutes';
import { Router, Request, Response } from 'express';

// Carregar .env antes de qualquer leitura de process.env
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/v1/produtos', router);

// Rota de health-check
app.get('/health-check', (req: Request, res: Response) => {
    res.status(200).json('ok')
})

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${ PORT }`)
});

export default app;