import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// Every route is served from a prerendered file with real markup inside
// #root, so the client attaches to that markup rather than discarding it and
// rendering again. See plugins/prerender-meta.ts and scripts/prerender.mjs.
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <App />
  </StrictMode>,
);
