import QuoteBuilder from "../components/QuoteBuilder";

export default function QuotePage() {
  return (
    <main>
      <section className="quote-hero">
        <div className="container">
          <span className="eyebrow">Orçamento online JeitoLar</span>
          <h1>Monte sua estimativa.</h1>
          <p>
            Selecione o local e os serviços. A estimativa é atualizada automaticamente enquanto
            você monta a solicitação para enviar pelo WhatsApp.
          </p>
        </div>
      </section>
      <section className="quote-section">
        <div className="container">
          <QuoteBuilder />
        </div>
      </section>
    </main>
  );
}
