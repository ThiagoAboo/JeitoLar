import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import { BUSINESS_CARD_PRINT_URL, saveBusinessCard } from "../lib/businessCard";

export default function BusinessCardPage() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (params.get("print") !== "1") return undefined;
    const timer = window.setTimeout(() => window.print(), 500);
    return () => window.clearTimeout(timer);
  }, [params]);

  async function saveCard() {
    setStatus("");
    try {
      const result = await saveBusinessCard();
      setStatus(result === "shared"
        ? "Use a folha de compartilhamento para salvar a imagem em Fotos/Galeria."
        : "Cartão baixado com sucesso.");
    } catch (error) {
      if (error?.name !== "AbortError") setStatus("Não foi possível salvar o cartão.");
    }
  }

  return (
    <main className="business-card-page">
      <SEO
        title="Cartão de visita JeitoLar"
        description="Cartão de visita da JeitoLar para impressão ou salvamento no celular."
        path="/cartao/"
        noindex
      />
      <div className="container business-card-page-shell">
        <div className="business-card-page-actions no-print-card">
          <div>
            <span className="eyebrow">Cartão JeitoLar</span>
            <h1>Pronto para imprimir ou guardar.</h1>
            <p>O arquivo foi preparado na proporção padrão de 85 × 55 mm.</p>
          </div>
          <div className="pocket-actions">
            <button className="btn" type="button" onClick={() => window.open("/card/cartao-imprimir.html", "_blank", "noopener,noreferrer")}>Imprimir cartão</button>
            <button className="btn-secondary-card" type="button" onClick={saveCard}>Salvar na galeria</button>
          </div>
          {status && <p className="pocket-status">{status}</p>}
        </div>
        <div className="business-card-print-sheet">
          <img src={BUSINESS_CARD_PRINT_URL} alt="Cartão de visita JeitoLar" />
        </div>
      </div>
    </main>
  );
}
