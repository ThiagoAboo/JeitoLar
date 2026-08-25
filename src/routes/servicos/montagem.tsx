import { createFileRoute } from "@tanstack/react-router";
import ServiceGroupPage from "../../pages/ServiceGroupPage";

export const Route = createFileRoute("/servicos/montagem")({
  head: () => ({
    meta: [
      { title: "Montagem de M\u00f3veis Residenciais | JeitoLar" },
      { name: "description", content: "Montagem e desmontagem de m\u00f3veis pequenos, mesas, racks, c\u00f4modas, camas, arm\u00e1rios e guarda-roupas. Selecione a regi\u00e3o para consultar valores." },
      { property: "og:title", content: "Montagem de M\u00f3veis Residenciais | JeitoLar" },
      { property: "og:description", content: "Montagem e desmontagem de m\u00f3veis pequenos, mesas, racks, c\u00f4modas, camas, arm\u00e1rios e guarda-roupas. Selecione a regi\u00e3o para consultar valores." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://jeitolight-connector.lovable.app/servicos/montagem" },
    ],
    links: [{ rel: "canonical", href: "https://jeitolight-connector.lovable.app/servicos/montagem" }],
  }),
  component: () => <ServiceGroupPage groupKey="montagem" />,
});
