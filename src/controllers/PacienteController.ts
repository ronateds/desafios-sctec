import {Request, Response} from "express"
import { AppDataSource } from "../data-source";
import { Paciente } from "../entities/Paciente"

const pacienteRepository = AppDataSource.getRepository(Paciente)

export class PacienteController{
    // GET /paciente/me
    async meuPerfil(req: Request, res: Response){
        const paciente = await pacienteRepository.findOne({
            where: {usuario: {id: req.usuario?.sub}}
        })

        if(!paciente){
            return res.status(404).json({erro: "Paciente não encontrado"})
        }

        res.json(paciente)
    }

    //GET /pacientes
    async listar(req: Request, res: Response){
        const pacientes = await pacienteRepository.find()
        return res.json(pacientes)
    }
}