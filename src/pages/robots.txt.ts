import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const siteUrl = 'https://jacopen.wells.jp';
  
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${siteUrl}/sitemap.xml

# AI-specific sitemap
Sitemap: ${siteUrl}/llms.txt

# Crawl-delay for politeness
Crawl-delay: 1

# Block access to admin or private areas (if any in the future)
# Disallow: /admin/
# Disallow: /private/

# Allow common bot access
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

# AI/LLM crawlers
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: ClaudeBot
Allow: /`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400' // 24時間キャッシュ
    }
  });
};