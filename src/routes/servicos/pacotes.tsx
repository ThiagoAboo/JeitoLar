import { createFileRoute } from "@tanstack/react-router";
import ServiceGroupPage from "../../pages/ServiceGroupPage";

export const Route = createFileRoute("/servicos/pacotes")({
  head: () => ({
    meta: [
      { title: "Pacotes de 4h e 8h para Faz-Tudo | JeitoLar" },
      { name: "description", content: "Pacotes de 4 e 8 horas de m\u00e3o de obra para reunir pequenos reparos, instala\u00e7\u00f5es, montagens e fixa\u00e7\u00f5es eleg\u00edveis no mesmo atendimento." },
      { property: "og:title", content: "Pacotes de 4h e 8h para Faz-Tudo | JeitoLar" },
      { property: "og:description", content: "Pacotes de 4 e 8 horas de m\u00e3o de obra para reunir pequenos reparos, instala\u00e7\u00f5es, montagens e fixa\u00e7\u00f5es eleg\u00edveis no mesmo atendimento." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://jeitolight-connector.lovable.app/servicos/pacotes" },
    ],
    links: [{ rel: "canonical", href: "https://jeitolight-connector.lovable.app/servicos/pacotes" }],
  }),
  component: () => <ServiceGroupPage groupKey="pacotes" />,
});
