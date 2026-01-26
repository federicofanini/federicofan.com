"use client";

import { useEffect } from "react";

export function CodeBlockEnhancer() {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll("article pre");

    codeBlocks.forEach((pre) => {
      // Skip if already enhanced
      if (pre.parentElement?.classList.contains("code-block-wrapper")) {
        return;
      }

      // Get the code content
      const code = pre.querySelector("code");
      if (!code) return;

      const codeText = code.innerText;

      // Create wrapper
      const wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper relative group my-6";

      // Create copy button
      const button = document.createElement("button");
      button.className =
        "copy-button absolute right-4 top-3 z-10 h-8 w-8 rounded-md border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition-colors opacity-0 group-hover:opacity-100";
      button.setAttribute("aria-label", "Copy code to clipboard");
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 m-auto copy-icon text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 m-auto check-icon hidden text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      `;

      // Add copy functionality
      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(codeText);

          // Show checkmark
          const copyIcon = button.querySelector(".copy-icon");
          const checkIcon = button.querySelector(".check-icon");
          if (copyIcon && checkIcon) {
            copyIcon.classList.add("hidden");
            checkIcon.classList.remove("hidden");

            setTimeout(() => {
              copyIcon.classList.remove("hidden");
              checkIcon.classList.add("hidden");
            }, 2000);
          }
        } catch (err) {
          console.error("Failed to copy code:", err);
        }
      });

      wrapper.appendChild(button);

      // Update pre styling
      pre.className =
        "relative rounded-lg border border-zinc-800 overflow-x-auto leading-relaxed font-mono text-zinc-100";

      // Wrap the pre element
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
    });
  }, []);

  return null;
}

