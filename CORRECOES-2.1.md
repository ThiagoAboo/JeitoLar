# JeitoLar 2.1 — correções solicitadas

Esta versão corrige os cinco pontos reportados na revisão visual.

1. As imagens `galeria-servico-1.webp` até `galeria-servico-4.webp` foram removidas. A galeria usa apenas as demais imagens e mantém proporção original, sem `object-fit: cover`.
2. As páginas específicas por serviço foram substituídas por cinco páginas de grupos: Elétrica, Hidráulica, Instalações, Montagem e Pequenos reparos. Cada grupo exibe sua lista completa, mas só revela preços depois de selecionar a região.
3. O painel **Sua estimativa** agora é sticky no desktop e acompanha a rolagem; caso fique maior que a tela, ele ganha rolagem interna.
4. Foi adicionado um gerenciador de rolagem para sempre abrir novas rotas no topo.
5. Os links Serviços, Regiões e Galeria do cabeçalho agora funcionam tanto na home quanto quando acionados a partir de outra página. Também foi adicionado `scroll-margin-top` para compensar o cabeçalho fixo.

## Serviços

A base continua com os 18 serviços e a tabela de valores já utilizada anteriormente.

## Antes de publicar

Preserve do projeto atual:

- `.env`
- `public/google1298e2f9fd81c865.html`

Depois execute:

```powershell
npm install
npm run check:data
npm run build
npm run dev
```

Teste:

- `/` e os atalhos do cabeçalho;
- uma página local, voltando para outra rota;
- `/servicos/eletrica/` sem região e depois com uma região selecionada;
- `/orcamento/` com vários serviços para validar o painel sticky;
- galeria em desktop e celular.
