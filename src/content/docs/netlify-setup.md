---
title: "Deploying on Netlify"
description: "Create your Netlify account and deploy the site for the first time"
order: 4
---

Netlify is the service that hosts your website — it's what makes your site available at your domain. Setup takes about 15 minutes.

## Step 1: Create a Netlify Account

1. Go to [netlify.com](https://www.netlify.com)
2. Click **Sign up**
3. Choose **Sign up with GitHub** — this links your Netlify and GitHub accounts automatically, which makes the next steps easier

## Step 2: Import Your Repository

Once you're logged in to Netlify:

1. Click **Add new site** → **Import an existing project**
2. Click **Deploy with GitHub**
3. You may be asked to authorize Netlify to access GitHub — click **Authorize Netlify**
4. You'll see a list of your repositories. Find your HGP repository and click it.

## Step 3: Configure the Build Settings

On the next screen, Netlify asks how to build your site. Enter these settings exactly:

| Setting | Value |
|---------|-------|
| **Branch to deploy** | `main` |
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |

Leave all other settings at their defaults.

> **Don't click Deploy yet** — you need to add environment variables first (next step).

## Step 4: Add Environment Variables

Environment variables are like a private settings panel — they give the site access to external services without putting sensitive information in the code.

Click **Add environment variables** (you'll see this option before deploying, or you can find it later under **Site configuration → Environment variables**).

You need to add four variables. You'll get the Tina values in the [next section](/docs/tina-setup), but you can set up the PayPal one now:

| Variable name | What it is | Where to get it |
|---------------|-----------|----------------|
| `TINA_PUBLIC_CLIENT_ID` | Identifies your Tina Cloud project | app.tina.io → your project → Settings → Configuration |
| `TINA_TOKEN` | Allows the site to read content from Tina Cloud | [Tina Cloud setup →](/docs/tina-setup) |
| `TINA_SEARCH_TOKEN` | Powers the search on your Past Programs page | [Tina Cloud setup →](/docs/tina-setup) |
| `PUBLIC_PAYPAL_CLIENT_ID` | Powers the PayPal buttons on the Join page | See below |

### Getting your PayPal Client ID

1. Go to [developer.paypal.com](https://developer.paypal.com) and log in with your PayPal business account
2. Click **Apps & Credentials**
3. Make sure the toggle in the top right is set to **Live** (not Sandbox)
4. Click your app, or create a new one if needed
5. Copy the **Client ID** — paste it as the value for `PUBLIC_PAYPAL_CLIENT_ID`

> **Sandbox vs. Live:** Sandbox uses fake money for testing. The live site needs the **Live** Client ID so real payments go through.

## Step 5: Deploy the Site

Click **Deploy site**. Netlify will start building your site. This takes about 60–90 seconds.

## Step 6: Connect Your Custom Domain (optional, do later)

Once the site is working on the Netlify subdomain, you can point your real domain (portlandhumanists.org) to Netlify:

1. **Site configuration** → **Domain management** → **Add a domain**
2. Enter your domain name
3. Netlify will give you instructions for updating your DNS settings with your domain registrar (wherever you bought the domain)
4. DNS changes can take up to 48 hours to propagate, but usually happen within a few hours

---

**Next step:** [Managing Your Site →](/docs/managing-content)
