# AF identity and desktop navigation clearance

Date: 2026-10-11

The previous mobile interaction work added 44-pixel control heights without reserving matching desktop space. With the menu at 32 pixels from the top, its controls reached 76 pixels while the artwork began at 64 pixels. The right split column now starts at 108 pixels, giving 32 pixels of clearance. Blog headers receive the same desktop clearance. The left homepage heading retains its original padding. Mobile still uses its existing shared column widths and vertical padding. The centered page now contains the absolutely positioned desktop navigation.

The regular page template already linked `/PersonalWebsite/favicon.ico`; the logged `/favicon.ico` request was a root-level request rather than the template's declared URL. The generated static `/cv` redirect omitted icons entirely, leaving room for a browser fallback. It now has an explicit minimal HTML redirect with the shared icon component, canonical URL, noindex metadata, and clickable fallback. Root-level requests made by cached browser state or other clients are outside this project's base URL and can still be logged; no domain-root route is claimed.

The AF identity uses original geometric letterforms, a black square, white initials, and the site's orange `#ff6600` baseline. Source SVGs are retained. Its exported assets cover a scalable favicon, a four-size ICO (16/32/48/64), a 180-pixel Apple touch icon, a 512-pixel publisher logo, and a 1200-by-630 sharing image. The brand is used throughout browser icons and sharing metadata. `scripts/build-brand-assets.mjs` regenerates the derivatives from the SVG sources using the project's installed Sharp dependency.

The Open Graph image had no matching public asset, and JSON-LD duplicated the base prefix in its image path. The sharing image now exists and uses one absolute URL consistently; publisher logos and main-entity links are also absolute.

Validation: production builds passed. Compiled CSS checks confirmed desktop clearance and the mobile padding override. All six HTML routes declare the three base-prefixed icon links; local HTTP checks returned the matching icon bytes. Logo and sharing assets returned HTTP 200. Metadata checks confirmed the sharing image and publisher logo URLs. The sharing image was rendered and visually inspected, and all four ICO sizes were decoded. Browser-layout and real-device touch testing were not performed, following the user's preference for code, build, and HTTP checks.

## v1.14.1 follow-up

The public favicon responses matched the AF assets, but the user's browser still showed Astro's icon. Browser caching is the likely cause, rather than a missing deployed file. The shared icon component now imports SVG and ICO assets with `?url&no-inline`, producing actual content-hashed files under the site's `_astro` directory. This gives both formats fresh URLs, with future changes to their bytes generating new names automatically. The brand-generation script also updates `src/assets/brand/`; the original public filenames remain available for compatibility.

The Resume page's visible heading is uppercase. Dark-mode links use `#5c9dff`, giving a calculated 7.10:1 contrast ratio against `#0e0e0e`, compared with the previous blue's 3.59:1. The production build and generated HTML checks passed, including the hashed icon declarations on all six routes and the `RESUME` heading. Browser cache replacement itself cannot be verified through HTTP checks.
