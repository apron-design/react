import React, { forwardRef, useRef, useCallback } from 'react';
import type { ButtonHTMLAttributes, ReactNode, MouseEvent } from 'react';
import './Button.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'default' | 'text' | 'link';
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 按钮变体 */
  variant?: ButtonVariant;
  /** 按钮尺寸 */
  size?: ButtonSize;
  /** 是否为虚线边框 */
  dashed?: boolean;
  /** 是否为危险按钮（红色） */
  danger?: boolean;
  /** 是否为加载状态 */
  loading?: boolean;
  /** 是否为块级按钮（宽度100%） */
  block?: boolean;
  /** 左侧图标 */
  iconLeft?: ReactNode;
  /** 右侧图标 */
  iconRight?: ReactNode;
  /** 是否禁用涟漪效果 */
  disableRipple?: boolean;
  /** 子元素 */
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      dashed = false,
      danger = false,
      loading = false,
      block = false,
      disabled,
      iconLeft,
      iconRight,
      disableRipple = false,
      children,
      className = '',
      onClick,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    // 创建涟漪效果
    const createRipple = useCallback((event: MouseEvent<HTMLButtonElement>) => {
      const button = buttonRef.current;
      if (!button || disableRipple || disabled || loading) return;

      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.className = 'apron-button__ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      button.appendChild(ripple);

      // 动画结束后移除涟漪
      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    }, [disableRipple, disabled, loading]);

    const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
      createRipple(event);
      onClick?.(event);
    }, [createRipple, onClick]);

    // 合并 ref
    const mergedRef = useCallback(
      (node: HTMLButtonElement | null) => {
        (buttonRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const classNames = [
      'apron-button',
      `apron-button--${variant}`,
      `apron-button--${size}`,
      dashed && 'apron-button--dashed',
      danger && 'apron-button--danger',
      block && 'apron-button--block',
      loading && 'apron-button--loading',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={mergedRef}
        className={classNames}
        disabled={disabled || loading}
        onClick={handleClick}
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
