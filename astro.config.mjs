import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';

const isGitHubPages = !!process.env.GITHUB_PAGES;

export default defineConfig({
  site: isGitHubPages ? 'https://hugotdn.github.io' : 'https://cuisine-airfryer.fr',
  base: isGitHubPages ? '/cuisine-airfryer' : '/',
  integrations: [mdx(), sitemap(), robotsTxt()],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
});
