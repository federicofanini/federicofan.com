"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="inline-flex items-center justify-center size-6 rounded-md border border-border bg-background hover:bg-accent transition-colors"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <SunIcon className="size-3 dark:hidden" />
      <MoonIcon className="hidden size-3 dark:block" />
    </button>
  );
}
