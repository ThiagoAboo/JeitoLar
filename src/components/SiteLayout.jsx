import { Link, NavLink, Outlet } from "react-router-dom";
import { locationList } from "../data/locations";

export const whatsappNumber =
  import.meta.env.VITE_WHATSAPP_NUMBER || "5521999999999";

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(service = "", location = "") {
  const lines = [
    "Olá! Encontrei a JeitoLar pelo site e gostaria de solicitar um orçamento.",
    service ? `Serviço: ${service}` : "",
    location ? `Região: ${location}` : "",
    "",
    "Meu nome:",
    "Bairro/Cidade:",
    "Descrição do serviço:",
  ].filter(Boolean);

  window.open(buildWhatsAppUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
}

export default function SiteLayout() {
  return (
    <>
      <header className="header">
        <div className="container nav">
          <Link to="/" className="brand" aria-label="JeitoLar - início">
            <img src="/icone-jeitolar.png" alt="" className="brand-icon" />
            <span>
              <span className="brand-jeito">Jeito</span>
              <span className="brand-lar">Lar</span>
            </span>
          </Link>

          <nav aria-label="Navegação principal">
            <NavLink to="/#servicos">Serviços</NavLink>
            <NavLink to="/#regioes">Onde atendemos</NavLink>
            <a href="mailto:jeitolar@gmail.com">Contato</a>
          </nav>

          <button className="btn btn-small" onClick={() => openWhatsApp()}>
            Orçamento
          </button>
        </div>
      </header>

      <Outlet />

      <footer>
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/icone-jeitolar.png" alt="" />
            <div>
              <strong>
                <span className="brand-jeito">Jeito</span>
                <span className="brand-lar">Lar</span>
              </strong>
              <p>Reparos • Instalações • Manutenção</p>
              <a href="mailto:jeitolar@gmail.com">jeitolar@gmail.com</a>
            </div>
          </div>

          <div>
            <strong>Áreas atendidas</strong>
            <div className="footer-links">
              {locationList.map((location) => (
                <Link to={location.path} key={location.slug}>
                  {location.shortName}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-copy">
            <p>© {new Date().getFullYear()} JeitoLar</p>
            <p>Sua casa, do jeito certo.</p>
          </div>
        </div>
      </footer>

      <button
        className="floating-whatsapp"
        onClick={() => openWhatsApp()}
        aria-label="Solicitar orçamento pelo WhatsApp"
      >
        WhatsApp
      </button>
    </>
  );
}
