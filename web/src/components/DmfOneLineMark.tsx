import React from 'react';
import { DMF_EMBLEM_ONE_LINE } from '../assets/images';
import type { DmfOneLineMarkProps } from '../types';

export const DmfOneLineMark: React.FC<DmfOneLineMarkProps> = ({
  width = 250,
  launchProgress = 1.0,
  className,
  style,
}) => {
  const numWidth = typeof width === 'number' ? width : parseFloat(width) || 250;
  // 1242 : 408 native aspect ratio (~3.044 : 1)
  const height = numWidth * (408.0 / 1242.0);

  // Dynamic entrance physics for the one-line mark:
  // Smooth physical elevation glide, subtle overshoot, and settling
  const launchYOffset = 30.0;
  const currentOffset = (1.0 - launchProgress) * launchYOffset;
  const opacity = Math.min(Math.max(launchProgress * 1.6, 0.0), 1.0);

  return (
    <div
      className={className}
      style={{
        width: numWidth,
        height,
        display: 'inline-block',
        position: 'relative',
        transform: `translate3d(0, ${currentOffset.toFixed(3)}px, 0)`,
        opacity,
        willChange: 'transform, opacity',
        userSelect: 'none',
        ...style,
      }}
    >
      <img
        src={DMF_EMBLEM_ONE_LINE}
        alt="DMF Emblem One-Line"
        width={numWidth}
        height={height}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          imageRendering: 'auto',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default DmfOneLineMark;
