"use client";
// Interactive 3D skill-keyboard background.

import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Application, SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Spline = React.lazy(() => import("@splinetool/react-spline"));

import {
  getSkillByObjectName,
  Skill,
} from "@/data/skills";
import { sleep } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Section, getKeyboardState } from "./config";
import { useSounds } from "@/hooks/use-sounds";

gsap.registerPlugin(ScrollTrigger);

const SPLINE_SCENE_URL =
  "https://prod.spline.design/4UCdjsvIHDMGPUWc/scene.splinecode";

const AnimatedBackground = () => {
  // Flip the standalone loading state once Spline fires onLoad.
  const [isLoading, setIsLoading] = useState(true);
  const [supportsWebGL, setSupportsWebGL] = useState<boolean | null>(null);
  const bypassLoading = () => setIsLoading(false);

  const { theme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 1023px)");

  const splineContainer = useRef<HTMLDivElement>(null);
  const [splineApp, setSplineApp] = useState<Application>();

  const selectedSkillRef = useRef<Skill | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("hero");

  // Animation controllers refs
  const bongoAnimationRef = useRef<{ start: () => void; stop: () => void }>();

  const [keyboardRevealed, setKeyboardRevealed] = useState(false);
  const router = useRouter();
  const { playPressSound, playReleaseSound } = useSounds();

  useEffect(() => {
    let supported = false;

    try {
      const canvas = document.createElement("canvas");
      supported = Boolean(
        canvas.getContext("webgl2") || canvas.getContext("webgl")
      );
    } catch {
      supported = false;
    }

    setSupportsWebGL(supported);
    if (!supported) setIsLoading(false);
  }, []);

  // --- Event Handlers ---
  const handleMouseHover = useCallback(
    (e: SplineEvent) => {
      if (!splineApp) return;

      const skill = getSkillByObjectName(e.target.name);
      if (skill && selectedSkillRef.current?.name === skill.name) return;

      if (e.target.name === "body" || e.target.name === "platform") {
        if (selectedSkillRef.current) playReleaseSound();
        setSelectedSkill(null);
        selectedSkillRef.current = null;
        if (splineApp.getVariable("heading") && splineApp.getVariable("desc")) {
          splineApp.setVariable("heading", "");
          splineApp.setVariable("desc", "");
        }
      } else if (
        !selectedSkillRef.current ||
        selectedSkillRef.current.name !== e.target.name
      ) {
        if (skill) {
          if (selectedSkillRef.current) playReleaseSound();
          playPressSound();
          setSelectedSkill(skill);
          selectedSkillRef.current = skill;
        }
      }
    },
    [playPressSound, playReleaseSound, splineApp]
  );

  const handleSplineInteractions = useCallback(() => {
    if (!splineApp) return () => {};
    const app = splineApp;

    const isInputFocused = () => {
      const activeElement = document.activeElement;
      return (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          (activeElement as HTMLElement).isContentEditable)
      );
    };

    const handleKeyUp = () => {
      if (isInputFocused()) return;
      playReleaseSound();
      app.setVariable("heading", "");
      app.setVariable("desc", "");
    };

    const handleKeyDown = (e: SplineEvent) => {
      if (isInputFocused()) return;
      const skill = getSkillByObjectName(e.target.name);
      if (skill) {
        playPressSound();
        setSelectedSkill(skill);
        selectedSkillRef.current = skill;
        app.setVariable("heading", skill.label);
        app.setVariable("desc", skill.shortDescription);
      }
    };

    app.addEventListener("keyUp", handleKeyUp);
    app.addEventListener("keyDown", handleKeyDown);
    app.addEventListener("mouseHover", handleMouseHover);

    return () => {
      app.removeEventListener("keyUp", handleKeyUp);
      app.removeEventListener("keyDown", handleKeyDown);
      app.removeEventListener("mouseHover", handleMouseHover);
    };
  }, [handleMouseHover, playPressSound, playReleaseSound, splineApp]);

  // --- Animation Setup Helpers ---
  const createSectionTimeline = useCallback(
    (
      triggerId: string,
      targetSection: Section,
      prevSection: Section,
      start: string = "top 50%",
      end: string = "bottom bottom"
    ) => {
      if (!splineApp) return;

      const kbd = splineApp.findObjectByName("keyboard");
      if (!kbd) return;

      return gsap.timeline({
        scrollTrigger: {
          trigger: triggerId,
          start,
          end,
          scrub: true,
          onEnter: () => {
            setActiveSection(targetSection);
            const state = getKeyboardState({ section: targetSection, isMobile });
            gsap.to(kbd.scale, { ...state.scale, duration: 1 });
            gsap.to(kbd.position, { ...state.position, duration: 1 });
          },
          onLeaveBack: () => {
            setActiveSection(prevSection);
            const state = getKeyboardState({
              section: prevSection,
              isMobile,
            });
            gsap.to(kbd.scale, { ...state.scale, duration: 1 });
            gsap.to(kbd.position, { ...state.position, duration: 1 });
          },
        },
      });
    },
    [isMobile, splineApp]
  );

  const setupScrollAnimations = useCallback(() => {
    if (!splineApp || !splineContainer.current) return () => {};

    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return () => {};

    // Initial state
    const heroState = getKeyboardState({ section: "hero", isMobile });
    gsap.set(kbd.scale, heroState.scale);
    gsap.set(kbd.position, heroState.position);

    // Section transitions
    const timelines = [
      createSectionTimeline("#skills", "skills", "hero"),
      createSectionTimeline("#projects", "projects", "skills", "top 70%"),
      createSectionTimeline("#contact", "contact", "projects", "top 30%"),
    ];

    return () => {
      timelines.forEach((timeline) => {
        timeline?.scrollTrigger?.kill();
        timeline?.kill();
      });
    };
  }, [createSectionTimeline, isMobile, splineApp]);

  const getBongoAnimation = useCallback(() => {
    const framesParent = splineApp?.findObjectByName("bongo-cat");
    const frame1 = splineApp?.findObjectByName("frame-1");
    const frame2 = splineApp?.findObjectByName("frame-2");

    if (!frame1 || !frame2 || !framesParent) {
      return { start: () => {}, stop: () => {} };
    }

    let interval: NodeJS.Timeout;
    const start = () => {
      let i = 0;
      framesParent.visible = true;
      interval = setInterval(() => {
        if (i % 2) {
          frame1.visible = false;
          frame2.visible = true;
        } else {
          frame1.visible = true;
          frame2.visible = false;
        }
        i++;
      }, 100);
    };

    const stop = () => {
      clearInterval(interval);
      framesParent.visible = false;
      frame1.visible = false;
      frame2.visible = false;
    };

    return { start, stop };
  }, [splineApp]);

  const updateKeyboardTransform = useCallback(async () => {
    if (!splineApp) return;

    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    kbd.visible = false;
    await sleep(400);
    kbd.visible = true;
    setKeyboardRevealed(true);

    const currentState = getKeyboardState({ section: activeSection, isMobile });
    gsap.fromTo(
      kbd.scale,
      { x: 0.01, y: 0.01, z: 0.01 },
      {
        ...currentState.scale,
        duration: 1.5,
        ease: "elastic.out(1, 0.6)",
      }
    );

  }, [activeSection, isMobile, splineApp]);

  // --- Effects ---
  useEffect(() => {
    if (!splineApp) return;

    const removeInteractions = handleSplineInteractions();
    const removeScrollAnimations = setupScrollAnimations();
    const bongoAnimation = getBongoAnimation();
    bongoAnimationRef.current = bongoAnimation;

    return () => {
      removeInteractions();
      removeScrollAnimations();
      bongoAnimationRef.current?.stop();
    };
  }, [
    getBongoAnimation,
    handleSplineInteractions,
    setupScrollAnimations,
    splineApp,
  ]);

  // Handle keyboard text visibility based on theme and section
  useEffect(() => {
    if (!splineApp) return;

    const textDesktopDark = splineApp.findObjectByName("text-desktop-dark");
    const textDesktopLight = splineApp.findObjectByName("text-desktop");
    const textMobileDark = splineApp.findObjectByName("text-mobile-dark");
    const textMobileLight = splineApp.findObjectByName("text-mobile");

    if (
      !textDesktopDark ||
      !textDesktopLight ||
      !textMobileDark ||
      !textMobileLight
    )
      return;

    const setVisibility = (
      dDark: boolean,
      dLight: boolean,
      mDark: boolean,
      mLight: boolean
    ) => {
      textDesktopDark.visible = dDark;
      textDesktopLight.visible = dLight;
      textMobileDark.visible = mDark;
      textMobileLight.visible = mLight;
    };

    if (activeSection !== "skills") {
      setVisibility(false, false, false, false);
    } else if (theme === "dark") {
      if (isMobile) {
        setVisibility(false, false, false, true);
      } else {
        setVisibility(false, true, false, false);
      }
    } else {
      if (isMobile) {
        setVisibility(false, false, true, false);
      } else {
        setVisibility(true, false, false, false);
      }
    }
  }, [theme, splineApp, isMobile, activeSection]);

  useEffect(() => {
    if (!selectedSkill || !splineApp) return;
    splineApp.setVariable("heading", selectedSkill.label);
    splineApp.setVariable("desc", selectedSkill.shortDescription);
  }, [selectedSkill, splineApp]);

  // Keep the scene-authored keyboard rotation intact. Imported image legends
  // can visually detach from their keycaps when the Spline root is rotated by
  // an external animation, so section transitions only change scale/position.
  useEffect(() => {
    if (!splineApp) return;

    const manageAnimations = async () => {
      if (activeSection !== "skills") {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      }

      if (activeSection === "projects") {
        await sleep(300);
        bongoAnimationRef.current?.start();
      } else {
        await sleep(200);
        bongoAnimationRef.current?.stop();
      }
    };

    manageAnimations();
  }, [activeSection, splineApp]);

  // Reveal keyboard on load/route change
  useEffect(() => {
    const hash = activeSection === "hero" ? "#" : `#${activeSection}`;
    router.push("/" + hash, { scroll: false });

    if (!splineApp || isLoading || keyboardRevealed) return;
    updateKeyboardTransform();
  }, [
    activeSection,
    isLoading,
    keyboardRevealed,
    router,
    splineApp,
    updateKeyboardTransform,
  ]);

  return (
    <>
      {/* Loading state: subtle fade-in indicator while the Spline scene loads,
          so the page doesn't look broken/empty during the initial download. */}
      <div
        className={`pointer-events-none fixed left-0 top-0 z-0 flex h-[45vh] w-full items-center justify-center bg-background transition-[width,opacity] duration-700 lg:left-auto lg:right-0 lg:h-full ${
          activeSection === "skills" ? "lg:w-2/3" : "lg:w-1/2"
        } ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
          <span className="font-mono text-xs text-muted-foreground">
            loading 3D scene…
          </span>
        </div>
      </div>

      <Suspense fallback={null}>
        <div
          className={`pointer-events-none fixed left-0 top-0 z-0 h-[45vh] w-full transition-[width,opacity] duration-700 lg:left-auto lg:right-0 lg:h-full ${
            activeSection === "skills" ? "lg:w-2/3" : "lg:w-1/2"
          } ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          {supportsWebGL && (
            <Spline
              className="pointer-events-auto h-full w-full"
              ref={splineContainer}
              onLoad={(app: Application) => {
                setSplineApp(app);
                bypassLoading();
              }}
              scene={SPLINE_SCENE_URL}
            />
          )}
        </div>
      </Suspense>

      {activeSection === "skills" && selectedSkill && (
        <div
          className="pointer-events-none fixed bottom-8 left-6 right-6 z-10 rounded-xl border border-border/70 bg-background/85 p-4 shadow-xl backdrop-blur-md lg:bottom-12 lg:left-[calc(33.333%+2rem)] lg:right-auto lg:max-w-md"
          aria-live="polite"
        >
          <p className="font-mono text-lg font-semibold text-accent">
            {selectedSkill.label}
          </p>
          <p className="mt-1 text-base leading-relaxed text-foreground [font-family:cursive]">
            {selectedSkill.shortDescription}
          </p>
        </div>
      )}
    </>
  );
};

export default AnimatedBackground;
