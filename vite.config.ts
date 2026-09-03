import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { prerenderMeta } from './plugins/prerender-meta';

const { version } = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf-8'),
);

// https://vite.dev/config/
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler'],
          // Gives every styled component a stable, source-derived id. Without
          // it the ids come from a render-order counter, which the client and
          // SSR bundles have no reason to agree on — the prerendered markup
          // would carry class names the client stylesheet never defines.
          ['babel-plugin-styled-components', { ssr: true, displayName: false }],
        ],
      },
    }),
    prerenderMeta(),
  ],
  ssr: {
    // styled-components is CJS. Left external, Node's interop hands the SSR
    // bundle a namespace object whose default export is undefined and every
    // `styled.x` call throws. Bundling it keeps the ESM default intact.
    noExternal: ['styled-components'],
  },
});
