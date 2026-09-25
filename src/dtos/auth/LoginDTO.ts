/**
 * @openapi
 * components:
 *   schemas:
 *     LoginDTO:
 *       type: object
 *       required: [email, senha]
 *       properties:
 *         email: { type: string, format: email }
 *         senha: { type: string, format: password }
 */


import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class LoginDTO {
    @IsEmail({}, { message: "O email deve ser válido" })
    email!: string

    @MinLength(1, {message: "A senha é obrigatória"})
    senha!: string
}