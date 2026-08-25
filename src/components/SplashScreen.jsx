import { useEffect, useState } from "react";

function isStandaloneMode() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

export default function SplashScreen() {
  const [visible, setVisible] = useState(() => {
    if (!isStandaloneMode()) return false;
    try { return sessionStorage.getItem("jeitolarSplashSeen") !== "1"; }
    catch { return true; }
  });

  useEffect(() => {
    if (!visible) return undefined;
    let hideTimer;
    const timer = window.setTimeout(() => {
      setVisible(false);
      try { sessionStorage.setItem("jeitolarSplashSeen", "1"); } catch {}
    }, 1150);
    hideTimer = timer;
    return () => window.clearTimeout(hideTimer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="app-splash" role="status" aria-label="Abrindo JeitoLar">
      <img src="/logo-jeitolar.png" alt="JeitoLar - Reparos, Instalações e Manutenção" />
    </div>
  );
}
