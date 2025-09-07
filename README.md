## Ecommerce Frontend

A modern, TypeScript-based ecommerce frontend. This app provides product browsing, cart management, checkout flows, and customer experiences. It is designed to work with a companion NestJS backend.

- Backend repository: [NestJS Backend Repository](https://github.com/your-org/your-backend-repo) — replace with your actual URL

### Features
- Product listing, detail pages, and search
- Cart and checkout flows
- Responsive, accessible UI components
- TypeScript-first, modular architecture

### Tech Stack
- React + TypeScript
- State management: React hooks/context (and/or your chosen library)
- Build tooling: Vite or CRA (this README covers both patterns)
- Styling: Your project’s CSS solution (e.g., CSS Modules, Tailwind, etc.)

### Prerequisites
- Node.js 18+ and npm 9+
- A running backend API (NestJS). See: [NestJS Backend Repository](https://github.com/your-org/your-backend-repo)

### Getting Started
1) Clone the repository
```bash
git clone https://github.com/your-org/ecommerce-frontend.git
cd ecommerce-frontend
```

2) Install dependencies
```bash
npm install
```

3) Configure environment variables
- Create a `.env` file in the project root. Depending on your tooling, use one of the following variables:
  - If using Vite: `VITE_API_BASE_URL=https://localhost:3000`
  - If using Create React App: `REACT_APP_API_BASE_URL=https://localhost:3000`

4) Start the development server
```bash
npm run dev
```

5) Build for production
```bash
npm run build
```

6) Preview the production build (if supported)
```bash
npm run preview
```

### Common Scripts
- `npm run dev`: Start the development server
- `npm run build`: Create an optimized production build
- `npm run preview`: Preview the production build locally (Vite)
- `npm run test`: Run tests (if configured)
- `npm run lint`: Run linting
- `npm run format`: Format code (if configured with Prettier)

### Environment Variables
Define the API base URL used by the frontend to talk to the NestJS backend.

For Vite:
```bash
VITE_API_BASE_URL="http://localhost:3000"
```

For Create React App:
```bash
REACT_APP_API_BASE_URL="http://localhost:3000"
```

You can add other variables as needed (e.g., feature flags, analytics keys). Ensure only variables intended for the browser are prefixed correctly (`VITE_` for Vite, `REACT_APP_` for CRA).

### Project Structure (indicative)
```text
ecommerce-frontend/
  src/
    components/
      customer/
        Shop.tsx
    pages/                # Route-level pages (if applicable)
    hooks/                # Custom React hooks
    services/             # API clients and integrations
    utils/                # Utilities and helpers
    assets/               # Static assets
    styles/               # Global styles
  public/                 # Static public files (favicons, robots.txt)
```

### Running the Backend (NestJS)
Start the backend before the frontend for a working end-to-end environment.

1) Follow setup in: [NestJS Backend Repository](https://github.com/your-org/your-backend-repo)
2) Confirm the backend is running, e.g., `http://localhost:3000`
3) Set the frontend API base URL env variable accordingly (see Environment Variables above)

### Development Workflow
- Use feature branches for new work
- Keep commits small and descriptive
- Run `npm run lint` before pushing
- Include or update tests where applicable

### Testing
If the project includes tests, you can run them with:
```bash
npm run test
```

Consider adding component/unit tests (e.g., Vitest/Jest + React Testing Library) and E2E tests (e.g., Cypress/Playwright) as the app grows.

### Linting and Formatting
```bash
npm run lint
npm run format
```

### Deployment
- Build the app using `npm run build`
- Serve the generated artifacts from your preferred static host (e.g., Netlify, Vercel, S3 + CloudFront, Nginx)
- Ensure the runtime environment points `VITE_API_BASE_URL`/`REACT_APP_API_BASE_URL` to your production backend

### Troubleshooting
- 404s or CORS errors: Verify the backend URL and CORS settings on the NestJS server
- Env variables not taking effect: Restart the dev server after changing `.env`
- API calls failing: Check network tab for the requested URL and status codes

### Contributing
- Open an issue for bugs and feature requests
- Fork the repo and open a PR with a clear description

### License
This project is licensed under the MIT License. See `LICENSE` (or update with your actual license).

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
