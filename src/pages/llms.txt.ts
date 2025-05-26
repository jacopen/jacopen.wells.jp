import type { APIRoute } from 'astro';
import { profileInfo, skills, careers, communities, certifications } from '../data/profile-content';
import { blogPosts, presentations } from '../data/blog-entries';

export const GET: APIRoute = async () => {
  const siteUrl = 'https://jacopen.wells.jp';
  
  // 最新の統計情報を計算
  const totalBlogPosts = blogPosts.length;
  const totalPresentations = presentations.length;
  const totalCommunities = communities.length;
  const totalCertifications = certifications.length;
  const skillCategories = [...new Set(skills.map(skill => skill.category))];
  const currentYear = new Date().getFullYear();
  
  // 最新のブログ投稿を取得
  const latestBlogPosts = blogPosts
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    .slice(0, 5);
  
  // 最新のプレゼンテーションを取得
  const latestPresentations = presentations
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    .slice(0, 5);

  const llmsTxt = `# LLMs.txt - AI agents sitemap for ${siteUrl}
# Generated on: ${new Date().toISOString()}

## Site Overview
Personal portfolio website of ${profileInfo.nameEn} (${profileInfo.nameJa}) - @${profileInfo.nickname}

### Current Roles
- ${profileInfo.titlePagerDuty}
- ${profileInfo.titleCNIA}

### Bio
${profileInfo.bio}

## Site Structure

### Main Sections
- ${siteUrl}/ - Main profile page with all sections
- ${siteUrl}/blog/ - Blog posts and technical articles (${totalBlogPosts} posts)
- ${siteUrl}/presentations/ - Speaking engagements and conference talks (${totalPresentations} presentations)

### Key Content Areas
1. **Profile** (${siteUrl}/#profile)
   - Professional headshot and basic information
   - Contact links and social media

2. **Blog** (${siteUrl}/#blog)
   - Latest technical articles and insights
   - RSS feed aggregation from multiple sources
   - Total posts: ${totalBlogPosts}

3. **Career Timeline** (${siteUrl}/#career)
   - Interactive timeline with ${careers.length} career positions
   - Collapsible view for extensive history
   - Companies: ${careers.map(c => c.company).join(', ')}

4. **Presentations** (${siteUrl}/#presentations)
   - Conference talks and speaking engagements
   - Total presentations: ${totalPresentations}

5. **Technical Skills** (${siteUrl}/#skills)
   - Categorized by: ${skillCategories.join(', ')}
   - Interactive skill tags with hover effects

6. **Certifications** (${siteUrl}/#certifications)
   - Professional certifications with verification links
   - Total certifications: ${totalCertifications}
   - Categories: ${[...new Set(certifications.map(c => c.category))].join(', ')}

7. **Contributions** (${siteUrl}/#contributions)
   - Media articles and guest posts
   - Industry publications and interviews

8. **Books** (${siteUrl}/#books)
   - Published works and contributions

9. **Community Activities** (${siteUrl}/#communities)
   - Active community involvement (${totalCommunities} communities)
   - Event organization and leadership roles

10. **Contact** (${siteUrl}/#contact)
    - Speaking and collaboration inquiries
    - Contact form and consultation services

## Latest Content

### Recent Blog Posts
${latestBlogPosts.map(post => `- ${post.title} (${new Date(post.pubDate).toLocaleDateString()})`).join('\n')}

### Recent Presentations
${latestPresentations.map(pres => `- ${pres.title} (${new Date(pres.pubDate).toLocaleDateString()})`).join('\n')}

## Technical Implementation
- Built with: Astro ${currentYear}
- Styling: TailwindCSS 4.x
- Content: RSS aggregation + static Markdown
- Responsive design with mobile-first approach
- Interactive JavaScript components

## Content Types
- Technical blog posts about Platform Engineering, DevOps, SRE
- Conference presentations and speaking materials
- Community event documentation
- Professional development and career insights
- Industry analysis and technology trends

## Target Audience
- Platform Engineers and DevOps professionals
- Technology conference organizers
- Technical community members
- Potential collaboration partners
- Industry media and journalists

## Key Topics
- Platform Engineering
- DevOps and SRE practices
- Cloud Native technologies
- Incident Management
- Community building and evangelism
- Technical leadership and career development

## Contact Information
- Speaking inquiries: Available for conferences and events
- Technical consultation: Platform Engineering and DevOps
- Community collaboration: Event organization and participation
- Media inquiries: Industry insights and expert commentary

## Data Freshness
This LLMs.txt file is dynamically generated and reflects the current state of the website.
Last updated: ${new Date().toISOString()}
Content statistics as of generation time.
`;

  return new Response(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600' // 1時間キャッシュ
    }
  });
};