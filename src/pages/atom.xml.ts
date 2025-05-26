import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { blogPosts as rssBlogPosts } from '../data/blog-entries';
import { profileInfo } from '../data/profile-content';

export const GET: APIRoute = async () => {
  // Markdownブログ記事の取得
  const mdBlogEntries = await getCollection('blog');

  // Markdownブログ記事をblogPostsと同じ形式に変換
  const mdBlogPosts = mdBlogEntries.map((entry) => ({
    url: `https://jacopen.wells.jp/blog/${entry.slug}`,
    title: entry.data.title,
    pubDate: entry.data.pubDate,
    source: 'ブログ',
    sourceUrl: 'https://jacopen.wells.jp/blog',
    description: entry.data.description || '',
  }));

  // RSSブログ記事のURLを絶対URLに変換
  const absoluteRssBlogPosts = rssBlogPosts.map((post) => ({
    ...post,
    url: post.url.startsWith('http') ? post.url : `https://jacopen.wells.jp${post.url}`,
  }));

  // 全ブログ記事を結合してソート
  const allBlogPosts = [...absoluteRssBlogPosts, ...mdBlogPosts]
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
    .slice(0, 20); // 最新20件に制限

  const atomContent = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${profileInfo.nameEn} (@${profileInfo.nickname}) - ブログ</title>
  <link href="https://jacopen.wells.jp/" />
  <link href="https://jacopen.wells.jp/atom.xml" rel="self" type="application/atom+xml"/>
  <updated>${new Date().toISOString()}</updated>
  <id>https://jacopen.wells.jp/</id>
  <subtitle>${profileInfo.bio}</subtitle>
  <author>
    <name>${profileInfo.nameEn}</name>
    <email>noreply@jacopen.wells.jp</email>
  </author>
  <generator uri="https://astro.build/">Astro</generator>
  <icon>https://jacopen.wells.jp/pen_pen.jpg</icon>
  <logo>https://jacopen.wells.jp/pen_pen.jpg</logo>
${allBlogPosts
  .map(
    (post) => `  <entry>
    <title><![CDATA[${post.title}]]></title>
    <link href="${post.url}" />
    <id>${post.url}</id>
    <updated>${post.pubDate.toISOString()}</updated>
    <published>${post.pubDate.toISOString()}</published>
    <summary><![CDATA[${post.description || post.title} - ${post.source}より]]></summary>
    <content type="html"><![CDATA[${post.description || post.title} - ${post.source}より]]></content>
    <category term="${post.source}" />
  </entry>`
  )
  .join('\n')}
</feed>`;

  return new Response(atomContent, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600', // 1時間キャッシュ
    },
  });
};