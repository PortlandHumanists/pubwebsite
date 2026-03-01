/**
 * Astro integration that registers the client:tina directive.
 * Add to integrations in astro.config.mjs.
 *
 * @type {() => import('astro').AstroIntegration}
 */
export default () => ({
  name: 'client:tina',
  hooks: {
    'astro:config:setup': ({ addClientDirective }) => {
      addClientDirective({
        name: 'tina',
        entrypoint: './astro-tina-directive/tina.js',
      });
    },
  },
});
