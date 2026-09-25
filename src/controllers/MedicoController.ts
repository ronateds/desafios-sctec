import {Request, Response} from "express"
import { AppDataSource } from "../data-source";
import { Medico } from '../entities/Medico'
import { MedicoResponseDTO } from "../dtos/usuario/MedicoResponseDTO";

const medicoRepository = AppDataSource.getRepository(Medico)

export class MedicoController{
    //GET /medicos
    async listar(req: Request, res: Response){
        const medicos = await medicoRepository.find()

        const resposta = medicos.map(p => ({
            nome: p.usuario.nome,
            email: p.usuario.email,
            especialidade: new MedicoResponseDTO(p).especialidade
        }))

        return res.json(resposta)
    }

    //GET /medicos/me
    async meuPerfil(req: Request, res: Response){
        const medico = await medicoRepository.findOne({
            where: { usuario: {id: req.usuario?.sub}}
        })

        if(!medico){
            return res.status(404).json({ erro: "Médico não encontrado."})
        }

        return res.json(medico)
    }
}