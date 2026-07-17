import { useCallback, useEffect, useRef } from "react";

export const useSounds = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const pressBufferRef = useRef<AudioBuffer | null>(null);
  const releaseBufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    let removeUnlockListeners = () => {};

    const loadSound = async () => {
      try {
        const AudioContextCtor =
          window.AudioContext ??
          (window as unknown as {
            webkitAudioContext?: typeof window.AudioContext;
          }).webkitAudioContext;
        if (!AudioContextCtor) return;

        const ctx = new AudioContextCtor();
        audioContextRef.current = ctx;

        const unlockAudio = () => {
          if (ctx.state === "suspended") {
            void ctx.resume().catch(() => {});
          }
        };

        window.addEventListener("pointerdown", unlockAudio, { passive: true });
        window.addEventListener("keydown", unlockAudio);
        window.addEventListener("touchstart", unlockAudio, { passive: true });

        removeUnlockListeners = () => {
          window.removeEventListener("pointerdown", unlockAudio);
          window.removeEventListener("keydown", unlockAudio);
          window.removeEventListener("touchstart", unlockAudio);
        };

        const [response, releaseResponse] = await Promise.all([
          fetch("/assets/keycap-sounds/press.mp3"),
          fetch("/assets/keycap-sounds/release.mp3"),
        ]);

        if (!response.ok || !releaseResponse.ok) {
          throw new Error("Keycap sound assets could not be loaded");
        }

        const [arrayBuffer, releaseArrayBuffer] = await Promise.all([
          response.arrayBuffer(),
          releaseResponse.arrayBuffer(),
        ]);

        const [pressBuffer, releaseBuffer] = await Promise.all([
          ctx.decodeAudioData(arrayBuffer),
          ctx.decodeAudioData(releaseArrayBuffer),
        ]);

        pressBufferRef.current = pressBuffer;
        releaseBufferRef.current = releaseBuffer;
      } catch (error) {
        console.error("Failed to load keycap sound", error);
      }
    };

    loadSound();

    return () => {
      removeUnlockListeners();
      audioContextRef.current?.close();
    };
  }, []);

  const getContext = useCallback(() => {
    return audioContextRef.current;
  }, []);

  const playTone = useCallback(
    (
      startFreq: number,
      endFreq: number,
      duration: number,
      vol: number
    ) => {
      try {
        const ctx = getContext();
        if (!ctx) return;

        const startTone = () => {
          const oscillator = ctx.createOscillator();
          const gainNode = ctx.createGain();

          oscillator.type = "sine";
          const startTime = ctx.currentTime;

          oscillator.frequency.setValueAtTime(startFreq, startTime);
          oscillator.frequency.exponentialRampToValueAtTime(
            endFreq,
            startTime + duration
          );

          gainNode.gain.setValueAtTime(0, startTime);
          gainNode.gain.linearRampToValueAtTime(vol, startTime + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(
            0.001,
            startTime + duration
          );

          oscillator.connect(gainNode);
          gainNode.connect(ctx.destination);

          oscillator.start(startTime);
          oscillator.stop(startTime + duration);
        };

        if (ctx.state === "suspended") {
          void ctx.resume().then(startTone).catch(() => {});
        } else {
          startTone();
        }
      } catch (error) {
        console.error("Failed to play notification sound", error);
      }
    },
    [getContext]
  );

  const playSoundBuffer = useCallback(
    (buffer: AudioBuffer | null, baseDetune = 0) => {
      try {
        const ctx = getContext();
        if (!ctx || !buffer) return;

        const startSound = () => {
          const source = ctx.createBufferSource();
          source.buffer = buffer;

          // Add slight pitch variation so repeated key presses feel natural.
          source.detune.value = baseDetune + (Math.random() * 200 - 100);

          const gainNode = ctx.createGain();
          gainNode.gain.value = 0.4;

          source.connect(gainNode);
          gainNode.connect(ctx.destination);

          source.start(0);
        };

        if (ctx.state === "suspended") {
          void ctx.resume().then(startSound).catch(() => {});
        } else {
          startSound();
        }
      } catch (err) {
        console.error(err);
      }
    },
    [getContext]
  );

  const playPressSound = useCallback(() => {
    playSoundBuffer(pressBufferRef.current);
  }, [playSoundBuffer]);

  const playReleaseSound = useCallback(() => {
    playSoundBuffer(releaseBufferRef.current);
  }, [playSoundBuffer]);

  // Send: Clear, slightly higher pitch, quick
  const playSendSound = useCallback(() => {
    playTone(600, 300, 0.25, 0.08);
  }, [playTone]);

  // Receive: Lower pitch, bubble-like, slightly longer
  const playReceiveSound = useCallback(() => {
    playTone(800, 400, 0.35, 0.1);
  }, [playTone]);

  return { playSendSound, playReceiveSound, playPressSound, playReleaseSound };
};
