import React, { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 按钮变体样式 */
  variant?: ButtonVariant;
  /** 按钮尺寸 */
  size?: ButtonSize;
  /** 是否为加载状态 */
  loading?: boolean;
  /** 是否为块级按钮（宽度100%） */
  block?: boolean;
  /** 左侧图标 */
  iconLeft?: ReactNode;
  /** 右侧图标 */
  iconRight?: ReactNode;
  /** 子元素 */
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      block = false,
      disabled,
      iconLeft,
      iconRight,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const classNames = [
      'apron-button',
      `apron-button--${variant}`,
      `apron-button--${size}`,
      block && 'apron-button--block',
      loading && 'apron-button--loading',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="apron-button__spinner">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="31.4 31.4"
              />
            </svg>
          </span>
        )}
        {!loading && iconLeft && (
          <span className="apron-button__icon apron-button__icon--left">
            {iconLeft}
          </span>
        )}
        {children && <span className="apron-button__content">{children}</span>}
        {!loading && iconRight && (
          <span className="apron-button__icon apron-button__icon--right">
            {iconRight}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

