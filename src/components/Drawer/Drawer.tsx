import React, { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';
import { Button } from '../Button';
import type { ButtonProps } from '../Button/Button';
import './Drawer.scss';

export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface DrawerProps {
  /** 是否显示抽屉 */
  open?: boolean;
  /** 标题 */
  title?: ReactNode;
  /** 抽屉方向 */
  placement?: DrawerPlacement;
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 点击蒙层是否可以关闭 */
  closeByOverlay?: boolean;
  /** 关闭时的回调 */
  onClose?: () => void;
  /** 点击确认按钮的回调 */
  onOk?: () => void;
  /** 抽屉宽度（左右方向时有效） */
  width?: number | string;
  /** 抽屉高度（上下方向时有效） */
  height?: number | string;
  /** 自定义 footer，设置为 null 则不显示 */
  footer?: ReactNode | null;
  /** 是否显示 footer */
  showFooter?: boolean;
  /** 确认按钮文字 */
  okText?: string;
  /** 取消按钮文字 */
  cancelText?: string;
  /** 确认按钮属性 */
  okButtonProps?: Omit<ButtonProps, 'children' | 'onClick'>;
  /** 取消按钮属性 */
  cancelButtonProps?: Omit<ButtonProps, 'children' | 'onClick'>;
  /** 是否显示取消按钮 */
  showCancel?: boolean;
  /** 是否为移动端模式 */
  isMobile?: boolean;
  /** 子元素（正文内容） */
  children?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 打开/关闭动画完成后的回调 */
  afterOpenChange?: (open: boolean) => void;
}

// 关闭图标
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 5L15 15M15 5L5 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const Drawer: React.FC<DrawerProps> = ({
  open = false,
  title,
  placement = 'right',
  closable = true,
  closeByOverlay = true,
  onClose,
  onOk,
  width = 378,
  height = 378,
  footer,
  showFooter = true,
  okText = '确定',
  cancelText = '取消',
  okButtonProps,
  cancelButtonProps,
  showCancel = true,
  isMobile = false,
  children,
  className = '',
  afterOpenChange,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  // 处理打开/关闭
  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setIsAnimating(true);
      // 禁用页面滚动
      document.body.style.overflow = 'hidden';
      // 等待 DOM 更新后触发动画
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(false);
        });
      });
    } else {
      setIsAnimating(true);
      // 等待动画完成后隐藏
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
        // 恢复页面滚动
        document.body.style.overflow = '';
        afterOpenChange?.(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open, afterOpenChange]);

  // 通知打开完成
  useEffect(() => {
    if (open && !isAnimating && isVisible) {
      afterOpenChange?.(true);
    }
  }, [open, isAnimating, isVisible, afterOpenChange]);

  // 处理 ESC 键关闭
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open && closable) {
        onClose?.();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, closable, onClose]);

  // 清理：组件卸载时恢复滚动
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // 点击蒙层
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && closeByOverlay && closable) {
        onClose?.();
      }
    },
    [closeByOverlay, closable, onClose]
  );

  // 点击关闭按钮
  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  // 点击确认按钮
  const handleOk = useCallback(() => {
    onOk?.();
  }, [onOk]);

  // 渲染默认 footer 按钮
  const renderFooterButtons = () => {
    // 右侧弹出时，确认在左边，取消在右边，左对齐
    // 其他方向：取消在左边，确认在右边，右对齐
    if (placement === 'right') {
      return (
        <>
          <Button
            variant="primary"
            {...okButtonProps}
            onClick={handleOk}
          >
            {okText}
          </Button>
          {showCancel && (
            <Button
              variant="default"
              {...cancelButtonProps}
              onClick={onClose}
            >
              {cancelText}
            </Button>
          )}
        </>
      );
    }

    return (
      <>
        {showCancel && (
          <Button
            variant="default"
            {...cancelButtonProps}
            onClick={onClose}
          >
            {cancelText}
          </Button>
        )}
        <Button
          variant="primary"
          {...okButtonProps}
          onClick={handleOk}
        >
          {okText}
        </Button>
      </>
    );
  };

  if (!isVisible) return null;

  // 计算抽屉样式
  const isHorizontal = placement === 'left' || placement === 'right';
  const drawerStyle: React.CSSProperties = isHorizontal
    ? { width: typeof width === 'number' ? `${width}px` : width }
    : { height: typeof height === 'number' ? `${height}px` : height };

  const rootClassNames = [
    'apron-drawer-root',
    open && !isAnimating && 'apron-drawer-root--open',
    isAnimating && (open ? 'apron-drawer-root--entering' : 'apron-drawer-root--leaving'),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // 是否使用移动端特殊布局（只有上下弹出时才使用）
  const useMobileLayout = isMobile && (placement === 'top' || placement === 'bottom');

  const drawerClassNames = [
    'apron-drawer',
    `apron-drawer--${placement}`,
    useMobileLayout && 'apron-drawer--mobile',
  ]
    .filter(Boolean)
    .join(' ');

  // 移动端上下弹出：header 和 footer 合并
  const renderMobileHeader = () => {
    const hasFooter = showFooter && footer !== null;
    
    return (
      <div className="apron-drawer__header apron-drawer__header--mobile">
        {/* 左侧：取消按钮或占位 */}
        <div className="apron-drawer__header-left">
          {hasFooter && showCancel && (
            footer !== undefined ? null : (
              <Button
                variant="default"
                size="sm"
                {...cancelButtonProps}
                onClick={onClose}
              >
                {cancelText}
              </Button>
            )
          )}
        </div>

        {/* 中间：标题 */}
        <div id="drawer-title" className="apron-drawer__title">
          {title}
        </div>

        {/* 右侧：确认按钮或关闭按钮 */}
        <div className="apron-drawer__header-right">
          {hasFooter ? (
            footer !== undefined ? null : (
              <Button
                variant="primary"
                size="sm"
                {...okButtonProps}
                onClick={handleOk}
              >
                {okText}
              </Button>
            )
          ) : (
            closable && (
              <button
                type="button"
                className="apron-drawer__close apron-drawer__close--inline"
                onClick={handleClose}
                aria-label="关闭"
              >
                <CloseIcon />
              </button>
            )
          )}
        </div>
      </div>
    );
  };

  return createPortal(
    <div className={rootClassNames}>
      <div className="apron-drawer__overlay" onClick={handleOverlayClick} />
      <div
        ref={drawerRef}
        className={drawerClassNames}
        style={drawerStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
      >
        {useMobileLayout ? (
          // 移动端上下弹出布局：header 和 footer 合并
          <>
            {renderMobileHeader()}
            <div className="apron-drawer__body">{children}</div>
            {/* 移动端自定义 footer */}
            {showFooter && footer !== null && footer !== undefined && (
              <div className="apron-drawer__footer apron-drawer__footer--mobile">
                {footer}
              </div>
            )}
          </>
        ) : (
          // PC端布局 或 移动端左右弹出
          <>
            {/* Close Button - 始终在右上角 */}
            {closable && (
              <button
                type="button"
                className="apron-drawer__close"
                onClick={handleClose}
                aria-label="关闭"
              >
                <CloseIcon />
              </button>
            )}

            {/* Header */}
            {title && (
              <div className="apron-drawer__header">
                <div id="drawer-title" className="apron-drawer__title">
                  {title}
                </div>
              </div>
            )}

            {/* Body */}
            <div className="apron-drawer__body">{children}</div>

            {/* Footer */}
            {showFooter && footer !== null && (
              <div className={`apron-drawer__footer apron-drawer__footer--${placement}`}>
                {footer !== undefined ? footer : renderFooterButtons()}
              </div>
            )}
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

Drawer.displayName = 'Drawer';

