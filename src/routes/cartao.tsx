import { createFileRoute } from "@tanstack/react-router";
import BusinessCardPage from "../pages/BusinessCardPage";

const title = "Cartão de visita JeitoLar";
const description = "Cartão de visita da JeitoLar para impressão ou salvamento no celular.";

export const Route = createFileRoute("/cartao")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://jeitolight-connector.lovable.app/cartao" },
    ],
    links: [{ rel: "canonical", href: "https://jeitolight-connector.lovable.app/cartao" }],
  }),
  component: BusinessCardPage,
});
