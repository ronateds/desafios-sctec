export interface Produto {
    id: number,
    nome: string,
    preco: number,
    estoque: number,
    ativo: boolean,
    criadoEm: Date
}

export type CreateProdutoDto = {
    nome: string,
    preco: number,
    estoque: number
}