export const serviceGroups = {
  eletrica: {
    path: "/servicos/eletrica/", nome: "Elétrica", eyebrow: "Serviços elétricos residenciais",
    title: "Serviços Elétricos Residenciais | JeitoLar",
    description: "Tomadas, interruptores, luminárias, chuveiros, ventiladores, disjuntores e outros serviços elétricos leves. Selecione a região para consultar valores.",
    heading: "Elétrica residencial",
    resumo: "Trocas e instalações leves em pontos existentes: tomadas, interruptores, luminárias, chuveiros, ventiladores, disjuntores, sensores e refletores.",
    serviceIds: ["tomada-interruptor","luminaria","lampada-plafon","chuveiro","resistencia-chuveiro","ventilador","disjuntor","campainha","sensor-presenca","refletor"]
  },
  hidraulica: {
    path: "/servicos/hidraulica/", nome: "Hidráulica", eyebrow: "Pequenos serviços hidráulicos",
    title: "Serviços Hidráulicos Residenciais | JeitoLar",
    description: "Torneiras, sifões, duchas, filtros, caixas acopladas, vasos e pequenos desentupimentos. Selecione sua região para consultar valores.",
    heading: "Hidráulica residencial",
    resumo: "Pequenas instalações e reparos em pontos hidráulicos acessíveis, sem obras pesadas ou quebra de paredes.",
    serviceIds: ["torneira-vazamento","sifao","ducha-higienica","filtro-purificador","caixa-acoplada","vaso-sanitario","assento-sanitario","desentupimento-simples","acabamento-registro"]
  },
  instalacoes: {
    path: "/servicos/instalacoes/", nome: "Instalações", eyebrow: "Instalações para a casa",
    title: "Instalações Residenciais | JeitoLar",
    description: "TV, prateleiras, cortinas, quadros, acessórios, varais, eletrodomésticos e suportes. Consulte os valores após selecionar a região.",
    heading: "Instalações residenciais",
    resumo: "Fixação e instalação de itens do dia a dia: suportes, prateleiras, cortinas, quadros, acessórios, varais e eletrodomésticos.",
    serviceIds: ["suporte-tv","prateleira","cortina-persiana","quadro-espelho","acessorios-banheiro","varal-teto","maquina-lavar","coifa-depurador","suporte-microondas","soundbar","armario-parede"]
  },
  montagem: {
    path: "/servicos/montagem/", nome: "Montagem", eyebrow: "Montagem de móveis",
    title: "Montagem de Móveis Residenciais | JeitoLar",
    description: "Montagem e desmontagem de móveis pequenos, mesas, racks, cômodas, camas, armários e guarda-roupas. Selecione a região para consultar valores.",
    heading: "Montagem de móveis",
    resumo: "Montagem de móveis residenciais de pequeno e médio porte, com valores por tipo e complexidade.",
    serviceIds: ["movel-pequeno","comoda-rack","guarda-roupa-medio","mesa-escrivaninha","beliche","desmontar-guarda-roupa","cama","armario-pequeno"]
  },
  "pequenos-reparos": {
    path: "/servicos/pequenos-reparos/", nome: "Pequenos reparos", eyebrow: "Manutenção do dia a dia",
    title: "Pequenos Reparos Residenciais | JeitoLar",
    description: "Visita para reparos simples, fechaduras, maçanetas, dobradiças, ajustes de porta e vedações. Selecione a região para consultar valores.",
    heading: "Pequenos reparos residenciais",
    resumo: "Ajustes práticos do dia a dia para resolver pequenas pendências da casa sem contratar uma obra.",
    serviceIds: ["visita-reparo-simples","fechadura","macaneta-dobradica","ajuste-porta","vedacao-silicone"]
  },
  "jardim-quintal": {
    path: "/servicos/jardim-quintal/", nome: "Jardim e quintal", eyebrow: "Área externa e jardinagem leve",
    title: "Jardinagem e Limpeza de Quintal | JeitoLar",
    description: "Roçagem, capina, limpeza de quintal, jardinagem básica, plantio e pequenas podas. Selecione a região para consultar valores.",
    heading: "Jardim, quintal e área externa",
    resumo: "Roçagem com roçadeira, capina, limpeza, plantio, transplante e podas leves de plantas e galhos baixos.",
    serviceIds: ["rocagem-quintal","capina-quintal","manutencao-jardim","plantio-muda","transplante-vaso","poda-planta-arbusto","poda-arvore-pequena","limpeza-quintal","folhas-residuos"]
  },
  piscina: {
    path: "/servicos/piscina/", nome: "Piscina", eyebrow: "Limpeza e cuidados básicos",
    title: "Limpeza e Manutenção Básica de Piscina | JeitoLar",
    description: "Limpeza, aspiração, filtro e medição básica de pH e cloro. Selecione a região para consultar valores.",
    heading: "Limpeza e cuidados básicos de piscina",
    resumo: "Limpeza básica, aspiração, cestos/filtro e medição da água em piscinas residenciais, com produtos fornecidos pelo cliente.",
    serviceIds: ["limpeza-piscina","aspiracao-piscina","limpeza-filtro-piscina","tratamento-agua-piscina"]
  },
  pacotes: {
    path: "/servicos/pacotes/", nome: "Pacotes", eyebrow: "Pacotes por período",
    title: "Pacotes de 4h e 8h para Faz-Tudo | JeitoLar",
    description: "Pacotes de 4 e 8 horas de mão de obra para reunir pequenos reparos, instalações, montagens e fixações elegíveis no mesmo atendimento.",
    heading: "Pacotes de diária",
    resumo: "Escolha 4 ou 8 horas de mão de obra para concentrar vários pequenos serviços elegíveis em uma única visita.",
    serviceIds: ["pacote-4h","pacote-8h"]
  },

};

export const serviceGroupList = Object.entries(serviceGroups).map(([id, group]) => ({ id, ...group }));
