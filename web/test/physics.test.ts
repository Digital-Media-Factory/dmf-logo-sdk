import { describe, it, expect } from 'vitest';
import { ballLaunchCurve } from '../src/physics/ballLaunchCurve';
import {
  textOvershootCurveTitle,
  textOvershootCurveSubtitle,
} from '../src/physics/textOvershootCurve';
import { computeAnimationValues } from '../src/hooks/useSplashAnimation';

describe('DMF Kinetic Physics Engine', () => {
  describe('BallLaunchCurve', () => {
    it('starts at 0 and ends at 1', () => {
      expect(ballLaunchCurve(0)).toBe(0);
      expect(ballLaunchCurve(1)).toBe(1);
    });

    it('reaches elastic peak overshoot (> 1.1) at peak around t = 0.45', () => {
      const peakVal = ballLaunchCurve(0.45);
      expect(peakVal).toBeCloseTo(1.12, 1);
    });

    it('settles down to rest at t = 1.0', () => {
      expect(ballLaunchCurve(1.0)).toBe(1.0);
    });
  });

  describe('TextOvershootCurve', () => {
    it('title curve ascends with peak overshoot of ~1.55', () => {
      expect(textOvershootCurveTitle(0)).toBe(0);
      const peak = textOvershootCurveTitle(0.5);
      expect(peak).toBeCloseTo(1.55, 1);
      expect(textOvershootCurveTitle(1.0)).toBe(1.0);
    });

    it('subtitle curve ascends with peak overshoot of ~1.45', () => {
      expect(textOvershootCurveSubtitle(0)).toBe(0);
      const peak = textOvershootCurveSubtitle(0.5);
      expect(peak).toBeCloseTo(1.45, 1);
      expect(textOvershootCurveSubtitle(1.0)).toBe(1.0);
    });
  });

  describe('computeAnimationValues', () => {
    it('initial state has 0 opacity and initial offsets', () => {
      const v0 = computeAnimationValues(0);
      expect(v0.progress).toBe(0);
      expect(v0.isComplete).toBe(false);
      expect(v0.poweredFade).toBe(0);
      expect(v0.titleFade).toBe(0);
      expect(v0.subtitleFade).toBe(0);
      expect(v0.markScale).toBeCloseTo(0.88, 2);
    });

    it('final state has 1.0 opacity, scale 1.0 and 0 offset', () => {
      const v1 = computeAnimationValues(1.0);
      expect(v1.progress).toBe(1.0);
      expect(v1.isComplete).toBe(true);
      expect(v1.poweredFade).toBe(1.0);
      expect(v1.titleFade).toBe(1.0);
      expect(v1.subtitleFade).toBe(1.0);
      expect(v1.markScale).toBeCloseTo(1.0, 2);
      expect(v1.titleScale).toBeCloseTo(1.0, 2);
      expect(v1.poweredSlideY).toBeCloseTo(0, 1);
      expect(v1.titleSlideY).toBeCloseTo(0, 1);
      expect(v1.subtitleSlideY).toBeCloseTo(0, 1);
      expect(v1.subtitleTracking).toBeCloseTo(7.5, 1);
    });
  });
});
