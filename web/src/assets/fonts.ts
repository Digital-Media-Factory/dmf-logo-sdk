/**
 * Font loader & styling definitions for DMF Web SDK.
 * Injects Google Fonts for 'Outfit' and 'Plus Jakarta Sans' dynamically if not already loaded.
 */

const GOOGLE_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Outfit:wght@900&family=Plus+Jakarta+Sans:wght@500;800&display=swap';

export function injectDmfFonts(): void {
  if (typeof document === 'undefined') return;

  const linkId = 'dmf-google-fonts';
  if (document.getElementById(linkId)) return;

  const preconnect1 = document.createElement('link');
  preconnect1.rel = 'preconnect';
  preconnect1.href = 'https://fonts.googleapis.com';
  document.head.appendChild(preconnect1);

  const preconnect2 = document.createElement('link');
  preconnect2.rel = 'preconnect';
  preconnect2.href = 'https://fonts.gstatic.com';
  preconnect2.crossOrigin = 'anonymous';
  document.head.appendChild(preconnect2);

  const fontLink = document.createElement('link');
  fontLink.id = linkId;
  fontLink.rel = 'stylesheet';
  fontLink.href = GOOGLE_FONTS_HREF;
  document.head.appendChild(fontLink);
}

export const DMF_FONTS = {
  outfit: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  plusJakarta: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
} as const;
