import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { localPageList } from "../data/localPages";
import { serviceGroupList } from "../data/serviceGroups";
import { useRegion } from "../context/RegionContext";
import PocketSection from "../components/PocketSection";
import { pacotes } from "../lib/pricing";
import { brl } from "../lib/format";

const gallery = [
  ["/images/galeria/instalacao-tv.webp", "Instalação de suporte de TV em residência", "vertical"],
  ["/images/galeria/hidraulica.webp", "Pequeno reparo hidráulico em cozinha", "horizontal"],
  ["/images/galeria/ventilador.webp", "Instalação e manutenção de ventilador de teto", "vertical"],
  ["/images/galeria/atendimento-cliente.webp", "Atendimento e avaliação de serviços residenciais", "vertical"],
  ["/images/galeria/instalacao-tv-2.webp", "Instalação de TV em parede residencial", "vertical"]
];

const groupIcons = {
  eletrica: "E",
  hidraulica: "H",
  instalacoes: "I",
  montagem: "M",
  "pequenos-reparos": "R",
  "jardim-quintal": "J",
  piscina: "P"
};

export default function HomePage() {
  const { regionId, setRegionId } = useRegion();
  const quoteUrl = regionId ? `/orcamento/?regiao=${regionId}` : "/orcamento/";
  return <main>
    <SEO title="JeitoLar | Faz-Tudo e Reparos Residenciais no Grande Rio" description="JeitoLar oferece faz-tudo, reparos, instalações e manutenção residencial no Grande Rio. Monte sua estimativa online e envie pelo WhatsApp." path="/" />

    <section className="hero"><div className="container hero-grid"><div><span className="eyebrow">Reparos • Instalações • Manutenção</span><h1>Sua casa,<br/><em>do jeito certo.</em></h1><p>Serviços residenciais com estimativa online. Escolha o local, selecione o que precisa e envie a lista completa pelo WhatsApp.</p><div className="hero-actions"><Link className="btn" to={quoteUrl}>Montar meu orçamento</Link><a className="text-link" href="#servicos">Conhecer serviços</a></div><div className="trust-row"><span>✓ Orçamento antes do atendimento</span><span>✓ Vários serviços na mesma visita</span><span>✓ Atendimento agendado</span></div></div><div className="hero-photo portrait"><img src="/images/galeria/profissional-ferramentas.webp" alt="Profissional com ferramentas para reparos residenciais"/><div className="hero-badge"><b>JeitoLar</b><span>Atendimento residencial</span></div></div></div></section>

    <section className="quote-teaser"><div className="container teaser-grid"><div><span className="eyebrow">Orçamento online</span><h2>Monte uma estimativa antes de chamar.</h2><p>Escolha a localidade, combine os serviços e confira uma estimativa com deslocamento antes de enviar a solicitação.</p></div><Link className="btn light" to={quoteUrl}>Calcular agora →</Link></div></section>

    <section className="section" id="servicos"><div className="container"><div className="section-title"><span>Serviços</span><h2>Escolha pelo tipo de serviço</h2><p>A lista é organizada em grupos para você encontrar o que precisa sem limitar o atendimento a poucas páginas específicas.</p></div><div className="service-group-grid">{serviceGroupList.map((group)=><Link to={regionId ? `${group.path}?regiao=${regionId}` : group.path} className="service-group-card" key={group.id}><span className="group-icon" aria-hidden="true">{groupIcons[group.id]}</span><div><span>Grupo de serviços</span><h3>{group.nome}</h3><p>{group.resumo}</p><b>Ver serviços e consultar valores →</b></div></Link>)}</div></div></section>


    <section className="section packages-section" id="pacotes"><div className="container"><div className="section-title"><span>Pacotes de diária</span><h2>Resolva vários serviços em uma única visita</h2><p>Para listas com vários pequenos reparos e instalações, os pacotes por período deixam o custo da mão de obra mais previsível.</p></div><div className="packages-grid">{pacotes.map((pacote) => { const valorHora = Number(pacote.preco) / Number(pacote.horas); return <article className={`package-card ${pacote.horas === 8 ? "featured" : ""}`} key={pacote.id}>{pacote.horas === 8 && <span className="package-badge">Melhor valor por hora</span>}<span className="package-hours">{pacote.horas} horas</span><h3>{pacote.nome}</h3><div className="package-price"><strong>{brl(pacote.preco)}</strong><small>mão de obra</small></div><p>{pacote.descricao}</p><div className="package-hourly">Equivale a <b>{brl(valorHora)}/hora</b></div><Link className="btn" to={quoteUrl}>Montar minha lista</Link></article>; })}</div><p className="packages-note">Deslocamento é calculado conforme a localidade. Materiais, peças, estacionamento/pedágio, descarte e serviços fora do escopo simples não estão incluídos. O pacote é aplicado apenas a serviços elegíveis e conforme o tempo necessário para a lista selecionada.</p></div></section>

    <section className="section soft" id="regioes"><div className="container"><div className="section-title"><span>Onde atendemos</span><h2>Atendimento em diferentes regiões</h2><p>Escolha sua área para conhecer a cobertura e iniciar o orçamento já com o local selecionado.</p></div><div className="location-grid">{localPageList.map((l)=><Link to={l.path} onClick={() => setRegionId(l.id)} className="location-card" key={l.id}><span>Atendimento em</span><h3>{l.shortName}</h3><p>Reparos, instalações, montagem, jardim, quintal e cuidados básicos de piscina.</p><strong>Ver atendimento →</strong></Link>)}</div></div></section>

    <section className="section gallery-section" id="galeria"><div className="container"><div className="section-title"><span>Galeria</span><h2>Serviços que fazem parte da rotina</h2><p>As imagens são exibidas na proporção original, sem cortar os enquadramentos horizontais ou verticais.</p></div><div className="gallery-grid">{gallery.map(([src,alt,orientation])=><figure className={`gallery-item ${orientation}`} key={src}><img loading="lazy" src={src} alt={alt}/></figure>)}</div></div></section>

    <section className="section process"><div className="container"><div className="section-title"><span>Como funciona</span><h2>Do orçamento ao WhatsApp em poucos passos</h2></div><div className="steps"><article><b>1</b><h3>Escolha sua localidade</h3><p>Cidade e bairro ajudam a calcular a estimativa e o deslocamento.</p></article><article><b>2</b><h3>Monte sua lista</h3><p>Adicione serviços, quantidades e detalhes relevantes.</p></article><article><b>3</b><h3>Envie pelo WhatsApp</h3><p>A mensagem já leva itens, valores, localização e observações.</p></article></div></div></section>

    <section className="cta"><div className="container cta-grid"><div><span>Pronto para resolver?</span><h2>Monte sua estimativa agora.</h2><p>Sem cadastro e sem precisar informar telefone no site.</p></div><Link className="btn light" to={quoteUrl}>Começar orçamento</Link></div></section>

    <PocketSection />
  </main>;
}
