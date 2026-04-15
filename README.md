# YT Shorts Blocker

Browser extension that removes YouTube Shorts from your feed and blocks navigation to `/shorts` URLs.

## Packaging

Build and package into `release/yt-shorts-blocker.xpi` (Firefox) or `release/yt-shorts-blocker.zip` (Chrome/Edge):

```bash
npm run package:firefox   # or: bun run package:firefox
npm run package:chrome   # or: bun run package:chrome
```

## Loading in Browsers

### Chrome / Edge

1. Go to `chrome://extensions` (or `edge://extensions`)
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the project root folder

### Firefox — Temporary

Removed on browser restart.

1. Go to `about:debugging` → **This Firefox**
2. Click **Load Temporary Add-on**
3. Select `manifest.json` from the project root

### Firefox — Permanent (Developer Edition / Nightly only)

1. Go to `about:config` and set `xpinstall.signatures.required` → `false`
2. Run `npm run package`
3. Go to `about:addons` → gear icon → **Install Add-on From File**
4. Select `release/yt-shorts-blocker.xpi`

## How It Works

- **DOM removal** — hides Shorts shelves, reels, and links using a `MutationObserver` to handle YouTube's SPA navigation
- **Navigation blocking** — redirects to `youtube.com` if you navigate directly to a `/shorts` URL

Note: YouTube occasionally changes its DOM structure. If Shorts reappear, open DevTools on YouTube, inspect the Shorts shelf, and update the `SHORTS_SELECTORS` array in `src/content.ts`, then rebuild.ouTube occasionally changes its DOM structure. If Shorts reappear, open DevTools on YouTube, inspect the Shorts shelf, and update the `SHORTS_SELECTORS` array in `src/content.ts`, then rebuild.
