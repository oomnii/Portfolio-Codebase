"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./waving-avatar.css";

const FRAME_COUNT = 12;
const FRAME_DURATION_MS = 76;
const TOUCH_LOOPS = 2;
const PRELOAD_ROOT_MARGIN = "800px 0px";

function frameSource(index: number) {
  return `/waving-avatar/frame-${String(index + 1).padStart(2, "0")}.webp`;
}

export default function WavingAvatar() {
  const [frameIndex, setFrameIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touchPlaying, setTouchPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [framesReady, setFramesReady] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const touchTimer = useRef<number | null>(null);
  const preloadedImages = useRef<HTMLImageElement[]>([]);
  const preloadStartedRef = useRef(false);
  const mountedRef = useRef(true);

  const sources = useMemo(
    () => Array.from({ length: FRAME_COUNT }, (_, index) => frameSource(index)),
    [],
  );
  const active = hovered || focused || touchPlaying;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  // Only frame 1 renders eagerly; frames 2-12 are fetched lazily (viewport
  // proximity or first interaction) so the animation never blocks initial load.
  const preloadFrames = useCallback(() => {
    if (preloadStartedRef.current || reducedMotion) return;
    preloadStartedRef.current = true;

    const targets = sources.slice(1);
    let loadedCount = 0;

    targets.forEach((source) => {
      const image = new window.Image();
      preloadedImages.current.push(image);

      image.onload = () => {
        const finalize = () => {
          loadedCount += 1;
          if (loadedCount === targets.length && mountedRef.current) {
            setFramesReady(true);
          }
        };
        if (typeof image.decode === "function") {
          image.decode().then(finalize).catch(finalize);
        } else {
          finalize();
        }
      };

      image.src = source;
    });
  }, [sources, reducedMotion]);

  useEffect(() => {
    const images = preloadedImages.current;
    return () => {
      images.forEach((image) => {
        image.onload = null;
        image.src = "";
      });
    };
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || reducedMotion) return;

    if (typeof IntersectionObserver === "undefined") {
      preloadFrames();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          preloadFrames();
          observer.disconnect();
        }
      },
      { rootMargin: PRELOAD_ROOT_MARGIN },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [preloadFrames, reducedMotion]);

  useEffect(() => {
    if (!active || reducedMotion || !framesReady) {
      setFrameIndex(0);
      return;
    }

    const interval = window.setInterval(() => {
      setFrameIndex((current) => (current + 1) % FRAME_COUNT);
    }, FRAME_DURATION_MS);

    return () => window.clearInterval(interval);
  }, [active, reducedMotion, framesReady]);

  useEffect(
    () => () => {
      if (touchTimer.current) window.clearTimeout(touchTimer.current);
    },
    [],
  );

  const playForTouchOrKeyboard = useCallback(() => {
    preloadFrames();
    if (touchTimer.current) window.clearTimeout(touchTimer.current);
    setFrameIndex(0);
    setTouchPlaying(true);
    touchTimer.current = window.setTimeout(() => {
      if (!mountedRef.current) return;
      setTouchPlaying(false);
      setFrameIndex(0);
    }, FRAME_COUNT * FRAME_DURATION_MS * TOUCH_LOOPS);
  }, [preloadFrames]);

  const handleHoverStart = useCallback(() => {
    preloadFrames();
    setHovered(true);
  }, [preloadFrames]);

  const handleFocusStart = useCallback(() => {
    preloadFrames();
    setFocused(true);
  }, [preloadFrames]);

  return (
    <div
      ref={rootRef}
      className={`waving-avatar ${active ? "waving-avatar--active" : ""}`}
      role="button"
      tabIndex={0}
      aria-label="Personal avatar. Hover, focus, or tap to make it wave and say hi."
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") handleHoverStart();
      }}
      onPointerLeave={() => setHovered(false)}
      onPointerDown={(event) => {
        if (event.pointerType !== "mouse") playForTouchOrKeyboard();
      }}
      onFocus={handleFocusStart}
      onBlur={() => setFocused(false)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          playForTouchOrKeyboard();
        }
      }}
    >
      <div className="waving-avatar__figure" aria-hidden="true">
        {/* A plain img avoids image-optimizer churn while rapidly swapping local frames. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="waving-avatar__image"
          src={sources[frameIndex]}
          width={600}
          height={1200}
          alt=""
          draggable={false}
          decoding="async"
        />
      </div>

      <div className="waving-avatar__bubble" aria-hidden={!active}>
        Hi! <span aria-hidden="true">👋</span>
      </div>
    </div>
  );
}
