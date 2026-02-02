"use client";

import { useEffect } from "react";

export function useSmoothScroll() {
  useEffect(() => {
    // Handle smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          e.preventDefault();

          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            const navbarHeight = 80; // Adjust based on your navbar height
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });

            // Update URL without jumping
            window.history.pushState(null, "", href);
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);
}
