import React, { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import './Link.scss';

export type LinkVariant = 'primary' | 'secondary';
export type LinkUnderline = 'always' | 'hover' | 'never';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** 链接变种 */
  variant?: LinkVariant;
  /** 下划线显示方式 */
  underline?: LinkUnderline;
  /** 是否为危险链接（红色） */
  danger?: boolean;
  /** 子元素 */
  children?: ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant = 'secondary',
      underline = 'never',
      danger = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const classNames = [
      'apron-link',
      `apron-link--${variant}`,
      `apron-link--underline-${underline}`,
      danger && 'apron-link--danger',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <a ref={ref} className={classNames} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = 'Link';
