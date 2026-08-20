# JeitoLar 2.7

## 1. Seletor de região no topo
O texto visível "Região" foi removido. O seletor mostra apenas `Escolher região` quando nenhuma região foi definida. O `aria-label` permanece para acessibilidade.

## 2. Splash de abertura do PWA
Ao abrir a JeitoLar instalada em modo aplicativo, foi adicionado um splash visual próprio com fundo branco e `logo-jeitolar.png` centralizada.

Observação: Android e iOS ainda podem exibir por alguns instantes um splash nativo controlado pelo próprio sistema antes do conteúdo web carregar. O manifest continua com `background_color: #ffffff`, e o splash da aplicação assume em seguida com a logo completa.

## 3. Cartão de visita
Foi criado cartão horizontal de baixo consumo de tinta, no padrão 85 x 55 mm, com:
- WhatsApp: (21) 99224-4753
- E-mail: jeitolar@gmail.com
- Instagram: @jeitolar.rj

Arquivos:
- `/card/cartao-jeitolar-85x55mm.png` — 1004 x 650 px, 300 dpi.
- `/card/cartao-jeitolar-web.webp` — versão otimizada para visualização no site.
- `/card/cartao-imprimir.html` — página de impressão configurada para 85 x 55 mm.

## 4. Carregue o JeitoLar no bolso
A Home ganhou uma seção final com:
- instalação do aplicativo;
- impressão do cartão;
- salvamento/compartilhamento do cartão no celular.

No iOS/Android, quando o navegador suporta compartilhamento de arquivos, o botão usa a folha nativa do sistema. A opção de salvar em Fotos/Galeria depende das opções disponibilizadas pelo sistema operacional. Em navegadores sem suporte, o arquivo PNG é baixado.
