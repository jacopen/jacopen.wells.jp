# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Kazuto Kusama (@jacopen) built with Astro 5.x and TailwindCSS 4.x. The site showcases his profile, blog posts, presentations, skills, books, and community activities. The project automatically fetches and aggregates content from multiple RSS feeds (PagerDuty blog, personal blog, Qiita) and stores it in JSON format for static site generation.

## Common Commands

- `npm run dev` - Start development server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview built site locally
- `npm run new-blog` - Interactive script to create new blog posts in src/content/blog/

## Architecture & Data Flow

### Content Sources
- **Static blog posts**: Markdown files in `src/content/blog/` with frontmatter schema validation
- **External content**: RSS feeds aggregated via `src/data/rss-fetcher.ts` and cached in `src/data/blog-data.json`
- **Profile data**: Centralized in `src/data/profile-content.ts` (skills, career, communities, books, contributions)

### RSS Aggregation System
The site automatically fetches content from multiple RSS sources during build:
- `src/data/rss-fetcher.ts` - Fetches from PagerDuty, personal blog, and Qiita feeds
- `src/data/blog-entries.ts` - Merges RSS data with existing cached data in blog-data.json
- Data is deduped by URL and sorted by publication date
- RSS data is refreshed on every build but cached to avoid losing content if feeds are unavailable

### Content Collections
- Blog content uses Astro's content collections with schema validation in `src/content/config.ts`
- External RSS content bypasses collections and is handled directly via TypeScript modules

### Routing & Pagination
- `/` - Main profile page with all sections
- `/blog/page/[page]` - Paginated blog listing
- `/blog/[slug]` - Individual blog posts
- `/presentations/page/[page]` - Paginated presentations listing
- Blog and presentations index pages redirect to page/1

### Component Structure
- `src/components/Profile.astro` - Main profile component displaying all sections
- `src/components/BlogList.astro` - Reusable blog listing with pagination support
- `src/layouts/Layout.astro` - Base layout with optional two-pane design
- `src/layouts/BlogPostLayout.astro` - Layout for individual blog posts

### Data Management
Profile data is centralized in `src/data/profile-content.ts` and includes:
- Skills categorized by type (Platform, DevOps, Infrastructure, etc.)
- Career history with companies, positions, and periods
- Community activities with descriptions
- Books and contributions with URLs
- Color coding for skill categories defined in Profile.astro

## Creating New Content

### New Blog Posts
Use `npm run new-blog` to create a new blog post with proper frontmatter template in `src/content/blog/`

### Adding External Content
RSS feeds are automatically processed, but manual entries can be added to the static arrays in `src/data/profile-content.ts` (books, contributions) or `src/data/blog-entries.ts`

### Profile Updates
Update profile information in `src/data/profile-content.ts` - this includes skills, career history, community activities, and personal information