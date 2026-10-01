import { beforeEach, describe, expect, it } from "@jest/globals";
import { FakeMedicoRepository } from "../../repositories/fakes/FakeMedicoRepository";
import { MedicoService } from "../MedicoService";
import { FakeUsuarioRepository } from "../../repositories/fakes/FakeUsuarioRepository";

describe('MedicoService', () => {
    let medicoRepository: FakeMedicoRepository
    let medicoService: MedicoService
    let usuarioRepository: FakeUsuarioRepository

    beforeEach(() => {
        medicoRepository = new FakeMedicoRepository();
        medicoService = new MedicoService(medicoRepository);
        usuarioRepository = new FakeUsuarioRepository();
    })

    it('lista medicos cadastrados', async () => {
        let u1 = usuarioRepository.criar({ nome: 'Davi Saldanha' })

        await medicoRepository.salvar(
            medicoRepository.criar({
                usuario: u1,
                crm: '123456-SP',
                especialidade: 'Clinico Geral'
            }))

        const result = await medicoService.listarTodos()
        expect(result).toHaveLength(1)
    })

    it('lança 404 se o médico não existe', async () => {
        const usuarioId = "123";
        await expect(medicoService.buscarMeuPerfil(usuarioId)).rejects.toThrow('Médico não encontrado.')
    })

    it('retorna perfil do médico existente', async () => {
        let u1 = usuarioRepository.criar({ nome: 'Roni' })

        const medico = await medicoRepository.salvar(
            medicoRepository.criar({
                usuario: u1,
                crm: '123456-SP',
                especialidade: 'Clinico Geral'
            })
        );

        const result = await medicoService.buscarMeuPerfil(medico.id);
        expect(result.usuario.nome).toBe('Roni');
    });
})