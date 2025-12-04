import React, { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import './Avatar.scss';

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** 子元素（Avatar 组件） */
  children?: ReactNode;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, className = '', ...props }, ref) => {
    const classNames = ['apron-avatar-group', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

