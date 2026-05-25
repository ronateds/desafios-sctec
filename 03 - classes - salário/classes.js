class Empresa {
    constructor() {
        this.funcionarios = []
    }

    adicionarFuncionario(funcionario) {
        this.funcionarios.push(funcionario)
    }

    gerarRelatorioFolha() {
        console.table(this.funcionarios);
        // TODO fazer uma tabela melhor
    }
}

class Funcionario {
    constructor(nome, salarioBase) {
        this.nome = nome
        this._salarioBase = salarioBase
    }

    calcularSalario() {
        throw Error('"calcularSalario()" deve ser implementado pela subclasse.')
    }

    descrever() {
        return `Funcionário: ${ this.nome }`
    }
}

class FuncionarioCLT extends Funcionario {
    constructor(nome, salarioBase) {
        super(nome, salarioBase)
        this._valeRefeicao = 600
    }

    calcularSalario() {
        const inss = this._salarioBase * 0.11
        const irrf = this._salarioBase * 0.15
        return this._salarioBase - inss - irrf + this._valeRefeicao
    }

    descrever() {
        const liquido = this.calcularSalario().toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        return `CLT     | ${ this.nome }    | ${ liquido }`
    }
}

class FuncionarioPJ extends Funcionario {
    constructor(nome, salarioBase) {
        super(nome, salarioBase)
    }

    calcularSalario() {
        const inss = this._salarioBase * 0.11
        return this._salarioBase - inss
    }

    descrever() {
        const liquido = this.calcularSalario().toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        return `PJ     | ${ this.nome }    | ${ liquido }`
    }
}

class Estagiario extends Funcionario {
    constructor(nome, salarioBase) {
        super(nome, salarioBase)
    }

    calcularSalario() {
        return this._salarioBase
    }

    descrever() {
        const liquido = this.calcularSalario().toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        return `Estágiario     | ${ this.nome }    | ${ liquido }`
    }
}

module.exports = { Empresa, Funcionario, FuncionarioCLT, FuncionarioPJ, Estagiario }