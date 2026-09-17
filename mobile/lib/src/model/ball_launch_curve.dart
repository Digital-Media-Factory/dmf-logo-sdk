import 'package:flutter/material.dart';

class BallLaunchCurve extends Curve {
  const BallLaunchCurve();

  @override
  double transformInternal(double t) {
    if (t <= 0.45) {
      final double p = t / 0.45;
      return 1.12 * (1.0 - (1.0 - p) * (1.0 - p) * (1.0 - p));
    } else if (t <= 0.75) {
      final double p = (t - 0.45) / 0.30;
      return 1.12 - 0.15 * Curves.easeInOut.transform(p);
    } else {
      final double p = (t - 0.75) / 0.25;
      return 0.97 + 0.03 * Curves.easeOut.transform(p);
    }
  }
}