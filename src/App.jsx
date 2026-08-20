import "./App.css";

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "5521992244753";

const services = [
  {
    icon: "⚡",
    title: "Elétrica",
    description:
      "Tomadas, interruptores, chuveiros, luminárias e pequenos reparos elétricos residenciais.",
  },
  {
    icon: "🚿",
    title: "Hidráulica",
    description:
      "Torneiras, sifões, caixa acoplada, conexões e pequenos vazamentos.",
  },
  {
    icon: "📺",
    title: "Instalações",
    description:
      "Suportes de TV, prateleiras, cortinas, persianas e acessórios residenciais.",
  },
  {
    icon: "💡",
    title: "Luminárias e ventiladores",
    description:
      "Instalação e substituição de luminárias, plafons e ventiladores de teto.",
  },
  {
    icon: "🪛",
    title: "Montagem",
    description:
      "Móveis, racks, cômodas, mesas, nichos e outros itens residenciais.",
  },
  {
    icon: "🏠",
    title: "Pequenos reparos",
    description:
      "Soluções práticas para manutenção, conservação e ajustes do dia a dia.",
  },
];

const regions = [
  "São Gonçalo",
  "Niterói",
  "Maricá",
  "Itaboraí",
  "Centro do Rio",
  "Zona Sul do Rio",
];

function buildWhatsAppMessage(service = "") {
  return [
    "Olá! Encontrei a JeitoLar pelo site e gostaria de solicitar um orçamento.",
    service ? `Serviço: ${service}` : "",
    "",
    "Meu nome:",
    "Bairro/Cidade:",
    "Descrição do serviço:",
  ]
    .filter(Boolean)
    .join("\n");
}

function openWhatsApp(service = "") {
  const text = encodeURIComponent(buildWhatsAppMessage(service));
  window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank", "noopener,noreferrer");
}

function App() {
  return (
    <div>
      <header className="header">
        <div className="container nav">
          <a href="#inicio" className="brand" aria-label="JeitoLar - início">
            <img src="/icone-jeitolar.png" alt="" className="brand-icon" />
            <span>
              <span className="brand-jeito">Jeito</span>
              <span className="brand-lar">Lar</span>
            </span>
          </a>

          <nav aria-label="Navegação principal">
            <a href="#servicos">Serviços</a>
            <a href="#regioes">Onde atendemos</a>
            <a href="#diferenciais">Diferenciais</a>
            <a href="#contato">Contato</a>
          </nav>

          <button className="btn btn-small" onClick={() => openWhatsApp()}>
            Orçamento
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="container hero-grid">
            <div className="hero-content">
              <span className="eyebrow">Reparos • Instalações • Manutenção</span>

              <h1>
                Sua casa,
                <br />
                <span>do jeito certo.</span>
              </h1>

              <p>
                Pequenos reparos, instalações e manutenção residencial com
                atendimento no local, orçamento transparente e serviço feito
                com cuidado.
              </p>

              <div className="hero-actions">
                <button className="btn" onClick={() => openWhatsApp()}>
                  Pedir orçamento pelo WhatsApp
                </button>

                <a className="btn-secondary" href="#servicos">
                  Ver serviços
                </a>
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
                alt="JeitoLar - Reparos, Instalações e Manutenção"
                className="hero-logo"
              />
            </div>
          </div>
        </section>

        <section className="section" id="servicos">
          <div className="container">
            <div className="section-title">
              <span>O que fazemos</span>
              <h2>Serviços para deixar tudo no lugar</h2>
              <p>
                Desde pequenos consertos até instalações e montagens
                residenciais.
              </p>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.title}>
                  <div className="service-icon" aria-hidden="true">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <button onClick={() => openWhatsApp(service.title)}>
                    Solicitar orçamento →
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section region-section" id="regioes">
          <div className="container region-grid">
            <div>
              <span className="eyebrow">Atendimento no local</span>
              <h2>Onde a JeitoLar atende</h2>
              <p>
                Atendimento residencial mediante agendamento nas principais
                regiões do Grande Rio.
              </p>
            </div>

            <div className="regions">
              {regions.map((region) => (
                <div className="region" key={region}>
                  <span>✓</span>
                  {region}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section why" id="diferenciais">
          <div className="container">
            <div className="section-title">
              <span>Por que escolher a JeitoLar?</span>
              <h2>Serviço simples, organizado e sem surpresa</h2>
            </div>

            <div className="advantages">
              <div>
                <strong>01</strong>
                <h3>Orçamento claro</h3>
                <p>Você conhece o valor antes da execução do serviço.</p>
              </div>

              <div>
                <strong>02</strong>
                <h3>Horário combinado</h3>
                <p>Atendimento agendado para facilitar sua rotina.</p>
              </div>

              <div>
                <strong>03</strong>
                <h3>Atendimento no local</h3>
                <p>Levamos as ferramentas até sua residência.</p>
              </div>

              <div>
                <strong>04</strong>
                <h3>Vários serviços</h3>
                <p>Resolva diferentes pequenos reparos na mesma visita.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta" id="contato">
          <div className="container cta-content">
            <div>
              <span>Precisa de um reparo?</span>
              <h2>Deixa a casa com a gente.</h2>
              <p>
                Conte o que precisa ser feito e solicite seu orçamento pelo
                WhatsApp.
              </p>
            </div>

            <button className="btn btn-light" onClick={() => openWhatsApp()}>
              Solicitar orçamento
            </button>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-content">
          <div className="footer-brand">
            <img src="/icone-jeitolar.png" alt="" />
            <div>
              <strong>
                <span className="brand-jeito">Jeito</span>
                <span className="brand-lar">Lar</span>
              </strong>
              <p>Reparos • Instalações • Manutenção</p>
            </div>
          </div>

          <p>© {new Date().getFullYear()} JeitoLar</p>
        </div>
      </footer>

      <button
        className="floating-whatsapp"
        onClick={() => openWhatsApp()}
        aria-label="Solicitar orçamento pelo WhatsApp"
        title="Solicitar orçamento pelo WhatsApp"
      >
        WhatsApp
      </button>
    </div>
  );
}

export default App;
