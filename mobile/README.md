# DMF LOGO SDK (Flutter)

[![pub package](https://img.shields.io/pub/v/dmf_logo_sdk.svg?logo=dart)](https://pub.dev/packages/dmf_logo_sdk)
[![Flutter](https://img.shields.io/badge/Flutter-3.13+-02569B.svg?logo=flutter)](https://flutter.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Website](https://img.shields.io/badge/Website-digitalmediafactory.org-black)](https://digitalmediafactory.org)

Official **[Digital Media Factory (DMF)](https://digitalmediafactory.org)** animated splash screen and brand mark SDK for **Flutter** featuring physics-based kinetic transitions, multi-style brand marks, and luxury dual-theme palettes.

> 📦 **Official pub.dev Package**: [https://pub.dev/packages/dmf_logo_sdk](https://pub.dev/packages/dmf_logo_sdk)

---

## ✨ Features

- 🚀 **Kinetic Physics Engine**:
  - Custom `BallLaunchCurve` with elastic launch propulsion and $+12\%$ overshoot settle.
  - Custom `TextOvershootCurve` with $+55\%$ title and $+45\%$ subtitle physical rebound trajectory.
- 💎 **Two Brand Mark Styles**:
  - `LogoStyle.dmfOneLine`: Authentic horizontal D-M-F emblem with staggered kinetic text (`p o w e r e d`, `DIGITAL`, `MEDIA FACTORY`).
  - `LogoStyle.dmfFullLogo`: Full official lockup logo (`[ DMF ] DIGITAL MEDIA FACTORY`).
- 🎨 **Curated Luxury Palettes**:
  - **Warm Cream Light (`isDark: false`)**: Signature luminous studio center (`#FFFDF8`) radiating into warm cream (`#FAF4E6`).
  - **Deep Obsidian Dark (`isDark: true`)**: Luminous deep navy center (`#1E293B`) into rich obsidian (`#131B2E`) and edge vignette (`#090E17`).
- 🔤 **Embedded Variable Typography**: Bundled with official `Outfit` and `Plus Jakarta Sans` variable fonts.
- ⚡ **Seamless Navigation**: Supports `onAnimationComplete` callbacks with context or parameterless handlers for easy `Navigator.pushReplacement`.

---

## 📦 Installation

### 1. From pub.dev (Recommended)

Add the package to your `pubspec.yaml`:

```yaml
dependencies:
  dmf_logo_sdk: ^0.0.1
```

Or run:

```bash
flutter pub add dmf_logo_sdk
```

### 2. From Git Repository

```yaml
dependencies:
  dmf_logo_sdk:
    git:
      url: https://github.com/DigitalMediaFactory/dmf-logo-sdk.git
      path: mobile
```

---

## 🚀 Quick Start

### 1. Splash Screen with Page Navigation

```dart
import 'package:flutter/material.dart';
import 'package:dmf_logo_sdk/mobile.dart';
import 'home_page.dart';

class SplashPage extends StatelessWidget {
  const SplashPage({super.key});

  @override
  Widget build(BuildContext context) {
    return SplashScreen(
      initialLogoStyle: LogoStyle.dmfOneLine, // or LogoStyle.dmfFullLogo
      isDark: true,                           // true = Deep Obsidian, false = Warm Cream
      onAnimationComplete: (context) {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (_) => const HomePage()),
        );
      },
    );
  }
}
```

---

### 2. Style 2: Full Official Logo

```dart
import 'package:flutter/material.dart';
import 'package:dmf_logo_sdk/mobile.dart';

class FullLogoSplash extends StatelessWidget {
  const FullLogoSplash({super.key});

  @override
  Widget build(BuildContext context) {
    return SplashScreen(
      initialLogoStyle: LogoStyle.dmfFullLogo,
      isDark: false, // Warm cream light mode
      onAnimationComplete: () {
        debugPrint('Animation complete!');
      },
    );
  }
}
```

---

### 3. Standalone Horizontal Emblem Widget

Use `DmfOneLineMark` anywhere in your app (app bars, profile headers, about screens):

```dart
import 'package:flutter/material.dart';
import 'package:dmf_logo_sdk/mobile.dart';

class BrandHeader extends StatelessWidget {
  const BrandHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: DmfOneLineMark(
        width: 220.0,
        launchProgress: 1.0, // Fully resting state
      ),
    );
  }
}
```

---

## 📖 API Reference

### `SplashScreen`

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `initialLogoStyle` | `LogoStyle` | `LogoStyle.dmfOneLine` | Determines whether to render the kinetic one-line emblem (`dmfOneLine`) or full logo (`dmfFullLogo`). |
| `isDark` | `bool` | `false` | `false` activates Warm Cream light palette, `true` activates Deep Obsidian dark palette. Automatically sets system status bar overlay style. |
| `onAnimationComplete` | `dynamic` | `null` | Callback invoked upon completion ($2400\text{ ms}$). Accepts either `void Function(BuildContext)` or `VoidCallback () => ...`. |

### `LogoStyle` (Enum)

```dart
enum LogoStyle {
  dmfOneLine,   // Style 1: Horizontal D-M-F emblem with kinetic typography
  dmfFullLogo,  // Style 2: Official full DMF brand lockup
}
```

### `DmfOneLineMark`

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `width` | `double` | `245.0` | Display width in logical pixels. Native aspect ratio is $1242 : 408$ (~$3.044 : 1$). |
| `launchProgress` | `double` | (required) | Normalized progress ($0.0 \to 1.0$) driving physical elevation glide and opacity. |

---

## 🎨 Asset Information

All high-definition master assets are bundled directly inside the package:
- `assets/images/dmf_emblem_one_line.png` ($1242 \times 408\text{px}$)
- `assets/images/dmf-logo-light.png` ($1060 \times 204\text{px}$)
- `assets/images/dmf-logo-dark.png` ($1060 \times 204\text{px}$)
- `assets/fonts/Outfit-Variable.ttf`
- `assets/fonts/PlusJakartaSans-Variable.ttf`

---

## 📱 Example Project

An interactive example app is included in the [`example/`](example/) directory demonstrating live style switching, theme toggling, and route replacement.

To run the example:

```bash
cd example
flutter run
```

---

## 📄 License

MIT © [Digital Media Factory](https://digitalmediafactory.org)
