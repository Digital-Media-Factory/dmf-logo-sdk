import 'package:flutter/material.dart';

class DmfOneLineMark extends StatelessWidget {
  final double width;
  final double launchProgress;

  const DmfOneLineMark({
    super.key,
    this.width = 245.0,
    required this.launchProgress,
  });

  @override
  Widget build(BuildContext context) {
    // 1242 : 408 native aspect ratio (~3.044 : 1)
    final double height = width * (408.0 / 1242.0);

    // Dynamic entrance physics for the one-line mark:
    // Smooth physical elevation glide, subtle overshoot, and settling
    final double launchYOffset = 30.0;
    final double currentOffset = (1.0 - launchProgress) * launchYOffset;
    final double opacity = (launchProgress * 1.6).clamp(0.0, 1.0);

    return SizedBox(
      width: width,
      height: height,
      child: Transform.translate(
        offset: Offset(0, currentOffset),
        child: Opacity(
          opacity: opacity,
          child: Image.asset(
            'assets/images/dmf_emblem_one_line.png',
            package: 'dmf_logo_sdk',
            width: width,
            height: height,
            fit: BoxFit.contain,
            filterQuality: FilterQuality.high,
          ),
        ),
      ),
    );
  }
}
