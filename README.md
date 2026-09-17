# Digital Media Factory (DMF) Logo & Splash SDK

[![pub package](https://img.shields.io/pub/v/dmf_logo_sdk.svg?logo=dart)](https://pub.dev/packages/dmf_logo_sdk)
[![npm package](https://img.shields.io/npm/v/dmf-logo-sdk.svg?color=blue&logo=npm)](https://www.npmjs.com/package/dmf-logo-sdk)
[![Flutter](https://img.shields.io/badge/Flutter-Mobile%20SDK-02569B.svg?logo=flutter)](https://pub.dev/packages/dmf_logo_sdk)
[![React](https://img.shields.io/badge/React%20%2F%20Next.js-Web%20SDK-61DAFB?logo=react&logoColor=black)](https://www.npmjs.com/package/dmf-logo-sdk)
[![Website](https://img.shields.io/badge/Website-digitalmediafactory.org-black)](https://digitalmediafactory.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

The official **[Digital Media Factory (DMF)](https://digitalmediafactory.org)** brand mark and kinetic animated splash screen SDK for **Flutter (Mobile)** and **Next.js / React (Web)**.

> 📱 **Flutter Package (pub.dev)**: [https://pub.dev/packages/dmf_logo_sdk](https://pub.dev/packages/dmf_logo_sdk)  
> 🌐 **Web Package (npm)**: [https://www.npmjs.com/package/dmf-logo-sdk](https://www.npmjs.com/package/dmf-logo-sdk)  
> 🏢 **Official Website**: [https://digitalmediafactory.org](https://digitalmediafactory.org)

Both platforms share $100\%$ visual and mathematical parity, delivering physics-based entrance transitions, dual luxury color palettes, and multiple brand lockup styles.

---

## 📂 Repository Structure

```text
dmf-logo-sdk/
├── mobile/                 # Flutter Package (pub.dev / git)
│   ├── lib/                # SplashScreen, DmfOneLineMark, BallLaunchCurve, etc.
│   ├── assets/             # Images and variable fonts (Outfit & Plus Jakarta Sans)
│   ├── example/            # Interactive Flutter demo app
│   └── README.md           # Mobile documentation & API reference
│
└── web/                    # Next.js & React Package (npm / yarn / pnpm)
    ├── src/                # SplashScreen, DmfOneLineMark, DmfFullLogo, physics, etc.
    ├── assets/             # High-res images and variable font assets
    ├── example/            # Interactive Vite + React demo app
    ├── dist/               # Bundled ESM, CommonJS, and TypeScript definitions
    └── README.md           # Web documentation & API reference
```

---

## 🌟 Feature Matrix

| Feature | Mobile (Flutter) | Web (Next.js & React) |
| :--- | :--- | :--- |
| **Package Registry** | [![pub](https://img.shields.io/pub/v/dmf_logo_sdk.svg?logo=dart)](https://pub.dev/packages/dmf_logo_sdk)<br>[pub.dev/packages/dmf_logo_sdk](https://pub.dev/packages/dmf_logo_sdk) | [![npm](https://img.shields.io/npm/v/dmf-logo-sdk.svg?logo=npm)](https://www.npmjs.com/package/dmf-logo-sdk)<br>[npmjs.com/package/dmf-logo-sdk](https://www.npmjs.com/package/dmf-logo-sdk) |
| **Package Directory** | [`mobile/`](mobile/) | [`web/`](web/) |
| **Main Component** | `SplashScreen` | `<SplashScreen />` |
| **Style 1: One-Line Emblem** | `LogoStyle.dmfOneLine` | `LogoStyle.dmfOneLine` |
| **Style 2: Full Official Logo** | `LogoStyle.dmfFullLogo` | `LogoStyle.dmfFullLogo` |
| **Theme Modes** | `isDark: false` (Warm Cream)<br>`isDark: true` (Deep Obsidian) | `isDark: false` (Warm Cream)<br>`isDark: true` (Deep Obsidian) |
| **Kinetic Physics** | `BallLaunchCurve` ($1.12$ overshoot)<br>`TextOvershootCurve` ($1.55$ / $1.45$) | Exact mathematical TypeScript implementation |
| **Duration** | $2400\text{ ms}$ (customizable) | $2400\text{ ms}$ (customizable) |
| **Typography** | Bundled `Outfit` & `Plus Jakarta Sans` | Dynamic Google Fonts auto-injector |
| **SSR & Frameworks** | Flutter iOS, Android, macOS, Web | Next.js App Router (`'use client'`), Pages Router, Vite, CRA |

---

## 🚀 Quickstarts

### 1. Mobile (Flutter)

```bash
# In your Flutter app directory:
flutter pub add dmf_logo_sdk
```

```dart
import 'package:flutter/material.dart';
import 'package:dmf_logo_sdk/mobile.dart';

class SplashPage extends StatelessWidget {
  const SplashPage({super.key});

  @override
  Widget build(BuildContext context) {
    return SplashScreen(
      initialLogoStyle: LogoStyle.dmfOneLine,
      isDark: true,
      onAnimationComplete: (context) {
        Navigator.of(context).pushReplacementNamed('/home');
      },
    );
  }
}
```

👉 See the [Mobile README](mobile/README.md) for complete details.

---

### 2. Web (Next.js & React)

```bash
# In your Next.js or React app directory:
npm install dmf-logo-sdk
```

```tsx
'use client';

import { SplashScreen, LogoStyle } from 'dmf-logo-sdk';
import { useRouter } from 'next/navigation';

export default function SplashPage() {
  const router = useRouter();

  return (
    <SplashScreen
      initialLogoStyle={LogoStyle.dmfFullLogo}
      isDark={true}
      onAnimationComplete={() => router.push('/home')}
    />
  );
}
```

👉 See the [Web README](web/README.md) for complete details.

---

## 🚢 Publishing / Uploading Guide

### Publishing Flutter Package to pub.dev
```bash
cd mobile
flutter pub publish --dry-run
flutter pub publish
```

### Publishing Web Package to npm
```bash
cd web
npm run build
npm pack --dry-run
npm publish --access public
```

---

## 📄 License

MIT © [Digital Media Factory](https://digitalmediafactory.org)
