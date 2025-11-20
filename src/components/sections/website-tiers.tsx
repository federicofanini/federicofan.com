"use client";

import { Button } from "@/components/ui/button";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import Link from "next/link";

const tiers = [
  {
    name: "MVP",
    price: "$1,490",
    period: "",
    tagline: "One-time fee",
    description: "Get a website on a flat deal fee, no monthly subscriptions.",
    features: [
      "One-page site (Next.js + Shadcn)",
      "Responsive + Fast",
      "Copy + SEO optimized",
      "Full ownership (repo in your GitHub)",
      "5 business days delivery",
    ],
    cta: "Get Started",
    ctaLink: "https://book.stripe.com/14AfZh0yf4LX50j0mBdZ60a",
    bestFor: "Perfect for landing pages",
  },
  {
    name: "Founder",
    price: "$3,990",
    period: "/mo",
    tagline: "HOT",
    description: "Perfect for startups and entrepreneurs.",
    features: [
      "Unlimited requests (one at a time)",
      "2–3 day turnaround",
      "Next.js + Tailwind + Shadcn",
      "SEO + Analytics",
      "Full ownership",
      "Hosting (addon)",
    ],
    cta: "Get Started",
    ctaLink: "https://buy.stripe.com/bJe5kDgxdbalakD9XbdZ60b",
    bestFor: "Pause or cancel anytime",
    featured: true,
  },
  {
    name: "App",
    price: "TBD",
    period: "",
    tagline: "Enterprise",
    description: "Web app development for startups and entrepreneurs.",
    features: [
      "Web app development + PWA",
      "2–3 weeks turnaround",
      "Next.js + Tailwind + Shadcn",
      "SEO + Analytics",
      "Hosting and maintenance",
      "Full ownership",
    ],
    cta: "Contact",
    ctaLink: "https://cal.com/fedef/30min",
    bestFor: "Custom solutions",
  },
];

export function WebsiteTiers() {
  return (
    <div className="mt-8 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative rounded-2xl border bg-card p-6 transition-all duration-300 ${
              tier.featured
                ? "border-primary shadow-xl shadow-primary/20 scale-[1.02] md:scale-105"
                : "hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 hover:-translate-y-1"
            }`}
          >
            {tier.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  {tier.tagline}
                </span>
              </div>
            )}

            <div className="mb-6">
              {!tier.featured && (
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {tier.tagline}
                </span>
              )}
              <h3 className="text-2xl font-bold font-museo mt-2 mb-1">
                {tier.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold font-mono tracking-tight">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-muted-foreground text-base font-medium">
                    {tier.period}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{tier.bestFor}</p>
            </div>

            <div className="space-y-2.5 mb-6 min-h-[160px]">
              {tier.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <IconCheck
                    className={`size-4 flex-shrink-0 mt-0.5 ${
                      tier.featured ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <span className="text-sm leading-relaxed text-foreground/90">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <Link href={tier.ctaLink} target="_blank" className="block">
              <Button
                className={`w-full font-semibold font-museo group ${
                  tier.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                    : ""
                }`}
                variant={tier.featured ? "default" : "outline"}
                size="lg"
              >
                {tier.cta}
                <IconArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
