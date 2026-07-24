import express, { Express, Response } from "express";
import produtoRoutes from "./routes/index.routes";

const app: Express = express();

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${ PORT }`);
});

app.use(express.json());
app.get('/health', (res: Response) => res.status(200).json({ status: 'ok'}))
app.use('/api/v1/produtos', produtoRoutes)

export default app;