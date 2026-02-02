/**
 * Analytics utilities for Clems Grafter Creative
 * Supports Google Analytics, Facebook Pixel, and custom events
 */

// Types for analytics events
export type EventName =
  | "page_view"
  | "button_click"
  | "form_submit"
  | "contact_attempt"
  | "service_view"
  | "team_member_click"
  | "portfolio_view"
  | "social_click"
  | "email_click"
  | "phone_click"
  | "scroll_depth";

export interface EventParams {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

/**
 * Google Analytics 4 pageview
 */
export const trackPageView = (url: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
};

/**
 * Track custom events
 */
export const trackEvent = (eventName: EventName, params?: EventParams) => {
  if (typeof window !== "undefined") {
    // Google Analytics 4
    if ((window as any).gtag) {
      (window as any).gtag("event", eventName, {
        event_category: params?.category,
        event_label: params?.label,
        value: params?.value,
        ...params,
      });
    }

    // Facebook Pixel
    if ((window as any).fbq) {
      (window as any).fbq("track", eventName, params);
    }

    // Console log in development
    if (process.env.NODE_ENV === "development") {
      console.log("📊 Analytics Event:", eventName, params);
    }
  }
};

/**
 * Track button clicks
 */
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent("button_click", {
    category: "Engagement",
    label: buttonName,
    location,
  });
};

/**
 * Track form submissions
 */
export const trackFormSubmit = (formName: string, success: boolean) => {
  trackEvent("form_submit", {
    category: "Lead",
    label: formName,
    value: success ? 1 : 0,
    success,
  });
};

/**
 * Track contact attempts
 */
export const trackContactAttempt = (
  method: "email" | "phone" | "form" | "social"
) => {
  trackEvent("contact_attempt", {
    category: "Lead",
    label: method,
    value: 1,
  });
};

/**
 * Track service views
 */
export const trackServiceView = (serviceName: string) => {
  trackEvent("service_view", {
    category: "Engagement",
    label: serviceName,
  });
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (percentage: number) => {
  trackEvent("scroll_depth", {
    category: "Engagement",
    label: `${percentage}%`,
    value: percentage,
  });
};

/**
 * Track outbound links
 */
export const trackOutboundLink = (url: string, label?: string) => {
  trackEvent("social_click", {
    category: "Outbound",
    label: label || url,
    url,
  });
};

/**
 * Initialize scroll depth tracking
 */
export const initScrollDepthTracking = () => {
  if (typeof window === "undefined") return;

  const depths = [25, 50, 75, 100];
  const tracked = new Set<number>();
  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const percentage = Math.round((scrolled / scrollHeight) * 100);

        depths.forEach(depth => {
          if (percentage >= depth && !tracked.has(depth)) {
            tracked.add(depth);
            trackScrollDepth(depth);
          }
        });

        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => window.removeEventListener("scroll", handleScroll);
};

/**
 * Initialize performance monitoring
 */
export const initPerformanceMonitoring = () => {
  if (typeof window === "undefined") return;

  // Monitor Core Web Vitals
  if ("PerformanceObserver" in window) {
    try {
      // LCP - Largest Contentful Paint
      const lcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;

        trackEvent("page_view", {
          category: "Web Vitals",
          label: "LCP",
          value: Math.round(lastEntry.renderTime || lastEntry.loadTime),
        });
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

      // FID - First Input Delay
      const fidObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          trackEvent("page_view", {
            category: "Web Vitals",
            label: "FID",
            value: Math.round(entry.processingStart - entry.startTime),
          });
        });
      });
      fidObserver.observe({ entryTypes: ["first-input"] });

      // CLS - Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });

        trackEvent("page_view", {
          category: "Web Vitals",
          label: "CLS",
          value: Math.round(clsValue * 1000),
        });
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
    } catch (error) {
      console.error("Performance monitoring error:", error);
    }
  }
};

/**
 * Google Analytics script component
 */
export const GoogleAnalytics = () => {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  if (!GA_ID) return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  );
};

/**
 * Facebook Pixel component
 */
export const FacebookPixel = () => {
  const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  if (!FB_PIXEL_ID) return null;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL_ID}');
          fbq('track', 'PageView');
        `,
      }}
    />
  );
};
