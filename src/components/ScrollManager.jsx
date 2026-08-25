import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

export default function ScrollManager() {
  const location = useLocation();
  const pathname = location.pathname;
  const hash = location.hash;

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(String(hash).replace(/^#/, ""));
      const scrollToAnchor = () => {
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      requestAnimationFrame(() => setTimeout(scrollToAnchor, 0));
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
