import React, { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import './Badge.scss';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 显示红点 */
  dot?: boolean;
  /** 显示数字 */
  count?: number;
  /** 数字溢出值，超过则显示 {overflowCount}+ */
  overflowCount?: number;
  /** 自定义内容 */
  content?: string;
  /** 子元素 */
  children?: ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      dot = false,
      count,
      overflowCount = 99,
      content,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const classNames = ['apron-badge', className].filter(Boolean).join(' ');

    // 计算显示内容
    const renderBadgeContent = () => {
      // dot 优先级最高
      if (dot) {
        return <sup className="apron-badge__dot" />;
      }

      // content 次之
      if (content !== undefined) {
        return <sup className="apron-badge__content">{content}</sup>;
      }

      // count 最后
      if (count !== undefined && count > 0) {
        const displayCount = count > overflowCount ? `${overflowCount}+` : count;
        const isMultiDigit = String(displayCount).length > 1;
        
        return (
          <sup
            className={[
              'apron-badge__count',
              isMultiDigit && 'apron-badge__count--multi',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {displayCount}
          </sup>
        );
      }

      return null;
    };

    return (
      <span ref={ref} className={classNames} {...props}>
        {children}
        {renderBadgeContent()}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

