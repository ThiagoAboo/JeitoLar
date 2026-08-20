let deferredPrompt = null;
const listeners = new Set();

function notify() {
  for (const listener of listeners) listener(deferredPrompt);
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    notify();
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    notify();
  });
}

export function subscribeInstallPrompt(listener) {
  listeners.add(listener);
  listener(deferredPrompt);
  return () => listeners.delete(listener);
}

export function getInstallPrompt() {
  return deferredPrompt;
}

export async function promptInstall() {
  if (!deferredPrompt) return null;
  const prompt = deferredPrompt;
  prompt.prompt();
  const result = await prompt.userChoice;
  if (result.outcome === "accepted") {
    deferredPrompt = null;
    notify();
  }
  return result;
}

export function isStandalone() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

export function isIOS() {
  if (typeof window === "undefined") return false;
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}
