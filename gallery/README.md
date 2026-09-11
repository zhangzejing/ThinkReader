# ThinkReader gallery

A bilingual, interactive product gallery. Summary and report evidence opens individual
source pages; mindmaps and slides pan continuously and pause on hover. Wiki graphs
open notes in a separate reader. The codebase conversation is explicitly a simulation.

## Preview

```powershell
cd gallery
npm ci
npm run dev
```

Open [the local preview](http://127.0.0.1:3000/). For the GitHub Pages build:

```powershell
npm run build:pages
npm exec -- vite preview --config vite.pages.config.ts --port 3001
```

Open [the release preview](http://127.0.0.1:3001/ThinkReader/).

## GitHub Pages

The site is [zhangzejing.github.io/ThinkReader](https://zhangzejing.github.io/ThinkReader/).
Pages uses GitHub Actions. To update the site, run **Publish gallery** from the Actions tab, selecting `main`.
For a different repository path, set `PAGES_BASE` when building. No backend is needed.

Generated preview assets in `public/` are committed, so deployment only needs `npm ci` and `npm run build:pages` in this folder.
