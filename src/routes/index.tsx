import { createFileRoute } from "@tanstack/react-router";
import HomePage from "../pages/HomePage";

const title = "JeitoLar | Faz-Tudo, Reparos e Instalações Residenciais";
const description =
  "Reparos, instalações, montagem, jardim e piscina com estimativa online. Monte sua lista de serviços e envie o pedido completo pelo WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://jeitolight-connector.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://jeitolight-connector.lovable.app/" }],
  }),
  component: HomePage,
});
