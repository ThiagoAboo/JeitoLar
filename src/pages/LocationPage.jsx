import { useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { localPages, localPageList } from "../data/localPages";
import bairros from "../data/orcamento/bairros.json";
import { serviceGroupList } from "../data/serviceGroups";
import { useRegion } from "../context/RegionContext";

export default function LocationPage({ locationKey }) {
  const { setRegionId } = useRegion();
  const l = localPages[locationKey];

  useEffect(() => { setRegionId(locationKey); }, [locationKey, setRegionId]);
  const others = localPageList.filter((x) => x.id !== locationKey);
  const schema = { "@context": "https://schema.org", "@type": "Service", name: `Serviços de faz-tudo em ${l.shortName}`, provider: { "@type": "Organization", "@id": "https://jeitolar.pages.dev/#organization", name: "JeitoLar" }, areaServed: { "@type": "AdministrativeArea", name: l.shortName }, url: `https://jeitolar.pages.dev${l.path}` };

  return <main>
    <SEO title={l.title} description={l.description} path={l.path} schema={schema} />
    <section className="local-hero"><div className="container local-grid"><div><div className="breadcrumbs"><Link to="/">JeitoLar</Link><span>/</span><span>{l.shortName}</span></div><span className="eyebrow">Atendimento em {l.shortName}</span><h1>{l.heading}</h1><p>{l.intro}</p><div className="hero-actions"><Link className="btn" to={`/orcamento/?regiao=${locationKey}`}>Calcular orçamento em {l.shortName}</Link></div></div><figure className="local-media"><img src={l.image} alt={`Serviço residencial - ${l.shortName}`} /></figure></div></section>

    <section className="section"><div className="container split"><div><span className="eyebrow">Serviços residenciais</span><h2>Uma lista, vários serviços.</h2><p>Elétrica leve, hidráulica simples, instalações, montagem, pequenos reparos, jardim, quintal e cuidados básicos de piscina podem ser combinados no mesmo pedido.</p><div className="related-links service-group-links">{serviceGroupList.map((group)=><Link to={`${group.path}?regiao=${locationKey}`} key={group.id}>{group.nome} →</Link>)}</div></div><div className="pill-grid">{(bairros[locationKey]||[]).filter((b)=>b.id!=="outro").map((b)=><span key={b.id}>✓ {b.nome}</span>)}</div></div></section>

    <section className="section soft"><div className="container"><div className="section-title left"><span>Outras regiões</span><h2>A JeitoLar também atende</h2></div><div className="related-links">{others.map((o)=><Link to={o.path} key={o.id}>Faz-tudo em {o.shortName} →</Link>)}</div></div></section>
  </main>;
}
