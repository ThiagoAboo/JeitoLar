import { useEffect, useMemo, useRef, useState } from "react";
import { brl, durationLabel } from "../lib/format";
import {
  bairros,
  configuracao,
  pacotes,
  regioes,
  serviceById,
  servicos,
  serviceLineTotal,
  travelFee,
  packageRecommendation,
  getBasePrice,
  serviceLineDuration,
} from "../lib/pricing";
import { buildWhatsAppUrl } from "../lib/whatsapp";
import { useQueryParams } from "../lib/useQueryParams";
import { useRegion } from "../context/RegionContext";

const groupedServices = servicos.reduce((acc, s) => {
  (acc[s.categoria] ||= []).push(s);
  return acc;
}, {});

export default function QuoteBuilder() {
  const searchParams = useQueryParams();
  const servicoParam = searchParams.get("servico");
  const { regionId, setRegionId } = useRegion();
  const [neighborhoodId, setNeighborhoodId] = useState("");
  const [neighborhoodOther, setNeighborhoodOther] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [packageOverride, setPackageOverride] = useState(null);
  const [showAllSummary, setShowAllSummary] = useState(false);
  const [openGroups, setOpenGroups] = useState({});
  const [validationField, setValidationField] = useState("");

  const regionRef = useRef(null);
  const neighborhoodRef = useRef(null);
  const neighborhoodOtherRef = useRef(null);
  const servicesStepRef = useRef(null);
  const serviceSearchRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    if (servicoParam && serviceById[servicoParam]) {
      const service = serviceById[servicoParam];
      if (service.tipo === "pacote") {
        setItems([]);
        setPackageOverride(service.pacoteId);
      } else {
        setPackageOverride(null);
        setItems((prev) =>
          prev.some((i) => i.serviceId === servicoParam)
            ? prev
            : [...prev, { serviceId: servicoParam, quantity: 1, extras: [] }],
        );
      }
      setOpenGroups((prev) => ({ ...prev, [service.categoria]: true }));
    }
  }, [servicoParam]);

  useEffect(() => {
    setNeighborhoodId("");
    setNeighborhoodOther("");
  }, [regionId]);

  useEffect(() => { setNeighborhoodId(""); setNeighborhoodOther(""); setPackageOverride(null); }, [regionId]);
  useEffect(() => {
    if (!packageOverride) return;
    const hasIneligibleService = items.some(
      (item) => serviceById[item.serviceId]?.pacoteElegivel === false,
    );
    if (hasIneligibleService) setPackageOverride(null);
  }, [items, packageOverride]);

  const region = regioes.find((r) => r.id === regionId);
  const neighborhoods = bairros[regionId] || [];

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groupedServices;
    const out = {};
    for (const [cat, list] of Object.entries(groupedServices)) {
      const filtered = list.filter((s) =>
        `${s.nome} ${s.descricao} ${s.categoria}`.toLowerCase().includes(q),
      );
      if (filtered.length) out[cat] = filtered;
    }
    return out;
  }, [query]);

  const details = useMemo(
    () =>
      items.map((item) => {
        const service = serviceById[item.serviceId];
        const price = regionId
          ? serviceLineTotal(item.serviceId, regionId, item.quantity, item.extras)
          : { total: 0, unitBase: 0, additionalUnit: 0, extrasTotal: 0 };
        return { ...item, service, price };
      }),
    [items, regionId],
  );

  const servicesTotal = details.reduce((sum, item) => sum + item.price.total, 0);
  const travel = regionId ? travelFee(regionId, neighborhoodId) : { fee: 0 };
  const timeMin = details.reduce(
    (sum, item) => sum + serviceLineDuration(item.serviceId, item.quantity, item.extras).min,
    0,
  );
  const timeMax = details.reduce(
    (sum, item) => sum + serviceLineDuration(item.serviceId, item.quantity, item.extras).max,
    0,
  );
  const recommendation = packageRecommendation(items, regionId);
  const packageSelected = pacotes.find((p) => p.id === packageOverride);
  const billedServices = packageSelected ? Number(packageSelected.preco) : servicesTotal;
  const total = billedServices + travel.fee;
  const selectionCount = items.length + (packageSelected ? 1 : 0);
  const estimatedTimeLabel = packageSelected
    ? `até ${packageSelected.horas}h`
    : items.length
      ? durationLabel(timeMin, timeMax)
      : "—";

  const selected = (id) => {
    const service = serviceById[id];
    if (service?.tipo === "pacote")
      return service.pacoteId === packageOverride
        ? { serviceId: id, quantity: 1, extras: [] }
        : null;
    return items.find((i) => i.serviceId === id);
  };

  function toggleService(id) {
    setValidationField("");
    const service = serviceById[id];

    if (service?.tipo === "pacote") {
      const isCurrentPackage = packageOverride === service.pacoteId;
      if (isCurrentPackage) {
        setPackageOverride(null);
      } else {
        // Pacote e serviços avulsos são modos mutuamente exclusivos.
        setItems([]);
        setPackageOverride(service.pacoteId);
      }
      return;
    }

    setPackageOverride(null);
    setItems((prev) =>
      prev.some((i) => i.serviceId === id)
        ? prev.filter((i) => i.serviceId !== id)
        : [...prev, { serviceId: id, quantity: 1, extras: [] }],
    );
  }

  function updateQty(id, delta) {
    setItems((prev) =>
      prev.map((i) =>
        i.serviceId !== id
          ? i
          : {
              ...i,
              quantity: Math.max(
                1,
                Math.min(serviceById[id].qtdMax || 1, i.quantity + delta),
              ),
            },
      ),
    );
  }

  function toggleExtra(id, extraId) {
    setItems((prev) =>
      prev.map((i) =>
        i.serviceId !== id
          ? i
          : {
              ...i,
              extras: i.extras.includes(extraId)
                ? i.extras.filter((x) => x !== extraId)
                : [...i.extras, extraId],
            },
      ),
    );
  }

  function toggleGroup(category) {
    setOpenGroups((prev) => ({ ...prev, [category]: !prev[category] }));
  }

  const neighborhood = neighborhoods.find((b) => b.id === neighborhoodId);
  const locationText = [
    region?.nome,
    neighborhoodId === "outro" ? neighborhoodOther : neighborhood?.nome,
  ]
    .filter(Boolean)
    .join(" - ");
  const hasNeighborhood = Boolean(
    neighborhoodId && (neighborhoodId !== "outro" || neighborhoodOther.trim()),
  );
  const canSend = Boolean(regionId && selectionCount && name.trim() && hasNeighborhood);
  const summaryLimit = 4;
  const summaryDetails = showAllSummary ? details : details.slice(0, summaryLimit);

  function focusRequiredField(field, ref) {
    setValidationField(field);
    requestAnimationFrame(() => {
      const target = ref.current;
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => target.focus?.({ preventScroll: true }), 450);
    });
  }

  function validateBeforeSend() {
    if (!regionId) {
      focusRequiredField("region", regionRef);
      return false;
    }
    if (!neighborhoodId) {
      focusRequiredField("neighborhood", neighborhoodRef);
      return false;
    }
    if (neighborhoodId === "outro" && !neighborhoodOther.trim()) {
      focusRequiredField("neighborhoodOther", neighborhoodOtherRef);
      return false;
    }
    if (!selectionCount) {
      setValidationField("services");
      requestAnimationFrame(() => {
        servicesStepRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => serviceSearchRef.current?.focus({ preventScroll: true }), 450);
      });
      return false;
    }
    if (!name.trim()) {
      focusRequiredField("name", nameRef);
      return false;
    }
    setValidationField("");
    return true;
  }

  function sendBudget() {
    if (!validateBeforeSend()) return;
    window.open(buildWhatsAppUrl(whatsappMessage()), "_blank", "noopener,noreferrer");
  }

  function whatsappMessage() {
    const lines = [
      "*JEITOLAR - ESTIMATIVA ONLINE*",
      "",
      `Olá! Meu nome é ${name.trim()}. Montei esta estimativa pelo site da JeitoLar.`,
      "",
      "*ATENDIMENTO*",
      locationText || region?.nome,
    ];

    if (address.trim()) lines.push(`Endereço/referência: ${address.trim()}`);

    lines.push("", "*SERVIÇOS / PACOTES SELECIONADOS*");

    details.forEach((item, index) => {
      lines.push(`${index + 1}. ${item.service.nome}`);
      lines.push(`   ${item.quantity} un. | ${brl(item.price.total)}`);
      for (const extraId of item.extras) {
        const extra = item.service.extras?.find((x) => x.id === extraId);
        if (extra) lines.push(`   Detalhe: ${extra.nome}`);
      }
    });

    if (packageSelected) {
      lines.push(`${details.length + 1}. ${packageSelected.nome}`);
      lines.push(`   ${packageSelected.horas}h de mão de obra | ${brl(packageSelected.preco)}`);
    }

    lines.push(
      "",
      "*RESUMO DA ESTIMATIVA*",
      `Serviços: ${brl(billedServices)}`,
      `Deslocamento: ${brl(travel.fee)}`,
      `Total estimado: *${brl(total)}*`,
      `Tempo previsto: ${estimatedTimeLabel}`,
    );

    if (notes.trim()) lines.push("", "*OBSERVAÇÕES*", notes.trim());

    lines.push(
      "",
      "Se necessário, enviarei fotos do local e dos itens nesta conversa.",
      "",
      "Gostaria de confirmar os detalhes do orçamento e verificar a disponibilidade para o atendimento.",
    );

    return lines.join("\n");
  }

  return (
    <div className="quote-shell">
      <div className="quote-main">
        <section className="quote-step">
          <div className="step-number">1</div>
          <div className="step-heading">
            <h2>Onde será o atendimento?</h2>
            <p>
              A localidade ajuda a calcular os valores de referência e o deslocamento estimado.
            </p>
          </div>
          <div className="form-grid">
            <label>
              Região
              <select
                ref={regionRef}
                className={validationField === "region" ? "field-error" : ""}
                value={regionId}
                onChange={(e) => {
                  setRegionId(e.target.value);
                  setValidationField("");
                }}
              >
                <option value="">Selecione...</option>
                {regioes.map((r) => (
                  <option value={r.id} key={r.id}>
                    {r.nome}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Bairro
              <select
                ref={neighborhoodRef}
                className={validationField === "neighborhood" ? "field-error" : ""}
                value={neighborhoodId}
                onChange={(e) => {
                  setNeighborhoodId(e.target.value);
                  setValidationField("");
                }}
                disabled={!regionId}
              >
                <option value="">Selecione...</option>
                {neighborhoods.map((b) => (
                  <option value={b.id} key={b.id}>
                    {b.nome}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {neighborhoodId === "outro" && (
            <label className="full-label">
              Informe o bairro
              <input
                ref={neighborhoodOtherRef}
                className={validationField === "neighborhoodOther" ? "field-error" : ""}
                value={neighborhoodOther}
                onChange={(e) => {
                  setNeighborhoodOther(e.target.value);
                  setValidationField("");
                }}
                placeholder="Digite seu bairro"
              />
            </label>
          )}
          <label className="full-label">
            Endereço ou referência <span>(opcional nesta etapa)</span>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Rua, número, condomínio ou ponto de referência"
            />
          </label>
        </section>

        <section
          ref={servicesStepRef}
          className={`quote-step ${validationField === "services" ? "step-error" : ""}`}
        >
          <div className="step-number">2</div>
          <div className="step-heading">
            <h2>O que você precisa?</h2>
            <p>
              Adicione serviços, quantidades e detalhes. Os valores aparecem depois da seleção da
              localidade.
            </p>
          </div>
          <input
            ref={serviceSearchRef}
            className="service-search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (validationField === "services") setValidationField("");
            }}
            placeholder="Buscar: chuveiro, TV, torneira, roçagem, jardim, piscina..."
          />
          {!regionId && (
            <div className="notice">
              Selecione a região primeiro para visualizar os valores de referência.
            </div>
          )}
          {Object.entries(filteredGroups).map(([category, list]) => {
            const selectedCount = list.filter((service) => Boolean(selected(service.id))).length;
            const expanded = Boolean(query.trim()) || Boolean(openGroups[category]);

            return (
              <div className={`service-group accordion ${expanded ? "open" : ""}`} key={category}>
                <button
                  type="button"
                  className="service-group-header"
                  onClick={() => toggleGroup(category)}
                  aria-expanded={expanded}
                >
                  <span className="service-group-title">{category}</span>
                  <span className="service-group-status">
                    {selectedCount
                      ? `${selectedCount} selecionado${selectedCount > 1 ? "s" : ""}`
                      : `${list.length} opções`}
                    <b aria-hidden="true">{expanded ? "−" : "+"}</b>
                  </span>
                </button>

                {expanded && (
                  <div className="service-list service-list-collapsible">
                    {list.map((service) => {
                      const item = selected(service.id);
                      const price = regionId ? getBasePrice(service.id, regionId) : 0;
                      const isPackage = service.tipo === "pacote";
                      return (
                        <article
                          className={`quote-service ${item ? "active" : ""}`}
                          key={service.id}
                        >
                          <button
                            type="button"
                            className="service-toggle"
                            onClick={() => toggleService(service.id)}
                          >
                            <span className="checkmark">{item ? "✓" : "+"}</span>
                            <span className="service-copy">
                              <strong>{service.nome}</strong>
                              <small>{service.descricao}</small>
                            </span>
                            <span className="service-price">
                              {regionId
                                ? isPackage
                                  ? brl(price)
                                  : `a partir de ${brl(price)}`
                                : "Selecione a região"}
                            </span>
                          </button>
                          {item && (
                            <div className="service-options">
                              {!isPackage && (service.qtdMax || 1) > 1 && (
                                <div className="qty">
                                  <span>Quantidade</span>
                                  <button type="button" onClick={() => updateQty(service.id, -1)}>
                                    −
                                  </button>
                                  <b>{item.quantity}</b>
                                  <button type="button" onClick={() => updateQty(service.id, 1)}>
                                    +
                                  </button>
                                </div>
                              )}
                              {!isPackage && (service.extras || []).length > 0 && (
                                <div className="extras">
                                  <span>Detalhes</span>
                                  {service.extras.map((extra) => (
                                    <label key={extra.id}>
                                      <input
                                        type="checkbox"
                                        checked={item.extras.includes(extra.id)}
                                        onChange={() => toggleExtra(service.id, extra.id)}
                                      />{" "}
                                      {extra.nome}{" "}
                                      <small>
                                        + {brl(extra.valor)}
                                        {extra.porUnidade ? " / un." : ""}
                                      </small>
                                    </label>
                                  ))}
                                </div>
                              )}
                              <div className="line-total">
                                {isPackage ? "Valor do pacote" : "Subtotal deste serviço"}:{" "}
                                <strong>
                                  {brl(
                                    isPackage
                                      ? price
                                      : serviceLineTotal(
                                          service.id,
                                          regionId,
                                          item.quantity,
                                          item.extras,
                                        ).total,
                                  )}
                                </strong>
                              </div>
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {recommendation && !packageSelected && (
          <section className="package-recommend">
            <span>💡 Pode compensar</span>
            <div>
              <h3>
                {recommendation.nome} — {brl(recommendation.preco)}
              </h3>
              <p>{recommendation.descricao}</p>
              <small>
                {recommendation.horas}h •{" "}
                {brl(Number(recommendation.preco) / Number(recommendation.horas))}/hora
              </small>
              <strong>Economia estimada: {brl(recommendation.economia)}</strong>
            </div>
            <button
              type="button"
              className="btn secondary"
              onClick={() => setPackageOverride(recommendation.id)}
            >
              Usar pacote
            </button>
          </section>
        )}

        {packageSelected && (
          <section className="package-applied">
            <div>
              <b>
                Pacote aplicado: {packageSelected.nome} — {brl(packageSelected.preco)}
              </b>
              <p>{packageSelected.descricao}</p>
              <small>
                {packageSelected.horas}h •{" "}
                {brl(Number(packageSelected.preco) / Number(packageSelected.horas))}/hora
              </small>
            </div>
            <button type="button" onClick={() => setPackageOverride(null)}>
              Voltar aos valores avulsos
            </button>
          </section>
        )}

        <section className="quote-step">
          <div className="step-number">3</div>
          <div className="step-heading">
            <h2>Quem está solicitando?</h2>
            <p>
              Seu telefone não é necessário aqui: o pedido será enviado pelo seu próprio WhatsApp.
            </p>
          </div>
          <label className="full-label">
            Seu nome
            <input
              ref={nameRef}
              className={validationField === "name" ? "field-error" : ""}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setValidationField("");
              }}
              placeholder="Como podemos chamar você?"
            />
          </label>
          <label className="full-label">
            Observações <span>(opcional)</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="4"
              placeholder="Ex.: tenho o suporte da TV; parede de alvenaria; preciso realizar tudo no mesmo dia..."
            />
          </label>
        </section>
      </div>

      <aside className="quote-summary">
        <div className="summary-sticky">
          <div className="summary-heading-row">
            <div>
              <span className="eyebrow">Sua estimativa</span>
              <h2>
                {selectionCount
                  ? `${selectionCount} item${selectionCount > 1 ? "s" : ""}`
                  : "Monte seu orçamento"}
              </h2>
            </div>
            <button type="button" className="summary-send-top" onClick={sendBudget}>
              Enviar orçamento
            </button>
          </div>

          <div className="summary-lines">
            {summaryDetails.map((item) => (
              <div className="summary-item" key={item.serviceId}>
                <div>
                  <strong>
                    {item.quantity}x {item.service.nome}
                  </strong>
                  {item.extras?.length > 0 && (
                    <small className="summary-extras">
                      {item.extras
                        .map(
                          (extraId) =>
                            item.service.extras?.find((extra) => extra.id === extraId)?.nome,
                        )
                        .filter(Boolean)
                        .join(" • ")}
                    </small>
                  )}
                  {item.quantity > 1 && (
                    <small>
                      1ª unidade {brl(item.price.unitBase)} • adicionais{" "}
                      {brl(item.price.additionalUnit)}
                    </small>
                  )}
                </div>
                <b>{brl(item.price.total)}</b>
              </div>
            ))}
          </div>

          {details.length > summaryLimit && (
            <button
              type="button"
              className="summary-toggle"
              onClick={() => setShowAllSummary((value) => !value)}
            >
              {showAllSummary
                ? "Mostrar menos"
                : `Ver mais ${details.length - summaryLimit} serviço${
                    details.length - summaryLimit > 1 ? "s" : ""
                  }`}
            </button>
          )}

          {packageSelected && (
            <div className="summary-package">
              <span>{packageSelected.nome}</span>
              <b>{brl(packageSelected.preco)}</b>
            </div>
          )}

          <div className="summary-totals">
            <div>
              <span>Serviços</span>
              <b>{brl(billedServices)}</b>
            </div>
            <div>
              <span>Deslocamento</span>
              <b>{regionId ? brl(travel.fee) : "—"}</b>
            </div>
            <div>
              <span>Tempo estimado</span>
              <b>{estimatedTimeLabel}</b>
            </div>
            <div className="grand">
              <span>Estimativa</span>
              <b>{brl(total)}</b>
            </div>
          </div>

          <p className="quote-disclaimer">{configuracao.aviso}</p>
          <button
            type="button"
            className={`btn whatsapp ${canSend ? "" : "needs-info"}`}
            onClick={sendBudget}
          >
            Enviar orçamento pelo WhatsApp
          </button>
          {!canSend && (
            <small className="summary-hint">
              Preencha região, bairro, ao menos um serviço e seu nome.
            </small>
          )}
        </div>
      </aside>
    </div>
  );
}
