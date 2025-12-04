import React, { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';
import { Button } from '../Button';
import type { ButtonProps } from '../Button';
import './Modal.scss';

export interface ModalProps {
  /** 是否显示对话框 */
  open?: boolean;
  /** 标题 */
  title?: ReactNode;
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 点击蒙层是否可以关闭 */
  closeByOverlay?: boolean;
  /** 关闭时的回调 */
  onClose?: () => void;
  /** 点击确认按钮的回调 */
  onOk?: () => void;
  /** 对话框宽度 */
  width?: number | string;
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
  /** 子元素（正文内容） */
  children?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 是否居中显示 */
  centered?: boolean;
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

export const Modal: React.FC<ModalProps> = ({
  open = false,
  title,
  closable = true,
  closeByOverlay = true,
  onClose,
  onOk,
  width = 520,
  footer,
  showFooter = true,
  okText = '确定',
  cancelText = '取消',
  okButtonProps,
  cancelButtonProps,
  showCancel = true,
  children,
  className = '',
  centered = true,
  afterOpenChange,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
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

  // 渲染默认 footer
  const renderDefaultFooter = () => (
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

  if (!isVisible) return null;

  const modalStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
  };

  const classNames = [
    'apron-modal-root',
    open && !isAnimating && 'apron-modal-root--open',
    isAnimating && (open ? 'apron-modal-root--entering' : 'apron-modal-root--leaving'),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const modalClassNames = [
    'apron-modal',
    centered && 'apron-modal--centered',
  ]
    .filter(Boolean)
    .join(' ');

  return createPortal(
    <div className={classNames}>
      <div className="apron-modal__overlay" onClick={handleOverlayClick} />
      <div className="apron-modal__wrapper" onClick={handleOverlayClick}>
        <div
          ref={modalRef}
          className={modalClassNames}
          style={modalStyle}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button - 始终在右上角 */}
          {closable && (
            <button
              type="button"
              className="apron-modal__close"
              onClick={handleClose}
              aria-label="关闭"
            >
              <CloseIcon />
            </button>
          )}

          {/* Header */}
          {title && (
            <div className="apron-modal__header">
              <div id="modal-title" className="apron-modal__title">
                {title}
              </div>
            </div>
          )}

          {/* Body */}
          <div className="apron-modal__body">{children}</div>

          {/* Footer */}
          {showFooter && footer !== null && (
            <div className="apron-modal__footer">
              {footer !== undefined ? footer : renderDefaultFooter()}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

Modal.displayName = 'Modal';

