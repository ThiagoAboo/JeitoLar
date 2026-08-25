/**
 * Injeta JSON-LD estruturado para a rota atual.
 * Renderizado no HTML (inclusive no SSR), então crawlers leem sem executar JS.
 * Aceita `schema` ou `data` como prop.
 */
export default function JsonLd({ schema, data }) {
  const payload = schema ?? data;
  if (!payload) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
