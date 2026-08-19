# GitHub and Cloudflare push checklist

## Before you push

- Confirm the app runs locally with `npm install` and `npm run dev`.
- Confirm the production build works with `npm run build`.
- Confirm `.gitignore` excludes `node_modules/`, `dist/`, `.env*`, and editor clutter.
- Confirm `wrangler.toml` sets `assets.not_found_handling = "single-page-application"`, which provides the SPA fallback. Do **not** add `public/_redirects` with `/* /index.html 200` — in this deploy mode it can be rejected as an infinite loop (see CLAUDE.md).
- Confirm `README.md` explains local setup and Cloudflare Pages deployment.

## Create the GitHub repository

1. Go to GitHub and create a **new empty repository**.
2. Do **not** initialize it with a README, license, or `.gitignore`, because this project already includes those files.
3. Copy the repository URL.

## Initialize Git locally

Run these commands from the project root:

```bash
git init -b main
git add .
git commit -m "Initial commit: radiology calculator site"
```

## Connect to GitHub and push

Replace `YOUR-REPO-URL` with your GitHub repository URL:

```bash
git remote add origin YOUR-REPO-URL
git push -u origin main
```

## Alternative with GitHub CLI

If GitHub CLI is installed and authenticated:

```bash
git init -b main
git add .
git commit -m "Initial commit: radiology calculator site"
gh repo create rad-refcalculators --private --source=. --remote=origin --push
```

## Connect Cloudflare

This project deploys as a Worker with static assets (see `wrangler.toml`), not as a
classic Pages project.

1. Log in to Cloudflare.
2. Open **Workers & Pages**.
3. Choose **Create** > **Import a repository**, and authorize the Cloudflare GitHub App if prompted.
4. Select the GitHub repository.
5. Use these build settings:
   - Production branch: `main`
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
6. Save and deploy.

Every later push to `main` rebuilds and redeploys automatically.

## Add a custom domain

1. Open the deployed project.
2. Go to **Settings** > **Domains & Routes** > **Add** > **Custom domain**.
3. Add the subdomain (production: `radref.hash.immo`).
4. Because `hash.immo` is already on Cloudflare DNS, the required record is created
   automatically; no manual DNS entry is needed.

## First post-push checks

- Open the `*.workers.dev` URL.
- Test `/`, `/tirads`, `/lirads`, and `/orads` directly.
- Confirm copy buttons work in a secure browser context.
- Confirm mobile layout looks good on a phone.
- Confirm the custom domain works after DNS propagates.

## Routine update flow

```bash
git add .
git commit -m "Update calculator logic"
git push
```

Each push to the connected branch should trigger a new Cloudflare Pages deployment.
