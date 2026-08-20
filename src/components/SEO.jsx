import { useEffect } from "react";
const SITE = "https://jeitolar.pages.dev";
function ensureMeta(selector, attrs) { let el = document.head.querySelector(selector); if (!el) { el = document.createElement("meta"); document.head.appendChild(el); } Object.entries(attrs).forEach(([k,v]) => el.setAttribute(k,v)); }
export default function SEO({ title, description, path = "/", schema = null, noindex = false }) {
  useEffect(() => {
    const url = new URL(path, SITE).toString(); document.title = title;
    ensureMeta('meta[name="description"]', { name:"description", content:description });
    ensureMeta('meta[name="robots"]', { name:"robots", content:noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large" });
    ensureMeta('meta[property="og:title"]', { property:"og:title", content:title });
    ensureMeta('meta[property="og:description"]', { property:"og:description", content:description });
    ensureMeta('meta[property="og:url"]', { property:"og:url", content:url });
    let canonical = document.head.querySelector('link[rel="canonical"]'); if (!canonical) { canonical=document.createElement("link"); canonical.rel="canonical"; document.head.appendChild(canonical); } canonical.href=url;
    document.getElementById("dynamic-route-schema")?.remove();
    if (schema) { const s=document.createElement("script"); s.id="dynamic-route-schema"; s.type="application/ld+json"; s.textContent=JSON.stringify(schema); document.head.appendChild(s); }
    return () => document.getElementById("dynamic-route-schema")?.remove();
  }, [title, description, path, schema, noindex]);
  return null;
}
