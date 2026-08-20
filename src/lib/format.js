export function brl(value) { return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value || 0)); }
export function roundTo(value, step = 5) { return Math.round(Number(value || 0) / step) * step; }
export function durationLabel(min, max) {
  const fmt = (m) => m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}min` : ""}` : `${m}min`;
  if (!max || min === max) return fmt(min);
  return `${fmt(min)} a ${fmt(max)}`;
}
