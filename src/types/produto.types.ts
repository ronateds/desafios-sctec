// Entidade Produto
export interface Produto {
    id: Number;
    nome: string;
    preco: number;
    estoque: number;
    ativo: boolean;
    criadoEm: Date;
}

// DTO para criação
export interface CreateProdutoDTO {
    nome: string;
    preco: number;
    estoque: number;
}

// DTO para atualização - Padrão PATCH agregando atributo ativo.
export type UpdateProdutoDTO = Partial<CreateProdutoDTO> & { ativo?: boolean }

// Resposta paginada genérica
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}