import type { APIContext } from 'astro';
import rss from '@astrojs/rss';
import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE_TITLE } from '@consts';

export async function GET(context: APIContext) {
  const blogPosts = await getCollection('blog');
  const posts = blogPosts.filter(post => !post.data.draft);
  return rss({
    title: 'Abraham Flores | R&D Blog',
    description: 'Applied AI, systems engineering, and reproducible machine learning research',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}`, // Fixed: use .id instead of .slug
    })),
    customData: `<language>en-us</language>`,
  });
}
