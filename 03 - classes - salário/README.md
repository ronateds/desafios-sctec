Uma empresa de tecnologia precisa de um sistema para calcular a folha de pagamento dos seus funcionários.
Existem três categorias: Funcionário CLT, Pessoa Jurídica (PJ) e Estagiário. Cada categoria tem regras específicas
de cálculo de salário, benefícios e desligamento. Seu desafio é modelar esse domínio usando herança em
JavaScript.

## REQ-01
Criar a subclasse FuncionarioCLT com desconto de INSS(11%) e IRRF (15%) sobre o salário base.

## REQ-02
Criar a subclasse FuncionarioPJ com retenção de 11% de ISS. Sem benefícios de vale-refeição.

## REQ-03
Criar a subclasse Estagiario com bolsa-auxílio, sem descontos obrigatórios.

## REQ-04
Sobrescrever calcularSalario() em cada subclasse usando super quando necessário.

## REQ-05
Sobrescrever descrever() em cada subclasse incluindo o tipo e o salário líquido calculado.

## REQ-06
Criar uma classe Empresa que armazena um array de funcionários e gera um relatório da folha de pagamento.
