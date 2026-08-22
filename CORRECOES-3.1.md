# JeitoLar 3.1 — Seleção exclusiva entre serviços e pacotes

## Correção

A seleção de serviços avulsos e pacotes de horas agora é mutuamente exclusiva:

- Se houver um ou mais serviços avulsos selecionados e o cliente marcar **Pacote 4 horas** ou **Pacote 8 horas**, todos os serviços avulsos são desmarcados e o pacote escolhido passa a ser a única seleção.
- Se houver um pacote selecionado e o cliente marcar qualquer serviço avulso, o pacote é desmarcado e o serviço passa a ser selecionado.
- Ao trocar de um pacote para outro, apenas o novo pacote permanece selecionado.
- Ao abrir o orçamento diretamente por URL com `?servico=...`, a mesma regra é aplicada: pacote limpa serviços e serviço limpa pacote.

## Itens preservados

- deslocamento calculado separadamente;
- resumo e total da estimativa;
- mensagem enviada pelo WhatsApp;
- quantidade máxima 1 para pacotes;
- demais regras de preço e elegibilidade.
