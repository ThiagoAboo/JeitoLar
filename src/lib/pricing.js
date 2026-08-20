import servicos from "../data/orcamento/servicos.json";
import precos from "../data/orcamento/precos.json";
import regioes from "../data/orcamento/regioes.json";
import bairros from "../data/orcamento/bairros.json";
import deslocamento from "../data/orcamento/deslocamento.json";
import pacotes from "../data/orcamento/pacotes.json";
import configuracao from "../data/orcamento/configuracao.json";
import { roundTo } from "./format";

export { servicos, precos, regioes, bairros, deslocamento, pacotes, configuracao };
export const serviceById = Object.fromEntries(servicos.map((s) => [s.id, s]));
export const regionById = Object.fromEntries(regioes.map((r) => [r.id, r]));

export function getBasePrice(serviceId, regionId) { return Number(precos?.[serviceId]?.[regionId] ?? 0); }

export function serviceLineTotal(serviceId, regionId, quantity = 1, selectedExtras = []) {
  const service = serviceById[serviceId];
  if (!service) return { total: 0, unitBase: 0, additionalUnit: 0, extrasTotal: 0 };
  const qty = Math.max(1, Math.min(Number(quantity || 1), Number(service.qtdMax || 1)));
  const unitBase = getBasePrice(serviceId, regionId);
  const additionalUnit = roundTo(unitBase * Number(service.adicionalPercentual ?? 1), configuracao.arredondamentoPrecoAdicional || 5);
  let total = unitBase + Math.max(0, qty - 1) * additionalUnit;
  let extrasTotal = 0;
  for (const extraId of selectedExtras || []) {
    const extra = (service.extras || []).find((item) => item.id === extraId);
    if (!extra) continue;
    const extraValue = Number(extra.valor || 0) * (extra.porUnidade ? qty : 1);
    extrasTotal += extraValue;
  }
  total += extrasTotal;
  return { total, unitBase, additionalUnit, extrasTotal };
}

export function travelFee(regionId, neighborhoodId) {
  const rule = deslocamento.regioes?.[regionId];
  if (!rule) return { fee: 0, method: "confirmar", details: "Deslocamento a confirmar" };
  const kmRoundTrip = Number(rule.distanciaReferenciaKmIda || 0) * (deslocamento.idaEVolta ? 2 : 1);
  const kmCost = kmRoundTrip * Number(deslocamento.valorKm || 0);
  const publicCost = Number(rule.publicoIdaVolta || 0) + Number(rule.custoTempoPublico || 0);
  let raw = 0;
  let method = rule.metodo;
  if (rule.metodo === "km") raw = kmCost;
  else if (rule.metodo === "publico") raw = publicCost;
  else if (rule.metodo === "fixo") raw = Number(rule.taxaFixa || 0);
  else raw = Math.min(...[kmCost, publicCost].filter((v) => v > 0));
  raw = Math.max(raw, Number(rule.taxaMinima || 0));
  const neighborhood = (bairros?.[regionId] || []).find((b) => b.id === neighborhoodId);
  raw += Number(neighborhood?.adicionalDeslocamento || 0);
  const fee = roundTo(raw, deslocamento.arredondamento || 5);
  return { fee, method, kmCost, publicCost, neighborhoodExtra: Number(neighborhood?.adicionalDeslocamento || 0) };
}

export function packageRecommendation(items, regionId) {
  if (!items.length || !regionId) return null;
  let timeMin = 0, timeMax = 0, serviceTotal = 0;
  let hasHeavy = false;
  for (const item of items) {
    const service = serviceById[item.serviceId];
    if (!service) continue;
    const qty = Number(item.quantity || 1);
    timeMin += service.duracaoMin * qty;
    timeMax += service.duracaoMax * qty;
    serviceTotal += serviceLineTotal(item.serviceId, regionId, qty, item.extras).total;
    if (service.pacoteElegivel === false) hasHeavy = true;
  }
  if (hasHeavy) return null;
  const candidates = pacotes.filter((p) => timeMax >= p.minutosMinimos && Number(p.preco) < serviceTotal);
  const best = candidates.sort((a,b) => Number(a.preco) - Number(b.preco))[0];
  if (!best) return null;
  return { ...best, economia: serviceTotal - Number(best.preco), timeMin, timeMax, originalTotal: serviceTotal };
}
