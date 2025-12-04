import React, { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode, CSSProperties } from 'react';
import './Space.scss';

export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline';
export type SpaceOrientation = 'horizontal' | 'vertical';
export type SpaceSize = 'small' | 'middle' | 'large' | number;

export interface SpaceProps extends HTMLAttributes<HTMLDivElement> {
  /** 对齐方式 */
  align?: SpaceAlign;
  /** 间距方向 */
  orientation?: SpaceOrientation;
  /** 间距大小 */
  size?: SpaceSize;
  /** 是否自动换行（仅 horizontal 时有效） */
  wrap?: boolean;
  /** 子元素 */
  children?: ReactNode;
}

// 预设间距大小映射（单位：px）
const SIZE_MAP: Record<'small' | 'middle' | 'large', number> = {
  small: 8,
  middle: 16,
  large: 24,
};

export const Space = forwardRef<HTMLDivElement, SpaceProps>(
  (
    {
      align,
      orientation = 'horizontal',
      size = 'middle',
      wrap = false,
      children,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const classNames = [
      'apron-space',
      `apron-space--${orientation}`,
      align && `apron-space--align-${align}`,
      wrap && orientation === 'horizontal' && 'apron-space--wrap',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // 计算间距值
    const gapValue = typeof size === 'number' ? size : SIZE_MAP[size];

    const mergedStyle: CSSProperties = {
      ...style,
      '--apron-space-gap': `${gapValue}px`,
    } as CSSProperties;

    return (
      <div ref={ref} className={classNames} style={mergedStyle} {...props}>
        {children}
      </div>
    );
  }
);

Space.displayName = 'Space';

