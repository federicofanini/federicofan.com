import { Phone, ScreenShare, Video, WifiOff } from "lucide-react";
import Image from "next/image";

export const NotFoundIllustration = () => {
  return (
    <div aria-hidden className="border-border/50 rounded-3xl border p-2">
      <div className="ring-border-illustration bg-card shadow-black/6.5 min-w-80 max-w-sm rounded-2xl p-4 shadow-xl ring-1">
        <Video className="ml-2 size-5 stroke-transparent *:fill-zinc-500/45 *:first:fill-zinc-500" />

        <div className="before:border-foreground/25 shadow-black/4 relative mt-3 overflow-hidden rounded-lg shadow-md before:absolute before:inset-0 before:rounded-lg before:border before:border-dotted">
          <div className="inset-ring-1 inset-ring-white/15 text-shadow absolute bottom-1 left-1 block rounded bg-black/20 px-1 py-0.5 text-xs text-white backdrop-blur">
            Federico
          </div>

          {/* Disconnected Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-10">
            <WifiOff className="size-10 text-rose-500 animate-pulse" />
            <div className="text-white font-medium text-sm">
              Connection Lost
            </div>
            <div className="text-white/70 text-xs font-mono">Error 404</div>
          </div>

          <Image
            src="/me-doc.png"
            alt="Federico"
            width={800}
            height={300}
            className="object-cover"
          />
        </div>
        <div className="relative flex justify-center px-3 pt-3">
          <div className="text-muted-foreground absolute bottom-0 left-2 top-3 my-auto flex h-fit gap-1 text-xs font-medium">
            4:04
          </div>

          <div className="flex gap-3">
            <div className="bg-foreground/6.5 hover:bg-foreground/10 flex h-7 w-8 cursor-pointer items-center rounded-full opacity-50">
              <ScreenShare className="m-auto size-4" />
            </div>
            <div className="inset-ring-foreground/20 inset-ring-1 flex h-7 w-11 cursor-pointer items-center rounded-full bg-rose-500 shadow">
              <Phone className="rotate-136 m-auto size-4 fill-white stroke-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundIllustration;
