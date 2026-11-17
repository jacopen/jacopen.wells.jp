# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Kazuto Kusama (@jacopen) built with Astro 5.x and TailwindCSS 4.x. The site showcases his profile, blog posts, presentations, skills, books, and community activities. The project automatically fetches and aggregates content from multiple RSS feeds (PagerDuty blog, personal blog, Qiita) and stores it in JSON format for static site generation.

## Common Commands

- `npm run dev` - Start development server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview built site locally
- `npm run update-feeds` - Fetch RSS feeds and append new entries to `src/data/blog-data.json`

## Architecture & Data Flow

### Content Sources
- **Blog posts**: Managed in Sanity (project `wza0icfm`, Studio config in `sanity/`). The `body` field holds Markdown, rendered with `marked` in `src/pages/blog/[slug].astro`. There are no local Markdown posts
- **External content**: RSS feeds aggregated via `src/data/rss-fetcher.ts` and cached in `src/data/blog-data.json`
- **Profile data**: Centralized in `src/data/profile-content.ts` (skills, career, communities, books, contributions)

### RSS Aggregation System
External posts and talks come from RSS feeds and are cached in `src/data/blog-data.json`:
- `src/data/rss-fetcher.ts` - Fetches PagerDuty, personal blog, Qiita, and SpeakerDeck feeds; `mergeByUrl` dedupes by URL and sorts by date
- `scripts/update-feeds.ts` (`npm run update-feeds`) - The only thing that writes `blog-data.json`. Existing entries are never removed, so items that drop off a feed are kept
- `.github/workflows/update-feeds.yml` - Runs the script daily and commits new entries to main
- `src/data/blog-entries.ts` - Reads the cached JSON. In production builds it also merges the live feeds in memory (no file write); `npm run dev` uses the cache only

### Icons & Fonts
- Icons use `astro-icon` with Font Awesome 6 sets: `<Icon name="fa6-solid:cloud" />` (`fa6-regular:`, `fa6-brands:`). No icon CDN
- Fonts are self-hosted via `@fontsource-variable/*`, imported in `src/layouts/Layout.astro`; stacks are defined in `src/styles/global.css`
- `public/_headers` CSP only allows self-hosted styles and fonts; adding an external CSS/font source requires updating it

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
Create the post in Sanity Studio. It appears on the site at the next build

### Adding External Content
RSS feeds are automatically processed, but manual entries can be added to the static arrays in `src/data/profile-content.ts` (books, contributions) or `src/data/blog-entries.ts`

### Profile Updates
Update profile information in `src/data/profile-content.ts` - this includes skills, career history, community activities, and personal information