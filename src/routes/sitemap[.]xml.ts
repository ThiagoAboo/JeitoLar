import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://jeitolight-connector.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/orcamento", changefreq: "weekly", priority: "0.9" },
  { path: "/servicos/eletrica", changefreq: "monthly", priority: "0.8" },
  { path: "/servicos/hidraulica", changefreq: "monthly", priority: "0.8" },
  { path: "/servicos/instalacoes", changefreq: "monthly", priority: "0.8" },
  { path: "/servicos/montagem", changefreq: "monthly", priority: "0.8" },
  { path: "/servicos/pequenos-reparos", changefreq: "monthly", priority: "0.8" },
  { path: "/servicos/jardim-quintal", changefreq: "monthly", priority: "0.8" },
  { path: "/servicos/piscina", changefreq: "monthly", priority: "0.8" },
  { path: "/servicos/pacotes", changefreq: "monthly", priority: "0.8" },
  { path: "/servicos/instalacao-chuveiro", changefreq: "monthly", priority: "0.7" },
  { path: "/servicos/instalacao-ventilador", changefreq: "monthly", priority: "0.7" },
  { path: "/servicos/prateleiras-cortinas", changefreq: "monthly", priority: "0.7" },
  { path: "/servicos/montagem-moveis", changefreq: "monthly", priority: "0.7" },
  { path: "/servicos/reparos-hidraulicos", changefreq: "monthly", priority: "0.7" },
  { path: "/sao-goncalo", changefreq: "monthly", priority: "0.8" },
  { path: "/niteroi", changefreq: "monthly", priority: "0.8" },
  { path: "/marica", changefreq: "monthly", priority: "0.8" },
  { path: "/itaborai", changefreq: "monthly", priority: "0.8" },
  { path: "/rio-de-janeiro/centro", changefreq: "monthly", priority: "0.8" },
  { path: "/rio-de-janeiro/zona-sul", changefreq: "monthly", priority: "0.8" },
  { path: "/instalar", changefreq: "yearly", priority: "0.3" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
