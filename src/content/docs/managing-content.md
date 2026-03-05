---
title: "Managing Your Site"
description: "How to add and edit content day-to-day using Tina CMS"
order: 5
---

Once the site is live and Tina is set up, day-to-day editing is done through a web interface — no code, no command line, no FTP. Everything happens in the browser.

## Accessing the Editor

Go to: **`portlandhumanists.org/admin`**

Sign in with GitHub when prompted. The editor opens with your site displayed in the center and a Tina panel on the left (it may be hidden behind a red tab — click it to open the panel).

From here you can either:
- **Navigate within the site** to the page or event you want to edit — the left panel updates to show the fields for whatever you're looking at
- **Use the collections list** in the left panel to jump directly to Events, Pages, Settings, etc.

Once on the "admin" page, click this red tab in the upper left corner to open the editor panel for the current page you are on:

![](/tina-tab.png)

That will open the editing panel allowing you to update the content on the page:
![](/tina-editor.png)


---

## Adding a New Sunday Program

1. Go to **`portlandhumanists.org/admin`** and sign in
2. Click **Events** in the left panel
3. Click **Create new** (or the **+** button)
3. Fill in the fields:

| Field | What to enter |
|-------|--------------|
| **Title** | The talk title, e.g., "Science and Morality" |
| **Date** | The date of the event |
| **Start Time** | e.g., `10:30 AM` |
| **End Time** | e.g., `12:00 PM` — this is important (see note below) |
| **Presenter** | Speaker's full name |
| **Presenter Title** | Their title or affiliation (optional) |
| **Location** | e.g., `Multnomah Arts Center, Room 30` |
| **Description** | A paragraph or two about the talk |

4. Click **Save** when done

> **Why End Time matters:** The site automatically shows events as "upcoming" or "past" based on the end time. Once the end time passes, the event moves to the Past Programs page on the next site rebuild — you don't need to do anything manually.

### If the Event is Online (Zoom)

Check **Speaker Remote** and paste the Zoom link in the **Zoom Link** field. A "Join Zoom" button will appear on the event page.

---

## After the Event: Adding a Recording

Once a recording is posted to YouTube or Vimeo, you can add it to the event so it appears on the Past Programs page.

1. Go to **Events** → find the event
2. Scroll down to the video fields:
   - **YouTube ID** — the part after `?v=` in the YouTube URL
     - Example: `https://youtube.com/watch?v=dQw4w9WgXcQ` → ID is `dQw4w9WgXcQ`
   - **Vimeo ID** — the number in the Vimeo URL
     - Example: `https://vimeo.com/953264237` → ID is `953264237`
3. Paste the ID in the correct field
4. Click **Save**

The recording will appear on the Past Programs page after the next site deploy (usually within a minute or two of saving).

---

## Editing Site Pages

1. Go to **`portlandhumanists.org/admin`** and sign in
2. Navigate to the page you want to edit within the site preview (e.g., click through to the About page)
3. The left panel will show the editable fields for that page
4. Make your changes and click **Save**

The editor supports rich text — bold, italic, links, headings, bullet lists, and more.

---

## Changing Site Settings

Under **Settings** → **General**, you can change:

- **Contact email** — shown in the footer and on the Contact page
- **Color theme** — the main color of the site (Navy, Teal, Forest, Slate, or Burgundy)

1. Click **Settings** → **General**
2. Make your changes
3. Click **Save**

---

## How Publishing Works

When you save something in Tina CMS, it doesn't go live immediately. Here's what happens:

1. You click **Save** in Tina
2. Tina commits the change to GitHub (you can see these commits at [github.com/PortlandHumanists/pubwebsite](https://github.com/PortlandHumanists/pubwebsite))
3. Netlify detects the new commit and starts rebuilding the site
4. About 60–90 seconds later, the change is live

You can also watch the deploy progress live at **netlify.com** → your site → **Deploys**.

---

## Scheduling Automatic Rebuilds

The site automatically moves events from "upcoming" to "past" at the moment the end time passes — but only when a rebuild happens. To keep this accurate without manual intervention, you can set up a scheduled rebuild using a free service like [cron-job.org](https://cron-job.org):

1. In Netlify, go to **Site configuration** → **Build hooks**
2. Click **Add build hook** — name it "Weekly rebuild" — click **Save**
3. Copy the hook URL Netlify gives you
4. Go to [cron-job.org](https://cron-job.org), create a free account
5. Create a new cron job with:
   - **URL:** *(paste your Netlify hook URL)*
   - **Schedule:** Every Sunday at 11:00 AM (or whatever time works)
   - **Request method:** POST

This will trigger a rebuild once a week, keeping upcoming/past labels accurate even without any content edits.

---

## Quick Reference

| Task | How |
|------|-----|
| Edit an existing page or event | portlandhumanists.org/admin → navigate to it in the preview → edit in the left panel |
| Add a new event | portlandhumanists.org/admin → Events → Create new |
| Add a recording to a past event | portlandhumanists.org/admin → navigate to the event → YouTube ID or Vimeo ID |
| Change contact email | portlandhumanists.org/admin → Settings → General |
| Change site color | portlandhumanists.org/admin → Settings → General → Color Theme |
| Check if a deploy finished | netlify.com → your site → Deploys |
