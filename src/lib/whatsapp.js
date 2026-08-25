export const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "5521992244753";

export const buildWhatsAppUrl = (message) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
