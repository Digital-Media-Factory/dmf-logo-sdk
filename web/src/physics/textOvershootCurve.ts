import { Curves } from './easing';

/**
 * TextOvershootCurve matches Flutter's TextOvershootCurve:
 * Rapid upward ascent with deceleration into peak overshoot,
 * soft rebound from peak down to 0.98, and gentle settle to 1.00.
 */
export function createTextOvershootCurve(overshoot = 1.5) {
  return function textOvershootCurve(t: number): number {
    if (t <= 0) return 0;
    if (t >= 1) return 1;

    if (t <= 0.5) {
      // Rapid upward ascent with deceleration into peak overshoot
      const p = t / 0.5;
      const eased = Curves.easeOutCubic(p);
      return overshoot * eased;
    } else if (t <= 0.8) {
      // Soft rebound from peak overshoot back down
      const p = (t - 0.5) / 0.3;
      const eased = Curves.easeInOut(p);
      return overshoot - (overshoot - 0.98) * eased;
    } else {
      // Gentle settle into rest (1.00)
      const p = (t - 0.8) / 0.2;
      const eased = Curves.easeOut(p);
      return 0.98 + 0.02 * eased;
    }
  };
}

export const textOvershootCurveTitle = createTextOvershootCurve(1.55);
export const textOvershootCurveSubtitle = createTextOvershootCurve(1.45);
