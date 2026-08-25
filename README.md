# JeitoLar 2.2

Versão completa do site JeitoLar com SEO local, catálogo ampliado e orçamento automático.

## Principais mudanças desta versão

- 56 serviços organizados em 7 grupos.
- Novos grupos: **Jardim e quintal** e **Piscina**.
- Mão de obra base igual em todas as regiões; somente deslocamento varia.
- Preços introdutórios posicionados na faixa baixa do mercado para captação inicial.
- Deslocamento promocional reduzido.
- Resumo **Sua estimativa** acompanha o scroll sem barra de rolagem interna.
- Resumo mostra até 4 serviços por padrão e oferece **Ver mais** quando necessário.
- Mensagem do WhatsApp sem emojis para evitar caracteres quebrados.
- Pacotes: 4h por R$ 260 e 8h por R$ 450 para serviços elegíveis.

## Grupos de serviço

```text
/servicos/eletrica/
/servicos/hidraulica/
/servicos/instalacoes/
/servicos/montagem/
/servicos/pequenos-reparos/
/servicos/jardim-quintal/
/servicos/piscina/
```

## Arquivos comerciais

```text
src/data/orcamento/
├── servicos.json
├── precos.json
├── regioes.json
├── bairros.json
├── deslocamento.json
├── pacotes.json
└── configuracao.json
```

`precos.json` mantém a estrutura por região para o sistema continuar exigindo localidade antes de mostrar o preço, mas nesta política os valores de mão de obra são uniformes. A diferença geográfica fica no deslocamento.

## Antes de substituir o projeto atual

Preserve:

```text
.env
package-lock.json
public/google1298e2f9fd81c865.html
```

Se o workflow atual do GitHub Actions já funciona, também preserve `.github/workflows/deploy.yml` ou compare antes de sobrescrever.

## Instalar e testar

```powershell
npm install
npm run check:data
npm run build
npm run dev
```

Teste especialmente:

```text
http://localhost:5173/orcamento/
http://localhost:5173/servicos/jardim-quintal/
http://localhost:5173/servicos/piscina/
```

## Publicação

```powershell
git add .
git commit -m "feat: JeitoLar 2.2 preços introdutórios e novos serviços"
git push
```

Veja `CORRECOES-2.2.md` e `PESQUISA-PRECOS-2.2.md`.

## Atualização 2.3

- `profissional-ferramentas.webp` permanece somente no hero e foi removida da galeria.
- O painel **Sua estimativa** usa sticky no desktop sem scrollbar interna.
- A mensagem do WhatsApp foi reorganizada em blocos mais limpos e sem emojis.
- Consulte `CORRECOES-2.3.md` para os detalhes.


## Atualização 2.5

- Oculta quantidade em serviços limitados a uma unidade.
- Adiciona botão rápido **Enviar orçamento** no topo do resumo.
- Envio agora direciona automaticamente ao primeiro campo obrigatório faltante.
- Veja `CORRECOES-2.5.md`.

## Atualização 2.6

### Região global

O cabeçalho agora possui um seletor de região. A escolha é salva no navegador e reaproveitada em páginas de serviços e no orçamento.

### Instalação no Android/iOS

A JeitoLar agora é uma PWA instalável. Após publicar em HTTPS, acesse:

```text
https://jeitolar.pages.dev/instalar/
```

No Android, o navegador pode oferecer o botão **Instalar JeitoLar agora**.

No iPhone/iPad, abra o site no Safari e use **Compartilhar → Adicionar à Tela de Início**.

Os arquivos PWA ficam em:

```text
public/site.webmanifest
public/sw.js
public/pwa/
```

## Atualização 2.7

- Seletor do topo sem a palavra “Região”; permanece apenas o dropdown `Escolher região`.
- Splash visual do app instalado com `logo-jeitolar.png` sobre fundo branco.
- Cartão de visita 85 x 55 mm em PNG 300 dpi, página própria de impressão e versão web.
- Nova seção “Carregue o JeitoLar no bolso” na Home.
- Botões para instalar o app, imprimir o cartão e salvar/compartilhar o cartão no celular.

Consulte `CORRECOES-2.7.md`.

## Atualização 2.8

O cartão de visita agora inclui o carimbo **Faz-Tudo** no canto inferior direito e foi atualizado em todos os pontos de visualização, impressão e compartilhamento/salvamento. O cache da PWA também foi incrementado para evitar que a arte antiga permaneça armazenada no dispositivo.

Consulte `CORRECOES-2.8.md`.


## JeitoLar 3.0
- Pacotes de 4h e 8h disponíveis no grupo **Pacotes** dentro da lista de serviços do orçamento.
