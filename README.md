# JeitoLar — SEO local por região

Este pacote contém a versão completa do site com páginas locais para:

- São Gonçalo
- Niterói
- Maricá
- Itaboraí
- Centro do Rio de Janeiro
- Zona Sul do Rio de Janeiro

## URLs

- `/`
- `/sao-goncalo/`
- `/niteroi/`
- `/marica/`
- `/itaborai/`
- `/rio-de-janeiro/centro/`
- `/rio-de-janeiro/zona-sul/`

## Importante antes de substituir o projeto atual

Preserve estes arquivos do seu projeto existente:

1. `.env`
2. `public/google1298e2f9fd81c865.html`

O arquivo de verificação do Google não está neste ZIP porque o conteúdo precisa ser exatamente o arquivo fornecido pelo Search Console.

## Como instalar sobre o projeto atual

Faça um backup ou commit primeiro:

```powershell
git add .
git commit -m "chore: backup antes das paginas locais"
git push
```

Depois extraia este ZIP em uma pasta temporária e copie os arquivos para:

```text
D:\Projetos\JeitoLar
```

Pode sobrescrever os arquivos do projeto, mas mantenha o `.env` e o arquivo `public/google1298e2f9fd81c865.html`.

Depois:

```powershell
npm install
npm run dev
```

Teste as rotas:

```text
http://localhost:5173/
http://localhost:5173/sao-goncalo/
http://localhost:5173/niteroi/
http://localhost:5173/marica/
http://localhost:5173/itaborai/
http://localhost:5173/rio-de-janeiro/centro/
http://localhost:5173/rio-de-janeiro/zona-sul/
```

## Build SEO

O comando:

```powershell
npm run build
```

faz duas coisas:

1. Executa o build do Vite.
2. Gera arquivos HTML físicos em `dist` para cada rota local, cada um com:
   - title próprio;
   - meta description própria;
   - canonical próprio;
   - Open Graph próprio;
   - Twitter metadata;
   - JSON-LD de Service por área;
   - sitemap.xml atualizado.

Isso melhora a resposta inicial das páginas para robôs de busca sem depender apenas da execução do JavaScript.

## Verificação Google Search Console

Mantenha:

```text
public/google1298e2f9fd81c865.html
```

Depois de `npm run build`, confira:

```powershell
Test-Path .\dist\google1298e2f9fd81c865.html
```

Deve retornar:

```text
True
```

## Publicação

Como o GitHub Actions já está configurado, depois dos testes:

```powershell
git add .
git commit -m "feat: adiciona paginas locais e SEO regional"
git push
```

O deploy do Cloudflare Pages será disparado automaticamente.

## Search Console depois do deploy

Envie novamente:

```text
https://jeitolar.pages.dev/sitemap.xml
```

E solicite indexação para:

```text
https://jeitolar.pages.dev/
https://jeitolar.pages.dev/sao-goncalo/
https://jeitolar.pages.dev/niteroi/
https://jeitolar.pages.dev/marica/
https://jeitolar.pages.dev/itaborai/
https://jeitolar.pages.dev/rio-de-janeiro/centro/
https://jeitolar.pages.dev/rio-de-janeiro/zona-sul/
```

## Conteúdo local

Os textos não são simples cópias com o nome da cidade trocado. Cada página possui introdução, observação de atendimento e lista de bairros/regiões de referência próprias.

Antes de divulgar intensamente, revise os bairros listados e remova qualquer área em que você não queira atender.
