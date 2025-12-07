import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode, ImgHTMLAttributes } from 'react';
import './Avatar.scss';

export type AvatarSize = 'mini' | 'small' | 'middle' | 'large';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** 是否为方形 */
  square?: boolean;
  /** 头像尺寸 */
  size?: AvatarSize;
  /** 图片地址 */
  src?: string;
  /** 图片替代文本 */
  alt?: string;
  /** 图片属性 */
  imgProps?: ImgHTMLAttributes<HTMLImageElement>;
  /** 子元素（文字或图标） */
  children?: ReactNode;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      square = false,
      size = 'middle',
      src,
      alt,
      imgProps,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const classNames = [
      'apron-avatar',
      `apron-avatar--${size}`,
      square && 'apron-avatar--square',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classNames} {...props}>
        {src ? (
          <img
            src={src}
            alt={alt}
            className="apron-avatar__image"
            {...imgProps}
          />
        ) : (
          <span className="apron-avatar__content">{children}</span>
        )}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';

