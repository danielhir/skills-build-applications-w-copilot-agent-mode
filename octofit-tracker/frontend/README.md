# OctoFit Tracker frontend

## API configuration

The frontend reads `VITE_CODESPACE_NAME` with `import.meta.env` and requests API resources at:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

Define `VITE_CODESPACE_NAME` in a local environment file such as `.env.local` when running in Codespaces:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When the variable is unset, the frontend safely falls back to `http://localhost:8000/api/[component]/`.

Copy `.env.example` to `.env.local` as a starting point. Vite reads `VITE_*` values at build time, so restart the dev server after changing the file.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
