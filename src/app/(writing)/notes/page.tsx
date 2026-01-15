import { getAllWritings, getAllTags } from "@/data/blog";
import WritingsList from "@/components/writings-list";
import { Suspense } from "react";

export const metadata = {
  title: "All Writings",
  description: "My notes, journey entries, and thoughts—all in one place.",
};

export default async function NotesPage() {
  const allPosts = await getAllWritings();
  const allTags = await getAllTags();

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 max-w-2xl mx-auto py-12 px-4">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <p className="text-muted-foreground">Loading writings...</p>
          </div>
        }
      >
        <WritingsList allPosts={allPosts} allTags={allTags} />
      </Suspense>
    </main>
  );
}
