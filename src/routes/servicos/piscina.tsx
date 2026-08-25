import { createFileRoute } from "@tanstack/react-router";
import ServiceGroupPage from "../../pages/ServiceGroupPage";

export const Route = createFileRoute("/servicos/piscina")({
  head: () => ({
    meta: [
      { title: "Limpeza e Manuten\u00e7\u00e3o B\u00e1sica de Piscina | JeitoLar" },
      { name: "description", content: "Limpeza, aspira\u00e7\u00e3o, filtro e medi\u00e7\u00e3o b\u00e1sica de pH e cloro. Selecione a regi\u00e3o para consultar valores." },
      { property: "og:title", content: "Limpeza e Manuten\u00e7\u00e3o B\u00e1sica de Piscina | JeitoLar" },
      { property: "og:description", content: "Limpeza, aspira\u00e7\u00e3o, filtro e medi\u00e7\u00e3o b\u00e1sica de pH e cloro. Selecione a regi\u00e3o para consultar valores." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://jeitolight-connector.lovable.app/servicos/piscina" },
    ],
    links: [{ rel: "canonical", href: "https://jeitolight-connector.lovable.app/servicos/piscina" }],
  }),
  component: () => <ServiceGroupPage groupKey="piscina" />,
});
