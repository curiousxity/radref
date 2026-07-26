# GitHub and Cloudflare push checklist

## Before you push

- Confirm the app runs locally with `npm install` and `npm run dev`.
- Confirm the production build works with `npm run build`.
- Confirm `.gitignore` excludes `node_modules/`, `dist/`, `.env*`, and editor clutter.
- Confirm `public/_redirects` exists with `/* /index.html 200` for SPA routing.
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

## Connect Cloudflare Pages

1. Log in to Cloudflare.
2. Open **Workers & Pages**.
3. Choose **Create application** > **Pages** > **Connect to Git**.
4. Select the GitHub repository.
5. Use these build settings:
   - Production branch: `main`
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Save and deploy.

Cloudflare Pages can connect directly to GitHub repositories and deploy automatically whenever you push changes to the connected branch.

## Add a custom domain

1. Open the deployed Pages project.
2. Go to **Custom domains**.
3. Add your desired domain or subdomain.
4. Follow the DNS prompts if Cloudflare asks for them.

## First post-push checks

- Open the `*.pages.dev` URL.
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
