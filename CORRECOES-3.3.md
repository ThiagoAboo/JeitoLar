# JeitoLar 3.3 — seleção direta de pacote pela Home

## Correção
Na seção `#pacotes` da página inicial, cada botão **Montar minha lista** agora abre `/orcamento/` com o pacote correspondente já selecionado:

- Pacote 4 horas → `?servico=pacote-4h`
- Pacote 8 horas → `?servico=pacote-8h`

Se uma região já estiver selecionada no site, ela é preservada na URL junto com o pacote.

Ao abrir o orçamento, o `QuoteBuilder` usa a lógica já existente para:
- selecionar o pacote automaticamente;
- abrir o grupo **Pacotes**;
- manter pacote e serviços avulsos como modos mutuamente exclusivos.
