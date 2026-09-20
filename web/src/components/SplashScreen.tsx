'use client';

import React, { useEffect } from 'react';
import { LogoStyle } from '../types';
import type { SplashScreenProps } from '../types';
import { useSplashAnimation } from '../hooks/useSplashAnimation';
import { DmfOneLineMark } from './DmfOneLineMark';
import { DmfFullLogo } from './DmfFullLogo';
import { injectDmfFonts, DMF_FONTS } from '../assets/fonts';

export const SplashScreen: React.FC<SplashScreenProps> = ({
  initialLogoStyle = LogoStyle.dmfOneLine,
  isDark = false,
  onAnimationComplete,
  duration = 2400,
  fullscreen = true,
  autoPlay = true,
  className = '',
  style = {},
  loadFonts = true,
  markWidth = 250,
  fullLogoWidth = 335,
}) => {
  useEffect(() => {
    if (loadFonts) {
      injectDmfFonts();
    }
  }, [loadFonts]);

  const { values } = useSplashAnimation({
    duration,
    autoPlay,
    onAnimationComplete,
  });

  const isFullLogo = String(initialLogoStyle) === LogoStyle.dmfFullLogo;

  // Dynamic Luxury Palettes: Pure White Light vs Deep Obsidian Dark (matching Flutter)
  const bgColor = isDark ? '#0C121E' : '#FFFFFF';
  const background = isDark
    ? 'radial-gradient(circle at 50% 42.5%, #1E293B 0%, #131B2E 55%, #090E17 100%)'
    : '#FFFFFF';

  const poweredColor = isDark ? '#94A3B8' : '#78716C';
  const primaryTextColor = isDark ? '#F8FAFC' : '#141D2F';
  const subtitleColor = isDark ? '#E2E8F0' : '#141D2F';

  const containerStyle: React.CSSProperties = {
    backgroundColor: bgColor,
    background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    boxSizing: 'border-box',
    ...(fullscreen
      ? {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 99999,
        }
      : {
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: 480,
        }),
    ...style,
  };

  return (
    <div className={`dmf-splash-container ${className}`} style={containerStyle}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '24px',
          boxSizing: 'border-box',
          maxWidth: '100%',
        }}
      >
        {isFullLogo ? (
          /* Style 2: Full Official Logo of Digital Media Factory */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* --- 'p o w e r e d' --- */}
            <div
              style={{
                transform: `translate3d(0, ${values.poweredSlideY.toFixed(3)}px, 0)`,
                opacity: values.poweredFade,
                willChange: 'transform, opacity',
                userSelect: 'none',
              }}
            >
              <span
                style={{
                  fontFamily: DMF_FONTS.plusJakarta,
                  fontSize: '12.5px',
                  fontWeight: 500,
                  letterSpacing: '4.5px',
                  color: poweredColor,
                  textTransform: 'lowercase',
                  display: 'inline-block',
                }}
              >
                p o w e r e d
              </span>
            </div>

            <div style={{ height: 46 }} />

            {/* --- FULL OFFICIAL DMF LOGO --- */}
            <div
              style={{
                transform: `translate3d(0, ${values.titleSlideY.toFixed(3)}px, 0) scale(${values.titleScale.toFixed(4)})`,
                opacity: values.titleFade,
                willChange: 'transform, opacity',
                userSelect: 'none',
              }}
            >
              <DmfFullLogo isDark={isDark} width={fullLogoWidth} />
            </div>
          </div>
        ) : (
          /* Style 1: DMF One-Line Emblem */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* --- HERO LOGO MARK (ONE LINE) --- */}
            <div
              style={{
                transform: `scale(${values.markScale.toFixed(4)})`,
                willChange: 'transform',
                userSelect: 'none',
              }}
            >
              <DmfOneLineMark
                width={markWidth}
                launchProgress={values.logoLaunchProgress}
              />
            </div>

            {/* Space 1: Logo bottom to 'powered' (42px) */}
            <div style={{ height: 42 }} />

            {/* --- 'p o w e r e d' --- */}
            <div
              style={{
                transform: `translate3d(0, ${values.poweredSlideY.toFixed(3)}px, 0)`,
                opacity: values.poweredFade,
                willChange: 'transform, opacity',
                userSelect: 'none',
              }}
            >
              <span
                style={{
                  fontFamily: DMF_FONTS.plusJakarta,
                  fontSize: '12.5px',
                  fontWeight: 500,
                  letterSpacing: '4.5px',
                  color: poweredColor,
                  textTransform: 'lowercase',
                  display: 'inline-block',
                }}
              >
                p o w e r e d
              </span>
            </div>

            {/* Space 2: 'powered' bottom to Title (24px) */}
            <div style={{ height: 24 }} />

            {/* --- PRIMARY BRAND TITLE ('DIGITAL') --- */}
            <div
              style={{
                transform: `translate3d(0, ${values.titleSlideY.toFixed(3)}px, 0) scale(${values.titleScale.toFixed(4)})`,
                opacity: values.titleFade,
                willChange: 'transform, opacity',
                userSelect: 'none',
              }}
            >
              <h1
                style={{
                  margin: 0,
                  padding: 0,
                  fontFamily: DMF_FONTS.outfit,
                  fontSize: '44px',
                  fontWeight: 900,
                  letterSpacing: '4.0px',
                  color: primaryTextColor,
                  lineHeight: 1.0,
                  textAlign: 'center',
                }}
              >
                DIGITAL
              </h1>
            </div>

            {/* Space 3: Title bottom to Subtitle (20px) */}
            <div style={{ height: 20 }} />

            {/* --- SUBTITLE ('MEDIA FACTORY') --- */}
            <div
              style={{
                transform: `translate3d(0, ${values.subtitleSlideY.toFixed(3)}px, 0)`,
                opacity: values.subtitleFade,
                willChange: 'transform, opacity',
                userSelect: 'none',
              }}
            >
              <h2
                style={{
                  margin: 0,
                  padding: 0,
                  fontFamily: DMF_FONTS.plusJakarta,
                  fontSize: '13px',
                  fontWeight: 800,
                  letterSpacing: `${values.subtitleTracking.toFixed(2)}px`,
                  color: subtitleColor,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                MEDIA FACTORY
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;
