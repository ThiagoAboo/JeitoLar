# JeitoLar

Site institucional React + Vite da JeitoLar.

## 1. Instalar

```powershell
npm install
```

## 2. Configurar o WhatsApp

Copie `.env.example` para `.env`:

```powershell
Copy-Item .env.example .env
```

Abra `.env` e substitua o telefone:

```text
VITE_WHATSAPP_NUMBER=5521999999999
```

Formato: `55 + DDD + número`, somente números.

## 3. Rodar localmente

```powershell
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente:

```text
http://localhost:5173
```

## 4. Gerar versão de produção

```powershell
npm run build
```

Será criada a pasta `dist`.

## 5. Publicar no Cloudflare Pages

Faça login:

```powershell
npx wrangler login
```

Crie o projeto:

```powershell
npx wrangler pages project create jeitolar --production-branch=main
```

Publique:

```powershell
npx wrangler pages deploy dist --project-name=jeitolar
```

O objetivo é obter:

```text
https://jeitolar.pages.dev
```

## Arquivos de marca

- `public/logo-jeitolar.png`
- `public/icone-jeitolar.png`

## Áreas cadastradas inicialmente

- São Gonçalo
- Niterói
- Maricá
- Itaboraí
- Centro do Rio
- Zona Sul do Rio
