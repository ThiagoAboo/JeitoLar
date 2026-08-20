import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { openWhatsApp } from "../components/SiteLayout";
import { locations, locationList } from "../data/locations";

const serviceItems = [
  "Instalação e troca de tomadas e interruptores",
  "Instalação de chuveiros e luminárias",
  "Instalação de ventiladores de teto",
  "Suportes de TV, prateleiras e nichos",
  "Varões, cortinas e persianas",
  "Torneiras, sifões e pequenos reparos hidráulicos",
  "Montagem de móveis e ajustes residenciais",
  "Pequenos reparos e manutenção do dia a dia",
];

function locationSchema(location) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Serviços de faz-tudo em ${location.shortName}`,
    provider: {
      "@type": "Organization",
      "@id": "https://jeitolar.pages.dev/#organization",
      name: "JeitoLar",
      url: "https://jeitolar.pages.dev/",
    },
    areaServed: {
      "@type": location.city === location.shortName ? "City" : "AdministrativeArea",
      name: location.shortName,
    },
    serviceType: [
      "Faz-tudo",
      "Reparos residenciais",
      "Instalações residenciais",
      "Manutenção residencial",
      "Montagem de móveis",
    ],
    url: `https://jeitolar.pages.dev${location.path}`,
  };
}

export default function LocationPage({ locationKey }) {
  const location = locations[locationKey];

  if (!location) return null;

  const otherLocations = locationList.filter((item) => item.slug !== location.slug);

  return (
    <main>
      <SEO
        title={location.title}
        description={location.description}
        path={location.path}
        schema={locationSchema(location)}
      />

      <section className="local-hero">
        <div className="container local-hero-grid">
          <div>
            <div className="breadcrumbs">
              <Link to="/">JeitoLar</Link>
              <span>/</span>
              <span>{location.shortName}</span>
            </div>

            <span className="eyebrow">Atendimento em {location.shortName}</span>
            <h1>{location.heading}</h1>
            <p>{location.intro}</p>

            <div className="hero-actions">
              <button
                className="btn"
                onClick={() => openWhatsApp("Faz-tudo / reparos residenciais", location.shortName)}
              >
                Pedir orçamento em {location.shortName}
              </button>

              <a className="btn-secondary" href="#servicos-local">
                Ver serviços
              </a>
            </div>
          </div>

          <aside className="local-info-card">
            <img src="/icone-jeitolar.png" alt="" />
            <h2>Atendimento JeitoLar</h2>
            <ul>
              <li>✓ Orçamento antes do serviço</li>
              <li>✓ Atendimento mediante agendamento</li>
              <li>✓ Possibilidade de vários serviços na mesma visita</li>
              <li>✓ Contato direto pelo WhatsApp</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section" id="servicos-local">
        <div className="container local-two-col">
          <div>
            <span className="eyebrow">Serviços residenciais</span>
            <h2>O que você pode solicitar</h2>
            <p className="lead">
              A JeitoLar atende tarefas de pequeno porte que normalmente exigem
              ferramentas, instalação, montagem ou manutenção residencial.
            </p>
          </div>

          <div className="check-list">
            {serviceItems.map((item) => (
              <div key={item}><span>✓</span>{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section region-section">
        <div className="container local-two-col">
          <div>
            <span className="eyebrow">Cobertura local</span>
            <h2>Bairros e regiões de referência</h2>
            <p>
              Estes são alguns pontos de referência da área atendida. Se seu bairro
              não estiver listado, envie a localização pelo WhatsApp para confirmar a rota.
            </p>
            <p className="local-note">{location.localNote}</p>
          </div>

          <div className="neighborhood-grid">
            {location.neighborhoods.map((name) => (
              <div className="neighborhood" key={name}>✓ {name}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <span>Como funciona</span>
            <h2>Do pedido ao atendimento</h2>
          </div>

          <div className="steps">
            <article>
              <strong>1</strong>
              <h3>Envie o serviço</h3>
              <p>Informe bairro, serviço e, se possível, envie fotos pelo WhatsApp.</p>
            </article>
            <article>
              <strong>2</strong>
              <h3>Receba a orientação</h3>
              <p>Alinhamos escopo, materiais, deslocamento e uma estimativa de valor.</p>
            </article>
            <article>
              <strong>3</strong>
              <h3>Agende o atendimento</h3>
              <p>Combinamos o melhor dia e horário disponível para realizar o serviço.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section related-locations">
        <div className="container">
          <div className="section-title left">
            <span>Outras áreas</span>
            <h2>A JeitoLar também atende</h2>
          </div>

          <div className="related-links">
            {otherLocations.map((item) => (
              <Link to={item.path} key={item.slug}>
                Faz-tudo em {item.shortName} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-content">
          <div>
            <span>Orçamento em {location.shortName}</span>
            <h2>Conte o que precisa ser feito.</h2>
            <p>
              Envie o serviço, bairro e fotos pelo WhatsApp para facilitar a avaliação.
            </p>
          </div>

          <button
            className="btn btn-light"
            onClick={() => openWhatsApp("", location.shortName)}
          >
            Falar com a JeitoLar
          </button>
        </div>
      </section>
    </main>
  );
}
