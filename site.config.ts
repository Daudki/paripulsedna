// Everything you need to change for this site lives here.
export const SITE_NAME = "BonusDNA";
// The real domain, no trailing slash. SITE_URL can also be set as an environment variable on Vercel.
export const SITE_URL = "https://bonusdna.com";
export const BOOKMAKER = "PariPulse";
export const PROMO_CODE = "DNA";
export const REGISTER_URL =
  "https://refpa88642.com/L?tag=d_6282661m_64499c_&site=6282661&ad=64499&r=promotions/deposit-bonus";
// Google Search Console: paste the verification code from the "HTML tag" method here (just the content value),
// or verify by DNS and leave it empty. Can also be set as the GOOGLE_SITE_VERIFICATION environment variable.
export const GOOGLE_SITE_VERIFICATION = "";

// Colours of the whole page. Change them here and rebuild; nothing else needs editing.
export const THEME = {
  brand: "#c8372d", // buttons, highlights
  brandHover: "#b32e25", // buttons on hover
  brandText: "#ff6b60", // brand-coloured text on dark backgrounds (lighter so it stays readable)
  bg: "#1b2331", // page background
  bgAlt: "#232d3f", // alternating bands
  surface: "#2b3750", // cards
  panel: "#252f43", // panels
  deep: "#151b27", // footer, darkest areas
  gold: "#d4a72c", // notices
};
export const ACCENT = THEME.brand;

// Date the promo page content was last checked against PariPulse. Update it whenever you re-check the offers.
export const LAST_UPDATED = "2026-11-05";

// Offers shown on the promo page. Leave `details` empty until you have confirmed the exact offer for
// your code in the affiliate dashboard (amounts differ by country and change). Example: "100% up to $100".
export const OFFERS: { name: string; details: string }[] = [
  { name: "First-deposit sports bonus", details: "" },
  { name: "Casino welcome offer", details: "" },
];
