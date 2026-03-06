# Daudi Symon — Personal Portfolio

Personal portfolio and freelance services site built with **Vite + Tailwind CSS v4**.

## Tech Stack

- **Vite** — build tool & dev server
- **Tailwind CSS v4** — utility-first styling
- **Bootstrap Icons** — icon library (CDN)
- **AOS** — scroll animations (CDN)
- **Vanilla JS (ES Modules)** — all interactions

## Getting Started

### Prerequisites
- Node.js v18+ installed

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/DAUD09/daudi-portfolio.git
cd daudi-portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
```

Output goes to `dist/` — deploy this folder to GitHub Pages or any static host.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
daudi-portfolio/
├── src/
│   ├── main.js        # JS entry: AOS, navbar, typed text, form, interactions
│   └── style.css      # Tailwind v4 entry + design tokens + component classes
├── images/            # Profile photo, favicon, og-cover (add your own)
├── assets/            # CV PDF and other static assets
├── index.html         # Main HTML with all sections + SEO meta
├── vite.config.js     # Vite + Tailwind plugin config
├── package.json
└── .gitignore
```

## Customisation Checklist

- [x] Add your profile photo to `images/profile.jpg` and update `index.html` avatar sections
- [x] Add your CV PDF to `assets/Daudi_Symon_CV.pdf`
- [x] Add `images/favicon.png` and `images/og-cover.jpg`
- [x] Update your Credly profile URL (search `credly.com/users/daudi-symon`)
- [x] Contact form connected via Formspree

## Deployment (GitHub Pages)

1. Push to GitHub
2. Go to Settings → Pages → Source: `GitHub Actions`
3. Or run `npm run build` and deploy `dist/` manually

## Security Features

- Content Security Policy meta tag
- `rel="noopener noreferrer"` on all external links
- Input sanitization on contact form
- No secrets or API keys in codebase
- `.env` files gitignored
- Production build drops `console.*` and `debugger`
- Cache-busted asset filenames

## License

© 2025 Daudi Symon. All rights reserved.
