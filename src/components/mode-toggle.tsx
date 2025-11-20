"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center size-8 rounded-lg border bg-card transition-all duration-300",
        "hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 hover:-translate-y-0.5",
        "active:scale-95"
      )}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <SunIcon className="size-4 dark:hidden text-orange-600" />
      <MoonIcon className="hidden size-4 dark:block text-blue-400" />
    </button>
  );
}
