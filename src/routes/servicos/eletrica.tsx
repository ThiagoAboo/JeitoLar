import { createFileRoute } from "@tanstack/react-router";
import ServiceGroupPage from "../../pages/ServiceGroupPage";

export const Route = createFileRoute("/servicos/eletrica")({
  head: () => ({
    meta: [
      { title: "Servi\u00e7os El\u00e9tricos Residenciais | JeitoLar" },
      { name: "description", content: "Tomadas, interruptores, lumin\u00e1rias, chuveiros, ventiladores, disjuntores e outros servi\u00e7os el\u00e9tricos leves. Selecione a regi\u00e3o para consultar valores." },
      { property: "og:title", content: "Servi\u00e7os El\u00e9tricos Residenciais | JeitoLar" },
      { property: "og:description", content: "Tomadas, interruptores, lumin\u00e1rias, chuveiros, ventiladores, disjuntores e outros servi\u00e7os el\u00e9tricos leves. Selecione a regi\u00e3o para consultar valores." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://jeitolight-connector.lovable.app/servicos/eletrica" },
    ],
    links: [{ rel: "canonical", href: "https://jeitolight-connector.lovable.app/servicos/eletrica" }],
  }),
  component: () => <ServiceGroupPage groupKey="eletrica" />,
});
