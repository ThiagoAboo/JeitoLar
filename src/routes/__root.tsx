import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import jeitolarCss from "../jeitolar.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { RegionProvider } from "../context/RegionContext";
import SiteLayout from "../components/SiteLayout";
import NotFoundPage from "../pages/NotFoundPage";

const SITE_URL = "https://jeitolight-connector.lovable.app";


function NotFoundComponent() {
  return <NotFoundPage />;
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "JeitoLar | Faz-Tudo, Reparos e Instalações Residenciais" },
      {
        name: "description",
        content:
          "Faz-tudo para reparos, instalações, montagem, jardim e piscina em São Gonçalo, Niterói, Maricá, Itaboraí e Rio de Janeiro.",
      },
      { name: "author", content: "JeitoLar" },
      {
        property: "og:title",
        content: "JeitoLar | Faz-Tudo, Reparos e Instalações Residenciais",
      },
      {
        property: "og:description",
        content:
          "Faz-tudo para reparos, instalações, montagem, jardim e piscina em São Gonçalo, Niterói, Maricá, Itaboraí e Rio de Janeiro.",
      },
      { property: "og:site_name", content: "JeitoLar" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: jeitolarCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": ["Organization", "LocalBusiness", "HomeAndConstructionBusiness"],
              "@id": `${SITE_URL}/#organization`,
              name: "JeitoLar",
              slogan: "Sua casa, do jeito certo.",
              url: `${SITE_URL}/`,
              logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/pwa/icon-512.png`,
                width: 512,
                height: 512,
              },
              image: `${SITE_URL}/pwa/icon-512.png`,
              email: "jeitolar@gmail.com",
              description:
                "Faz-tudo para reparos, instalações, montagem de móveis, jardim, quintal e cuidados de piscina em residências.",
              priceRange: "$$",
              areaServed: [
                "São Gonçalo",
                "Niterói",
                "Maricá",
                "Itaboraí",
                "Rio de Janeiro",
              ].map((name) => ({ "@type": "AdministrativeArea", name })),
              address: {
                "@type": "PostalAddress",
                addressRegion: "RJ",
                addressCountry: "BR",
              },
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: `${SITE_URL}/`,
              name: "JeitoLar",
              inLanguage: "pt-BR",
              description:
                "Reparos, instalações, montagem, jardim e piscina com estimativa online e pedido pelo WhatsApp.",
              publisher: { "@id": `${SITE_URL}/#organization` },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${SITE_URL}/orcamento?servico={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <RegionProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <SiteLayout />
      </RegionProvider>
    </QueryClientProvider>
  );
}
