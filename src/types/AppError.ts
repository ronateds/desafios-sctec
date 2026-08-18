export class AppError extends Error {
    constructor(
        public readonly message: string,
        public readonly statusCode: number = 400
    ) {
        super(message)

        // Necessário no Typescript ao estender classes nativas, em nosso caso Error
        // Propotype refere-se a propriedade interna de um objeto
        Object.setPrototypeOf(this, AppError.prototype)
    }
}