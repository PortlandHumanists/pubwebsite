---
title: "Setting Up a Subdomain"
description: "How to add a subdomain pointing to the legacy Pantheon/Drupal site"
order: 6
---

> **Note:** This guide applies only to the legacy Drupal site hosted on Pantheon (the old `portlandhumanists.org`). It is not relevant to the new Astro site hosted on Netlify.

When adding a subdomain (e.g. `members.portlandhumanists.org`) that points to the Pantheon-hosted Drupal site, three things need to happen: DNS, HTTPS verification, and allowing the domain in the app.

## Step 1 — Add the domain in Pantheon
1. Log into [dashboard.pantheon.io](https://dashboard.pantheon.io)
2. Open the site → **Live** environment → **Domains / HTTPS**
3. Click **Add Domain** and enter the subdomain (e.g. `members.portlandhumanists.org`)
4. Pantheon will give you a **TXT record** for HTTPS verification — copy the Host and Value

## Step 2 — Add DNS records in Namecheap
1. Log into Namecheap → **Advanced DNS** for `portlandhumanists.org`
2. Add a **CNAME** record:
   - Host: `members`
   - Value: `live-hgp7.pantheonsite.io`
3. Add a **TXT** record for HTTPS verification:
   - Host: `_acme-challenge.members` *(do NOT include `.portlandhumanists.org` — Namecheap adds it automatically)*
   - Value: *(the value Pantheon gave you)*

## Step 3 — Verify HTTPS in Pantheon
1. Back in Pantheon → **Domains / HTTPS** → click **Details** next to the subdomain
2. Click **Verify Ownership**
3. If it generates a new TXT value, update the Namecheap record and verify again

## Step 4 — Allow the subdomain in settings.php
The Drupal app has a hardcoded redirect to `www.portlandhumanists.org`. Any new subdomain must be added to the allowed list in `sites/default/settings.php` around line 606:

```php
$allowed_domains = ['www.portlandhumanists.org', 'member.portlandhumanists.org', 'members.portlandhumanists.org'];
$primary_domain = in_array($_SERVER['HTTP_HOST'], $allowed_domains) ? $_SERVER['HTTP_HOST'] : 'www.portlandhumanists.org';
```

Add the new subdomain to the `$allowed_domains` array, then deploy:

```bash
git add sites/default/settings.php
git commit -m "Allow [subdomain] without redirect"
git push origin master
```

Then deploy **Dev → Test → Live** in the Pantheon dashboard.

## Step 5 — Clear Varnish cache
After deploying to Live, clear the cache in Pantheon: **Live environment → Clear Caches**. Otherwise the old redirect may be served for up to 24 hours.
