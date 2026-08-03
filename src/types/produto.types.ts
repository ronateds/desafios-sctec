//Entidade Produto
export interface Produto {
    id: number;
    nome: string;
    preco: number;
    estoque: number;
    ativo: boolean;
    criadoEm: Date;
}

// DTO para criação
export interface CreateProdutoDto {
    nome: string;
    preco: number;
    estoque: number;
}

//DTO para atualização - Padrão PATCH agregando atributo ativo.
export type UpdateProdutoDto = Partial<CreateProdutoDto> & { ativo?: boolean }

//Resposta paginada genérica
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}