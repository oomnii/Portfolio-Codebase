"use client";
// Interactive 3D skill-keyboard background.
//
// Adapted from Naresh Khatri's open-source portfolio (MIT licensed):
// https://github.com/Naresh-Khatri/Portfolio

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

import { Skill, SkillNames, SKILLS } from "@/data/skills";
import { sleep } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Section, getKeyboardState } from "./config";
import { useSounds } from "@/hooks/use-sounds";

gsap.registerPlugin(ScrollTrigger);

const AnimatedBackground = () => {
  // Standalone loading flag (decoupled from the original repo's global
  // preloader context). Flip it once Spline fires onLoad.
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
  const keycapAnimationsRef = useRef<{ start: () => void; stop: () => void }>();

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
      if (!splineApp || selectedSkillRef.current?.name === e.target.name) return;

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
        const skill = SKILLS[e.target.name as SkillNames];
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
      const skill = SKILLS[e.target.name as SkillNames];
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
            gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
          },
          onLeaveBack: () => {
            setActiveSection(prevSection);
            const state = getKeyboardState({
              section: prevSection,
              isMobile,
            });
            gsap.to(kbd.scale, { ...state.scale, duration: 1 });
            gsap.to(kbd.position, { ...state.position, duration: 1 });
            gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
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

  const getKeycapsAnimation = useCallback(() => {
    if (!splineApp) return { start: () => {}, stop: () => {} };

    const tweens: gsap.core.Tween[] = [];
    const removePrevTweens = () => tweens.forEach((t) => t.kill());

    const start = () => {
      removePrevTweens();
      Object.values(SKILLS)
        .sort(() => Math.random() - 0.5)
        .forEach((skill, idx) => {
          const keycap = splineApp.findObjectByName(skill.name);
          if (!keycap) return;
          const t = gsap.to(keycap.position, {
            y: Math.random() * 200 + 200,
            duration: Math.random() * 2 + 2,
            delay: idx * 0.6,
            repeat: -1,
            yoyo: true,
            yoyoEase: "none",
            ease: "elastic.out(1,0.3)",
          });
          tweens.push(t);
        });
    };

    const stop = () => {
      removePrevTweens();
      Object.values(SKILLS).forEach((skill) => {
        const keycap = splineApp.findObjectByName(skill.name);
        if (!keycap) return;
        const t = gsap.to(keycap.position, {
          y: 0,
          duration: 4,
          repeat: 1,
          ease: "elastic.out(1,0.7)",
        });
        tweens.push(t);
      });
      setTimeout(removePrevTweens, 1000);
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

    const allObjects = splineApp.getAllObjects();
    const keycaps = allObjects.filter((obj) => obj.name === "keycap");

    await sleep(900);

    if (isMobile) {
      const mobileKeyCaps = allObjects.filter(
        (obj) => obj.name === "keycap-mobile"
      );
      mobileKeyCaps.forEach((keycap) => {
        keycap.visible = true;
      });
    } else {
      const desktopKeyCaps = allObjects.filter(
        (obj) => obj.name === "keycap-desktop"
      );
      desktopKeyCaps.forEach(async (keycap, idx) => {
        await sleep(idx * 70);
        keycap.visible = true;
      });
    }

    keycaps.forEach(async (keycap, idx) => {
      keycap.visible = false;
      await sleep(idx * 70);
      keycap.visible = true;
      gsap.fromTo(
        keycap.position,
        { y: 200 },
        { y: 50, duration: 0.5, delay: 0.1, ease: "bounce.out" }
      );
    });
  }, [activeSection, isMobile, splineApp]);

  // --- Effects ---
  useEffect(() => {
    if (!splineApp) return;

    const removeInteractions = handleSplineInteractions();
    const removeScrollAnimations = setupScrollAnimations();
    const bongoAnimation = getBongoAnimation();
    bongoAnimationRef.current = bongoAnimation;
    const keycapAnimation = getKeycapsAnimation();
    keycapAnimationsRef.current = keycapAnimation;

    return () => {
      removeInteractions();
      removeScrollAnimations();
      bongoAnimationRef.current?.stop();
      keycapAnimationsRef.current?.stop();
    };
  }, [
    getBongoAnimation,
    getKeycapsAnimation,
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

  // Handle rotation and teardown animations based on active section
  useEffect(() => {
    if (!splineApp) return;

    let rotateKeyboard: gsap.core.Tween | undefined;
    let teardownKeyboard: gsap.core.Tween | undefined;

    const kbd = splineApp.findObjectByName("keyboard");

    if (kbd) {
      rotateKeyboard = gsap.to(kbd.rotation, {
        y: Math.PI * 2 + kbd.rotation.y,
        duration: 10,
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
        ease: "back.inOut",
        delay: 2.5,
        paused: true, // Start paused
      });

      teardownKeyboard = gsap.fromTo(
        kbd.rotation,
        { y: 0, x: -Math.PI, z: 0 },
        {
          y: -Math.PI / 2,
          duration: 5,
          repeat: -1,
          yoyo: true,
          yoyoEase: true,
          delay: 2.5,
          immediateRender: false,
          paused: true,
        }
      );
    }

    const manageAnimations = async () => {
      if (activeSection !== "skills") {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      }

      if (activeSection === "hero") {
        rotateKeyboard?.restart();
        teardownKeyboard?.pause();
      } else if (activeSection === "contact") {
        rotateKeyboard?.pause();
      } else {
        rotateKeyboard?.pause();
        teardownKeyboard?.pause();
      }

      if (activeSection === "projects") {
        await sleep(300);
        bongoAnimationRef.current?.start();
      } else {
        await sleep(200);
        bongoAnimationRef.current?.stop();
      }

      if (activeSection === "contact") {
        await sleep(600);
        teardownKeyboard?.restart();
        keycapAnimationsRef.current?.start();
      } else {
        await sleep(600);
        teardownKeyboard?.pause();
        keycapAnimationsRef.current?.stop();
      }
    };

    manageAnimations();

    return () => {
      rotateKeyboard?.kill();
      teardownKeyboard?.kill();
    };
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
              scene="/assets/skills-keyboard.spline"
            />
          )}
        </div>
      </Suspense>
    </>
  );
};

export default AnimatedBackground;
