import { cn } from "@/lib/utils";
import { IconNfc } from "@tabler/icons-react";

export const NFCScanIllustration = () => {
  return (
    <div
      aria-hidden
      className="bg-foreground/3 relative isolate rounded-3xl border p-6 mx-auto w-fit"
    >
      <CardDecorator className="opacity-50" />

      {/* Scanning animation line */}
      <div className="animate-scan absolute inset-x-6 inset-y-8 z-10 mix-blend-color">
        <div className="bg-linear-to-b via-primary animate-hue-rotate h-8.5 absolute -inset-x-[9px] m-auto -translate-y-1/2 rounded-md from-transparent to-transparent" />
      </div>
      <div className="animate-scan absolute inset-x-6 inset-y-8 z-10">
        <div className="bg-foreground absolute -inset-x-4 m-auto h-px rounded-full" />
        <div className="bg-linear-to-r to-primary absolute -inset-x-4 m-auto h-px rounded-full from-blue-500 blur" />
      </div>

      {/* NFC Card */}
      <div
        aria-hidden
        className="bg-card ring-border-illustration shadow-black/6.5 relative w-40 h-32 rounded-xl p-4 shadow-lg ring-1 flex flex-col justify-between overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500 to-cyan-500 rounded-full blur-2xl" />
        </div>

        {/* NFC Icon */}
        <div className="relative z-10 flex justify-end">
          <div className="bg-primary/10 rounded-full p-2">
            <IconNfc className="size-6 text-primary animate-pulse" />
          </div>
        </div>

        {/* Card details */}
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <div className="bg-border h-2 w-12 rounded-full" />
            <div className="bg-border h-2 w-8 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-border h-2 w-16 rounded-full" />
            <div className="bg-border h-2 w-6 rounded-full" />
          </div>
          <div className="pt-2">
            <div className="bg-border h-2.5 w-24 rounded-full" />
          </div>
        </div>

        {/* Wave effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-primary/30 rounded-full animate-ping" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-primary/20 rounded-full animate-ping"
            style={{ animationDelay: "0.5s" }}
          />
        </div>
      </div>

      {/* Phone scanning indicator */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-card border rounded-full px-3 py-1 shadow-lg">
        <p className="text-xs font-mono text-primary font-medium">Scanned ✓</p>
      </div>
    </div>
  );
};

export const CardDecorator = ({ className }: { className?: string }) => (
  <>
    <span
      className={cn(
        "border-foreground absolute -left-px -top-px block size-2 rounded-tl border-l border-t",
        className
      )}
    ></span>
    <span
      className={cn(
        "border-foreground absolute -right-px -top-px block size-2 rounded-tr border-r border-t",
        className
      )}
    ></span>
    <span
      className={cn(
        "border-foreground absolute -bottom-px -left-px block size-2 rounded-bl border-b border-l",
        className
      )}
    ></span>
    <span
      className={cn(
        "border-foreground absolute -bottom-px -right-px block size-2 rounded-br border-b border-r",
        className
      )}
    ></span>
  </>
);

export default NFCScanIllustration;
