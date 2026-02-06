# DH Tutorial Lab

An interactive web-based tutorial environment for introduction to digital humanities. Features personalized learning pathways, in-browser Python code execution, note-taking, and Obsidian export.

All data stays on your device. No accounts, no tracking, no servers.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm (included with Node.js)

## Local Development

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch
```

## Building for Production

```bash
npm run build
```

Output goes to the `dist/` directory.

## Deploying

The build output is a static site (HTML + JS + CSS). No backend server is needed.

### GitHub Pages

1. Build the project: `npm run build`
2. Push the `dist/` folder to a `gh-pages` branch, or use a GitHub Action to automate it.

### Netlify / Vercel / Cloudflare Pages

1. Connect your repository.
2. Set the build command to `npm run build`.
3. Set the publish directory to `dist`.
4. Deploy.

### Self-hosting

Serve the `dist/` directory with any static file server:

```bash
# Using the built-in preview server
npm run preview

# Or with any static server, e.g. Python
cd dist && python3 -m http.server 8080
```

For SPA routing to work, configure your server to fall back to `index.html` for all routes. Example nginx config:

```nginx
server {
    listen 80;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Tech Stack

- React 19, TypeScript, Vite
- Tailwind CSS v4
- Zustand (state management, persisted to localStorage)
- React Router v7
- react-markdown + remark-gfm
- JSZip (Obsidian export)
- Vitest + React Testing Library
