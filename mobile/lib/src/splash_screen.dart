import 'package:dmf_logo_sdk/mobile.dart';
import 'package:dmf_logo_sdk/src/model/ball_launch_curve.dart';
import 'package:dmf_logo_sdk/src/model/text_over_shoot_curve.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class SplashScreen extends StatefulWidget {
  final LogoStyle initialLogoStyle;
  final bool isDark;

  /// Callback when animation finishes.
  /// Accepts either a [VoidCallback] `() => ...` or `void Function(BuildContext context)`.
  final dynamic onAnimationComplete;

  const SplashScreen({
    super.key,
    this.initialLogoStyle = LogoStyle.dmfOneLine,
    this.isDark = false,
    this.onAnimationComplete,
  });

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  // Staggered Animations matching the video's cadence
  late final Animation<double> _logoLaunch;
  late final Animation<double> _markScale;
  late final Animation<double> _poweredFade;
  late final Animation<double> _poweredSlideY;
  late final Animation<double> _titleFade;
  late final Animation<double> _titleSlideY;
  late final Animation<double> _titleScale;
  late final Animation<double> _subtitleFade;
  late final Animation<double> _subtitleSlideY;
  late final Animation<double> _subtitleTracking;

  // State controls
  late LogoStyle _logoStyle;

  // Curated Luxury Color Palette
  static const Color creamBg = Color(
    0xFFFAF4E6,
  ); // Luxury warm off-white (from video)
  static const Color darkNavy = Color(0xFF141D2F); // Deep obsidian navy

  @override
  void initState() {
    super.initState();
    
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
      DeviceOrientation.portraitDown,
    ]);
    _updateSystemOverlay();
    _logoStyle = widget.initialLogoStyle;

    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2400),
    );

    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed && mounted) {
        final callback = widget.onAnimationComplete;
        if (callback == null) return;
        if (callback is void Function(BuildContext)) {
          callback(context);
        } else {
          try {
            (callback as dynamic)(context);
          } catch (_) {
            (callback as dynamic)();
          }
        }
      }
    });

    _initAnimations();
    _playAnimation();
  }

  void _updateSystemOverlay() {
    SystemChrome.setSystemUIOverlayStyle(
      widget.isDark ? SystemUiOverlayStyle.light : SystemUiOverlayStyle.dark,
    );
  }

  @override
  void didUpdateWidget(covariant SplashScreen oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.initialLogoStyle != widget.initialLogoStyle) {
      setState(() {
        _logoStyle = widget.initialLogoStyle;
      });
    }
    if (oldWidget.isDark != widget.isDark) {
      _updateSystemOverlay();
      setState(() {});
    }
  }

  void _initAnimations() {
    // Stage 1: Logo Propulsion with elastic overshoot (0.00s - 0.53s)
    _logoLaunch = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.00, 0.22, curve: BallLaunchCurve()),
      ),
    );

    // Subtle scale settle
    _markScale = Tween<double>(begin: 0.88, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.00, 0.22, curve: Curves.easeOutCubic),
      ),
    );

    // Stage 2: "p o w e r e d" text fades in softly (video frame 11-15: 0.45s - 0.62s)
    _poweredFade = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.18, 0.28, curve: Curves.easeOut),
      ),
    );

    // Subtle 4px breathing rise matching stationary placement in video
    _poweredSlideY = Tween<double>(begin: 4.0, end: 0.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.18, 0.28, curve: Curves.easeOut),
      ),
    );

    // Stage 3: Primary Title ("DIGITAL" / "NOD")
    // Exact video trajectory: launches up from below (0.66s), overshoots peak by +55% (1.20s), settles (1.70s)
    _titleFade = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.26, 0.42, curve: Curves.easeOut),
      ),
    );

    _titleSlideY = Tween<double>(begin: 24.0, end: 0.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(
          0.26,
          0.70,
          curve: TextOvershootCurve(overshoot: 1.55),
        ),
      ),
    );

    _titleScale = Tween<double>(begin: 0.94, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.26, 0.48, curve: Curves.easeOutCubic),
      ),
    );

    // Stage 4: Subtitle ("MEDIA FACTORY" / "DIGITAL STUDIO")
    // Exact video trajectory: ascends behind title (0.90s), overshoots peak (1.40s), settles (1.80s)
    _subtitleFade = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.36, 0.50, curve: Curves.easeOut),
      ),
    );

    _subtitleSlideY = Tween<double>(begin: 18.0, end: 0.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(
          0.36,
          0.75,
          curve: TextOvershootCurve(overshoot: 1.45),
        ),
      ),
    );

    _subtitleTracking = Tween<double>(begin: 2.5, end: 7.5).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.36, 0.68, curve: Curves.easeOutCubic),
      ),
    );
  }

  void _playAnimation() {
    _controller.forward(from: 0.0);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final bool isDark = widget.isDark;
    final bool isFullLogo = _logoStyle == LogoStyle.dmfFullLogo;

    // Dynamic Luxury Palettes: Warm Cream Light vs Deep Obsidian Dark
    final Color bgColor = isDark ? const Color(0xFF0C121E) : creamBg;
    final List<Color> gradientColors = isDark
        ? const [
            Color(0xFF1E293B), // Subtle luminous deep navy center
            Color(0xFF131B2E), // Rich obsidian body
            Color(0xFF090E17), // Deep edge vignette
          ]
        : const [
            Color(0xFFFFFDF8), // Luminous studio center
            Color(0xFFFAF4E6), // Signature warm cream
            Color(0xFFF2ECE0), // Soft vignetting at edges
          ];

    final Color poweredColor = isDark
        ? const Color(0xFF94A3B8)
        : const Color(0xFF78716C);

    final Color primaryTextColor = isDark
        ? const Color(0xFFF8FAFC)
        : darkNavy;

    final Color subtitleColor = isDark
        ? const Color(0xFFE2E8F0)
        : darkNavy;

    final String fullLogoAsset = isDark
        ? 'assets/images/dmf-logo-dark.png'
        : 'assets/images/dmf-logo-light.png';

    return Scaffold(
      backgroundColor: bgColor,
      body: Container(
        decoration: BoxDecoration(
          gradient: RadialGradient(
            center: const Alignment(0.0, -0.15),
            radius: 0.95,
            colors: gradientColors,
            stops: const [0.0, 0.55, 1.0],
          ),
        ),
        child: Center(
          child: AnimatedBuilder(
            animation: _controller,
            builder: (context, child) {
              if (isFullLogo) {
                // Style 2: Full Official Logo of Digital Media Factory
                return Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // --- "p o w e r e d" ---
                    Transform.translate(
                      offset: Offset(0, _poweredSlideY.value),
                      child: Opacity(
                        opacity: _poweredFade.value,
                        child: Text(
                          'p o w e r e d',
                          style: TextStyle(
                            fontFamily: 'PlusJakartaSans',
                            package: 'dmf_logo_sdk',
                            fontSize: 12.5,
                            fontWeight: FontWeight.w500,
                            letterSpacing: 4.5,
                            color: poweredColor,
                          ),
                        ),
                      ),
                    ),

                    const SizedBox(height: 46),

                    // --- FULL OFFICIAL DMF LOGO ---
                    Transform.translate(
                      offset: Offset(0, _titleSlideY.value),
                      child: Transform.scale(
                        scale: _titleScale.value,
                        child: Opacity(
                          opacity: _titleFade.value,
                          child: Image.asset(
                            fullLogoAsset,
                            package: 'dmf_logo_sdk',
                            width: 335,
                            fit: BoxFit.contain,
                            filterQuality: FilterQuality.high,
                          ),
                        ),
                      ),
                    ),
                  ],
                );
              }

              // Style 1: DMF One-Line Emblem ("D, M, F in one line, not D on top")
              return Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // --- HERO LOGO MARK (ONE LINE) ---
                  Transform.scale(
                    scale: _markScale.value,
                    child: DmfOneLineMark(
                      width: 250,
                      launchProgress: _logoLaunch.value,
                    ),
                  ),

                  // Space 1: Logo bottom to 'powered' (calibrated for harmonious balance)
                  const SizedBox(height: 42),

                  // --- "p o w e r e d" ---
                  Transform.translate(
                    offset: Offset(0, _poweredSlideY.value),
                    child: Opacity(
                      opacity: _poweredFade.value,
                      child: Text(
                        'p o w e r e d',
                        style: TextStyle(
                          fontFamily: 'PlusJakartaSans',
                          package: 'dmf_logo_sdk',
                          fontSize: 12.5,
                          fontWeight: FontWeight.w500,
                          letterSpacing: 4.5,
                          color: poweredColor,
                        ),
                      ),
                    ),
                  ),

                  // Space 2: 'powered' bottom to Title
                  const SizedBox(height: 24),

                  // --- PRIMARY BRAND TITLE ("DIGITAL") ---
                  Transform.translate(
                    offset: Offset(0, _titleSlideY.value),
                    child: Transform.scale(
                      scale: _titleScale.value,
                      child: Opacity(
                        opacity: _titleFade.value,
                        child: Text(
                          'DIGITAL',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontFamily: 'Outfit',
                            package: 'dmf_logo_sdk',
                            fontSize: 44.0,
                            fontWeight: FontWeight.w900,
                            letterSpacing: 4.0,
                            color: primaryTextColor,
                            height: 1.0,
                          ),
                        ),
                      ),
                    ),
                  ),

                  // Space 3: Title bottom to Subtitle
                  const SizedBox(height: 20),

                  // --- SUBTITLE ("MEDIA FACTORY") ---
                  Transform.translate(
                    offset: Offset(0, _subtitleSlideY.value),
                    child: Opacity(
                      opacity: _subtitleFade.value,
                      child: Text(
                        'MEDIA FACTORY',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontFamily: 'PlusJakartaSans',
                          package: 'dmf_logo_sdk',
                          fontSize: 13.0,
                          fontWeight: FontWeight.w800,
                          letterSpacing: _subtitleTracking.value,
                          color: subtitleColor,
                        ),
                      ),
                    ),
                  ),
                ],
              );
            },
          ),
        ),
      ),
    );
  }
}
