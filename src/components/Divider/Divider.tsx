import React, { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import './Divider.scss';

export type DividerAlign = 'left' | 'center' | 'right';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** 是否为虚线 */
  dashed?: boolean;
  /** 文字对齐方式 */
  align?: DividerAlign;
  /** 分割线中的文字内容 */
  children?: ReactNode;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      dashed = false,
      align = 'left',
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const classNames = [
      'apron-divider',
      dashed && 'apron-divider--dashed',
      children && 'apron-divider--with-text',
      children && `apron-divider--${align}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // 没有文字时，渲染简单的分割线
    if (!children) {
      return (
        <div ref={ref} className={classNames} role="separator" {...props}>
          <span className="apron-divider__line" />
        </div>
      );
    }

    // 有文字时，渲染带文字的分割线
    return (
      <div ref={ref} className={classNames} role="separator" {...props}>
        <span className="apron-divider__line apron-divider__line--left" />
        <span className="apron-divider__text">{children}</span>
        <span className="apron-divider__line apron-divider__line--right" />
      </div>
    );
  }
);

Divider.displayName = 'Divider';

