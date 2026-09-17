import 'package:flutter/material.dart';

class TextOvershootCurve extends Curve {
  final double overshoot;

  const TextOvershootCurve({this.overshoot = 1.50});

  @override
  double transformInternal(double t) {
    if (t <= 0.50) {
      // Rapid upward ascent with deceleration into peak overshoot
      final double p = t / 0.50;
      final double eased = Curves.easeOutCubic.transform(p);
      return overshoot * eased;
    } else if (t <= 0.80) {
      // Soft rebound from peak overshoot back down
      final double p = (t - 0.50) / 0.30;
      final double eased = Curves.easeInOut.transform(p);
      return overshoot - (overshoot - 0.98) * eased;
    } else {
      // Gentle settle into rest (1.00)
      final double p = (t - 0.80) / 0.20;
      final double eased = Curves.easeOut.transform(p);
      return 0.98 + 0.02 * eased;
    }
  }
}

