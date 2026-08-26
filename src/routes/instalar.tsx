import { createFileRoute } from "@tanstack/react-router";
import InstallPage from "../pages/InstallPage";

const title = "Instalar JeitoLar no celular | JeitoLar";
const description =
  "Instale o site da JeitoLar como aplicativo no Android ou iPhone para acessar orçamento e serviços diretamente da tela inicial.";

export const Route = createFileRoute("/instalar")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://jeitolight-connector.lovable.app/instalar" },
    ],
    links: [{ rel: "canonical", href: "https://jeitolight-connector.lovable.app/instalar" }],
  }),
  component: InstallPage,
});
