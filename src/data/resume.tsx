import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Federico Fan",
  initials: "FF",
  url: "https://federicofanini.it",
  location: "Rome, IT",
  locationLink: "https://www.google.com/maps/place/rome",
  description: "I don't build resumes, I build startups.",
  summary:
    "I love taking an idea, turning it into something real, and seeing people actually use it. From IoT-powered healthcare to [open-source fitness tools](https://gymbrah.com?via=federicofanini), I’m all about shipping fast and solving real problems. My stack? A good dose of curiosity and a drive to keep building.",
  avatarUrl: "/me.jpg",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
    "Postgres",
    "Docker",
    "IoT",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "f@fanini.eu",
    tel: "+39",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://git.new/fedef",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://dub.sh/fedef-linkedin",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://dub.sh/fedef",
        icon: Icons.x,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:f@fanini.eu",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "GymBrah.com",
      href: "https://gymbrah.com",
      badges: [],
      location: "Remote",
      title: "Engineering & Founder",
      logoUrl: "/gymbrah.png",
      start: "2025",
      end: "Present",
      abandoned: false,
      description: "Run your fitness business without chaos. Open Source.",
    },
    {
      company: "fed.fan",
      href: "https://fed.fan",
      badges: [],
      location: "Remote",
      title: "Engineering & Founder",
      logoUrl: "/fedfan.png",
      start: "2025",
      end: "Present",
      abandoned: false,
      description: "A free link in bio for founders.",
    },
    {
      company: "Snake",
      href: "https://snakemed.it",
      badges: [],
      location: "Remote",
      title: "Engineering & Founder",
      logoUrl: "/snake.png",
      start: "2022",
      end: "Present",
      abandoned: false,
      description: "Defend your health, smarter.",
    },
    {
      company: "BLOCKSHUB",
      href: "https://blockshub.eu",
      badges: [],
      location: "Remote",
      title: "Chief Operating Officer",
      logoUrl: "/blockshub.png",
      start: "2021",
      end: "Present",
      abandoned: false,
      description: "Managing operations and business development.",
    },
    {
      company: "Blue Sky Analytics",
      href: "https://bsky.uno",
      badges: [],
      location: "Remote",
      title: "Engineering & Founder",
      logoUrl: "/bsky.png",
      start: "2024",
      end: "2025",
      abandoned: true,
      description: "A free link in bio for founders.",
    },
    {
      company: "SubsMap.com",
      href: "https://subsmap.com",
      badges: [],
      location: "Remote",
      title: "Engineering & Founder",
      logoUrl: "/subs.svg",
      start: "2024",
      end: "2025",
      abandoned: true,
      description: "A map of all the subscriptions you have.",
    },
    {
      company: "Shipper",
      href: "https://shipper.studio/",
      badges: [],
      location: "Remote",
      title: "Engineering & Founder",
      logoUrl: "/shipper.png",
      start: "2024",
      end: "2025",
      abandoned: true,
      description: "NextJS Boilerplate to ship app faster.",
    },
    {
      company: "Astroport",
      href: "https://astroport.it/",
      badges: [],
      location: "Remote",
      title: "Engineering & Founder",
      logoUrl: "/astro.png",
      start: "2023",
      end: "2024",
      abandoned: true,
      description: "Indie Hacker's Toolkit",
    },
  ],
  education: [
    {
      school: "LUISS Guido Carli",
      href: "https://www.luiss.it/",
      degree: "MSc in Corporate Finance",
      logoUrl: "/luiss.png",
      start: "2021",
      end: "2023",
    },
    {
      school: "The Blockchain Management School",
      href: "https://www.theblockchainmanagementschool.it/",
      degree: "MSc in Blockchain Technology",
      logoUrl: "/tbms.png",
      start: "2022",
      end: "2022",
    },
    {
      school: "LUISS Guido Carli",
      href: "https://www.luiss.it/",
      degree: "BSc Economy and Management",
      logoUrl: "/luiss.png",
      start: "2018",
      end: "2021",
    },
  ],
  projects: [
    {
      title: "GymBrah.com",
      href: "https://gymbrah.com",
      dates: "Jan 2025",
      active: true,
      description:
        "Gymbrah is an open-source fitness platform that helps you track your workouts and progress. For [gym owners](https://coach.gymbrah.com), it's a way to manage their business and for [gym users](https://athlete.gymbrah.com/), it's a way to track their progress and stay motivated.",
      technologies: [
        "Next.js",
        "Typescript",
        "Supabase",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Resend",
      ],
      links: [
        {
          type: "Website",
          href: "https://gymbrah.com",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/federicofanini/gymbrah.com",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/startup/gb.mp4",
    },
    {
      title: "fed.fan",
      href: "https://fed.fan",
      dates: "Feb 2025",
      active: true,
      description:
        "A free link in bio for founders. Showcasing your projects, links and socials. Easy to set up and fully open-source.",
      technologies: [
        "Next.js",
        "Typescript",
        "Supabase",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://fed.fan",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/federicofanini/fed.fan",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/startup/fedfan.mp4",
    },
  ],
  hackathons: [],
} as const;
