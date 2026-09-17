'use client';

// Components
export { SplashScreen, default as SplashScreenDefault } from './components/SplashScreen';
export { DmfOneLineMark, default as DmfOneLineMarkDefault } from './components/DmfOneLineMark';
export { DmfFullLogo, default as DmfFullLogoDefault } from './components/DmfFullLogo';

// Types & Enums
export { LogoStyle } from './types';
export type {
  LogoStyleType,
  SplashScreenProps,
  DmfOneLineMarkProps,
  DmfFullLogoProps,
} from './types';

// Animation & Physics
export { useSplashAnimation, computeAnimationValues } from './hooks/useSplashAnimation';
export type { SplashAnimationValues } from './hooks/useSplashAnimation';
export { ballLaunchCurve } from './physics/ballLaunchCurve';
export {
  createTextOvershootCurve,
  textOvershootCurveTitle,
  textOvershootCurveSubtitle,
} from './physics/textOvershootCurve';
export { Curves } from './physics/easing';

// Assets & Fonts
export {
  DMF_EMBLEM_ONE_LINE,
  DMF_LOGO_LIGHT,
  DMF_LOGO_DARK,
  ASSET_SOURCES,
} from './assets/images';
export { injectDmfFonts, DMF_FONTS } from './assets/fonts';
