import 'package:dmf_logo_sdk/mobile.dart';
import 'package:dmf_logo_sdk/src/model/ball_launch_curve.dart';
import 'package:dmf_logo_sdk/src/model/text_over_shoot_curve.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  group('LogoStyle Enum', () {
    test('contains expected styles', () {
      expect(LogoStyle.values, contains(LogoStyle.dmfOneLine));
      expect(LogoStyle.values, contains(LogoStyle.dmfFullLogo));
      expect(LogoStyle.values.length, 2);
    });
  });

  group('Custom Curves', () {
    test('BallLaunchCurve starts at 0 and ends at 1', () {
      const curve = BallLaunchCurve();
      expect(curve.transform(0.0), 0.0);
      expect(curve.transform(0.45), closeTo(1.12, 0.001));
      expect(curve.transform(0.75), closeTo(0.97, 0.001));
      expect(curve.transform(1.0), closeTo(1.0, 0.001));
    });

    test('TextOvershootCurve starts at 0, overshoots, and ends at 1', () {
      const curve = TextOvershootCurve(overshoot: 1.55);
      expect(curve.transform(0.0), 0.0);
      expect(curve.transform(0.50), closeTo(1.55, 0.001));
      expect(curve.transform(1.0), closeTo(1.0, 0.001));
    });
  });

  group('SplashScreen Widget', () {
    testWidgets('renders one-line emblem style without crashing', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: SplashScreen(initialLogoStyle: LogoStyle.dmfOneLine),
        ),
      );

      expect(find.byType(SplashScreen), findsOneWidget);
      expect(find.text('p o w e r e d'), findsOneWidget);
      expect(find.text('DIGITAL'), findsOneWidget);
      expect(find.text('MEDIA FACTORY'), findsOneWidget);
      expect(find.byType(DmfOneLineMark), findsOneWidget);

      await tester.pump(const Duration(milliseconds: 2400));
    });

    testWidgets('renders full logo style without crashing', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: SplashScreen(initialLogoStyle: LogoStyle.dmfFullLogo),
        ),
      );

      expect(find.byType(SplashScreen), findsOneWidget);
      expect(find.text('p o w e r e d'), findsOneWidget);
      expect(find.byType(Image), findsOneWidget);

      await tester.pump(const Duration(milliseconds: 2400));
    });

    testWidgets('renders dark mode with one-line style without crashing', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: SplashScreen(
            initialLogoStyle: LogoStyle.dmfOneLine,
            isDark: true,
          ),
        ),
      );

      expect(find.byType(SplashScreen), findsOneWidget);
      expect(find.text('p o w e r e d'), findsOneWidget);
      expect(find.text('DIGITAL'), findsOneWidget);
      expect(find.byType(DmfOneLineMark), findsOneWidget);

      await tester.pump(const Duration(milliseconds: 2400));
    });

    testWidgets('renders dark mode with full logo style using dark asset', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: SplashScreen(
            initialLogoStyle: LogoStyle.dmfFullLogo,
            isDark: true,
          ),
        ),
      );

      expect(find.byType(SplashScreen), findsOneWidget);
      final imageFinder = find.byType(Image);
      expect(imageFinder, findsOneWidget);
      final image = tester.widget<Image>(imageFinder);
      expect((image.image as AssetImage).assetName, 'assets/images/dmf-logo-dark.png');

      await tester.pump(const Duration(milliseconds: 2400));
    });

    testWidgets('invokes onAnimationComplete when animation finishes', (tester) async {
      bool completed = false;

      await tester.pumpWidget(
        MaterialApp(
          home: SplashScreen(
            initialLogoStyle: LogoStyle.dmfOneLine,
            onAnimationComplete: () {
              completed = true;
            },
          ),
        ),
      );

      expect(completed, isFalse);

      // Fast forward past the 2400ms duration
      await tester.pump(const Duration(milliseconds: 2450));

      expect(completed, isTrue);
    });
  });
}
