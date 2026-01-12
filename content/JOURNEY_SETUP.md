# Journey Route MDX Setup - Complete

## Overview

Successfully implemented a complete MDX structure for the `/journey` route, following the same patterns as `/notes`.

## Changes Made

### 1. Content Folder Structure ✅

```
content/
├── notes/
│   └── perfection.mdx (moved from content/)
└── journey/
    ├── my-first-startup.mdx
    └── building-in-public.mdx
```

### 2. Updated Data Layer ✅

**File: `src/data/blog.ts`**

- Added `ContentType` type: `"notes" | "journey"`
- Updated `getPost()` to accept content type parameter
- Created `getJourneyPosts()` function
- Both functions work identically, just target different folders

### 3. Journey Routes ✅

**Created:**

- `src/app/(writing)/journey/page.tsx` - Lists all journey articles
- `src/app/(writing)/journey/[slug]/page.tsx` - Individual journey article pages

**Features:**

- Same design as notes (BlurFade animations, IconCalendar, etc.)
- Responsive layout with image thumbnails
- Sorted by date (newest first)
- SEO-optimized with metadata and structured data

### 4. YouTube Embed Component ✅

**File: `src/components/mdx-youtube.tsx`**

- Client component for embedding YouTube videos
- Accepts video ID or full URL
- Responsive 16:9 aspect ratio
- Matches website styling (rounded borders, shadows)

**File: `src/components/mdx.tsx`**

- Added `YouTube: MDXYouTube` to globalComponents
- Available in all MDX files as `<YouTube id="..." />`

### 5. Updated Notes Route ✅

**File: `src/app/(writing)/notes/[slug]/page.tsx`**

- Updated to use `getPost(slug, "notes")` for new folder structure

### 6. Sample Content ✅

Created two example journey articles:

- `my-first-startup.mdx` - Demonstrates YouTube embed usage
- `building-in-public.mdx` - Shows standard MDX features

## Usage

### Creating a Journey Article

1. Create file in `content/journey/your-slug.mdx`
2. Add frontmatter:

```mdx
---
title: "Your Title"
publishedAt: "2025-01-12"
summary: "Your summary"
image: "/path/to/image.png"
---
```

3. Write content with full markdown support
4. Optionally embed YouTube: `<YouTube id="VIDEO_ID" />`

### Creating a Note

1. Create file in `content/notes/your-slug.mdx`
2. Same frontmatter format as journey
3. Write content (typically shorter form)

## Design Consistency

All journey pages follow the existing design patterns:

- ✅ BlurFade animations with consistent delays
- ✅ Museo font for headings
- ✅ IconCalendar for dates
- ✅ Same card/hover effects as notes
- ✅ Responsive layout (max-w-2xl)
- ✅ Dark mode support
- ✅ Prose styling for article content

## Technical Stack

- **MDX Processing**: unified + remark + rehype
- **Syntax Highlighting**: rehype-pretty-code (min-light/min-dark themes)
- **Animations**: BlurFade from magicui
- **Icons**: Tabler Icons React
- **Images**: Next.js Image component

## Routes

- `/journey` - Lists all journey articles
- `/journey/[slug]` - Individual journey article
- `/notes` - Lists all notes
- `/notes/[slug]` - Individual note

## No Breaking Changes

- Existing notes functionality unchanged
- All notes content moved to `content/notes/` folder
- All routes continue to work as before
- Zero impact on existing features

---

**Status**: ✅ Complete and ready to use!
