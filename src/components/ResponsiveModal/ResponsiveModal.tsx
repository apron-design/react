import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Modal } from '../Modal';
import type { ModalProps } from '../Modal';
import { Drawer } from '../Drawer';
import type { DrawerPlacement } from '../Drawer';
import type { ButtonProps } from '../Button';

export interface ResponsiveModalProps {
  /** 是否显示 */
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
  /** Modal 宽度（PC端） */
  width?: number | string;
  /** Drawer 高度（移动端上下弹出时） */
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
  /** 子元素（正文内容） */
  children?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 响应式断点，小于此值使用 Drawer，大于等于此值使用 Modal */
  breakpoint?: number;
  /** 移动端 Drawer 弹出方向 */
  drawerPlacement?: DrawerPlacement;
  /** 打开/关闭动画完成后的回调 */
  afterOpenChange?: (open: boolean) => void;
}

export const ResponsiveModal: React.FC<ResponsiveModalProps> = ({
  open = false,
  title,
  closable = true,
  closeByOverlay = true,
  onClose,
  onOk,
  width = 520,
  height = 'auto',
  footer,
  showFooter = true,
  okText = '确定',
  cancelText = '取消',
  okButtonProps,
  cancelButtonProps,
  showCancel = true,
  children,
  className = '',
  breakpoint = 1024,
  drawerPlacement = 'bottom',
  afterOpenChange,
}) => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < breakpoint;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // 初始化检查
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  // 共享的 props
  const sharedProps = {
    open,
    title,
    closable,
    closeByOverlay,
    onClose,
    onOk,
    footer,
    showFooter,
    okText,
    cancelText,
    okButtonProps,
    cancelButtonProps,
    showCancel,
    children,
    className,
    afterOpenChange,
  };

  if (isMobile) {
    return (
      <Drawer
        {...sharedProps}
        placement={drawerPlacement}
        height={height}
        isMobile={true}
      />
    );
  }

  return (
    <Modal
      {...sharedProps}
      width={width}
    />
  );
};

ResponsiveModal.displayName = 'ResponsiveModal';

