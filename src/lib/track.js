// Eventos de conversión para Vercel Web Analytics.
// El script lo inyecta el adapter (webAnalytics en astro.config.mjs) y expone window.va.
// Los eventos personalizados solo se registran en planes Pro/Enterprise; en Hobby se ignoran sin error.
export const trackEvent = (name, data) => {
    if (typeof window === 'undefined') return;
    window.va?.('event', { name, data });
};
