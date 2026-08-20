# JeitoLar 2.6 — região global e instalação no celular

## 1. Região global no topo

Foi adicionada uma seleção de região no cabeçalho desktop e no menu mobile.

A escolha:

- fica salva no `localStorage` (`jeitolar_region`);
- é reaproveitada na calculadora de orçamento;
- é reaproveitada nas páginas de grupos de serviços;
- acompanha os links para orçamento e grupos de serviço;
- quando o usuário entra diretamente em uma página local (ex.: `/niteroi/`), essa região passa a ser a seleção global;
- se o usuário trocar a região enquanto está em uma página local, o site navega para a página local correspondente.

Os parâmetros `?regiao=...` continuam funcionando em links compartilhados.

## 2. PWA instalável no Android e iOS

O site agora possui os arquivos necessários para funcionar como Progressive Web App (PWA):

- `public/site.webmanifest`
- `public/sw.js`
- `public/pwa/icon-192.png`
- `public/pwa/icon-512.png`
- `public/pwa/icon-maskable-512.png`
- `public/pwa/apple-touch-icon.png`

Foi criada a página:

`/instalar/`

No Android, navegadores compatíveis podem exibir o botão de instalação automática.

No iPhone/iPad, a instalação é feita pelo Safari em **Compartilhar → Adicionar à Tela de Início**, conforme exigido pelo iOS.

## 3. Cache e atualização

O Service Worker usa cache para arquivos da própria JeitoLar e estratégia de rede para navegação. O arquivo `sw.js` recebe cabeçalho `no-cache` no Cloudflare Pages para facilitar atualizações do aplicativo.
