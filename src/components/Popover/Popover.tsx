import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  cloneElement,
  isValidElement,
} from 'react';
import type { HTMLAttributes, ReactNode, ReactElement } from 'react';
import { createPortal } from 'react-dom';
import './Popover.scss';

// ============================================
// 全局状态管理：一次只显示一个 Popover
// ============================================
let activePopoverId: string | null = null;
const popoverCloseCallbacks = new Map<string, () => void>();

const registerPopover = (id: string, closeCallback: () => void) => {
  popoverCloseCallbacks.set(id, closeCallback);
};

const unregisterPopover = (id: string) => {
  popoverCloseCallbacks.delete(id);
};

const closeOtherPopovers = (currentId: string) => {
  popoverCloseCallbacks.forEach((callback, id) => {
    if (id !== currentId) {
      callback();
    }
  });
  activePopoverId = currentId;
};

// 生成唯一 ID
let popoverIdCounter = 0;
const generatePopoverId = () => `popover-${++popoverIdCounter}`;

// ============================================
// Popover
// ============================================
export type PopoverMode = 'click' | 'hover';

export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'content'> {
  /** 触发方式 */
  mode?: PopoverMode;
  /** 标题 */
  title?: ReactNode;
  /** 内容 */
  content?: ReactNode;
  /** 触发元素 */
  children: ReactElement;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({ mode = 'click', title, content, children, className = '', ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const popoverIdRef = useRef<string>(generatePopoverId());
    const hoverTimeoutRef = useRef<NodeJS.Timeout>();

    // 计算位置（Popover 在触发元素上方，箭头指向下方）
    const updatePosition = useCallback(() => {
      if (!triggerRef.current || !popoverRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();

      let top = triggerRect.top - popoverRect.height - 8 + window.scrollY;
      let left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2 + window.scrollX;

      // 边界检测
      if (left < 8) left = 8;
      if (left + popoverRect.width > window.innerWidth - 8) {
        left = window.innerWidth - popoverRect.width - 8;
      }

      setPosition({ top, left });
    }, []);

    // 打开 Popover
    const open = useCallback(() => {
      closeOtherPopovers(popoverIdRef.current);
      setVisible(true);
    }, []);

    // 关闭 Popover
    const close = useCallback(() => {
      setVisible(false);
      if (activePopoverId === popoverIdRef.current) {
        activePopoverId = null;
      }
    }, []);

    // 注册/注销
    useEffect(() => {
      registerPopover(popoverIdRef.current, close);
      return () => {
        unregisterPopover(popoverIdRef.current);
      };
    }, [close]);

    // 更新位置
    useEffect(() => {
      if (visible) {
        // 延迟计算以确保 DOM 已渲染
        requestAnimationFrame(updatePosition);
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);
        return () => {
          window.removeEventListener('resize', updatePosition);
          window.removeEventListener('scroll', updatePosition, true);
        };
      }
    }, [visible, updatePosition]);

    // 点击外部关闭
    useEffect(() => {
      if (mode === 'click' && visible) {
        const handleClickOutside = (e: MouseEvent) => {
          if (
            triggerRef.current &&
            !triggerRef.current.contains(e.target as Node) &&
            popoverRef.current &&
            !popoverRef.current.contains(e.target as Node)
          ) {
            close();
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
    }, [mode, visible, close]);

    // 处理触发元素的事件
    const triggerProps: Record<string, unknown> = {
      ref: triggerRef,
    };

    if (mode === 'click') {
      triggerProps.onClick = (e: React.MouseEvent) => {
        if (isValidElement(children) && children.props.onClick) {
          children.props.onClick(e);
        }
        if (visible) {
          close();
        } else {
          open();
        }
      };
    } else {
      triggerProps.onMouseEnter = (e: React.MouseEvent) => {
        if (isValidElement(children) && children.props.onMouseEnter) {
          children.props.onMouseEnter(e);
        }
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
        open();
      };
      triggerProps.onMouseLeave = (e: React.MouseEvent) => {
        if (isValidElement(children) && children.props.onMouseLeave) {
          children.props.onMouseLeave(e);
        }
        hoverTimeoutRef.current = setTimeout(() => {
          close();
        }, 100);
      };
    }

    // Popover 的 hover 事件（hover 模式下保持打开）
    const handlePopoverMouseEnter = () => {
      if (mode === 'hover' && hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };

    const handlePopoverMouseLeave = () => {
      if (mode === 'hover') {
        hoverTimeoutRef.current = setTimeout(() => {
          close();
        }, 100);
      }
    };

    const classNames = ['apron-popover', className].filter(Boolean).join(' ');

    return (
      <>
        {isValidElement(children) && cloneElement(children, triggerProps)}
        {visible &&
          createPortal(
            <div
              ref={(node) => {
                popoverRef.current = node;
                if (typeof ref === 'function') {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
              }}
              className={classNames}
              style={{ top: position.top, left: position.left }}
              onMouseEnter={handlePopoverMouseEnter}
              onMouseLeave={handlePopoverMouseLeave}
              {...props}
            >
              <div className="apron-popover__arrow" />
              <div className="apron-popover__content">
                {title && <div className="apron-popover__title">{title}</div>}
                {content && <div className="apron-popover__body">{content}</div>}
              </div>
            </div>,
            document.body
          )}
      </>
    );
  }
);

Popover.displayName = 'Popover';

// ============================================
// PopoverConfirm
// ============================================
export type ButtonVariant = 'primary' | 'secondary' | 'default' | 'text' | 'link';

export interface PopoverConfirmProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'content'> {
  /** 标题 */
  title?: ReactNode;
  /** 内容 */
  content?: ReactNode;
  /** 取消按钮文字 */
  cancelText?: string;
  /** 确定按钮文字 */
  confirmText?: string;
  /** 取消按钮变种 */
  cancelVariant?: ButtonVariant;
  /** 确定按钮变种 */
  confirmVariant?: ButtonVariant;
  /** 取消回调 */
  onCancel?: () => void;
  /** 确定回调 */
  onConfirm?: () => void;
  /** 触发元素（必须是可交互的元素） */
  children: ReactElement;
}

export const PopoverConfirm = forwardRef<HTMLDivElement, PopoverConfirmProps>(
  (
    {
      title,
      content,
      cancelText = '取消',
      confirmText = '确定',
      cancelVariant = 'default',
      confirmVariant = 'primary',
      onCancel,
      onConfirm,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const popoverIdRef = useRef<string>(generatePopoverId());

    // 计算位置（Popover 在触发元素上方，箭头指向下方）
    const updatePosition = useCallback(() => {
      if (!triggerRef.current || !popoverRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();

      let top = triggerRect.top - popoverRect.height - 8 + window.scrollY;
      let left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2 + window.scrollX;

      // 边界检测
      if (left < 8) left = 8;
      if (left + popoverRect.width > window.innerWidth - 8) {
        left = window.innerWidth - popoverRect.width - 8;
      }

      setPosition({ top, left });
    }, []);

    // 打开
    const open = useCallback(() => {
      closeOtherPopovers(popoverIdRef.current);
      setVisible(true);
    }, []);

    // 关闭
    const close = useCallback(() => {
      setVisible(false);
      if (activePopoverId === popoverIdRef.current) {
        activePopoverId = null;
      }
    }, []);

    // 注册/注销
    useEffect(() => {
      registerPopover(popoverIdRef.current, close);
      return () => {
        unregisterPopover(popoverIdRef.current);
      };
    }, [close]);

    // 更新位置
    useEffect(() => {
      if (visible) {
        requestAnimationFrame(updatePosition);
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);
        return () => {
          window.removeEventListener('resize', updatePosition);
          window.removeEventListener('scroll', updatePosition, true);
        };
      }
    }, [visible, updatePosition]);

    // 点击外部关闭
    useEffect(() => {
      if (visible) {
        const handleClickOutside = (e: MouseEvent) => {
          if (
            triggerRef.current &&
            !triggerRef.current.contains(e.target as Node) &&
            popoverRef.current &&
            !popoverRef.current.contains(e.target as Node)
          ) {
            close();
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
    }, [visible, close]);

    // 处理取消
    const handleCancel = () => {
      close();
      onCancel?.();
    };

    // 处理确定
    const handleConfirm = () => {
      close();
      onConfirm?.();
    };

    // 触发元素事件
    const triggerProps: Record<string, unknown> = {
      ref: triggerRef,
      onClick: (e: React.MouseEvent) => {
        if (isValidElement(children) && children.props.onClick) {
          children.props.onClick(e);
        }
        if (visible) {
          close();
        } else {
          open();
        }
      },
    };

    const classNames = ['apron-popover', 'apron-popover--confirm', className]
      .filter(Boolean)
      .join(' ');

    // 按钮类名
    const getCancelButtonClass = () =>
      ['apron-popover__btn', `apron-popover__btn--${cancelVariant}`].join(' ');
    const getConfirmButtonClass = () =>
      ['apron-popover__btn', `apron-popover__btn--${confirmVariant}`].join(' ');

    return (
      <>
        {isValidElement(children) && cloneElement(children, triggerProps)}
        {visible &&
          createPortal(
            <div
              ref={(node) => {
                popoverRef.current = node;
                if (typeof ref === 'function') {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
              }}
              className={classNames}
              style={{ top: position.top, left: position.left }}
              {...props}
            >
              <div className="apron-popover__arrow" />
              <div className="apron-popover__content">
                {title && <div className="apron-popover__title">{title}</div>}
                {content && <div className="apron-popover__body">{content}</div>}
                <div className="apron-popover__footer">
                  <button className={getCancelButtonClass()} onClick={handleCancel}>
                    {cancelText}
                  </button>
                  <button className={getConfirmButtonClass()} onClick={handleConfirm}>
                    {confirmText}
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )}
      </>
    );
  }
);

PopoverConfirm.displayName = 'PopoverConfirm';

