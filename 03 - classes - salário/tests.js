import { Empresa, Funcionario, FuncionarioCLT, FuncionarioPJ, Estagiario } from "./classes.js";

const funcionario = new Funcionario("Funcionário", 3500);
// // console.log(funcionario.descrever());
// // console.log(funcionario.calcularSalario()); // joga erro como esperado

const fulano = new FuncionarioCLT("Fulano", 3500);
// console.log(fulano.descrever());
// // console.log(fulano.calcularSalario());

const beltrano = new FuncionarioPJ("Beltrano", 3500);
// console.log(beltrano.descrever());
// // console.log(beltrano.calcularSalario());

const sicrano = new Estagiario("Sicrano", 1500);
// console.log(sicrano.descrever());
// // console.log(sicrano.calcularSalario());

const empresa = new Empresa();
empresa.adicionarFuncionario(fulano);
empresa.adicionarFuncionario(beltrano);
empresa.adicionarFuncionario(sicrano);

empresa.gerarRelatorioFolha()

