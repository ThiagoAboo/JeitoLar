import { createFileRoute } from "@tanstack/react-router";
import LocationPage from "../pages/LocationPage";

export const Route = createFileRoute("/marica")({
  head: () => ({
    meta: [
      { title: "Faz-Tudo em Maric\u00e1 | Manuten\u00e7\u00e3o Residencial | JeitoLar" },
      { name: "description", content: "Servi\u00e7o de faz-tudo em Maric\u00e1 para reparos, instala\u00e7\u00f5es, montagem, el\u00e9trica e hidr\u00e1ulica leve. Monte seu or\u00e7amento estimado." },
      { property: "og:title", content: "Faz-Tudo em Maric\u00e1 | Manuten\u00e7\u00e3o Residencial | JeitoLar" },
      { property: "og:description", content: "Servi\u00e7o de faz-tudo em Maric\u00e1 para reparos, instala\u00e7\u00f5es, montagem, el\u00e9trica e hidr\u00e1ulica leve. Monte seu or\u00e7amento estimado." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://jeitolight-connector.lovable.app/marica" },
    ],
    links: [{ rel: "canonical", href: "https://jeitolight-connector.lovable.app/marica" }],
  }),
  component: () => <LocationPage locationKey="marica" />,
});
