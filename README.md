# Bag HIIT

A static, offline-capable web app for heavy-bag HIIT with a voice coach.
Each round = 3 × (60s hard + 30s moderate + 30s rest), then a 90s round break.

## Put it on GitHub Pages
1. Create a repo (e.g. `bag-hiit`) and upload everything in this folder (keep `icons/` and `audio/`).
2. Repo **Settings → Pages → Deploy from a branch → main / (root)** → Save.
3. After ~1 minute it's live at `https://<your-username>.github.io/bag-hiit/`.
4. On your phone, open it once while online (this caches the voice clips), then **Add to Home Screen**.

If you change any file, bump `VERSION` in `sw.js` so phones pick up the update.

## Voice
`audio/*.json` (heart, michael, puck, fenrir, bella) hold natural-sounding voice clips generated with the open-source
Kokoro TTS model. Custom words that aren't in the clip set fall back to the phone's built-in voice.

## Text format (Edit → Text)
```
Round 1
Hard: 2-3-2
Moderate: 2-cover-1-1-cover
```
