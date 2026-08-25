import { useEffect, useState } from "react";
import SEO from "../components/SEO";
import { isIOS, isStandalone, promptInstall, subscribeInstallPrompt } from "../lib/pwaInstall";

export default function InstallPage() {
  const [canPrompt, setCanPrompt] = useState(false);
  const [installed, setInstalled] = useState(isStandalone());
  const ios = isIOS();

  useEffect(() => subscribeInstallPrompt((prompt) => {
    setCanPrompt(Boolean(prompt));
    setInstalled(isStandalone());
  }), []);

  async function install() {
    const result = await promptInstall();
    if (result?.outcome === "accepted") setInstalled(true);
  }

  return <main>
    <SEO
      title="Instalar JeitoLar no celular | JeitoLar"
      description="Instale o site da JeitoLar como aplicativo no Android ou iPhone para acessar orçamento e serviços diretamente da tela inicial."
      path="/instalar/"
    />

    <section className="install-page">
      <div className="container install-shell">
        <div className="install-intro">
          <img src="/pwa/icon-192.png" alt="Ícone do aplicativo JeitoLar" />
          <span className="eyebrow">JeitoLar no celular</span>
          <h1>Instale como aplicativo.</h1>
          <p>O mesmo site da JeitoLar pode ficar na tela inicial do seu celular, abrir em tela própria e manter o orçamento sempre à mão.</p>
          {installed && <div className="install-success">JeitoLar já está instalado neste dispositivo.</div>}
          {!installed && canPrompt && <button type="button" className="btn install-main-button" onClick={install}>Instalar JeitoLar agora</button>}
        </div>

        <div className="install-options">
          <article>
            <span className="install-os">Android</span>
            <h2>Chrome, Edge ou navegador compatível</h2>
            {canPrompt ? <p>Toque em <strong>Instalar JeitoLar agora</strong>. O navegador confirma a instalação e adiciona o aplicativo à sua tela inicial.</p> : <ol><li>Abra este site no Chrome.</li><li>Toque no menu do navegador.</li><li>Escolha <strong>Instalar app</strong> ou <strong>Adicionar à tela inicial</strong>.</li></ol>}
          </article>

          <article>
            <span className="install-os">iPhone / iPad</span>
            <h2>Safari</h2>
            <ol>
              <li>Abra <strong>jeitolar.pages.dev</strong> no Safari.</li>
              <li>Toque no botão <strong>Compartilhar</strong>.</li>
              <li>Escolha <strong>Adicionar à Tela de Início</strong>.</li>
              <li>Confirme em <strong>Adicionar</strong>.</li>
            </ol>
            {ios && <p className="install-note">No iOS, a instalação é feita pelo menu Compartilhar do Safari; o sistema não permite disparar essa confirmação automaticamente.</p>}
          </article>
        </div>

        <div className="install-features">
          <div><strong>Orçamento rápido</strong><span>Acesse direto a calculadora.</span></div>
          <div><strong>Região lembrada</strong><span>Sua região selecionada permanece salva.</span></div>
          <div><strong>Visual de app</strong><span>Abre sem a barra normal do navegador.</span></div>
        </div>
      </div>
    </section>
  </main>;
}
