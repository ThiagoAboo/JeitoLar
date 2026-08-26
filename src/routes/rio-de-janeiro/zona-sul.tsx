import { createFileRoute } from "@tanstack/react-router";
import LocationPage from "../../pages/LocationPage";

export const Route = createFileRoute("/rio-de-janeiro/zona-sul")({
  head: () => ({
    meta: [
      { title: "Faz-Tudo na Zona Sul do Rio | JeitoLar" },
      { name: "description", content: "Faz-tudo na Zona Sul do Rio para reparos, instala\u00e7\u00f5es, montagem e manuten\u00e7\u00e3o residencial. Consulte sua estimativa online." },
      { property: "og:title", content: "Faz-Tudo na Zona Sul do Rio | JeitoLar" },
      { property: "og:description", content: "Faz-tudo na Zona Sul do Rio para reparos, instala\u00e7\u00f5es, montagem e manuten\u00e7\u00e3o residencial. Consulte sua estimativa online." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://jeitolight-connector.lovable.app/rio-de-janeiro/zona-sul" },
    ],
    links: [{ rel: "canonical", href: "https://jeitolight-connector.lovable.app/rio-de-janeiro/zona-sul" }],
  }),
  component: () => <LocationPage locationKey="zona-sul-rio" />,
});
