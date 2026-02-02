/**
 * Performance optimization utilities for Clems Grafter Creative
 * These utilities help improve loading times and user experience
 */

/**
 * Lazy load images with intersection observer
 */
export function lazyLoadImage(image: HTMLImageElement) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        if (src) {
          img.src = src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      }
    });
  });

  imageObserver.observe(image);
}

/**
 * Preload critical resources
 */
export function preloadCriticalAssets() {
  // Preload hero video
  const videoLink = document.createElement("link");
  videoLink.rel = "preload";
  videoLink.as = "video";
  videoLink.href = "/CGC Video Motion.mp4";
  document.head.appendChild(videoLink);

  // Preload logo
  const logoLink = document.createElement("link");
  logoLink.rel = "preload";
  logoLink.as = "image";
  logoLink.href = "/CGC Logo.png";
  document.head.appendChild(logoLink);
}

/**
 * Defer non-critical CSS
 */
export function deferNonCriticalCSS() {
  const stylesheets = document.querySelectorAll(
    'link[rel="stylesheet"][data-defer]'
  );
  stylesheets.forEach(link => {
    const el = link as HTMLLinkElement;
    el.media = "print";
    el.onload = () => {
      el.media = "all";
    };
  });
}

/**
 * Optimize video loading
 */
export function optimizeVideo(video: HTMLVideoElement) {
  // Use intersection observer to only play video when visible
  const videoObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  videoObserver.observe(video);
}

/**
 * Debounce function for performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for scroll/resize events
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Get optimal image format based on browser support
 */
export function getOptimalImageFormat(): "webp" | "avif" | "jpg" {
  const canvas = document.createElement("canvas");

  // Check AVIF support
  if (canvas.toDataURL("image/avif").indexOf("data:image/avif") === 0) {
    return "avif";
  }

  // Check WebP support
  if (canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0) {
    return "webp";
  }

  return "jpg";
}

/**
 * Monitor Core Web Vitals
 */
export function reportWebVitals(metric: any) {
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(metric);
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === "production") {
    // Example: Send to Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", metric.name, {
        value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value
        ),
        event_category: "Web Vitals",
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }
}
