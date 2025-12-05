"use client";

import { DATA } from "@/data/resume";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconMail,
  IconExternalLink,
  IconCash,
  IconBrandX,
} from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function StartupForSalePage({
  params,
}: {
  params: { slug: string };
}) {
  // Find the startup from the work data
  const startup = DATA.work.find(
    (work) =>
      work.company.toLowerCase().replace(/\s+/g, "-") === params.slug &&
      work.sale
  );

  if (!startup) {
    notFound();
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-16">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-start gap-6">
          <Avatar className="border size-24 rounded-xl">
            <AvatarImage
              src={startup.logoUrl}
              alt={startup.company}
              className="object-contain rounded-xl"
            />
            <AvatarFallback className="rounded-xl text-2xl">
              {startup.company[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold font-museo">
                {startup.company}
              </h1>
              <Badge className="bg-orange-600 hover:bg-orange-700 text-white">
                For Sale
              </Badge>
            </div>
            {startup.askingPrice && (
              <div className="mb-3">
                <span className="text-2xl font-bold text-orange-600">
                  {startup.askingPrice}
                </span>
                <span className="text-sm text-muted-foreground ml-2">
                  (negotiable)
                </span>
              </div>
            )}
            <p className="text-muted-foreground text-lg mb-4">
              {startup.description}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {startup.start} - {startup.end}
              </span>
              {startup.href && (
                <Link
                  href={startup.href}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  Visit Website
                  <IconExternalLink className="size-4" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Deal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconCash className="size-6" />
              Deal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 mt-2">
            <div className="space-y-2">
              <p className="text-muted-foreground">
                {startup.company} is {startup.description.toLowerCase()}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-sm text-muted-foreground">
                    {startup.abandoned ? "Shut Down" : "Live"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">
                    {startup.location}
                  </p>
                </div>
                {startup.askingPrice && (
                  <div>
                    <p className="text-sm font-medium">Asking Price</p>
                    <p className="text-sm font-semibold text-orange-600">
                      {startup.askingPrice}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium">Timeline</p>
                  <p className="text-sm text-muted-foreground">
                    {startup.start} - {startup.end}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <h3 className="font-semibold text-lg">How to Make an Offer</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>
                  Send an email to{" "}
                  <strong className="text-foreground">fed@uara.ai</strong> with
                  your offer
                </li>
                <li>Include your proposed price and terms</li>
                <li>Share your background and plans for the project</li>
                <li>I&apos;ll review and respond within 48 hours</li>
              </ol>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <h3 className="font-semibold text-lg">What&apos;s Included</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Complete source code and repository access</li>
                <li>Domain name and hosting setup</li>
                <li>Documentation and deployment guides</li>
                <li>All branding assets (logo, designs, etc.)</li>
                <li>1 month of post-sale support</li>
              </ul>
            </div>

            <div className="flex gap-4 pt-6">
              <Button asChild className="flex-1" size="lg">
                <Link
                  href="https://x.com/FedericoFan"
                  className="flex items-center gap-2"
                >
                  <IconBrandX className="size-5" />
                  DM me to discuss the deal
                </Link>
              </Button>
              {startup.href && (
                <Button asChild variant="outline" size="lg">
                  <Link
                    href={startup.href}
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    <IconExternalLink className="size-5" />
                    View Live Site
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/startups"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to all startups
          </Link>
        </div>
      </div>
    </div>
  );
}
