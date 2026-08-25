# JeitoLar 2.5 — ajustes do orçamento

## 1. Quantidade oculta quando o serviço aceita somente 1 unidade

O seletor `- 1 +` agora só aparece quando `qtdMax > 1` no cadastro do serviço.

Serviços com `qtdMax: 1` continuam sendo calculados normalmente com uma unidade, mas o cliente não vê um controle sem utilidade.

## 2. Botão rápido no topo de “Sua estimativa”

Foi adicionado o botão **Enviar orçamento** ao lado do título do resumo.

Ele executa a mesma ação do botão de WhatsApp no fim do cartão.

## 3. Validação guiada

Os dois botões de envio agora validam, nesta ordem:

1. Região
2. Bairro
3. Nome do bairro, quando “Outro” estiver selecionado
4. Pelo menos um serviço
5. Nome do cliente

Quando algo estiver faltando, a página rola suavemente até o primeiro campo pendente e coloca o foco nele. O campo também recebe destaque visual temporário.
