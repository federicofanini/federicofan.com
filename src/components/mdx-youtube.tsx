"use client";

interface MDXYouTubeProps {
  id: string;
  title?: string;
}

export function MDXYouTube({
  id,
  title = "YouTube video player",
}: MDXYouTubeProps) {
  // Extract YouTube video ID from URL if full URL is provided
  const getYouTubeVideoId = (idOrUrl: string): string => {
    if (idOrUrl.includes("youtube.com") || idOrUrl.includes("youtu.be")) {
      const match =
        idOrUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/) ||
        idOrUrl.match(/youtube\.com\/embed\/([^&\n?#]+)/);
      return match ? match[1] : idOrUrl;
    }
    return idOrUrl;
  };

  const videoId = getYouTubeVideoId(id);

  return (
    <div className="my-8 rounded-xl border border-border/50 bg-background/50 overflow-hidden shadow-sm">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}
