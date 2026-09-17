/**
 * Cubic Bezier solver matching Flutter Curves implementation.
 */
function solveCubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;

  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  function sampleCurveX(t: number) {
    return ((ax * t + bx) * t + cx) * t;
  }

  function sampleCurveY(t: number) {
    return ((ay * t + by) * t + cy) * t;
  }

  function sampleCurveDerivativeX(t: number) {
    return (3 * ax * t + 2 * bx) * t + cx;
  }

  function solveCurveX(x: number) {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const xEst = sampleCurveX(t) - x;
      if (Math.abs(xEst) < 1e-6) return t;
      const dX = sampleCurveDerivativeX(t);
      if (Math.abs(dX) < 1e-6) break;
      t -= xEst / dX;
    }
    // Fallback binary search if Newton-Raphson diverged
    let t0 = 0.0;
    let t1 = 1.0;
    t = x;
    while (t0 < t1) {
      const xEst = sampleCurveX(t);
      if (Math.abs(xEst - x) < 1e-6) return t;
      if (x > xEst) t0 = t;
      else t1 = t;
      t = (t1 - t0) * 0.5 + t0;
    }
    return t;
  }

  return function (x: number): number {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    return sampleCurveY(solveCurveX(x));
  };
}

export const Curves = {
  linear: (t: number) => t,
  easeOut: solveCubicBezier(0.0, 0.0, 0.58, 1.0),
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOut: solveCubicBezier(0.42, 0.0, 0.58, 1.0),
};
