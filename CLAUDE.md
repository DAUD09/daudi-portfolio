# CLAUDE.md — daudi-portfolio

Guidance for AI agents (Claude Code or otherwise) working in this repository.

## Project overview
- Personal portfolio site for Daudi Symon — daudisymon.xyz
- Stack: Vite 5.x + Tailwind CSS v4, vanilla JS, Bootstrap Icons, AOS
- Deployed to GitHub Pages via GitHub Actions (`.github/workflows/deploy-pages.yml`)
- Repo: DAUD09/daudi-portfolio

## Secrets & things to NEVER log, print, or commit
- Formspree endpoint form ID (`mlgprbgj` or any future ID) — public-facing in the
  submitted form but treat any *new* Formspree keys or dashboard tokens as secret
- Google Analytics Measurement ID — already public in shipped HTML, but do not
  print it in logs/commit messages as if it were newly discovered; don't add
  additional GA/GTM property IDs without confirming with Daudi first
- hCaptcha sitekey/secret — the secret key must NEVER appear in client code,
  commit messages, or docs. Only the public sitekey belongs in `index.html`
- Any `.env` file contents — `.env*` must stay in `.gitignore`; never cat, echo,
  or paste `.env` contents into commit messages, PR descriptions, or chat output
- Any future API keys (image hosting, email services, CMS, analytics) — treat as
  secret by default until told otherwise
- Personal contact details beyond what's already public on the live site
  (email, phone) — don't add new personal data to code/docs without being asked

## What's fine to write in commit messages / docs
- Feature descriptions, bug fixes, what changed and why
- Non-secret config values already visible in shipped HTML/JS (e.g. base path,
  public sitekeys, Formspree form ID once it's already in the codebase)
- Deployment notes, DNS setup summaries (domain name is not secret)
- Version bumps, dependency updates

## Coding conventions
- Tailwind utility classes inline in HTML; keep custom component classes
  (`.cv-download-btn`, `.tech-tag`, `.project-status-done`, etc.) defined once
  in `src/style.css`, don't duplicate long utility strings across cards
- JS stays vanilla ES modules in `src/main.js` — no framework migration without
  discussing first
- Match existing project card markup exactly when adding new cards (see
  Projects section structure) — same class names, same icon pattern, same
  `data-aos-delay` increment
- Use `bi bi-*` classes for icons (Bootstrap Icons), not inline SVGs, to stay
  consistent with the rest of the site
- Keep base path (`vite.config.js`) consistent with whatever domain is
  currently active — repo-based path if serving from daud09.github.io/repo,
  `/` if serving from the custom domain

## Commit message format
- Short imperative summary line (e.g. "Fix CV download path", "Add MalawiHarvest project card")
- No AI/assistant attribution footers unless Daudi asks for them

## Deployment
- Push to `main` triggers `.github/workflows/deploy-pages.yml` automatically
- Any change to `vite.config.js` (especially `base`) requires a full
  `npm run build` test locally before pushing, since path changes break
  asset/CV/legal-page links until rebuilt
- `public/CNAME` must contain exactly the custom domain, nothing else, if the
  custom domain is in use — do not remove or modify without explicit instruction

## Before making structural changes
- Don't change `vite.config.js`, deployment workflow files, or DNS-related
  files (CNAME) without flagging the change clearly, since these have caused
  production breakage before (base path mismatches, GitHub Pages 404s)
- Don't re-introduce Cloudflare email obfuscation (`/cdn-cgi/l/email-protection`)
  — email addresses should stay as plain text or a direct `mailto:` link only
