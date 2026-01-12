# YouTube Embed Guide

Complete guide for embedding YouTube videos in your MDX articles (journey and notes).

## 🎥 Quick Start

To embed a YouTube video in any MDX article, use the `<YouTube>` component:

```mdx
<YouTube id="VIDEO_ID" />
```

## 📝 Basic Usage

### Method 1: Using Video ID

```mdx
<YouTube id="dQw4w9WgXcQ" />
```

### Method 2: Using Full YouTube URL

```mdx
<YouTube id="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
```

### Method 3: Using Short URL

```mdx
<YouTube id="https://youtu.be/dQw4w9WgXcQ" />
```

All three methods work identically - the component automatically extracts the video ID!

## 🎨 Advanced Options

### Custom Title

Add an accessibility-friendly title:

```mdx
<YouTube id="dQw4w9WgXcQ" title="My Awesome Video Tutorial" />
```

Default title is `"YouTube video player"` if not specified.

## 📍 Where to Use

### Journey Articles

Perfect for:

- Product demos
- Startup updates
- Tutorial videos
- Behind-the-scenes content
- Presentations and talks

**Example:**

```mdx
---
title: "Building My First SaaS"
publishedAt: "2025-01-12"
summary: "Watch how I built and launched my first product"
---

### The Demo

Here's a full walkthrough of the product:

<YouTube id="YOUR_VIDEO_ID" title="Product Demo" />

### Key Features

...
```

### Notes

Can also be used in shorter notes when relevant:

```mdx
---
title: "Quick React Tip"
publishedAt: "2025-01-12"
summary: "A quick video about React performance"
---

<YouTube id="VIDEO_ID" />

This technique improved my app's performance by 40%.
```

## 🎯 Finding Video IDs

### From YouTube URL

**Full URL:**

```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                  └─────┬─────┘
                                    Video ID
```

**Short URL:**

```
https://youtu.be/dQw4w9WgXcQ
                 └─────┬─────┘
                   Video ID
```

**Embed URL:**

```
https://www.youtube.com/embed/dQw4w9WgXcQ
                              └─────┬─────┘
                                Video ID
```

## 🛠️ Technical Details

### Technical Implementation

YouTube embeds are processed using a custom rehype plugin during MDX compilation:

- ✅ Responsive 16:9 aspect ratio
- ✅ Automatic video ID extraction from URLs
- ✅ Dark mode compatible styling
- ✅ Rounded corners matching site design
- ✅ Proper iframe permissions
- ✅ Full-screen support
- ✅ Accessibility attributes
- ✅ Works alongside tables and code highlighting

### Styling

The embed automatically applies:

- Rounded borders (`rounded-xl`)
- Subtle border (`border-border/50`)
- Background overlay (`bg-background/50`)
- Soft shadow (`shadow-sm`)
- 8px vertical margin (`my-8`)

### How It Works

The `<YouTube>` tag is converted to an iframe during MDX processing by a custom rehype plugin (`src/lib/rehype-youtube.ts`). This approach:

- Preserves all markdown features (tables, code highlighting, etc.)
- Generates static HTML for better performance
- No client-side JavaScript needed for the embed itself

### Browser Support

Works in all modern browsers that support YouTube embeds:

- Chrome/Edge
- Firefox
- Safari
- Mobile browsers

## 📖 Complete Examples

### Example 1: Product Launch

```mdx
---
title: "Launching MyApp v2.0"
publishedAt: "2025-01-12"
summary: "Major update with new features"
image: "/startup/myapp.png"
---

### What's New

We've been working on v2.0 for months. Here's everything new:

1. **Redesigned UI** - Cleaner, faster, better
2. **AI Features** - Powered by GPT-4
3. **Real-time Collaboration** - Work together seamlessly

### Watch the Launch Video

<YouTube
  id="https://www.youtube.com/watch?v=EXAMPLE"
  title="MyApp v2.0 Launch"
/>

### Key Features Walkthrough

[... rest of your content ...]
```

