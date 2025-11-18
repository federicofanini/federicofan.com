import Link from "next/link";

const links = [
  {
    title: "Features",
    href: "#",
  },
  {
    title: "Solution",
    href: "#",
  },
  {
    title: "Customers",
    href: "#",
  },
  {
    title: "Pricing",
    href: "#",
  },
  {
    title: "Help",
    href: "#",
  },
  {
    title: "About",
    href: "#",
  },
];

export function Footer() {
  return (
    <footer className="mt-12 justify-center items-center mx-auto text-sm text-muted-foreground font-mono">
      <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
        © {new Date().getFullYear()} Federico Fan, All rights reserved
      </span>
    </footer>
  );
}
