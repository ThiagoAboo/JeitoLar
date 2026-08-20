import fs from "node:fs";
import path from "node:path";

const SITE = "https://jeitolar.pages.dev";

const pages = [
  {
    route: "/",
    title: "JeitoLar | Faz-Tudo e Reparos Residenciais no Grande Rio",
    description:
      "JeitoLar oferece faz-tudo, reparos, instalações e manutenção residencial em São Gonçalo, Niterói, Maricá, Itaboraí, Centro e Zona Sul do Rio."
  },
  {
    route: "/sao-goncalo/",
    title: "Faz-Tudo em São Gonçalo | Reparos Residenciais | JeitoLar",
    description:
      "Faz-tudo em São Gonçalo para pequenos reparos, instalações, montagem e manutenção residencial. Solicite orçamento com a JeitoLar pelo WhatsApp.",
    area: "São Gonçalo"
  },
  {
    route: "/niteroi/",
    title: "Faz-Tudo em Niterói | Reparos e Instalações | JeitoLar",
    description:
      "Faz-tudo em Niterói para instalações, pequenos reparos, montagem de móveis e manutenção residencial. Peça um orçamento à JeitoLar.",
    area: "Niterói"
  },
  {
    route: "/marica/",
    title: "Faz-Tudo em Maricá | Manutenção Residencial | JeitoLar",
    description:
      "Serviço de faz-tudo em Maricá para reparos, instalações, montagem, elétrica e hidráulica leve. Consulte a JeitoLar e solicite orçamento.",
    area: "Maricá"
  },
  {
    route: "/itaborai/",
    title: "Faz-Tudo em Itaboraí | Reparos e Manutenção | JeitoLar",
    description:
      "Faz-tudo em Itaboraí para reparos residenciais, instalações, montagem de móveis e manutenção. Solicite orçamento pelo WhatsApp.",
    area: "Itaboraí"
  },
  {
    route: "/rio-de-janeiro/centro/",
    title: "Faz-Tudo no Centro do Rio | Reparos Residenciais | JeitoLar",
    description:
      "Faz-tudo no Centro do Rio para reparos, instalações e manutenção em apartamentos e residências. Atendimento JeitoLar mediante agendamento.",
    area: "Centro do Rio de Janeiro"
  },
  {
    route: "/rio-de-janeiro/zona-sul/",
    title: "Faz-Tudo na Zona Sul do Rio | JeitoLar",
    description:
      "Faz-tudo na Zona Sul do Rio para reparos, instalações, montagem e manutenção residencial. Solicite orçamento com a JeitoLar.",
    area: "Zona Sul do Rio de Janeiro"
  }
];

const dist = path.resolve("dist");
const sourceHtml = fs.readFileSync(path.join(dist, "index.html"), "utf8");

function escapeJsonForHtml(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function routeSchema(page) {
  if (!page.area) return "";

  const telephoneRaw = process.env.VITE_WHATSAPP_NUMBER || "";
  const telephone = telephoneRaw ? `+${telephoneRaw}` : undefined;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Serviços de faz-tudo em ${page.area}`,
    "serviceType": [
      "Faz-tudo",
      "Reparos residenciais",
      "Instalações residenciais",
      "Manutenção residencial",
      "Montagem de móveis"
    ],
    "provider": {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      "name": "JeitoLar",
      "url": `${SITE}/`,
      "email": "jeitolar@gmail.com",
      ...(telephone ? { "telephone": telephone } : {})
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": page.area
    },
    "url": new URL(page.route, SITE).toString()
  };

  return `<script id="route-static-schema" type="application/ld+json">${escapeJsonForHtml(schema)}</script>`;
}

function applyMeta(html, page) {
  const canonical = new URL(page.route, SITE).toString();

  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${page.description.replaceAll('"', "&quot;")}" />`
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${canonical}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${page.title.replaceAll('"', "&quot;")}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${page.description.replaceAll('"', "&quot;")}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:url" content="${canonical}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" content="${page.title.replaceAll('"', "&quot;")}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${page.description.replaceAll('"', "&quot;")}" />`
    )
    .replace("<!-- ROUTE_SCHEMA -->", routeSchema(page));
}

for (const page of pages) {
  const html = applyMeta(sourceHtml, page);

  if (page.route === "/") {
    fs.writeFileSync(path.join(dist, "index.html"), html);
    continue;
  }

  const directory = path.join(dist, page.route);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, "index.html"), html);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url>
    <loc>${new URL(page.route, SITE).toString()}</loc>
    <changefreq>weekly</changefreq>
  </url>`).join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);

console.log(`Generated ${pages.length} SEO pages and sitemap.xml`);
