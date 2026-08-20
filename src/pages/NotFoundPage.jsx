import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFoundPage() {
  return (
    <main className="not-found">
      <SEO
        title="Página não encontrada | JeitoLar"
        description="A página solicitada não foi encontrada."
        path="/404/"
      />
      <div className="container">
        <span className="eyebrow">404</span>
        <h1>Página não encontrada</h1>
        <p>Volte para o site da JeitoLar ou escolha uma das regiões atendidas.</p>
        <Link className="btn inline-btn" to="/">Voltar para o início</Link>
      </div>
    </main>
  );
}
