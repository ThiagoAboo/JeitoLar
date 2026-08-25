import { createFileRoute } from "@tanstack/react-router";
import LocationPage from "../pages/LocationPage";

export const Route = createFileRoute("/niteroi")({
  head: () => ({
    meta: [
      { title: "Faz-Tudo em Niter\u00f3i | Reparos e Instala\u00e7\u00f5es | JeitoLar" },
      { name: "description", content: "Faz-tudo em Niter\u00f3i para instala\u00e7\u00f5es, pequenos reparos, montagem de m\u00f3veis e manuten\u00e7\u00e3o residencial. Calcule uma estimativa online." },
      { property: "og:title", content: "Faz-Tudo em Niter\u00f3i | Reparos e Instala\u00e7\u00f5es | JeitoLar" },
      { property: "og:description", content: "Faz-tudo em Niter\u00f3i para instala\u00e7\u00f5es, pequenos reparos, montagem de m\u00f3veis e manuten\u00e7\u00e3o residencial. Calcule uma estimativa online." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://jeitolight-connector.lovable.app/niteroi" },
    ],
    links: [{ rel: "canonical", href: "https://jeitolight-connector.lovable.app/niteroi" }],
  }),
  component: () => <LocationPage locationKey="niteroi" />,
});
