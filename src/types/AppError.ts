export class AppError extends Error {
    constructor(
        public readonly message: string,
        public readonly statusCode: number = 400
    ) {
        super(message)

        // Necessário no Typescript ao estender classes nativas, em nosso caso Error
        Object.setPrototypeOf(this, AppError.prototype)
    }
}