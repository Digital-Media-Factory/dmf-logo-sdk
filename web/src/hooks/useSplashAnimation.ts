import { useState, useEffect, useRef, useCallback } from 'react';
import { Curves } from '../physics/easing';
import { ballLaunchCurve } from '../physics/ballLaunchCurve';
import { textOvershootCurveTitle, textOvershootCurveSubtitle } from '../physics/textOvershootCurve';

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function sampleInterval(t: number, start: number, end: number): number {
  if (t <= start) return 0;
  if (t >= end) return 1;
  return (t - start) / (end - start);
}

export interface SplashAnimationValues {
  // Raw 0..1 timeline progress
  progress: number;
  isComplete: boolean;

  // Stage 1: Logo Mark
  logoLaunchProgress: number;
  logoOffset: number;
  logoOpacity: number;
  markScale: number;

  // Stage 2: 'powered'
  poweredFade: number;
  poweredSlideY: number;

  // Stage 3: Title
  titleFade: number;
  titleSlideY: number;
  titleScale: number;

  // Stage 4: Subtitle
  subtitleFade: number;
  subtitleSlideY: number;
  subtitleTracking: number;
}

export function computeAnimationValues(t: number): SplashAnimationValues {
  const normT = clamp(t, 0, 1);

  // Stage 1: Logo Propulsion (0.00 - 0.22)
  const p1 = sampleInterval(normT, 0.0, 0.22);
  const rawBall = ballLaunchCurve(p1);
  const logoLaunchProgress = rawBall;
  const launchYOffset = 30.0;
  const logoOffset = (1.0 - rawBall) * launchYOffset;
  const logoOpacity = clamp(rawBall * 1.6, 0.0, 1.0);
  const markScale = 0.88 + 0.12 * Curves.easeOutCubic(p1);

  // Stage 2: 'p o w e r e d' (0.18 - 0.28)
  const p2 = sampleInterval(normT, 0.18, 0.28);
  const p2Eased = Curves.easeOut(p2);
  const poweredFade = p2Eased;
  const poweredSlideY = 4.0 * (1.0 - p2Eased);

  // Stage 3: Title (0.26 - 0.70)
  const p3Fade = sampleInterval(normT, 0.26, 0.42);
  const titleFade = Curves.easeOut(p3Fade);

  const p3Slide = sampleInterval(normT, 0.26, 0.7);
  const titleSlideY = 24.0 * (1.0 - textOvershootCurveTitle(p3Slide));

  const p3Scale = sampleInterval(normT, 0.26, 0.48);
  const titleScale = 0.94 + 0.06 * Curves.easeOutCubic(p3Scale);

  // Stage 4: Subtitle (0.36 - 0.75)
  const p4Fade = sampleInterval(normT, 0.36, 0.5);
  const subtitleFade = Curves.easeOut(p4Fade);

  const p4Slide = sampleInterval(normT, 0.36, 0.75);
  const subtitleSlideY = 18.0 * (1.0 - textOvershootCurveSubtitle(p4Slide));

  const p4Track = sampleInterval(normT, 0.36, 0.68);
  const subtitleTracking = 2.5 + 5.0 * Curves.easeOutCubic(p4Track);

  return {
    progress: normT,
    isComplete: normT >= 1.0,
    logoLaunchProgress,
    logoOffset,
    logoOpacity,
    markScale,
    poweredFade,
    poweredSlideY,
    titleFade,
    titleSlideY,
    titleScale,
    subtitleFade,
    subtitleSlideY,
    subtitleTracking,
  };
}

export function useSplashAnimation({
  duration = 2400,
  autoPlay = true,
  onAnimationComplete,
}: {
  duration?: number;
  autoPlay?: boolean;
  onAnimationComplete?: () => void;
}) {
  const [values, setValues] = useState<SplashAnimationValues>(() => computeAnimationValues(0));
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  const onCompleteRef = useRef(onAnimationComplete);
  useEffect(() => {
    onCompleteRef.current = onAnimationComplete;
  }, [onAnimationComplete]);

  const stop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const play = useCallback(() => {
    stop();
    completedRef.current = false;
    startTimeRef.current = null;
    setIsPlaying(true);
  }, [stop]);

  const reset = useCallback(() => {
    stop();
    completedRef.current = false;
    startTimeRef.current = null;
    setValues(computeAnimationValues(0));
  }, [stop]);

  useEffect(() => {
    if (!isPlaying) return;

    let cancelled = false;

    const tick = (now: number) => {
      if (cancelled) return;

      if (startTimeRef.current === null) {
        startTimeRef.current = now;
      }

      const elapsed = now - startTimeRef.current;
      const t = Math.min(elapsed / duration, 1.0);
      const currentValues = computeAnimationValues(t);

      setValues(currentValues);

      if (t < 1.0) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setIsPlaying(false);
        if (!completedRef.current) {
          completedRef.current = true;
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
        }
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isPlaying, duration]);

  return {
    values,
    isPlaying,
    play,
    reset,
    stop,
  };
}
