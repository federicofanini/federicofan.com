"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  IconCash,
  IconLink,
  IconToggleLeftFilled,
  IconToggleRightFilled,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { ChevronRightIcon } from "lucide-react";
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
  sale?: boolean;
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
  sale,
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
        <Avatar className="border size-12 m-auto rounded-lg">
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
              {sale ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/startups/${title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="text-xs sm:text-sm tabular-nums"
                      >
                        <Badge className="text-xs px-2 py-0.5 font-museo bg-background text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white cursor-pointer flex items-center gap-1">
                          <IconCash className="size-4" />
                          For Sale
                        </Badge>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to view deal details</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <div className="text-xs sm:text-sm tabular-nums text-muted-foreground">
                  <Badge
                    className={`text-xs px-2 py-0.5 font-museo ${
                      abandoned
                        ? "bg-background text-secondary border border-secondary hover:bg-secondary hover:text-secondary-foreground"
                        : "bg-background text-emerald-600 border border-emerald-600 hover:bg-emerald-600 hover:text-white"
                    }`}
                  >
                    {abandoned ? (
                      <span className="flex items-center gap-1">
                        <IconToggleLeftFilled className="size-4" />
                        Shut Down
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <IconToggleRightFilled className="size-4" />
                        Live
                      </span>
                    )}
                  </Badge>
                </div>
              )}
              {href && (
                <Link
                  href={href}
                  className="size-6 inline-flex items-center justify-center rounded-md border bg-background hover:bg-primary transition-colors hover:text-white"
                  target="_blank"
                >
                  <IconLink className="size-3" />
                  <span className="sr-only">Visit {title}</span>
                </Link>
              )}
            </div>
          </div>
          {description && (
            <div className="font-sans text-xs">{description}</div>
          )}
        </CardHeader>
        {subtitle && (
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
            {subtitle}
          </motion.div>
        )}
      </div>
    </Card>
  );
};
