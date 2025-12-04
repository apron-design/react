import React, { forwardRef, useState, useCallback, createContext, useContext } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import './Collapse.scss';

// ============================================
// Collapse Context
// ============================================
interface CollapseContextValue {
  activeKeys: string[];
  toggleItem: (key: string) => void;
}

const CollapseContext = createContext<CollapseContextValue | null>(null);

// ============================================
// Collapse
// ============================================
export interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
  /** 是否为手风琴模式（每次只能展开一个） */
  accordion?: boolean;
  /** 默认展开的项目 key 数组 */
  defaultActiveKeys?: string[];
  /** 子元素 */
  children?: ReactNode;
}

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  (
    {
      accordion = false,
      defaultActiveKeys = [],
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const [activeKeys, setActiveKeys] = useState<string[]>(defaultActiveKeys);

    const toggleItem = useCallback(
      (key: string) => {
        setActiveKeys((prev) => {
          if (accordion) {
            // 手风琴模式：如果已展开则折叠，否则只展开当前项
            return prev.includes(key) ? [] : [key];
          } else {
            // 普通模式：切换当前项的展开状态
            return prev.includes(key)
              ? prev.filter((k) => k !== key)
              : [...prev, key];
          }
        });
      },
      [accordion]
    );

    const classNames = ['apron-collapse', className].filter(Boolean).join(' ');

    return (
      <CollapseContext.Provider value={{ activeKeys, toggleItem }}>
        <div ref={ref} className={classNames} {...props}>
          {children}
        </div>
      </CollapseContext.Provider>
    );
  }
);

Collapse.displayName = 'Collapse';

// ============================================
// CollapseItem
// ============================================
export interface CollapseItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 唯一标识 */
  itemKey: string;
  /** 标题 */
  title: ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 子元素（正文内容） */
  children?: ReactNode;
}

// 箭头图标组件
const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const CollapseItem = forwardRef<HTMLDivElement, CollapseItemProps>(
  (
    {
      itemKey,
      title,
      disabled = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const context = useContext(CollapseContext);

    if (!context) {
      throw new Error('CollapseItem must be used within a Collapse component');
    }

    const { activeKeys, toggleItem } = context;
    const isActive = activeKeys.includes(itemKey);

    const handleClick = () => {
      if (!disabled) {
        toggleItem(itemKey);
      }
    };

    const classNames = [
      'apron-collapse-item',
      isActive && 'apron-collapse-item--active',
      disabled && 'apron-collapse-item--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        <div
          className="apron-collapse-item__header"
          onClick={handleClick}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-expanded={isActive}
          aria-disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick();
            }
          }}
        >
          <span className="apron-collapse-item__arrow">
            <ArrowIcon />
          </span>
          <span className="apron-collapse-item__title">{title}</span>
        </div>
        <div className="apron-collapse-item__content">
          <div className="apron-collapse-item__body">{children}</div>
        </div>
      </div>
    );
  }
);

CollapseItem.displayName = 'CollapseItem';

