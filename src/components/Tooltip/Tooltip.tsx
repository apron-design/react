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
import './Tooltip.scss';

// ============================================
// Tooltip
// ============================================
export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /** 提示内容 */
  content?: ReactNode;
  /** 触发元素 */
  children: ReactElement;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, children, className = '', ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout>();

    // 计算位置（Tooltip 在触发元素上方，箭头指向下方）
    const updatePosition = useCallback(() => {
      if (!triggerRef.current || !tooltipRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      const top = triggerRect.top - tooltipRect.height - 8 + window.scrollY;
      let left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2 + window.scrollX;

      // 边界检测
      if (left < 8) left = 8;
      if (left + tooltipRect.width > window.innerWidth - 8) {
        left = window.innerWidth - tooltipRect.width - 8;
      }

      setPosition({ top, left });
    }, []);

    // 打开 Tooltip
    const open = useCallback(() => {
      setVisible(true);
    }, []);

    // 关闭 Tooltip
    const close = useCallback(() => {
      setVisible(false);
    }, []);

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

    // 清理定时器
    useEffect(() => {
      return () => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
      };
    }, []);

    // 处理触发元素的事件（仅 hover）
    const triggerProps: Record<string, unknown> = {
      ref: triggerRef,
      onMouseEnter: (e: React.MouseEvent) => {
        if (hasProps(children) && children.props.onMouseEnter) {
          children.props.onMouseEnter(e);
        }
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
        open();
      },
      onMouseLeave: (e: React.MouseEvent) => {
        if (hasProps(children) && children.props.onMouseLeave) {
          children.props.onMouseLeave(e);
        }
        hoverTimeoutRef.current = setTimeout(() => {
          close();
        }, 100);
      },
    };

    // Tooltip 的 hover 事件（保持打开）
    const handleTooltipMouseEnter = () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };

    const handleTooltipMouseLeave = () => {
      hoverTimeoutRef.current = setTimeout(() => {
        close();
      }, 100);
    };

    const classNames = ['apron-tooltip', className].filter(Boolean).join(' ');

    return (
      <>
        {isValidElement(children) && cloneElement(children, triggerProps)}
        {visible &&
          createPortal(
            <div
              ref={(node) => {
                (tooltipRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                if (typeof ref === 'function') {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
              }}
              className={classNames}
              style={{ top: position.top, left: position.left }}
              onMouseEnter={handleTooltipMouseEnter}
              onMouseLeave={handleTooltipMouseLeave}
              role="tooltip"
              {...props}
            >
              <div className="apron-tooltip__arrow" />
              <div className="apron-tooltip__content">{content}</div>
            </div>,
            document.body
          )}
      </>
    );
  }
);

Tooltip.displayName = 'Tooltip';

// 添加类型守卫函数
const hasProps = (element: ReactElement): element is ReactElement & { props: Record<string, unknown> } => {
  return element && typeof element === 'object' && 'props' in element && typeof element.props === 'object';
};
