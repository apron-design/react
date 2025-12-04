import React, { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import './Card.scss';

// ============================================
// Card
// ============================================
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** 子元素 */
  children?: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', ...props }, ref) => {
    const classNames = ['apron-card', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// ============================================
// CardHeader
// ============================================
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** 标题 */
  title?: ReactNode;
  /** 右侧额外内容 */
  extra?: ReactNode;
  /** 子元素 */
  children?: ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, extra, children, className = '', ...props }, ref) => {
    const classNames = ['apron-card__header', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {title && <div className="apron-card__header-title">{title}</div>}
        {children}
        {extra && <div className="apron-card__header-extra">{extra}</div>}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// ============================================
// CardBody
// ============================================
export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  /** 子元素 */
  children?: ReactNode;
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className = '', ...props }, ref) => {
    const classNames = ['apron-card__body', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

// ============================================
// CardFooter
// ============================================
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** 子元素 */
  children?: ReactNode;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = '', ...props }, ref) => {
    const classNames = ['apron-card__footer', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

