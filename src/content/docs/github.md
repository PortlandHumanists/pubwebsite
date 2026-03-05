---
title: "Your GitHub Repository"
description: "What GitHub is and how the code for your site lives there"
order: 2
---

## What Is GitHub?

GitHub is a service that stores code — think of it like Google Drive, but designed specifically for software projects. Every change to your site's code is saved there as a timestamped record, so you can always see what changed and when.

For your site, GitHub serves two purposes:

1. **It's where the code lives** — all the templates, layouts, and configuration files that define how the site looks and works
2. **It's the trigger for deploys** — whenever a file in GitHub changes (either from a code update or a CMS edit), Netlify automatically rebuilds and republishes the site

## What You'll See in Your Repository

Go to your repository at **[github.com/PortlandHumanists/pubwebsite](https://github.com/PortlandHumanists/pubwebsite)**. You'll see a list of files and folders:

| Folder / File | What's inside |
|---------------|--------------|
| `src/content/events/` | Your Sunday Programs — one markdown file per event |
| `src/content/pages/` | Your static pages (About, Humanism, etc.) |
| `src/content/settings/` | Site-wide settings (contact email, theme color) |
| `src/content/join/` | The content for your membership/join page |
| `public/` | Images, your logo, and other files served directly |
| `tina/` | The CMS schema — defines what fields appear in the editor |
| `src/` | The site's templates and layout components |

You don't need to edit any of these files directly. All your day-to-day content changes happen through the **Tina CMS editor** at `/admin`.

## How Content Changes Flow Through GitHub

When you edit something in Tina CMS and click Save, Tina automatically commits the change to your GitHub repository behind the scenes. You can actually see this happen:

1. Make a change in Tina and save it
2. Go to [github.com/PortlandHumanists/pubwebsite](https://github.com/PortlandHumanists/pubwebsite)
3. Click **Commits** (near the top of the file list)
4. You'll see a new entry like: *"Updated events/2026-03-01-science-and-morality.md"*

This is the full audit trail of every content change — who changed what, and when.

---

**Next step:** [Setting up TinaCMS →](/docs/tina-setup)
