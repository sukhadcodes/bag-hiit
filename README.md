# Bag HIIT

A static, offline-capable web app for 30-min heavy-bag HIIT sessions with voice cues.

## Put it on GitHub Pages
1. Create a new public repo (e.g. `bag-hiit`) and upload all files in this folder (keep the `icons/` folder).
2. Repo **Settings → Pages → Source: Deploy from a branch → main / (root)** → Save.
3. After ~1 minute it's live at `https://<your-username>.github.io/bag-hiit/`.
4. On your phone, open it once online, then **Add to Home Screen**. It then works offline in the gym.

When you change `index.html`, bump `VERSION` in `sw.js` so phones pick up the update.

## Workout format
```
Round 1
2-3-2
2-cover-1-1-cover
```
Two combos in a round → Set 1 = first, Set 2 = second, Set 3 = both alternating.
