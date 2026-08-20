import { useEffect } from "react";

const SITE = "https://jeitolar.pages.dev";

function ensureMeta(selector, attrs) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

export default function SEO({
  title,
  description,
  path = "/",
  schema = null,
}) {
  useEffect(() => {
    const canonicalUrl = new URL(path, SITE).toString();

    document.title = title;

    ensureMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });

    ensureMeta('meta[property="og:title"]', {
      property: "og:title",
      content: title,
    });

    ensureMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });

    ensureMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });

    ensureMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: title,
    });

    ensureMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    const oldSchema = document.getElementById("dynamic-route-schema");
    if (oldSchema) oldSchema.remove();

    if (schema) {
      const script = document.createElement("script");
      script.id = "dynamic-route-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      const dynamicSchema = document.getElementById("dynamic-route-schema");
      if (dynamicSchema) dynamicSchema.remove();
    };
  }, [title, description, path, schema]);

  return null;
}
