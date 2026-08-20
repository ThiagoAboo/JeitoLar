import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { openWhatsApp } from "../components/SiteLayout";
import { locationList } from "../data/locations";

const services = [
  ["⚡", "Elétrica", "Tomadas, interruptores, chuveiros, luminárias e pequenos reparos."],
  ["🚿", "Hidráulica", "Torneiras, sifões, caixa acoplada e pequenos vazamentos."],
  ["📺", "Instalações", "Suportes de TV, prateleiras, cortinas, persianas e acessórios."],
  ["💡", "Luminárias e ventiladores", "Instalação e substituição de luminárias e ventiladores de teto."],
  ["🪛", "Montagem", "Móveis, racks, cômodas, mesas, nichos e outros itens residenciais."],
  ["🏠", "Pequenos reparos", "Soluções práticas para manutenção e conservação da sua casa."],
];

export default function HomePage() {
  return (
    <main>
      <SEO
        title="JeitoLar | Faz-Tudo e Reparos Residenciais no Grande Rio"
        description="JeitoLar oferece faz-tudo, reparos, instalações e manutenção residencial em São Gonçalo, Niterói, Maricá, Itaboraí, Centro e Zona Sul do Rio."
        path="/"
      />

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="eyebrow">Reparos • Instalações • Manutenção</span>

            <h1>
              Sua casa,
              <br />
              <span>do jeito certo.</span>
            </h1>

            <p>
              Serviços de faz-tudo, reparos, instalações e manutenção residencial
              em São Gonçalo, Niterói, Maricá, Itaboraí, Centro e Zona Sul do Rio.
              Atendimento no local, orçamento antes do serviço e agendamento pelo WhatsApp.
            </p>

            <div className="hero-actions">
              <button className="btn" onClick={() => openWhatsApp()}>
                Pedir orçamento pelo WhatsApp
              </button>
              <a className="btn-secondary" href="#servicos">Ver serviços</a>
            </div>

            <div className="hero-trust">
              <span>✓ Atendimento agendado</span>
              <span>✓ Orçamento antes do serviço</span>
              <span>✓ Pagamento via Pix</span>
            </div>
          </div>

          <div className="hero-card">
            <img
              src="/logo-jeitolar.png"
              alt="JeitoLar - reparos, instalações e manutenção residencial"
              className="hero-logo"
            />
          </div>
        </div>
      </section>

      <section className="section" id="servicos">
        <div className="container">
          <div className="section-title">
            <span>O que fazemos</span>
            <h2>Faz-tudo, reparos e instalações residenciais</h2>
            <p>
              Pequenos reparos elétricos e hidráulicos, montagem de móveis,
              instalação de suportes, prateleiras, cortinas, luminárias, chuveiros,
              ventiladores e outros serviços residenciais.
            </p>
          </div>

          <div className="services-grid">
            {services.map(([icon, title, description]) => (
              <article className="service-card" key={title}>
                <div className="service-icon" aria-hidden="true">{icon}</div>
                <h3>{title}</h3>
                <p>{description}</p>
                <button onClick={() => openWhatsApp(title)}>
                  Solicitar orçamento →
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section region-section" id="regioes">
        <div className="container">
          <div className="section-title">
            <span>Atendimento no local</span>
            <h2>Faz-tudo e manutenção residencial no Grande Rio</h2>
            <p>
              Escolha sua região para conhecer os serviços e informações de atendimento local.
            </p>
          </div>

          <div className="location-cards">
            {locationList.map((location) => (
              <Link className="location-card" to={location.path} key={location.slug}>
                <span>Atendimento em</span>
                <h3>{location.shortName}</h3>
                <p>Reparos, instalações, montagem e manutenção residencial.</p>
                <strong>Ver atendimento na região →</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section why">
        <div className="container">
          <div className="section-title">
            <span>Por que escolher a JeitoLar?</span>
            <h2>Serviço simples, organizado e sem surpresa</h2>
          </div>

          <div className="advantages">
            <div><strong>01</strong><h3>Orçamento claro</h3><p>Você conhece o valor antes da execução.</p></div>
            <div><strong>02</strong><h3>Horário combinado</h3><p>Atendimento agendado para facilitar sua rotina.</p></div>
            <div><strong>03</strong><h3>Atendimento no local</h3><p>Levamos as ferramentas até sua residência.</p></div>
            <div><strong>04</strong><h3>Vários serviços</h3><p>Resolva diferentes tarefas na mesma visita.</p></div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-content">
          <div>
            <span>Precisa de um reparo?</span>
            <h2>Deixa a casa com a gente.</h2>
            <p>Conte o que precisa ser feito e solicite seu orçamento pelo WhatsApp.</p>
          </div>
          <button className="btn btn-light" onClick={() => openWhatsApp()}>
            Solicitar orçamento
          </button>
        </div>
      </section>
    </main>
  );
}
