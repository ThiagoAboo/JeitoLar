import { createFileRoute } from "@tanstack/react-router";
import LocationPage from "../pages/LocationPage";

export const Route = createFileRoute("/itaborai")({
  head: () => ({
    meta: [
      { title: "Faz-Tudo em Itabora\u00ed | Reparos e Manuten\u00e7\u00e3o | JeitoLar" },
      { name: "description", content: "Faz-tudo em Itabora\u00ed para reparos residenciais, instala\u00e7\u00f5es, montagem de m\u00f3veis e manuten\u00e7\u00e3o. Consulte uma estimativa no site." },
      { property: "og:title", content: "Faz-Tudo em Itabora\u00ed | Reparos e Manuten\u00e7\u00e3o | JeitoLar" },
      { property: "og:description", content: "Faz-tudo em Itabora\u00ed para reparos residenciais, instala\u00e7\u00f5es, montagem de m\u00f3veis e manuten\u00e7\u00e3o. Consulte uma estimativa no site." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://jeitolight-connector.lovable.app/itaborai" },
    ],
    links: [{ rel: "canonical", href: "https://jeitolight-connector.lovable.app/itaborai" }],
  }),
  component: () => <LocationPage locationKey="itaborai" />,
});
