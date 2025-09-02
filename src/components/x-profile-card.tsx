import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { CalendarIcon, LinkIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

interface TwitterProfileCardProps {
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
  headerImageUrl?: string;
  verified?: boolean;
  location?: string;
  website?: string;
  joinDate?: string;
  following?: number;
  followers?: number;
}

export function TwitterProfileCard({
  name,
  username,
  bio,
  avatarUrl,
  headerImageUrl,
  verified = false,
  location,
  website,
  joinDate = "November 2019",
  following = 352,
  followers = 884,
}: TwitterProfileCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-background border overflow-hidden">
      {/* Header Image */}
      <div className="relative h-48 w-full bg-gradient-to-br from-green-400 to-teal-500">
        {headerImageUrl ? (
          <Image
            src={headerImageUrl}
            alt="Profile header"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-400 to-teal-500" />
        )}
      </div>

      <div className="px-4 pb-4">
        {/* Avatar and Edit Profile Button */}
        <div className="flex items-end justify-between -mt-16 mb-3">
          <Avatar className="size-32 border-4 border-background shadow-lg bg-green-400">
            <AvatarImage src={avatarUrl} alt={name} className="object-cover" />
            <AvatarFallback className="text-2xl bg-green-400 text-white">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <Button className="rounded-full font-semibold">
            <Link href="https://x.com/FedericoFan" target="_blank">
              Follow back
            </Link>
          </Button>
        </div>

        {/* Name and Verification */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-1">
            <h1 className="text-xl font-bold">{name}</h1>
            {verified && (
              <div className="inline-flex items-center justify-center size-5 bg-blue-500 rounded-full">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
          <p className="text-gray-500 text-sm">{username}</p>
        </div>

        {/* Bio */}
        <div className="mb-3">
          <p className="text-sm leading-relaxed">
            Building medtech startups, while funding science by building
            websites for a flat rate{" "}
            <Link
              href="https://uara.co"
              className="text-blue-500 hover:underline"
            >
              uara.co
            </Link>
          </p>
        </div>

        {/* Location, Website, Birthday, Join Date */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <MapPinIcon className="size-4" />
            <span>My startups</span>
          </div>
          {website && (
            <div className="flex items-center gap-1">
              <LinkIcon className="size-4" />
              <Link
                href={`https://${website}`}
                className="text-blue-500 hover:underline"
                target="_blank"
              >
                {website}
              </Link>
            </div>
          )}
          <div className="flex items-center gap-1">
            <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span>Born May 9, 1999</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon className="size-4" />
            <span>Joined {joinDate}</span>
          </div>
        </div>

        {/* Following and Followers */}
        <div className="flex items-center gap-5 text-sm">
          <div className="flex items-center gap-1">
            <span className="font-bold text-foreground">
              {following.toLocaleString()}
            </span>
            <span className="text-gray-500 hover:underline cursor-pointer">
              Following
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-bold text-foreground">
              {followers.toLocaleString()}
            </span>
            <span className="text-gray-500 hover:underline cursor-pointer">
              Followers
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
