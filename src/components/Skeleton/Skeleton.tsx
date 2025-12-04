import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import './Skeleton.scss';

export interface SkeletonProps {
  /** 是否显示骨架屏 */
  loading?: boolean;
  /** 是否显示动画 */
  animated?: boolean;
  /** 子元素（loading 为 false 时显示） */
  children?: ReactNode;
  /** 自定义类名 */
  className?: string;
}

export interface SkeletonElementProps {
  /** 形状 */
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  /** 宽度 */
  width?: number | string;
  /** 高度 */
  height?: number | string;
  /** 是否显示动画 */
  animated?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

export interface SkeletonAvatarProps {
  /** 尺寸 */
  size?: number | 'sm' | 'md' | 'lg';
  /** 形状 */
  shape?: 'circle' | 'square';
  /** 是否显示动画 */
  animated?: boolean;
  /** 自定义类名 */
  className?: string;
}

export interface SkeletonTitleProps {
  /** 宽度 */
  width?: number | string;
  /** 是否显示动画 */
  animated?: boolean;
  /** 自定义类名 */
  className?: string;
}

export interface SkeletonParagraphProps {
  /** 行数 */
  rows?: number;
  /** 每行宽度，可以是数组 */
  width?: number | string | (number | string)[];
  /** 是否显示动画 */
  animated?: boolean;
  /** 自定义类名 */
  className?: string;
}

export interface SkeletonButtonProps {
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 形状 */
  shape?: 'default' | 'circle' | 'round';
  /** 是否块级 */
  block?: boolean;
  /** 是否显示动画 */
  animated?: boolean;
  /** 自定义类名 */
  className?: string;
}

export interface SkeletonImageProps {
  /** 宽度 */
  width?: number | string;
  /** 高度 */
  height?: number | string;
  /** 是否显示动画 */
  animated?: boolean;
  /** 自定义类名 */
  className?: string;
}

// 基础骨架元素
export const SkeletonElement: React.FC<SkeletonElementProps> = ({
  variant = 'text',
  width,
  height,
  animated = true,
  className = '',
  style,
}) => {
  const classNames = [
    'apron-skeleton__element',
    `apron-skeleton__element--${variant}`,
    animated && 'apron-skeleton__element--animated',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const elementStyle: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  };

  return <div className={classNames} style={elementStyle} />;
};

// 头像骨架
export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  size = 'md',
  shape = 'circle',
  animated = true,
  className = '',
}) => {
  const sizeMap = {
    sm: 32,
    md: 40,
    lg: 48,
  };

  const actualSize = typeof size === 'number' ? size : sizeMap[size];

  const classNames = [
    'apron-skeleton__avatar',
    `apron-skeleton__avatar--${shape}`,
    animated && 'apron-skeleton__element--animated',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      style={{ width: actualSize, height: actualSize }}
    />
  );
};

// 标题骨架
export const SkeletonTitle: React.FC<SkeletonTitleProps> = ({
  width = '40%',
  animated = true,
  className = '',
}) => {
  const classNames = [
    'apron-skeleton__title',
    animated && 'apron-skeleton__element--animated',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      style={{ width: typeof width === 'number' ? `${width}px` : width }}
    />
  );
};

// 段落骨架
export const SkeletonParagraph: React.FC<SkeletonParagraphProps> = ({
  rows = 3,
  width,
  animated = true,
  className = '',
}) => {
  const getRowWidth = (index: number): string | number => {
    if (Array.isArray(width)) {
      return width[index] ?? '100%';
    }
    // 最后一行默认 60%
    if (index === rows - 1) {
      return width ?? '60%';
    }
    return '100%';
  };

  const classNames = [
    'apron-skeleton__paragraph',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={index}
          className={`apron-skeleton__row ${animated ? 'apron-skeleton__element--animated' : ''}`}
          style={{
            width: typeof getRowWidth(index) === 'number'
              ? `${getRowWidth(index)}px`
              : getRowWidth(index),
          }}
        />
      ))}
    </div>
  );
};

// 按钮骨架
export const SkeletonButton: React.FC<SkeletonButtonProps> = ({
  size = 'md',
  shape = 'default',
  block = false,
  animated = true,
  className = '',
}) => {
  const classNames = [
    'apron-skeleton__button',
    `apron-skeleton__button--${size}`,
    `apron-skeleton__button--${shape}`,
    block && 'apron-skeleton__button--block',
    animated && 'apron-skeleton__element--animated',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames} />;
};

// 图片骨架
export const SkeletonImage: React.FC<SkeletonImageProps> = ({
  width = 200,
  height = 200,
  animated = true,
  className = '',
}) => {
  const classNames = [
    'apron-skeleton__image',
    animated && 'apron-skeleton__element--animated',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    >
      <svg
        viewBox="0 0 1024 1024"
        fill="currentColor"
        width="48"
        height="48"
        opacity="0.3"
      >
        <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zM338 304c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm513.9 437.1a8.11 8.11 0 0 1-5.2 1.9H177.2c-4.4 0-8-3.6-8-8 0-1.9.7-3.7 1.9-5.2l170.3-202c2.8-3.4 7.9-3.8 11.3-1 .3.3.7.6 1 1l99.4 118 158.1-187.5c2.8-3.4 7.9-3.8 11.3-1 .3.3.7.6 1 1l게 227.1z" />
      </svg>
    </div>
  );
};

// 主 Skeleton 组件
export const Skeleton: React.FC<SkeletonProps> & {
  Element: typeof SkeletonElement;
  Avatar: typeof SkeletonAvatar;
  Title: typeof SkeletonTitle;
  Paragraph: typeof SkeletonParagraph;
  Button: typeof SkeletonButton;
  Image: typeof SkeletonImage;
} = ({
  loading = true,
  animated = true,
  children,
  className = '',
}) => {
  if (!loading) {
    return <>{children}</>;
  }

  const classNames = [
    'apron-skeleton',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      <div className="apron-skeleton__content">
        <SkeletonAvatar animated={animated} />
        <div className="apron-skeleton__info">
          <SkeletonTitle animated={animated} />
          <SkeletonParagraph animated={animated} rows={3} />
        </div>
      </div>
    </div>
  );
};

// 挂载子组件
Skeleton.Element = SkeletonElement;
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Title = SkeletonTitle;
Skeleton.Paragraph = SkeletonParagraph;
Skeleton.Button = SkeletonButton;
Skeleton.Image = SkeletonImage;

Skeleton.displayName = 'Skeleton';

