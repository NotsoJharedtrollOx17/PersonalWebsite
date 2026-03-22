import type { APIContext } from 'astro';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE } from '@consts';

export async function GET(context) {
  const blogPosts = await getCollection('blog');
  const posts = blogPosts.filter(post => !post.data.draft);
  return rss({
    title: 'Abraham Flores | R&D Blog',
    description: 'AI Agents and System Architecture Research',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}