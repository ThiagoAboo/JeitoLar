import { useEffect, useState } from "react";

function isStandaloneMode() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

export default function SplashScreen() {
  // Sempre inicia oculto para o HTML do servidor bater com a hidratação.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isStandaloneMode()) return;
    try {
      if (sessionStorage.getItem("jeitolarSplashSeen") === "1") return;
    } catch {
      /* sessionStorage indisponível: mostra mesmo assim */
    }
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return undefined;
    const timer = window.setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("jeitolarSplashSeen", "1");
      } catch {
        /* ignora */
      }
    }, 1150);
    return () => window.clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="app-splash" role="status" aria-label="Abrindo JeitoLar">
      <img src="/logo-jeitolar.png" alt="JeitoLar - Reparos, Instalações e Manutenção" />
    </div>
  );
}
