import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { regioes } from "../lib/pricing";
import { useRegion } from "../context/RegionContext";
import ScrollManager from "./ScrollManager";
import SplashScreen from "./SplashScreen";

export const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "5521992244753";
export const buildWhatsAppUrl = (message) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

function HomeAnchor({ id, children, onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();
    onNavigate?.();
    const targetHash = `#${id}`;

    if (location.pathname === "/" && location.hash === targetHash) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    navigate(`/${targetHash}`);
  }

  return <a href={`/#${id}`} onClick={handleClick}>{children}</a>;
}

function RegionSelector({ mobile = false, onChangeDone }) {
  const { regionId, setRegionId } = useRegion();
  const location = useLocation();
  const navigate = useNavigate();

  function changeRegion(event) {
    const value = event.target.value;
    setRegionId(value);

    const currentRegionPage = regioes.find((region) => region.seoPath === location.pathname);
    const nextRegion = regioes.find((region) => region.id === value);

    if (currentRegionPage && nextRegion) {
      navigate(nextRegion.seoPath);
    } else {
      const params = new URLSearchParams(location.search);
      if (value) params.set("regiao", value);
      else params.delete("regiao");
      const search = params.toString();
      navigate({ pathname: location.pathname, search: search ? `?${search}` : "", hash: location.hash }, { replace: true });
    }

    onChangeDone?.();
  }

  return <label className={mobile ? "mobile-region-selector" : "header-region-selector"}>
    <select value={regionId} onChange={changeRegion} aria-label="Selecionar região do atendimento">
      <option value="">Escolher região</option>
      {regioes.map((region) => <option value={region.id} key={region.id}>{region.nome}</option>)}
    </select>
  </label>;
}

export default function SiteLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { regionId } = useRegion();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  const closeMobile = () => setMobileOpen(false);
  const quoteUrl = regionId ? `/orcamento/?regiao=${regionId}` : "/orcamento/";

  return <>
    <SplashScreen />
    <ScrollManager />
    <header className="header">
      <div className="container nav">
        <Link to="/" className="brand" aria-label="JeitoLar - início" onClick={closeMobile}>
          <img src="/icone-jeitolar.png" alt="" />
          <span><b>Jeito</b><em>Lar</em></span>
        </Link>

        <nav className="desktop-nav" aria-label="Navegação principal">
          <HomeAnchor id="servicos">Serviços</HomeAnchor>
          <HomeAnchor id="pacotes">Pacotes</HomeAnchor>
          <HomeAnchor id="regioes">Regiões</HomeAnchor>
          <HomeAnchor id="galeria">Galeria</HomeAnchor>
          <Link to={quoteUrl}>Orçamento</Link>
        </nav>

        <RegionSelector />
        <Link className="btn small desktop-quote-cta" to={quoteUrl}>Calcular orçamento</Link>

        <button
          type="button"
          className={`mobile-menu-button ${mobileOpen ? "open" : ""}`}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((value) => !value)}
        >
          <span></span><span></span><span></span>
        </button>

        <nav id="mobile-navigation" className={`mobile-nav ${mobileOpen ? "open" : ""}`} aria-label="Navegação mobile">
          <RegionSelector mobile />
          <HomeAnchor id="servicos" onNavigate={closeMobile}>Serviços</HomeAnchor>
          <HomeAnchor id="pacotes" onNavigate={closeMobile}>Pacotes</HomeAnchor>
          <HomeAnchor id="regioes" onNavigate={closeMobile}>Regiões</HomeAnchor>
          <HomeAnchor id="galeria" onNavigate={closeMobile}>Galeria</HomeAnchor>
          <Link to={quoteUrl} onClick={closeMobile}>Orçamento</Link>
          <Link to="/instalar/" onClick={closeMobile}>Instalar app</Link>
          <Link className="mobile-quote-link" to={quoteUrl} onClick={closeMobile}>Calcular orçamento</Link>
        </nav>
      </div>
    </header>
    <Outlet />
    <footer><div className="container footer-grid"><div className="footer-brand"><img src="/icone-jeitolar.png" alt=""/><div><strong><b>Jeito</b><em>Lar</em></strong><p>Reparos • Instalações • Manutenção</p><a href="mailto:jeitolar@gmail.com">jeitolar@gmail.com</a></div></div><div><strong>Atalhos</strong><div className="footer-links"><Link to={quoteUrl}>Montar orçamento</Link><Link to="/instalar/">Instalar app</Link><Link to="/sao-goncalo/">São Gonçalo</Link><Link to="/niteroi/">Niterói</Link><Link to="/marica/">Maricá</Link><Link to="/itaborai/">Itaboraí</Link><Link to="/rio-de-janeiro/centro/">Centro do Rio</Link><Link to="/rio-de-janeiro/zona-sul/">Zona Sul do Rio</Link></div></div><div className="footer-copy"><p>© {new Date().getFullYear()} JeitoLar</p><p>Sua casa, do jeito certo.</p></div></div></footer>
  </>;
}
