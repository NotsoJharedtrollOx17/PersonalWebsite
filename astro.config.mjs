// @ts-check
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// ! DO NOT CHANGE
export default defineConfig({
  site: "https://notsojharedtrollox17.github.io",
  base: "/PersonalWebsite",
  trailingSlash: "never",
  output: "static",
  markdown: {
    rehypePlugins: [[
      rehypeExternalLinks,
      {
        target: "_blank",
        rel: ["noopener", "noreferrer"],
      },
    ]],
  },
  integrations: [
    sitemap()
  ],
});