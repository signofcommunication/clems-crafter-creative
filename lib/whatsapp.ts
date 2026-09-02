export const WHATSAPP_NUMBER = "628881513797";

export const WHATSAPP_MESSAGE =
  "Halo Clems Grafter Creative, saya ingin konsultasi mengenai project saya.";

export function buildWhatsAppHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_HREF = buildWhatsAppHref(WHATSAPP_MESSAGE);

export const WHATSAPP_SERVICES = [
  {
    label: "Custom Software Development",
    message:
      "Halo Clems Grafter Creative, saya ingin konsultasi mengenai Custom Software Development untuk project saya.",
  },
  {
    label: "AI Solution",
    message:
      "Halo Clems Grafter Creative, saya ingin konsultasi mengenai AI Solution untuk project saya.",
  },
  {
    label: "Application Enhancement",
    message:
      "Halo Clems Grafter Creative, saya ingin konsultasi mengenai Application Enhancement untuk project saya.",
  },
  {
    label: "Other",
    message:
      "Halo Clems Grafter Creative, saya masih belum yakin butuh layanan yang mana. Mohon dibantu untuk konsultasi lebih lanjut.",
  },
] as const;
