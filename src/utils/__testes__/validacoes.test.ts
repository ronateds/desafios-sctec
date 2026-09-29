import { buscarSaudacao, calcularIdade, emailValido, podeAgendarConsulta, validarCrm, validarSenha } from '../validacoes'
import { describe, it, expect} from '@jest/globals'



describe('calcularidade', () => {
    it('calcular a idade quando o aniversário já passou este ano', () => {
        const anoNascimento = new Date().getFullYear() - 30
        const dataNascimento = `${anoNascimento}-01-01`

        const idade = calcularIdade(dataNascimento)

        expect(idade).toBe(30)
    })
})

describe('emailValido', () => {
    it('retorna true para um e-mail bem formado', () => {
        expect(emailValido('ana@email.com')).toBe(true)
    })

    it('retorna false quando falta o @', () => {
        expect(emailValido('ana.email.com')).toBe(false)
    })

    it('retorna false para uma string vazia', () => {
        expect(emailValido('')).toBe(false)
    })
})

describe('validarCrm', () => {
    it('não lança erro para um CRM válido', () => {
        expect(() => validarCrm('12345-SP')).not.toThrow()
    })

    it('lança erro quando o CRM está vazio', () => {
        expect( () => validarCrm('')).toThrow('CRM não pode ser vazio')
    })
})

describe('buscarSaudacao', () => {
    it('resolve com a saudacao correta', async () => {
        const resultado = await buscarSaudacao('Robson')
        expect(resultado).toBe('Olá, Robson!')
    })
})

describe('podeAgendarConsulta', () => {
    it('retorna true para uma data no futuro', () => {
        const dataFutura = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const testeFuturo = podeAgendarConsulta(dataFutura);
        expect(testeFuturo).toBeTruthy();
    });

    it('retorna false se for uma data passada', () => {
        const dataPassada = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const testePassado = podeAgendarConsulta(dataPassada);
        expect(testePassado).toBeFalsy();
    });
});

describe('validarSenha', () => {
    it('senha menos de 6 caracteres retorna false', () => {
        const senha = '12345';
        const testeSenha = validarSenha(senha);
        expect(testeSenha).toBe(false);
    });

    it('senha exatos 6 caracteres retorna true', () => {
        const senha = '123456';
        const testeSenha = validarSenha(senha);
        expect(testeSenha).toBe(true);
    });

    it('senha mais de 6 caracteres retorna true', () => {
        const senha = '1234567';
        const testeSenha = validarSenha(senha);
        expect(testeSenha).toBe(true);
    });
})
