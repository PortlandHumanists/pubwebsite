// Tell TypeScript/Astro that client:tina is a valid directive
declare module 'astro' {
  interface AstroClientDirectives {
    'client:tina'?: boolean;
  }
}
