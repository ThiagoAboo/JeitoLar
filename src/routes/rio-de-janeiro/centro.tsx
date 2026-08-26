import { createFileRoute } from "@tanstack/react-router";
import LocationPage from "../../pages/LocationPage";

export const Route = createFileRoute("/rio-de-janeiro/centro")({
  head: () => ({
    meta: [
      { title: "Faz-Tudo no Centro do Rio | Reparos Residenciais | JeitoLar" },
      { name: "description", content: "Faz-tudo no Centro do Rio para reparos, instala\u00e7\u00f5es e manuten\u00e7\u00e3o em apartamentos e resid\u00eancias. Fa\u00e7a uma estimativa online." },
      { property: "og:title", content: "Faz-Tudo no Centro do Rio | Reparos Residenciais | JeitoLar" },
      { property: "og:description", content: "Faz-tudo no Centro do Rio para reparos, instala\u00e7\u00f5es e manuten\u00e7\u00e3o em apartamentos e resid\u00eancias. Fa\u00e7a uma estimativa online." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://jeitolight-connector.lovable.app/rio-de-janeiro/centro" },
    ],
    links: [{ rel: "canonical", href: "https://jeitolight-connector.lovable.app/rio-de-janeiro/centro" }],
  }),
  component: () => <LocationPage locationKey="centro-rio" />,
});
