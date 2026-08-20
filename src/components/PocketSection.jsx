import { useState } from "react";
import { Link } from "react-router-dom";
import { BUSINESS_CARD_WEB_URL, saveBusinessCard } from "../lib/businessCard";

export default function PocketSection() {
  const [status, setStatus] = useState("");

  async function saveCard() {
    setStatus("");
    try {
      const result = await saveBusinessCard();
      setStatus(result === "shared"
        ? "No celular, escolha a opção de salvar a imagem na galeria/fotos quando ela aparecer."
        : "O cartão foi baixado. No celular, abra o arquivo e salve em Fotos/Galeria se necessário.");
    } catch (error) {
      if (error?.name !== "AbortError") setStatus("Não foi possível abrir o cartão. Tente novamente.");
    }
  }

  return (
    <section className="section pocket-section" id="jeitolar-no-bolso">
      <div className="container pocket-grid">
        <div className="pocket-copy">
          <span className="eyebrow">JeitoLar no bolso</span>
          <h2>Carregue o JeitoLar no bolso.</h2>
          <p>
            Instale o JeitoLar no celular ou guarde nosso cartão de visita para ter os contatos sempre à mão.
          </p>
          <div className="pocket-actions">
            <Link className="btn" to="/instalar/">Instalar no celular</Link>
            <Link className="btn-secondary-card" to="/card/cartao-imprimir.html" target="_blank" rel="noopener noreferrer">Imprimir cartão</Link>
            <button type="button" className="btn-secondary-card" onClick={saveCard}>Salvar na galeria</button>
          </div>
          {status && <p className="pocket-status" role="status">{status}</p>}
          <div className="pocket-contact-mini">
            <span>WhatsApp: (21) 99224-4753</span>
            <span>Instagram: @jeitolar.rj</span>
          </div>
        </div>
        <figure className="business-card-preview">
          <img src={BUSINESS_CARD_WEB_URL} alt="Cartão de visita JeitoLar" loading="lazy" />
          <figcaption>Cartão padrão 85 × 55 mm, fundo branco e baixo consumo de tinta.</figcaption>
        </figure>
      </div>
    </section>
  );
}
