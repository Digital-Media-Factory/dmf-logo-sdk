import type React from 'react';

/**
 * Logo style variant for the DMF Splash Screen.
 */
export enum LogoStyle {
  dmfOneLine = 'dmfOneLine',
  dmfFullLogo = 'dmfFullLogo',
}

export type LogoStyleType = 'dmfOneLine' | 'dmfFullLogo' | LogoStyle;

/**
 * Props for the main SplashScreen component.
 */
export interface SplashScreenProps {
  /**
   * Initial style to render: 'dmfOneLine' (horizontal emblem + typography)
   * or 'dmfFullLogo' (full brand lockup).
   * @default LogoStyle.dmfOneLine
   */
  initialLogoStyle?: LogoStyleType;

  /**
   * Theme mode: false for pure white light palette, true for deep obsidian navy palette.
   * @default false
   */
  isDark?: boolean;

  /**
   * Callback invoked when the kinetic animation sequence finishes (after 2400ms).
   */
  onAnimationComplete?: () => void;

  /**
   * Total duration of the animation cycle in milliseconds.
   * @default 2400
   */
  duration?: number;

  /**
   * Whether the splash screen occupies full viewport with fixed position.
   * Set to false when embedding inside a container, card, or modal.
   * @default true
   */
  fullscreen?: boolean;

  /**
   * Whether to automatically play the entrance animation on mount.
   * @default true
   */
  autoPlay?: boolean;

  /**
   * Custom CSS class name for the wrapper container.
   */
  className?: string;

  /**
   * Inline style overrides for the wrapper container.
   */
  style?: React.CSSProperties;

  /**
   * Automatically load Google Fonts ('Outfit' and 'Plus Jakarta Sans').
   * @default true
   */
  loadFonts?: boolean;

  /**
   * Width for the Style 1 one-line emblem mark.
   * @default 250
   */
  markWidth?: number;

  /**
   * Width for the Style 2 full official logo mark.
   * @default 335
   */
  fullLogoWidth?: number;
}

/**
 * Props for the standalone DmfOneLineMark component.
 */
export interface DmfOneLineMarkProps {
  /**
   * Width in pixels (or CSS unit string).
   * Native aspect ratio is 1242 : 408 (~3.044 : 1).
   * @default 250
   */
  width?: number | string;

  /**
   * Animation progress from 0.0 to 1.0.
   * When provided, controls the physical elevation glide and spring settling.
   */
  launchProgress?: number;

  /**
   * Custom CSS class name.
   */
  className?: string;

  /**
   * Inline style overrides.
   */
  style?: React.CSSProperties;
}

/**
 * Props for the standalone DmfFullLogo component.
 */
export interface DmfFullLogoProps {
  /**
   * Theme variant: false for dark-on-light, true for white-on-dark.
   * @default false
   */
  isDark?: boolean;

  /**
   * Width in pixels (or CSS unit string).
   * Native aspect ratio is 1060 : 204 (~5.196 : 1).
   * @default 335
   */
  width?: number | string;

  /**
   * Custom CSS class name.
   */
  className?: string;

  /**
   * Inline style overrides.
   */
  style?: React.CSSProperties;
}
