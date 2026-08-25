# Migração para JeitoLar 2.6

Antes de copiar a nova versão, preserve do seu projeto atual:

```text
.env
package-lock.json
public/google1298e2f9fd81c865.html
```

As dependências do projeto não mudaram na 2.6, portanto o `package-lock.json` atual pode ser mantido.

Depois de copiar os arquivos:

```powershell
npm install
npm run check:data
npm run build
npm run dev
```

Teste principalmente:

```text
http://localhost:5173/
http://localhost:5173/orcamento/
http://localhost:5173/servicos/eletrica/
http://localhost:5173/instalar/
```

## Região global

Selecione uma região no cabeçalho e confirme que:

1. a seleção permanece ao trocar de página;
2. os grupos de serviço mostram os valores para essa região;
3. a tela de orçamento abre com a mesma região selecionada;
4. atualizar o navegador mantém a região salva.

## PWA

O comportamento completo de instalação precisa ser testado após publicar em HTTPS no Cloudflare Pages.

No ambiente local, o navegador pode não mostrar o prompt de instalação da mesma forma que em produção.
