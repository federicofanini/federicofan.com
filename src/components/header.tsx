"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  className?: string;
  showLogo?: boolean;
  showNav?: boolean;
  showSearch?: boolean;
  showThemeToggle?: boolean;
  showSocials?: boolean;
}

export function Header({
  className,
  showLogo = true,
  showNav = true,
  showSearch = false,
  showThemeToggle = true,
  showSocials = true,
}: HeaderProps) {
  return (
    <header className={cn("w-full bg-background/95 mb-6", className)}>
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between">
        {/* Logo Section */}
        {showLogo && (
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image
                src="/logo/fed.svg"
                alt="fed"
                width={32}
                height={32}
                className="dark:invert"
                priority
                quality={100}
                fetchPriority="high"
                sizes="32px"
                draggable={false}
              />
            </Link>
          </div>
        )}

        {/* Navigation Section */}
        {showNav && (
          <nav className="flex items-center gap-1 overflow-x-auto">
            {DATA.navbar.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-2 py-1.5 md:px-3 text-xs md:text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
            {/* Placeholder: Additional nav items */}
            {/* <Link href="/projects" className="...">Projects</Link> */}
          </nav>
        )}

        {/* Utilities Section */}
        <div className="flex items-center gap-1">
          {/* Search Placeholder */}
          {showSearch && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </Button>
              {/* Placeholder: Search modal/dropdown implementation */}
              {/* <SearchDialog /> */}
            </>
          )}

          {/* Social Links Placeholder */}
          {showSocials && (
            <>
              <div className="flex items-center gap-2">
                {Object.values(DATA.contact.social)
                  .filter(
                    (social) => social.name === "YouTube" || social.name === "X"
                  )
                  .map((social) => (
                    <Link
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center size-6 rounded-md border border-border bg-background hover:bg-accent transition-colors"
                      aria-label={social.name}
                    >
                      <social.icon className="size-3" />
                      <span className="sr-only">{social.name}</span>
                    </Link>
                  ))}
              </div>
            </>
          )}

          {/* Theme Toggle */}
          {showThemeToggle && (
            <>
              <ModeToggle />
            </>
          )}

          {/* Placeholder: Additional utilities */}
          {/* <Separator orientation="vertical" className="h-4" /> */}
          {/* <Button variant="ghost" size="icon">...</Button> */}
          {/* <Notifications /> */}
          {/* <UserMenu /> */}
        </div>
      </div>
    </header>
  );
}
