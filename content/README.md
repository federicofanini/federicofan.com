# Content Structure

This directory contains MDX content for the website, organized by content type.

## Folder Structure

```
content/
├── notes/          # Quick thoughts, ideas, and learnings
│   └── *.mdx
└── journey/        # Entrepreneurial journey articles
    └── *.mdx
```

## Content Types

### Notes (`/notes`)

- Short-form content
- Random thoughts and ideas
- Quick learnings and observations
- Displayed at: `/notes` and `/notes/[slug]`

### Journey (`/journey`)

- Long-form content
- Entrepreneurial stories and lessons
- In-depth reflections
- Can include YouTube embeds
- Displayed at: `/journey` and `/journey/[slug]`

## MDX File Format

All MDX files must include frontmatter with the following fields:

```mdx
---
title: "Your Article Title"
publishedAt: "2025-01-12"
summary: "A brief description of your article"
image: "/path/to/image.png" # Optional
---

Your content here...
```

## YouTube Embeds (Journey Articles)

To embed a YouTube video in a journey article, use the `YouTube` component:

```mdx
<YouTube id="VIDEO_ID" title="Optional Title" />
```

Quick examples:

```mdx
# Using just the video ID

<YouTube id="dQw4w9WgXcQ" />

# Using a full YouTube URL (will extract the ID automatically)

<YouTube id="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />

# With custom title

<YouTube id="dQw4w9WgXcQ" title="My Awesome Video" />
```

📖 **For complete YouTube embed documentation, see [YOUTUBE-EMBED-GUIDE.md](./YOUTUBE-EMBED-GUIDE.md)**

## Available MDX Components

- **YouTube**: Embed YouTube videos
- **Image**: Next.js optimized images (rounded corners)
- **Link**: Internal/external links with proper handling
- **Table**: Custom table component
- All standard markdown elements (headings, lists, blockquotes, etc.)

## Adding New Content

### Notes

1. Create a new `.mdx` file in `content/notes/`
2. Add frontmatter
3. Write your content
4. File will automatically appear at `/notes`

### Journey

1. Create a new `.mdx` file in `content/journey/`
2. Add frontmatter
3. Write your content (can include YouTube embeds)
4. File will automatically appear at `/journey`

## Technical Details

- Content is processed by `src/data/blog.ts`
- Uses unified, remark, and rehype for MDX processing
- Supports GitHub Flavored Markdown
- Syntax highlighting via rehype-pretty-code
- Light theme: `min-light`
- Dark theme: `min-dark`
