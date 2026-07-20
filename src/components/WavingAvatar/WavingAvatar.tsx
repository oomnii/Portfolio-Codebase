"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./waving-avatar.css";

const FRAME_COUNT = 12;
const FRAME_DURATION_MS = 76;
const TOUCH_LOOPS = 2;

function frameSource(index: number) {
  return `/waving-avatar/frame-${String(index + 1).padStart(2, "0")}.png`;
}

export default function WavingAvatar() {
  const [frameIndex, setFrameIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touchPlaying, setTouchPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchTimer = useRef<number | null>(null);

  const sources = useMemo(
    () => Array.from({ length: FRAME_COUNT }, (_, index) => frameSource(index)),
    [],
  );
  const active = hovered || focused || touchPlaying;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const preloaded = sources.slice(1).map((source) => {
      const image = new window.Image();
      image.src = source;
      return image;
    });
    return () => {
      preloaded.forEach((image) => {
        image.src = "";
      });
    };
  }, [sources]);

  useEffect(() => {
    if (!active || reducedMotion) {
      setFrameIndex(0);
      return;
    }

    const interval = window.setInterval(() => {
      setFrameIndex((current) => (current + 1) % FRAME_COUNT);
    }, FRAME_DURATION_MS);

    return () => window.clearInterval(interval);
  }, [active, reducedMotion]);

  useEffect(
    () => () => {
      if (touchTimer.current) window.clearTimeout(touchTimer.current);
    },
    [],
  );

  const playForTouchOrKeyboard = useCallback(() => {
    if (touchTimer.current) window.clearTimeout(touchTimer.current);
    setFrameIndex(0);
    setTouchPlaying(true);
    touchTimer.current = window.setTimeout(() => {
      setTouchPlaying(false);
      setFrameIndex(0);
    }, FRAME_COUNT * FRAME_DURATION_MS * TOUCH_LOOPS);
  }, []);

  return (
    <div
      className={`waving-avatar ${active ? "waving-avatar--active" : ""}`}
      role="button"
      tabIndex={0}
      aria-label="Personal avatar. Hover, focus, or tap to make it wave and say hi."
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onPointerDown={(event) => {
        if (event.pointerType !== "mouse") playForTouchOrKeyboard();
      }}
      onFocus={() => setFocused(true)}
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
