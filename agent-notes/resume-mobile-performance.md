# Resume, mobile interactions, research post, and loading audit

Date: 2026-10-11

## Changes

- Resume is the public label, title, route, content entry, and document component. The former `/cv` route uses Astro's static redirect with a canonical link and clickable fallback to `/PersonalWebsite/resume`. The old PDF filename continues to work.
- Mobile split columns now have equal explicit widths and the same left edge. Navigation wraps and primary controls have at least 44-pixel height. Article links can wrap without widening the page.
- Hover effects run only under `(hover: hover) and (pointer: fine)`. Touch receives temporary `:active` feedback; keyboard users keep `:focus-visible` outlines. Noninteractive tags no longer react like buttons. Theme and RSS controls have accessible labels.
- The second post now links the complete unreviewed technical report and describes neutral-mean cancellation, globally centered label sets, the possible extraction/steering block offset, two fixed steering prompts, self-selected target tokens, stochastic decoding, and the cleanup provenance of saved artifacts. `dateModified` now uses the post's actual `updatedDate`.
- Homepage images use explicit responsive widths and WebP quality settings. The portrait has loading priority; the decorative image stays lazy. Original JPEG and PNG sources are preserved. Existing font families are served locally with preload hints and `font-display: swap`.

## Research evidence

The replication README and script were inspected at `a2589f9379ba6b86c33bcccbfae141fbafd24706`; the local README was checked against remote `main` and matched. The post links the report at this fixed revision. The original Anthropic study and the rain1955 Gemma E4B model card were also checked. Scientific conclusions remain bounded to the implemented corpus and pipeline; the review did not rerun ML experiments.

## Font provenance

- Inter: Google Fonts Latin variable WOFF2, `https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2`, 48,256 bytes. License from `https://raw.githubusercontent.com/google/fonts/main/ofl/inter/OFL.txt`.
- Space Grotesk: Google Fonts Latin variable WOFF2, `https://fonts.gstatic.com/s/spacegrotesk/v22/V8mDoQDjQSkFtoMM3T6r8E7mPbF4Cw.woff2`, 22,288 bytes. License from `https://raw.githubusercontent.com/google/fonts/main/ofl/spacegrotesk/OFL.txt`.

## Measurements and verification

The previous served portrait was 2,944 pixels wide and 124,550 bytes. The new 640-pixel fallback is 18,196 bytes, an 85.4% reduction. Its 320/480/640/960/1280-pixel variants are 7,078 / 12,614 / 18,196 / 29,020 / 40,290 bytes. Browser viewport width and pixel density determine the downloaded variant.

The previous decorative WebP was 42,450 bytes. The new 320/480/730-pixel variants are 7,458 / 16,436 / 35,436 bytes. The two default image resources together fall from 167,000 to 53,632 bytes, a 67.9% reduction. This measures image payload, not end-to-end page load time or a guaranteed twofold speed increase.

Production builds passed after each milestone. Generated HTML checks cover Resume titles/navigation/redirects, report and method corrections, publication versus modification dates, responsive srcsets, explicit image dimensions, portrait priority, lazy decoration, and local font URLs. Both generated fallback images were visually inspected. Hover rules and mobile column widths were checked in source and compiled CSS. No browser was connected during these checks; real touch-device behavior and browser layout remain outside that evidence.

The local preview returned HTTP 200 for all six routes and 19 linked local pages/assets. Both PDF addresses served the exact general resume bytes. The final compiled stylesheet gates every hover rule, retains keyboard focus outlines, and gives the mobile split columns equal widths. End-to-end load timing and Core Web Vitals were not measured.
