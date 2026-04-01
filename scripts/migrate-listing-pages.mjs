import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const ARCHIVE = './hgp-archive/hgp-site/www.portlandhumanists.org';
const OUT = './src/content/events';
const FOLDER_CUTOFF = '2024-01-01';

let count = 0;
let skipped = 0;
let dupes = 0;
const seen = new Set();

const files = readdirSync(ARCHIVE)
  .filter(f => f.startsWith('vimeo-of-programs') && f.endsWith('.html'))
  .sort();

for (const file of files) {
  const html = readFileSync(join(ARCHIVE, file), 'utf-8');

  // Split into individual event rows
  const rowMatches = [...html.matchAll(/<div class="views-row[^"]*">([\s\S]*?)(?=<div class="views-row|<h2 class="element-invisible">Pages)/g)];

  for (const [, row] of rowMatches) {
    // Date
    const dateMatch = row.match(/content="(\d{4}-\d{2}-\d{2})/);
    if (!dateMatch) { skipped++; continue; }
    const dateOnly = dateMatch[1];
    if (dateOnly >= FOLDER_CUTOFF) { skipped++; continue; }

    // Title
    const titleMatch = row.match(/views-field-title[\s\S]*?field-content[^>]*>\s*([^<]+?)\s*<\/span>/);
    if (!titleMatch) { skipped++; continue; }
    const title = titleMatch[1].replace(/&amp;/g, '&').replace(/&#039;/g, "'").trim();

    // Presenter
    const presenterMatch = row.match(/views-field-field-presenter[\s\S]*?field-content[^>]*>([\s\S]*?)<\/div>/);
    const presenter = presenterMatch
      ? presenterMatch[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim()
      : '';

    // Description — strip HTML tags, normalise whitespace
    const bodyMatch = row.match(/views-field-body[\s\S]*?field-content[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/);
    const description = bodyMatch
      ? bodyMatch[1]
          .replace(/<[^>]+>/g, ' ')
          .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#039;/g, "'")
          .replace(/\s+/g, ' ').trim()
      : '';

    // Video IDs
    const ytMatch = row.match(/youtube\.com\/embed\/([^"?/ ]+)/);
    const vmMatch = row.match(/vimeo\.com\/video\/([^"?/ ]+)/);
    const youtubeId = ytMatch ? ytMatch[1] : '';
    const vimeoId = vmMatch ? vmMatch[1] : '';

    // Slug + output path
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const year = dateOnly.slice(0, 4);
    const filename = `${dateOnly}-${slug}.md`;

    if (seen.has(filename)) { dupes++; continue; }
    seen.add(filename);

    const outDir = join(OUT, year);
    mkdirSync(outDir, { recursive: true });
    const outPath = join(outDir, filename);

    const esc = s => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/[\n\r]/g, ' ');

    const lines = [
      '---',
      `title: "${esc(title)}"`,
      `date: ${dateOnly}T00:00:00.000Z`,
      `presenter: "${esc(presenter)}"`,
      `presenterTitle: ""`,
      `startTime: "${dateOnly} 09:45"`,
      `endTime: "${dateOnly} 11:30"`,
      `location: "Friendly House & Zoom"`,
      `description: "${esc(description)}"`,
      youtubeId ? `youtubeId: "${youtubeId}"` : null,
      vimeoId   ? `vimeoId: "${vimeoId}"`   : null,
      `status: "past"`,
      '---',
      '',
      description,
      '',
    ].filter(l => l !== null).join('\n');

    writeFileSync(outPath, lines);
    console.log(`✓ ${year}/${filename}`);
    count++;
  }
}

console.log(`\nDone: ${count} created, ${skipped} skipped, ${dupes} dupes ignored.`);
