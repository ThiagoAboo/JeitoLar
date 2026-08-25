import { createFileRoute } from "@tanstack/react-router";
import QuotePage from "../pages/QuotePage";

const title = "Orçamento Online | JeitoLar";
const description =
  "Monte uma estimativa de serviços residenciais, deslocamento e quantidades e envie o pedido completo pelo WhatsApp.";

export const Route = createFileRoute("/orcamento")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://jeitolight-connector.lovable.app/orcamento" },
    ],
    links: [{ rel: "canonical", href: "https://jeitolight-connector.lovable.app/orcamento" }],
  }),
  component: QuotePage,
});
