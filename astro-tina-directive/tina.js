/**
 * Custom Astro client directive for TinaCMS visual editing.
 * Only hydrates the component when it's inside the Tina admin iframe —
 * so the editing layer never loads for regular site visitors.
 *
 * @type {import('astro').ClientDirective}
 */
export default async (load, _opts, _el) => {
  if (!isInIframe()) return;
  const hydrate = await load();
  await hydrate();
};

function isInIframe() {
  try {
    return window.self !== window.top;
  } catch {
    // Cross-origin access blocked — we're in an iframe
    return true;
  }
}
