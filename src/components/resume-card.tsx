"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
  abandoned?: boolean;
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
  abandoned,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Card className="flex">
      <div className="flex-none">
        <Avatar className="border size-12 m-auto bg-muted-background dark:bg-foreground rounded-lg">
          <AvatarImage
            src={logoUrl}
            alt={altText}
            className="object-contain rounded-lg"
          />
          <AvatarFallback className="rounded-lg">{altText[0]}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex-grow ml-4 items-center flex-col group">
        <CardHeader>
          <div className="flex items-center justify-between gap-x-2 text-base">
            <Link
              href={href || "#"}
              className="block cursor-pointer"
              onClick={handleClick}
            >
              <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
                {title}
                {badges && (
                  <span className="inline-flex gap-x-1">
                    {badges.map((badge, index) => (
                      <Badge
                        variant="secondary"
                        className="align-middle text-xs"
                        key={index}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </span>
                )}

                <ChevronRightIcon
                  className={cn(
                    "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}
                />
              </h3>
            </Link>
            <div className="flex items-center gap-2 justify-end">
              <div className="text-xs sm:text-sm tabular-nums text-muted-foreground">
                {abandoned ? (
                  <Badge variant="secondary" className="text-xs">
                    💀 abandoned
                  </Badge>
                ) : (
                  period
                )}
              </div>
              {href && (
                <Link
                  href={href}
                  className="size-6 inline-flex items-center justify-center rounded-md border bg-background hover:bg-accent transition-colors"
                  target="_blank"
                >
                  <ExternalLinkIcon className="size-3" />
                  <span className="sr-only">Visit {title}</span>
                </Link>
              )}
            </div>
          </div>
          {subtitle && <div className="font-sans text-xs">{subtitle}</div>}
        </CardHeader>
        {description && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isExpanded ? 1 : 0,

              height: isExpanded ? "auto" : 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-2 text-xs"
          >
            {description}
          </motion.div>
        )}
      </div>
    </Card>
  );
};
