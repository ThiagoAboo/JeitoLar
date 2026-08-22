# Correções 3.4

## Pacote pré-selecionado por URL

Corrigido o fluxo de abertura do orçamento com `?servico=pacote-4h` ou `?servico=pacote-8h`.

### Causa
O pacote era selecionado pelo parâmetro `servico`, mas logo em seguida o efeito de alteração da região executava `setPackageOverride(null)`, removendo a seleção.

### Correção
A mudança de região continua limpando bairro e bairro manual, mas não remove mais o pacote selecionado.

Agora links como:

- `/orcamento/?regiao=sao-goncalo&servico=pacote-4h`
- `/orcamento/?regiao=sao-goncalo&servico=pacote-8h`

abrem o grupo **Pacotes** e deixam o pacote correspondente selecionado.

A regra de exclusividade continua preservada: pacote e serviços avulsos não permanecem selecionados ao mesmo tempo.
