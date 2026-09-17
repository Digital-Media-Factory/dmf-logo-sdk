# DMF LOGO SDK (Web)

[![npm package](https://img.shields.io/npm/v/dmf-logo-sdk.svg?color=blue&logo=npm)](https://www.npmjs.com/package/dmf-logo-sdk)
[![React](https://img.shields.io/badge/React-18%20%7C%2019-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Next.js](https://img.shields.io/badge/Next.js-13%20%7C%2014%20%7C%2015-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Website](https://img.shields.io/badge/Website-digitalmediafactory.org-black)](https://digitalmediafactory.org)

Official **[Digital Media Factory (DMF)](https://digitalmediafactory.org)** animated kinetic splash screen and logo SDK for **Next.js** and **React**.

Mirrors the kinetic physics, dual-theme palettes, and multi-style branding of the Flutter mobile SDK with $100\%$ visual and mathematical parity.

> 📦 **Official npm Package**: [https://www.npmjs.com/package/dmf-logo-sdk](https://www.npmjs.com/package/dmf-logo-sdk)

---

## Features

- ⚡ **Next.js Ready**: Full `'use client'` support for Next.js App Router (13/14/15) and Pages Router.
- 🎨 **Dual Luxury Themes**: Signature Warm Cream Light (`#FAF4E6`) and Deep Obsidian Dark (`#0C121E`).
- 💎 **Two Brand Styles**:
  - `LogoStyle.dmfOneLine`: Authentic horizontal D-M-F emblem + `p o w e r e d` + `DIGITAL` + `MEDIA FACTORY` kinetic text.
  - `LogoStyle.dmfFullLogo`: Full official lockup logo.
- 🚀 **Kinetic Physics Engine**: Exact replica of Flutter's `BallLaunchCurve` ($1.12$ peak overshoot) and `TextOvershootCurve` ($1.55$ and $1.45$ overshoots with rebound settling).
- 📦 **Zero-Config Asset Bundling**: High-resolution brand assets are bundled directly as optimized data-URIs. No broken image links, no asset copying required.
- 🔤 **Automatic Typography**: Dynamically loads and sets Google Fonts (`Outfit` 900 and `Plus Jakarta Sans` 500, 800).
- 🪶 **Ultra Lightweight**: Pure React with zero bulky third-party animation dependencies.

---

## Installation

Install the package via npm, pnpm, or yarn:

```bash
npm install dmf-logo-sdk
# or
yarn add dmf-logo-sdk
# or
pnpm add dmf-logo-sdk
```

---

## Quick Start

### 1. Next.js (App Router)

```tsx
// app/page.tsx or app/splash/page.tsx
'use client';

import { useState } from 'react';
import { SplashScreen, LogoStyle } from 'dmf-logo-sdk';
import { useRouter } from 'next/navigation';

export default function SplashPage() {
  const router = useRouter();

  return (
    <SplashScreen
      initialLogoStyle={LogoStyle.dmfOneLine} // or 'dmfOneLine' | 'dmfFullLogo'
      isDark={true}
      onAnimationComplete={() => {
        router.push('/home');
      }}
    />
  );
}
```

### 2. React (Vite / CRA / Remix)

```tsx
import React, { useState } from 'react';
import { SplashScreen, LogoStyle } from 'dmf-logo-sdk';

export function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <SplashScreen
        initialLogoStyle={LogoStyle.dmfOneLine}
        isDark={false}
        onAnimationComplete={() => setShowSplash(false)}
      />
    );
  }

  return <div>Your Main Application</div>;
}
```

### 3. Standalone Logo Components

You can also use the logo components standalone anywhere in your application:

```tsx
import { DmfOneLineMark, DmfFullLogo } from 'dmf-logo-sdk';

export function Header() {
  return (
    <header>
      {/* Horizontal one-line emblem */}
      <DmfOneLineMark width={200} />

      {/* Full official logo mark */}
      <DmfFullLogo isDark={true} width={300} />
    </header>
  );
}
```

---

## Props Reference

### `<SplashScreen />`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `initialLogoStyle` | `'dmfOneLine' \| 'dmfFullLogo'` | `'dmfOneLine'` | Brand style variant to display. |
| `isDark` | `boolean` | `false` | `false` for warm cream light palette, `true` for deep obsidian dark. |
| `onAnimationComplete` | `() => void` | `undefined` | Callback triggered when the $2400\text{ ms}$ kinetic animation finishes. |
| `duration` | `number` | `2400` | Total duration of the animation sequence in milliseconds. |
| `fullscreen` | `boolean` | `true` | When `true`, occupies fixed full viewport (`position: fixed`). When `false`, sizes relative to parent container. |
| `autoPlay` | `boolean` | `true` | Whether to automatically play the entrance kinetic choreography. |
| `loadFonts` | `boolean` | `true` | Automatically inject Google Fonts (`Outfit` and `Plus Jakarta Sans`). |
| `markWidth` | `number` | `250` | Display width in pixels for Style 1 one-line emblem. |
| `fullLogoWidth` | `number` | `335` | Display width in pixels for Style 2 full logo. |
| `className` | `string` | `''` | Custom CSS class name. |
| `style` | `React.CSSProperties` | `{}` | Custom inline style overrides. |

### `<DmfOneLineMark />`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `width` | `number \| string` | `250` | Width of the horizontal emblem mark. Native aspect ratio is $1242 : 408$. |
| `launchProgress` | `number` | `1.0` | Controlled progress ($0.0$ to $1.0$) driving elevation and opacity. |

### `<DmfFullLogo />`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `isDark` | `boolean` | `false` | Switches between light mode and dark mode full logo assets. |
| `width` | `number \| string` | `335` | Width of the logo mark. Native aspect ratio is $1060 : 204$. |

---

## License

MIT © [Digital Media Factory](https://digitalmediafactory.org)
