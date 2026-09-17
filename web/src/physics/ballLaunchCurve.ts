import { Curves } from './easing';

/**
 * BallLaunchCurve matches Flutter's BallLaunchCurve:
 * Stage 1 kinetic logo propulsion with elastic peak overshoot (1.12),
 * rebound (0.97), and final resting settlement (1.00).
 */
export function ballLaunchCurve(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;

  if (t <= 0.45) {
    const p = t / 0.45;
    return 1.12 * (1.0 - (1.0 - p) * (1.0 - p) * (1.0 - p));
  } else if (t <= 0.75) {
    const p = (t - 0.45) / 0.3;
    return 1.12 - 0.15 * Curves.easeInOut(p);
  } else {
    const p = (t - 0.75) / 0.25;
    return 0.97 + 0.03 * Curves.easeOut(p);
  }
}
