import { createFileRoute } from "@tanstack/react-router";
import ServiceGroupPage from "../../pages/ServiceGroupPage";

export const Route = createFileRoute("/servicos/hidraulica")({
  head: () => ({
    meta: [
      { title: "Servi\u00e7os Hidr\u00e1ulicos Residenciais | JeitoLar" },
      { name: "description", content: "Torneiras, sif\u00f5es, duchas, filtros, caixas acopladas, vasos e pequenos desentupimentos. Selecione sua regi\u00e3o para consultar valores." },
      { property: "og:title", content: "Servi\u00e7os Hidr\u00e1ulicos Residenciais | JeitoLar" },
      { property: "og:description", content: "Torneiras, sif\u00f5es, duchas, filtros, caixas acopladas, vasos e pequenos desentupimentos. Selecione sua regi\u00e3o para consultar valores." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://jeitolight-connector.lovable.app/servicos/hidraulica" },
    ],
    links: [{ rel: "canonical", href: "https://jeitolight-connector.lovable.app/servicos/hidraulica" }],
  }),
  component: () => <ServiceGroupPage groupKey="hidraulica" />,
});
