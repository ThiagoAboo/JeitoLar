import { Link } from "@tanstack/react-router";

export default function NotFoundPage() {
  return (
    <main className="not-found">
      <div className="container">
        <span className="eyebrow">404</span>
        <h1>Página não encontrada</h1>
        <p>Volte ao início ou monte seu orçamento.</p>
        <Link className="btn" to="/">
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
