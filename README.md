# EuGreen Energy

European energy consulting landing page for [eugreen.energy](https://eugreen.energy).

**Live site (GitHub Pages):** https://kubilayelmas35.github.io/eugreen-energy/

## Stack

- Static HTML / CSS / JS
- Multi-step form with Wix CMS via `postMessage`
- i18n (DE, EN, ES, FR, TR + EU languages)
- Light / dark theme

## Wix

- iframe element: `#html1`
- Page code: see `WIX-VELO-PAGE.js`
- CMS collection: `EuGreenLeads`

## Local

```bash
npx serve .
```

## Deploy

```bash
git add .
git commit -m "your message"
git push
```

Rebuild single-file embed: `node build-embed.js`
