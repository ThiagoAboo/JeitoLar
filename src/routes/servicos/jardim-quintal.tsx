import { createFileRoute } from "@tanstack/react-router";
import ServiceGroupPage from "../../pages/ServiceGroupPage";

export const Route = createFileRoute("/servicos/jardim-quintal")({
  head: () => ({
    meta: [
      { title: "Jardinagem e Limpeza de Quintal | JeitoLar" },
      { name: "description", content: "Ro\u00e7agem, capina, limpeza de quintal, jardinagem b\u00e1sica, plantio e pequenas podas. Selecione a regi\u00e3o para consultar valores." },
      { property: "og:title", content: "Jardinagem e Limpeza de Quintal | JeitoLar" },
      { property: "og:description", content: "Ro\u00e7agem, capina, limpeza de quintal, jardinagem b\u00e1sica, plantio e pequenas podas. Selecione a regi\u00e3o para consultar valores." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://jeitolight-connector.lovable.app/servicos/jardim-quintal" },
    ],
    links: [{ rel: "canonical", href: "https://jeitolight-connector.lovable.app/servicos/jardim-quintal" }],
  }),
  component: () => <ServiceGroupPage groupKey="jardim-quintal" />,
});
