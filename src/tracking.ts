import { useEffect } from "react";
import { track } from "@vercel/analytics/react";

/** Counts clicks on every affiliate button (a[data-cta]) with the part of the page it was in. */
export function useCtaTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest("a[data-cta]");
      if (!a) return;
      const place =
        a.closest("section")?.id || (a.closest("header") ? "header" : a.closest("footer") ? "footer" : "floating-button");
      track("register_click", { place });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
