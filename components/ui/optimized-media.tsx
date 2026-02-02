"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  lazy?: boolean;
  aspectRatio?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

/**
 * OptimizedImage component with lazy loading and fallback support
 */
export function OptimizedImage({
  src,
  alt,
  fallback = "/placeholder.svg",
  lazy = true,
  aspectRatio,
  objectFit = "cover",
  className,
  ...props
}: OptimizedImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);

  useEffect(() => {
    if (!lazy || !imgRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [lazy]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div
      className={cn("relative overflow-hidden bg-muted", className)}
      style={{ aspectRatio }}
    >
      {!isLoaded && <div className="absolute inset-0 animate-pulse bg-muted" />}
      <img
        ref={imgRef}
        src={isInView ? (hasError ? fallback : src) : fallback}
        alt={alt}
        loading={lazy ? "lazy" : "eager"}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "h-full w-full transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          objectFit === "cover" && "object-cover",
          objectFit === "contain" && "object-contain",
          objectFit === "fill" && "object-fill",
          objectFit === "none" && "object-none",
          objectFit === "scale-down" && "object-scale-down"
        )}
        {...props}
      />
    </div>
  );
}

interface OptimizedVideoProps
  extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  fallbackImage?: string;
  lazy?: boolean;
  playInView?: boolean;
}

/**
 * OptimizedVideo component with lazy loading and play-in-view support
 */
export function OptimizedVideo({
  src,
  fallbackImage,
  lazy = true,
  playInView = true,
  className,
  ...props
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(!lazy);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!playInView || !videoRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {
                // Autoplay failed, user interaction required
              });
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, [playInView]);

  useEffect(() => {
    if (!lazy || !videoRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "100px",
        threshold: 0.01,
      }
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, [lazy]);

  if (hasError && fallbackImage) {
    return (
      <img
        src={fallbackImage}
        alt="Video fallback"
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={cn("h-full w-full object-cover", className)}
      onError={() => setHasError(true)}
      {...props}
    >
      {isInView && <source src={src} type="video/mp4" />}
      {fallbackImage && (
        <img
          src={fallbackImage}
          alt="Video not supported"
          className="h-full w-full object-cover"
        />
      )}
    </video>
  );
}

interface OptimizedBackgroundImageProps {
  src: string;
  fallback?: string;
  children?: React.ReactNode;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

/**
 * OptimizedBackgroundImage component with gradient overlay support
 */
export function OptimizedBackgroundImage({
  src,
  fallback = "/placeholder.svg",
  children,
  className,
  overlay = false,
  overlayOpacity = 0.5,
}: OptimizedBackgroundImageProps) {
  const [imageSrc, setImageSrc] = useState(fallback);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    img.onerror = () => {
      setImageSrc(fallback);
      setIsLoaded(true);
    };
  }, [src, fallback]);

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"
          style={{ opacity: overlayOpacity }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
