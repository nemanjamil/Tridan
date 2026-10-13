// Draft/final brand images for the redesign via the Tridan marketing image tool (Google Nano Banana).
// usage (repo root): node site/tools/gen-images.mjs <hero|webApps|integrations|devops|ai> <draft|final> [aspect, default 16:9]
// draft = Nano Banana 2 Lite 1K (~$0.034), final = Nano Banana Pro 2K (~$0.134). The provider reads its
// key from its own environment (/root/tridan-marketing); nothing secret lives in this file.
// Output: site/tools/images-raw/<name>-<mode>-<timestamp>.jpg (gitignored); convert to AVIF/WebP before use.
import { mkdirSync, writeFileSync } from 'node:fs';
import { generate } from '/root/tridan-marketing/image-generation/providers/google.mjs';

const [name, mode = 'draft', aspect = '16:9'] = process.argv.slice(2);
const STYLE = ' Rendered as a premium, minimal 3D illustration for a dark technology website: deep navy-black background (#060a14) that fades smoothly to solid darkness at every edge so the image blends into a dark page, crisp cyan (#22d3ee) light as the main accent with a soft electric blue (#3b82f6) secondary glow, glossy dark glass and brushed graphite materials, gentle volumetric haze, soft rim lighting from the upper right, shallow depth of field, calm and precise mood, generous dark negative space around the subject. Purely abstract shapes and surfaces, free of any letters, numbers, words, logos, brand marks or human figures.';
const SUBJECTS = {
  hero: 'Subject: an isometric software architecture floating in space, three layers of thin translucent dark glass slabs stacked with even gaps, each slab carrying small raised modules like server blocks and interface tiles, connected vertically and horizontally by fine glowing cyan light lines with tiny luminous nodes where they meet, small points of light travelling along the lines like data packets. The structure sits slightly right of center, viewed from a three-quarter elevated angle.',
  webApps: 'Subject: three floating browser-like window frames made of dark smoked glass, layered in depth and slightly rotated, their surfaces showing abstract interface blocks, rounded cards and thin progress bars glowing in cyan, one window in front with a softly lit border, viewed from a low three-quarter angle.',
  integrations: 'Subject: two sleek graphite modules on the left and right connected by several smooth glowing cyan light cables that arc between them, with small luminous pulses travelling along the cables and a precise interlocking connector in the middle where the cables meet, viewed from a slightly elevated side angle.',
  devops: 'Subject: a smooth continuous infinity-shaped track of glowing cyan light floating in space, with small glossy dark cubes moving along it at even intervals, a soft translucent cloud-like volume of fine dots hovering above the loop, viewed from an elevated three-quarter angle.',
  ai: 'Subject: a floating spherical lattice of fine glowing cyan lines and small luminous nodes, like a neural network globe, with a faint bright core, a few orbiting rings of tiny points, resting above a dark reflective glass plate, viewed straight on at eye level.',
};
if (!SUBJECTS[name]) {
  console.error(`usage: node site/tools/gen-images.mjs <${Object.keys(SUBJECTS).join('|')}> <draft|final> [aspect]`);
  process.exit(1);
}
const final = mode === 'final';
const r = await generate({
  prompt: SUBJECTS[name] + STYLE,
  aspectRatio: aspect,
  sizes: final ? ['2K'] : ['1K'],
  models: final ? ['gemini-3-pro-image'] : ['gemini-3.1-flash-lite-image'],
  onAttempt: (a, m) => console.error('attempt', a, String(m).slice(0, 200)),
});
const dir = new URL('./images-raw/', import.meta.url);
mkdirSync(dir, { recursive: true });
const out = new URL(`${name}-${mode}-${Date.now()}.jpg`, dir).pathname;
writeFileSync(out, r.buffer);
console.log(out, r.usedModel, r.usedSize, `~$${r.costUsd}`);
