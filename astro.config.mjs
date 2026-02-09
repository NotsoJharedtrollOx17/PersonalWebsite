// @ts-check
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
// ! DO NOT CHANGE
export default defineConfig({
    site: "https://notsojharedtrollox17.github.io",
    base: "/PersonalWebsite",
    trailingSlash: "never",
    output: "static",
    markdown: { // * handles open-up of externals links to another tab
        rehypePlugins: [[
            rehypeExternalLinks,
            {
                target: "_blank",
                rel: ["noopener", "noreferrer"],
            },
    ]],
  },
});
