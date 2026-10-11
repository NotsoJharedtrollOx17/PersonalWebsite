# PersonalWebsite
Source for my personal website, built with Astro and TypeScript. [Visit the deployed website.](https://notsojharedtrollox17.github.io/PersonalWebsite)

## Code Branches
- `release` -> The website version published from `development`.
- `development` -> Stable improvements intended for the next release.
- `experimental` -> Unstable or breaking experiments that are not ready for `development`.

## Updating the Resume

The public resume uses the general master on `main` in the sibling `08-LocalCVResume` repository. Follow its `agent-docs/README.md` and canonical fact ledger when synchronizing `src/content/pages/resume.md`; the three university-specific variants are application documents.

Copy `paper/build/Abraham_Flores_Azcona_Resume_General.pdf` from that repository to `public/Abraham_Flores_Azcona_Resume_General.pdf` and also replace `public/Abraham-Jhared-Flores-Azcona-CV.pdf` so existing links continue to serve the current document. Do not select `paper/build/main.pdf` by filename or modification time: it may contain the last university-specific build. The PDF in `agent-docs/` is a historical reference.

After updating, run `npm run build`, check `/PersonalWebsite/resume` and its PDF link, and verify both public PDFs match the general source. `/PersonalWebsite/cv` redirects to the Resume page for existing bookmarks. The current sync uses resume commit `547b21d` and the final general PDF built September 4, 2026.

## Images and Fonts

Astro generates responsive WebP variants from the original images in `src/assets/images/`. Keep those originals; change widths and quality in the image components when tuning output. The portrait loads with high priority and the decorative image loads lazily.

Inter and Space Grotesk are hosted locally as Latin variable WOFF2 fonts under `src/assets/fonts/`, with `font-display: swap`. Their SIL Open Font License files are retained in `public/fonts/`. Font sources and performance measurements are recorded in `agent-notes/resume-mobile-performance.md`.

## Credits
- *Abraham Jhared Flores Azcona (NotsoJharedtrollOx17).*
- *ChatGPT.*
- *Cline (AI Assistant).*
- *Google Gemini.*
- *NVIDIA Nemotron 3 Super 120B model.*
