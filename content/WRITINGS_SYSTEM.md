# Writings System Documentation

## Overview

All writings (notes and journey entries) are now aggregated in the `/notes` route with advanced filtering capabilities using URL state management.

## Features Implemented

### 1. **Tag System**

- Added `tags` field to MDX frontmatter
- Tags are displayed on each article card
- Tags can be used for filtering content

### 2. **Aggregated Writings**

- Both "notes" and "journey" content types are shown together
- Filter by content type (notes/journey) or by topic tags
- All filters work through URL query parameters

### 3. **URL State Management (nuqs)**

- Filter state is preserved in the URL (`?tag=mindset`)
- Shareable URLs with specific filters
- Back/forward navigation works correctly
- Better infrastructure for future features

### 4. **Minimal UI Design** (Aligned with Website Aesthetic)

- **Left-border design pattern** with colored dots (matching health-engine section)
- **Uppercase headers** with monospace font and wide tracking
- **Dot-based filter buttons** instead of traditional pills (matching hero section)
- Each post gets a rotating color scheme (blue, purple, amber, rose, cyan)
- Author avatar (/me.jpg) shown as small circular image
- Hover effects on borders (opacity transitions)
- BlurFade animations for smooth loading
- Clean typography hierarchy: Museo for headings, mono for metadata
- Shows dates with calendar icons and post type

## Usage

### Adding Tags to MDX Files

```yaml
---
title: "Your Article Title"
publishedAt: "2025-01-15"
summary: "A brief summary of your article"
image: "/path/to/image.png"
tags: ["tag1", "tag2", "tag3"]
---
```

### Available Functions (src/data/blog.ts)

- `getAllWritings()` - Returns all notes and journey posts combined with type info
- `getAllTags()` - Returns unique tags from all writings
- `getBlogPosts()` - Returns only notes
- `getJourneyPosts()` - Returns only journey entries

### Filter Options

The new notes page supports filtering by:

- **All** - Shows everything
- **Notes** - Shows only notes
- **Journey** - Shows only journey entries
- **Custom Tags** - Shows posts with specific tags (e.g., "mindset", "productivity")

## File Structure

```
src/
├── app/(writing)/notes/
│   └── page.tsx                  # Server component that fetches data
├── components/
│   └── writings-list.tsx         # Client component with filtering
├── data/
│   └── blog.ts                   # Data fetching and aggregation logic
content/
├── notes/
│   └── *.mdx                     # Note files with tags
└── journey/
    └── *.mdx                     # Journey files with tags
```

## Future Enhancements

Easy to add:

- Search functionality
- Sort options (date, title, etc.)
- More filter types
- Reading time estimates
- Related posts
- Tag cloud visualization

## Migration Notes

- The `/journey` route still works independently for backward compatibility
- All new writing categories can be added by:
  1. Creating a new content type in `blog.ts`
  2. Adding to the aggregation function
  3. Updating the filter UI
