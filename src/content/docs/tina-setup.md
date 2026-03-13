---
title: "Setting Up Tina CMS"
description: "Create your Tina Cloud account and connect it to your site"
order: 3
---

Tina CMS is the editing interface that lets you update content on your site without touching any code. It runs at `/admin` on your site (e.g., `portlandhumanists.org/admin`).

Setup takes about 10 minutes.

## Step 1: Create a Tina Account

1. Go to [tina.io](https://tina.io)
2. Click **Start Free**
3. Choose **Sign in with GitHub** — this connects your Tina and GitHub accounts

## Step 2: Create a New Project

Once you're logged in:

1. Click **New Project**
2. Click **Connect GitHub**
3. GitHub will ask you to authorize Tina — click **Authorize TinaCMS**
4. You'll see a list of your repositories. Click your HGP repository.
5. Click **Save**

Tina will spend a moment indexing your content. When it's done, you'll see your project dashboard.

## Step 3: Get Your Tokens

Tina uses a client ID and two tokens to connect your site to Tina Cloud. You'll add all three to Netlify in the next section.

On your Tina project page:

1. Click **Settings → Configuration** and copy the **Client ID** — this is your `TINA_PUBLIC_CLIENT_ID`
2. Click **Settings → Tokens** and copy both:
   - **Content Token** — this is your `TINA_TOKEN`
   - **Search Token** — this is your `TINA_SEARCH_TOKEN`
3. Save all three somewhere handy (a text file or email draft) — you'll paste them into Netlify shortly

> **Keep the tokens private.** The Client ID is safe to share, but the tokens give read access to your content.

## Step 4: Test the CMS

Once the Netlify deploy is complete (next section), you can verify the CMS is working:

1. Go to your site URL (e.g., `https://your-site.netlify.app`)
2. Add `/admin` to the end: `https://your-site.netlify.app/admin`
3. You'll be prompted to sign in with GitHub — use the same GitHub account
4. You should see the Tina CMS dashboard with your content collections on the left

If you see your content in the sidebar (Events, Pages, Settings, etc.), everything is working.

---

## Troubleshooting

**The deploy is still failing after adding tokens**

Double-check that the variable names are spelled exactly right (they're case-sensitive):
- `TINA_TOKEN` — not `TinaToken` or `tina_token`
- `TINA_SEARCH_TOKEN` — not `TINA_search_token`

**I see a blank page or error at `/admin`**

Try a hard refresh (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac). If that doesn't help, check the Netlify deploy log for errors — it usually tells you what went wrong.

**The CMS loads but shows no content**

This usually means Tina Cloud hasn't finished indexing. Wait a few minutes and refresh.

---

**Next step:** [Deploying to Netlify →](/docs/netlify-setup)