### Example 2: Tutorial Series

```mdx
---
title: "Building a Chrome Extension - Part 1"
publishedAt: "2025-01-12"
summary: "Learn to build Chrome extensions from scratch"
---

### Introduction

In this series, we'll build a complete Chrome extension.

### Video Tutorial

<YouTube id="TUTORIAL_ID" title="Chrome Extension Tutorial Part 1" />

### Code Walkthrough

Here's the manifest.json:

\`\`\`json
{
"manifest_version": 3,
"name": "My Extension",
"version": "1.0"
}
\`\`\`

[... rest of tutorial ...]
```

### Example 3: Multiple Videos

```mdx
---
title: "My Journey Building 3 Startups"
publishedAt: "2025-01-12"
summary: "Lessons from building and scaling three companies"
---

### Startup #1: The E-commerce Store

<YouTube id="VIDEO_ID_1" title="E-commerce Store Journey" />

Lessons learned: [...]

---

### Startup #2: The SaaS Product

<YouTube id="VIDEO_ID_2" title="SaaS Product Story" />

Key takeaways: [...]

---

### Startup #3: The Mobile App

<YouTube id="VIDEO_ID_3" title="Mobile App Launch" />

What I'd do differently: [...]
```

## ⚠️ Important Notes

### Do's ✅

- Use valid YouTube video IDs
- Add descriptive titles for accessibility
- Place videos at logical points in your content
- Test video embeds before publishing

### Don'ts ❌

- Don't use private or unlisted video IDs (won't work publicly)
- Don't embed too many videos in one article (affects page load)
- Don't forget to check if video is still available
- Don't use videos that violate copyright

## 🔧 Troubleshooting

### Video Not Showing

**Problem:** Component renders but video doesn't load

**Solutions:**

1. Check if video ID is correct
2. Verify video is public (not private/deleted)
3. Check browser console for errors
4. Try the video URL directly in browser

### Incorrect Video ID

**Problem:** Wrong video is displayed

**Solutions:**

1. Double-check the video ID from YouTube URL
2. Make sure no extra characters are included
3. Use the full URL and let the component extract the ID

### Styling Issues

**Problem:** Video doesn't match site styling

**Solutions:**

1. The component automatically handles styling
2. Make sure you're using the latest version
3. Check if custom CSS is overriding component styles

## 📱 Mobile Considerations

The YouTube embed is fully responsive:

- Maintains 16:9 aspect ratio on all screen sizes
- Touch-friendly controls
- Works with mobile YouTube app integration
- Optimized for mobile data usage

## 🚀 Best Practices

1. **Video Quality**: Use HD videos (720p or 1080p minimum)
2. **Placement**: Place videos after introducing the topic
3. **Context**: Always provide context before and after videos
4. **Length**: Consider video length (5-15 min is ideal)
5. **Thumbnails**: YouTube thumbnails should be professional
6. **Titles**: Use descriptive titles for better SEO
7. **Captions**: Enable YouTube captions for accessibility

## 🔗 Related Documentation

- [MDX Content Guide](./README.md)
- [Journey Route Documentation](./JOURNEY_SETUP.md)
- [Rehype Plugin](../src/lib/rehype-youtube.ts) - Technical implementation

## 🏗️ Technical Architecture

The YouTube embed system uses:

1. **Markdown Parsing**: `remark-parse` + `remark-gfm`
2. **MDX to HAST**: `remark-rehype` with `allowDangerousHtml`
3. **Raw HTML Processing**: `rehype-raw` to handle HTML tags
4. **Custom Plugin**: `rehype-youtube` converts `<YouTube>` to iframe
5. **Syntax Highlighting**: `rehype-pretty-code` for code blocks
6. **HTML Generation**: `rehype-stringify`

This pipeline ensures all markdown features work together seamlessly.

---

**Need help?** Check the [mdx-demo.mdx](./journey/mdx-demo.mdx) file for a live example with an embedded video!
