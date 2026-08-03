import { Request, Response, NextFunction } from "express";
import { AppError } from "../types/AppError";

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    _next: NextFunction // prefixo _ indica que o parâmetro é obrigatório na assinatura, mas não é usado no corpo da função
): void {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message })
        return;
    }

    console.error('[ERRO INESPERADO]', err);
    res.status(500).json({ error: 'Erro interno no servidor' });
}