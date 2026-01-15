import Image from "next/image";
import Link from "next/link";
import React from "react";

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

// Headings with proper hierarchy and spacing
function createHeading(level: number) {
  const Heading = (props: any) => {
    const { children, ...rest } = props;
    const slug = slugify(children as string);

    const styles = {
      1: "text-3xl font-medium tracking-tight mt-16 mb-6 first:mt-0",
      2: "text-2xl font-medium tracking-tight mt-16 mb-6 pb-2 border-b border-border/30 first:mt-0",
      3: "text-xl font-medium tracking-tight mt-10 mb-4",
      4: "text-lg font-medium tracking-tight mt-8 mb-3",
      5: "text-base font-semibold tracking-tight mt-6 mb-2",
      6: "text-sm font-semibold tracking-tight mt-4 mb-2 uppercase text-muted-foreground",
    };

    return React.createElement(
      `h${level}`,
      {
        id: slug,
        className: styles[level as keyof typeof styles],
        ...rest,
      },
      children
    );
  };

  Heading.displayName = `Heading${level}`;
  return Heading;
}

// Paragraph with justified text and proper spacing
function Paragraph(props: any) {
  const { children, ...rest } = props;
  return (
    <p
      className="text-base leading-relaxed mb-6 text-muted-foreground text-justify"
      {...rest}
    >
      {children}
    </p>
  );
}

// Blockquote with elegant styling
function Blockquote(props: any) {
  const { children, ...rest } = props;
  return (
    <blockquote
      className="my-8 pl-6 border-l-4 border-primary/40 rounded-r-lg italic text-foreground space-y-2"
      {...rest}
    >
      {children}
    </blockquote>
  );
}

// Custom link with underline on hover
function CustomLink(props: any) {
  const href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        {...props}
        className="text-foreground underline decoration-muted-foreground/40 underline-offset-2 hover:decoration-foreground transition-colors"
      >
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a
        {...props}
        className="text-foreground underline decoration-muted-foreground/40 underline-offset-2 hover:decoration-foreground transition-colors"
      />
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      className="text-foreground underline decoration-muted-foreground/40 underline-offset-2 hover:decoration-foreground transition-colors"
    />
  );
}

// Strong/Bold text
function Strong(props: any) {
  const { children, ...rest } = props;
  return (
    <strong className="font-semibold text-foreground/90" {...rest}>
      {children}
    </strong>
  );
}

// Emphasis/Italic text
function Em(props: any) {
  const { children, ...rest } = props;
  return (
    <em className="italic text-muted-foreground" {...rest}>
      {children}
    </em>
  );
}

// Inline code
function Code(props: any) {
  const { children, ...rest } = props;
  return (
    <code
      className="text-sm font-mono bg-muted/50 px-1.5 py-0.5 rounded border border-border/50"
      {...rest}
    >
      {children}
    </code>
  );
}

// Code block
function Pre(props: any) {
  const { children, ...rest } = props;
  return (
    <pre
      className="my-8 p-6 bg-muted/50 rounded-lg border border-border overflow-x-auto"
      {...rest}
    >
      {children}
    </pre>
  );
}

// Lists
function Ul(props: any) {
  const { children, ...rest } = props;
  return (
    <ul
      className="my-6 ml-6 space-y-3 list-disc marker:text-primary/70"
      {...rest}
    >
      {children}
    </ul>
  );
}

function Ol(props: any) {
  const { children, ...rest } = props;
  return (
    <ol
      className="my-6 ml-6 space-y-3 list-decimal marker:text-primary/70 marker:font-semibold"
      {...rest}
    >
      {children}
    </ol>
  );
}

function Li(props: any) {
  const { children, ...rest } = props;
  return (
    <li className="text-muted-foreground leading-relaxed pl-2.5" {...rest}>
      {children}
    </li>
  );
}

// Horizontal rule
function Hr() {
  return (
    <hr className="my-12 border-none h-px bg-gradient-to-r from-transparent via-border to-transparent" />
  );
}

// Image with rounded corners
function RoundedImage(props: any) {
  return (
    <div className="my-8">
      <Image
        alt={props.alt || ""}
        className="rounded-lg border border-border"
        {...props}
      />
    </div>
  );
}

// Table components for structured data
function Table(props: any) {
  const { children, ...rest } = props;
  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse" {...rest}>
        {children}
      </table>
    </div>
  );
}

function Thead(props: any) {
  const { children, ...rest } = props;
  return (
    <thead className="border-b border-border" {...rest}>
      {children}
    </thead>
  );
}

function Tbody(props: any) {
  const { children, ...rest } = props;
  return (
    <tbody className="divide-y divide-border/50" {...rest}>
      {children}
    </tbody>
  );
}

function Tr(props: any) {
  const { children, ...rest } = props;
  return <tr {...rest}>{children}</tr>;
}

function Th(props: any) {
  const { children, ...rest } = props;
  return (
    <th
      className="px-4 py-3 text-left text-sm font-medium text-foreground"
      {...rest}
    >
      {children}
    </th>
  );
}

function Td(props: any) {
  const { children, ...rest } = props;
  return (
    <td className="px-4 py-3 text-sm text-muted-foreground" {...rest}>
      {children}
    </td>
  );
}

// Export all components
export const manifestoComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  p: Paragraph,
  blockquote: Blockquote,
  a: CustomLink,
  strong: Strong,
  em: Em,
  code: Code,
  pre: Pre,
  ul: Ul,
  ol: Ol,
  li: Li,
  hr: Hr,
  img: RoundedImage,
  Image: RoundedImage,
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td,
};
