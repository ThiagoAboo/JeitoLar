import { createFileRoute } from "@tanstack/react-router";
import ServiceGroupPage from "../../pages/ServiceGroupPage";

export const Route = createFileRoute("/servicos/instalacoes")({
  head: () => ({
    meta: [
      { title: "Instala\u00e7\u00f5es Residenciais | JeitoLar" },
      { name: "description", content: "TV, prateleiras, cortinas, quadros, acess\u00f3rios, varais, eletrodom\u00e9sticos e suportes. Consulte os valores ap\u00f3s selecionar a regi\u00e3o." },
      { property: "og:title", content: "Instala\u00e7\u00f5es Residenciais | JeitoLar" },
      { property: "og:description", content: "TV, prateleiras, cortinas, quadros, acess\u00f3rios, varais, eletrodom\u00e9sticos e suportes. Consulte os valores ap\u00f3s selecionar a regi\u00e3o." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://jeitolight-connector.lovable.app/servicos/instalacoes" },
    ],
    links: [{ rel: "canonical", href: "https://jeitolight-connector.lovable.app/servicos/instalacoes" }],
  }),
  component: () => <ServiceGroupPage groupKey="instalacoes" />,
});
