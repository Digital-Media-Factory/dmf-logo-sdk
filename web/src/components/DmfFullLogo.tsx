import React from 'react';
import { DMF_LOGO_LIGHT, DMF_LOGO_DARK } from '../assets/images';
import type { DmfFullLogoProps } from '../types';

export const DmfFullLogo: React.FC<DmfFullLogoProps> = ({
  isDark = false,
  width = 335,
  className,
  style,
}) => {
  const numWidth = typeof width === 'number' ? width : parseFloat(width) || 335;
  // 1060 : 204 native aspect ratio (~5.196 : 1)
  const height = numWidth * (204.0 / 1060.0);
  const src = isDark ? DMF_LOGO_DARK : DMF_LOGO_LIGHT;

  return (
    <div
      className={className}
      style={{
        width: numWidth,
        height,
        display: 'inline-block',
        position: 'relative',
        userSelect: 'none',
        ...style,
      }}
    >
      <img
        src={src}
        alt="Digital Media Factory Logo"
        width={numWidth}
        height={height}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default DmfFullLogo;
