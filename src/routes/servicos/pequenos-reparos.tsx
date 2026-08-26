import { createFileRoute } from "@tanstack/react-router";
import ServiceGroupPage from "../../pages/ServiceGroupPage";

export const Route = createFileRoute("/servicos/pequenos-reparos")({
  head: () => ({
    meta: [
      { title: "Pequenos Reparos Residenciais | JeitoLar" },
      { name: "description", content: "Visita para reparos simples, fechaduras, ma\u00e7anetas, dobradi\u00e7as, ajustes de porta e veda\u00e7\u00f5es. Selecione a regi\u00e3o para consultar valores." },
      { property: "og:title", content: "Pequenos Reparos Residenciais | JeitoLar" },
      { property: "og:description", content: "Visita para reparos simples, fechaduras, ma\u00e7anetas, dobradi\u00e7as, ajustes de porta e veda\u00e7\u00f5es. Selecione a regi\u00e3o para consultar valores." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://jeitolight-connector.lovable.app/servicos/pequenos-reparos" },
    ],
    links: [{ rel: "canonical", href: "https://jeitolight-connector.lovable.app/servicos/pequenos-reparos" }],
  }),
  component: () => <ServiceGroupPage groupKey="pequenos-reparos" />,
});
