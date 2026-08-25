import { createFileRoute } from "@tanstack/react-router";
import LocationPage from "../pages/LocationPage";

export const Route = createFileRoute("/sao-goncalo")({
  head: () => ({
    meta: [
      { title: "Faz-Tudo em S\u00e3o Gon\u00e7alo | Reparos Residenciais | JeitoLar" },
      { name: "description", content: "Faz-tudo em S\u00e3o Gon\u00e7alo para pequenos reparos, instala\u00e7\u00f5es, montagem e manuten\u00e7\u00e3o residencial. Monte sua estimativa online com a JeitoLar." },
      { property: "og:title", content: "Faz-Tudo em S\u00e3o Gon\u00e7alo | Reparos Residenciais | JeitoLar" },
      { property: "og:description", content: "Faz-tudo em S\u00e3o Gon\u00e7alo para pequenos reparos, instala\u00e7\u00f5es, montagem e manuten\u00e7\u00e3o residencial. Monte sua estimativa online com a JeitoLar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://jeitolight-connector.lovable.app/sao-goncalo" },
    ],
    links: [{ rel: "canonical", href: "https://jeitolight-connector.lovable.app/sao-goncalo" }],
  }),
  component: () => <LocationPage locationKey="sao-goncalo" />,
});
