# Migração rápida

## Preserve
- `.env`
- `public/google1298e2f9fd81c865.html`
- `.github/workflows/deploy.yml` (se já estiver funcionando)

Este pacote não inclui `.github/workflows/deploy.yml` para não sobrescrever sua automação atual.

## Copie/mescle
- `src/`
- `scripts/`
- `public/` (sem apagar seu arquivo Google)
- `index.html`
- `package.json`
- `vite.config.js`
- `eslint.config.js`
- `.gitignore`
- `.env.example`

## Depois
```powershell
npm install
npm run build
npm run dev
```
