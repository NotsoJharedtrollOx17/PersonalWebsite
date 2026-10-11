# PersonalWebsite
Source for my personal website, built with Astro and TypeScript. [Visit the deployed website.](https://notsojharedtrollox17.github.io/PersonalWebsite)

## Code Branches
- `release` -> The website version published from `development`.
- `development` -> Stable improvements intended for the next release.
- `experimental` -> Unstable or breaking experiments that are not ready for `development`.

## Updating the CV

The public CV uses the general master on `main` in the sibling `08-LocalCVResume` repository. Follow its `agent-docs/README.md` and canonical fact ledger when synchronizing `src/content/pages/cv.md`; the three university-specific variants are application documents.

Copy `paper/build/Abraham_Flores_Azcona_Resume_General.pdf` from that repository to `public/Abraham_Flores_Azcona_Resume_General.pdf` and also replace `public/Abraham-Jhared-Flores-Azcona-CV.pdf` so existing links continue to serve the current document. Do not select `paper/build/main.pdf` by filename or modification time: it may contain the last university-specific build. The PDF in `agent-docs/` is a historical reference.

After updating, run `npm run build`, check the CV page and PDF link under `/PersonalWebsite`, and verify both public PDFs match the general source. The current sync uses resume commit `547b21d` and the final general PDF built September 4, 2026.

## Credits
- *Abraham Jhared Flores Azcona (NotsoJharedtrollOx17).*
- *ChatGPT.*
- *Cline (AI Assistant).*
- *Google Gemini.*
- *NVIDIA Nemotron 3 Super 120B model.*
