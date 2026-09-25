/**
 * @openapi
 * components:
 *  schemas:
 *      RegistrarMedicoDTO:
 *          type: object
 *          properties:
 *            nome: {type: string, example: "João da Silva"}
 *            email: {type: string, format: "email", example: "joao.silva@example.com"}
 *            senha: {type: string, format: "password", example: "senha123", minLength: 6}
 *            crm: {type: string, example: "123456"}
 *            especialidade: {type: string, example: "Cardiologia"}
 *          required: [nome, email, senha, crm, especialidade]
 */

import {IsEmail, IsNotEmpty, MinLength} from 'class-validator'; 

export class RegistrarMedicoDTO {
    @IsNotEmpty({message: "O nome é obrigatório"})
    nome!: string

    @IsEmail({}, {message: "O email deve ser válido"})
    email!: string 

    @MinLength(6, {message: "A senha deve ter no mínimo 6 caracteres"})
    senha!: string

    @IsNotEmpty({message: "O CRM é obrigatório"})
    crm!: string

    @IsNotEmpty({message: "A especialidade é obrigatória"})
    especialidade!: string
}