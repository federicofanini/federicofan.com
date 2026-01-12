# YouTube Embed Solution

## Problem

The initial attempt to embed YouTube videos broke table rendering and code syntax highlighting because we tried using React components with `next-mdx-remote`, which required changing how MDX content was processed.

## Solution

Created a **custom rehype plugin** that converts `<YouTube>` tags to iframe HTML during the MDX-to-HTML compilation process.

## How It Works

### Architecture

```
MDX Content
  ↓
remark-parse (Parse markdown)
  ↓
remark-gfm (GitHub Flavored Markdown - tables, etc.)
  ↓
remark-rehype (Convert to HTML AST)
  ↓
rehype-raw (Process HTML tags)
  ↓
rehypeYouTube (Convert <YouTube> to iframe) ← OUR CUSTOM PLUGIN
  ↓
rehype-pretty-code (Syntax highlighting)
  ↓
rehype-stringify (Generate HTML)
  ↓
Final HTML with embedded videos
```

### Key Files

1. **`src/lib/rehype-youtube.ts`** - Custom plugin

   - Looks for `<YouTube>` tags in the HTML AST
   - Extracts video ID from various URL formats
   - Replaces tag with responsive iframe embed

2. **`src/data/blog.ts`** - MDX processor configuration
   - Added `rehype-raw` to process HTML tags
   - Added custom `rehypeYouTube` plugin
   - Maintains all existing plugins (tables, code highlighting)

## What Works Now

✅ **YouTube Embeds** - Using `<YouTube id="VIDEO_ID" />`
✅ **Tables** - GitHub Flavored Markdown tables
✅ **Code Highlighting** - rehype-pretty-code with themes
✅ **All Markdown Features** - Lists, blockquotes, images, links, etc.
✅ **Dark Mode** - Embeds styled to match site theme
✅ **Responsive** - 16:9 aspect ratio on all devices

## Usage in MDX

```mdx
---
title: "My Article"
publishedAt: "2025-01-12"
summary: "Article with video"
---

### My Video

<YouTube id="XifgHi9R5Rc" />

Or with full URL:

<YouTube
  id="https://www.youtube.com/watch?v=XifgHi9R5Rc"
  title="Custom Title"
/>

### My Table

| Column 1 | Column 2 |
| -------- | -------- |
| Data     | Data     |

### My Code

\`\`\`typescript
const code = "works perfectly";
\`\`\`
```

## Removed Components

- ❌ `src/components/mdx-youtube.tsx` - No longer needed
- ❌ `next-mdx-remote` dependency - Reverted to HTML rendering
- ✅ Kept `src/components/sections/yt-embed.tsx` - Still used elsewhere in the site

## Benefits

1. **Performance** - Static HTML generation, no client-side JavaScript for embeds
2. **Compatibility** - Works with all markdown features
3. **Simplicity** - Single processing pipeline
4. **Maintainability** - All processing happens in one place
5. **SEO** - Embeds are in the HTML for better indexing

## Testing

Test video embedded in: `/journey/mdx-demo`
Video ID: `XifgHi9R5Rc`
URL: https://www.youtube.com/watch?v=XifgHi9R5Rc

---

**Status**: ✅ Complete - All features working without conflicts
