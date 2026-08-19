# Deployment

The site is live at <https://radref.hash.immo>, served by Cloudflare Workers
static assets. This file describes how that works and how to change it.

## How a deploy happens

Push to `main`. GitHub Actions (`.github/workflows/deploy.yml`) runs lint, then
`npm run build`, then publishes with Wrangler. A type error or lint failure
fails the run and nothing ships.

```bash
git add .
git commit -m "Update calculator logic"
git push
```

Two repository secrets make this work, under **Settings > Secrets and variables
> Actions**:

| Secret | Value |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Workers Scripts edit and, on the `hash.immo` zone, Workers Routes edit |
| `CLOUDFLARE_ACCOUNT_ID` | the account ID from the Cloudflare dashboard URL |

The zone permission is the one that is easy to miss. Without it the Worker
publishes but the custom domain is never attached.

## Deploying by hand

Useful when a push cannot wait for CI, or when testing config changes:

```bash
npm run build
npx wrangler deploy
```

This needs `npx wrangler login` once per machine.

## Configuration

Everything lives in `wrangler.toml`; nothing is configured only in the
dashboard.

- `assets.directory = "./dist"` — build output is what gets served.
- `assets.not_found_handling = "single-page-application"` — the SPA fallback
  for client-side routes. Do **not** add a `public/_redirects` file with
  `/* /index.html 200`; under Wrangler static assets that rule can be rejected
  as an infinite loop, and it is redundant with this setting. See `CLAUDE.md`.
- The `[[routes]]` block declares `radref.hash.immo` as a custom domain, so any
  deploy recreates it. `hash.immo` is already on Cloudflare DNS, so the record
  is provisioned automatically.

`workers.dev` and preview URLs are disabled, so the custom domain is the only
way in. Set `workers_dev = true` or `preview_urls = true` in `wrangler.toml` to
change that.

## Checks after a deploy

- Load `/` and a deep route directly, for example `/carotid-stenosis`. A deep
  route that 404s means the SPA fallback has broken; both should return the
  same HTML.
- Confirm the served bundle is the new one: the asset hash in the live page's
  `<script src>` should match `dist/index.html`.
- Confirm `/manifest.webmanifest` and `/sw.js` return 200, since the PWA
  install and offline behaviour depend on them.
- Copy buttons need a secure context, so check them on the real domain rather
  than an IP.
- Check the layout on a phone, which is the primary target.

A newly added subdomain can sit in a local resolver's negative cache. If the
domain does not resolve locally but does on public DNS, flush the cache
(`ipconfig /flushdns` on Windows) rather than assuming the deploy failed.
