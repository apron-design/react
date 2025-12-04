import React, {
  forwardRef,
  useState,
  createContext,
  useContext,
  useCallback,
} from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import './Tabs.scss';

// ============================================
// Tabs Context
// ============================================
interface TabsContextValue {
  activeKey: string;
  setActiveKey: (key: string) => void;
  capsule: boolean;
}

const TabsContext = createContext<TabsContextValue | null>(null);

// ============================================
// Tabs
// ============================================
export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /** 默认选中的 Tab key */
  defaultActiveKey?: string;
  /** 是否为胶囊形 */
  capsule?: boolean;
  /** 右侧额外内容 */
  extra?: ReactNode;
  /** 子元素 */
  children?: ReactNode;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      defaultActiveKey = '',
      capsule = false,
      extra,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const [activeKey, setActiveKey] = useState(defaultActiveKey);

    const classNames = [
      'apron-tabs',
      capsule && 'apron-tabs--capsule',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <TabsContext.Provider value={{ activeKey, setActiveKey, capsule }}>
        <div ref={ref} className={classNames} {...props}>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === TabList) {
              return React.cloneElement(child as React.ReactElement<TabListProps>, { extra });
            }
            return child;
          })}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

// ============================================
// TabList
// ============================================
export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  /** 右侧额外内容（由 Tabs 传入） */
  extra?: ReactNode;
  /** 子元素 */
  children?: ReactNode;
}

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ extra, children, className = '', ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) {
      throw new Error('TabList must be used within a Tabs component');
    }

    const classNames = ['apron-tabs__list', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classNames} role="tablist" {...props}>
        <div className="apron-tabs__list-items">{children}</div>
        {extra && <div className="apron-tabs__list-extra">{extra}</div>}
      </div>
    );
  }
);

TabList.displayName = 'TabList';

// ============================================
// Tab
// ============================================
export interface TabProps extends HTMLAttributes<HTMLButtonElement> {
  /** Tab 的唯一标识 */
  tabKey: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 子元素 */
  children?: ReactNode;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ tabKey, disabled = false, children, className = '', ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) {
      throw new Error('Tab must be used within a Tabs component');
    }

    const { activeKey, setActiveKey } = context;
    const isActive = activeKey === tabKey;

    const handleClick = useCallback(() => {
      if (!disabled) {
        setActiveKey(tabKey);
      }
    }, [disabled, setActiveKey, tabKey]);

    const classNames = [
      'apron-tabs__tab',
      isActive && 'apron-tabs__tab--active',
      disabled && 'apron-tabs__tab--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        role="tab"
        aria-selected={isActive}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Tab.displayName = 'Tab';

// ============================================
// TabPanel
// ============================================
export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** 对应的 Tab key */
  tabKey: string;
  /** 子元素 */
  children?: ReactNode;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ tabKey, children, className = '', ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) {
      throw new Error('TabPanel must be used within a Tabs component');
    }

    const { activeKey } = context;
    const isActive = activeKey === tabKey;

    if (!isActive) {
      return null;
    }

    const classNames = ['apron-tabs__panel', className].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={classNames}
        role="tabpanel"
        aria-hidden={!isActive}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabPanel.displayName = 'TabPanel';

