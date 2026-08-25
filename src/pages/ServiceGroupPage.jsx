import { Link, useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import { useRegion } from "../context/RegionContext";
import { serviceGroups } from "../data/serviceGroups";
import { brl } from "../lib/format";
import { getBasePrice, regioes, serviceById } from "../lib/pricing";

export default function ServiceGroupPage({ groupKey }) {
  const group = serviceGroups[groupKey];
  const [searchParams, setSearchParams] = useSearchParams();
  const { regionId, setRegionId } = useRegion();
  const region = regioes.find((item) => item.id === regionId);
  const services = group.serviceIds.map((id) => serviceById[id]).filter(Boolean);


  function changeRegion(event) {
    const value = event.target.value;
    setRegionId(value);
    const next = new URLSearchParams(searchParams);
    if (value) next.set("regiao", value);
    else next.delete("regiao");
    setSearchParams(next, { replace: true });
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: group.heading,
    provider: { "@type": "Organization", "@id": "https://jeitolar.pages.dev/#organization", name: "JeitoLar" },
    areaServed: regioes.map((item) => ({ "@type": "AdministrativeArea", name: item.nome })),
    url: `https://jeitolar.pages.dev${group.path}`
  };

  return <main>
    <SEO title={group.title} description={group.description} path={group.path} schema={schema} />

    <section className="service-group-hero">
      <div className="container service-group-hero-grid">
        <div>
          <div className="breadcrumbs"><Link to="/">JeitoLar</Link><span>/</span><span>Serviços</span><span>/</span><span>{group.nome}</span></div>
          <span className="eyebrow">{group.eyebrow}</span>
          <h1>{group.heading}</h1>
          <p>{group.resumo}</p>
        </div>
        <div className="region-price-box">
          <span className="eyebrow">Consultar valores</span>
          <h2>{region ? `Região selecionada: ${region.nome}` : "Selecione onde será o atendimento"}</h2>
          <p>A região escolhida no topo do site é reaproveitada em serviços e orçamento. Você pode alterá-la aqui a qualquer momento.</p>
          <label>Região
            <select value={regionId} onChange={changeRegion}>
              <option value="">Selecione...</option>
              {regioes.map((item) => <option value={item.id} key={item.id}>{item.nome}</option>)}
            </select>
          </label>
        </div>
      </div>
    </section>

    <section className="section soft">
      <div className="container">
        <div className="section-title left">
          <span>{group.nome}</span>
          <h2>Serviços disponíveis</h2>
          <p>{region ? `Valores de mão de obra para atendimento em ${region.nome}. O deslocamento é calculado na página de orçamento.` : "Escolha a região para liberar os valores de referência."}</p>
        </div>

        <div className="group-service-list">
          {services.map((service) => {
            const price = regionId ? getBasePrice(service.id, regionId) : 0;
            const quoteUrl = regionId ? `/orcamento/?regiao=${regionId}&servico=${service.id}` : `/orcamento/?servico=${service.id}`;
            return <article className="group-service-row" key={service.id}>
              <div>
                <h3>{service.nome}</h3>
                <p>{service.descricao}</p>
              </div>
              <div className="group-service-price">
                <span>{regionId ? "Valor de referência" : "Preço"}</span>
                <strong>{regionId ? brl(price) : "Selecione a região"}</strong>
                {regionId ? <Link to={quoteUrl}>Adicionar ao orçamento →</Link> : <span className="muted-action">Selecione a região acima</span>}
              </div>
            </article>;
          })}
        </div>

        <div className="catalog-cta">
          <div><span className="eyebrow">Precisa de mais de um serviço?</span><h2>Monte tudo em uma única estimativa.</h2><p>Na calculadora você pode combinar serviços de diferentes grupos, quantidades e detalhes do atendimento.</p></div>
          <Link className="btn" to={regionId ? `/orcamento/?regiao=${regionId}` : "/orcamento/"}>Montar orçamento completo</Link>
        </div>
      </div>
    </section>
  </main>;
}
