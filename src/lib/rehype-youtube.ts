import { visit } from "unist-util-visit";

// Custom rehype plugin to convert YouTube components to iframe embeds
export function rehypeYouTube() {
  return (tree: any) => {
    visit(tree, "element", (node: any) => {
      // Look for <YouTube> or <youtube> tags (HTML parsers often lowercase tags)
      const tagName = node.tagName?.toLowerCase();

      if (tagName === "youtube") {
        const id = node.properties?.id as string;
        const title =
          (node.properties?.title as string) || "YouTube video player";

        if (!id) {
          console.warn("YouTube tag found but no ID provided", node);
          return;
        }

        // Extract video ID if full URL is provided
        let videoId = id;
        if (id.includes("youtube.com") || id.includes("youtu.be")) {
          const match =
            id.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/) ||
            id.match(/youtube\.com\/embed\/([^&\n?#]+)/);
          videoId = match ? match[1] : id;
        }

        console.log("Processing YouTube embed:", { id, videoId });

        // Replace the node with an iframe embed
        node.tagName = "div";
        node.properties = {
          class:
            "my-8 rounded-xl border border-border/50 bg-background/50 overflow-hidden shadow-sm",
        };
        node.children = [
          {
            type: "element",
            tagName: "div",
            properties: {
              class: "relative w-full",
              style: "padding-bottom: 56.25%",
            },
            children: [
              {
                type: "element",
                tagName: "iframe",
                properties: {
                  class: "absolute top-0 left-0 w-full h-full",
                  src: `https://www.youtube.com/embed/${videoId}`,
                  title: title,
                  allow:
                    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                  allowfullscreen: true,
                  frameborder: "0",
                },
                children: [],
              },
            ],
          },
        ];
      }
    });
  };
}
