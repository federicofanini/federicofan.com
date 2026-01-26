import Image from "next/image";
import Link from "next/link";
import React from "react";

// Copy button component for code blocks
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="absolute right-4 top-3 z-10 h-8 w-8 rounded-md border border-zinc-700 hover:bg-zinc-700 transition-colors"
      aria-label="Copy code to clipboard"
    >
      {copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 m-auto text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 m-auto text-zinc-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

// Custom Pre component with copy functionality
function Pre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = React.useRef<HTMLPreElement>(null);
  const [codeString, setCodeString] = React.useState("");

  React.useEffect(() => {
    if (preRef.current) {
      const code = preRef.current.querySelector("code");
      if (code) {
        setCodeString(code.innerText);
      }
    }
  }, [children]);


  return (
    <div className="relative group my-6">
      
      {codeString && <CopyButton text={codeString} />}
      <pre
        ref={preRef}
        className="relative rounded-lg border border-zinc-800 p-4 overflow-x-auto leading-relaxed font-mono text-zinc-100"
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}

// Custom inline code component
function Code({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  // Check if this is inline code (no className means inline)
  const isInline = !className;

  if (isInline) {
    return (
      <code
        className="m-0 mx-1 px-2 py-1 border rounded-md text-[13px] font-mono text-zinc-100 bg-zinc-950"
        {...props}
      >
        {children}
      </code>
    );
  }

  // Block code - let Pre handle the styling
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props: any) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: any) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

// This replaces rehype-slug
function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    let slug = slugify(children as string);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
}

export const globalComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  Table,
  pre: Pre,
  code: Code,
};
