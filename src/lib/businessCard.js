export const BUSINESS_CARD_PRINT_URL = "/card/cartao-jeitolar-85x55mm.png?v=2.8";
export const BUSINESS_CARD_WEB_URL = "/card/cartao-jeitolar-web.webp?v=2.8";

export async function saveBusinessCard() {
  const response = await fetch(BUSINESS_CARD_PRINT_URL, { cache: "no-store" });
  if (!response.ok) throw new Error("Não foi possível carregar o cartão.");
  const blob = await response.blob();
  const file = new File([blob], "cartao-jeitolar.png", { type: "image/png" });

  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: "Cartão JeitoLar",
      text: "Cartão de visita JeitoLar"
    });
    return "shared";
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "cartao-jeitolar.png";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  return "downloaded";
}
