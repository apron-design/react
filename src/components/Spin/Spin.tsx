import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { ReactNode } from 'react';
import './Spin.scss';

export type SpinPlacement =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface SpinProps {
  /** 是否显示加载中 */
  loading?: boolean;
  /** 自定义图标 */
  icon?: ReactNode;
  /** 提示文字 */
  text?: string;
  /** 位置 */
  placement?: SpinPlacement;
  /** 子元素 */
  children?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 是否全屏 */
  fullscreen?: boolean;
}

// 默认加载动画图标
const DefaultSpinIcon = () => (
  <svg
    className="apron-spin__icon-svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="16"
      cy="16"
      r="14"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.25"
    />
    <path
      d="M16 2C8.268 2 2 8.268 2 16"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

// Spin 内容组件
const SpinContent: React.FC<{
  icon?: ReactNode;
  text?: string;
  placement?: SpinPlacement;
}> = ({ icon, text = '加载中', placement = 'center' }) => {
  const isCenter = placement === 'center';

  return (
    <div
      className={`apron-spin__content apron-spin__content--${placement} ${
        isCenter ? 'apron-spin__content--vertical' : 'apron-spin__content--horizontal'
      }`}
    >
      <span className="apron-spin__icon">
        {icon || <DefaultSpinIcon />}
      </span>
      {text && <span className="apron-spin__text">{text}</span>}
    </div>
  );
};

// Spin Overlay 带动画
const SpinOverlay: React.FC<{
  visible: boolean;
  icon?: ReactNode;
  text?: string;
  placement?: SpinPlacement;
}> = ({ visible, icon, text, placement }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      setIsAnimating(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(false);
        });
      });
    } else {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!isVisible) return null;

  const overlayClassNames = [
    'apron-spin__overlay',
    visible && !isAnimating && 'apron-spin__overlay--visible',
    isAnimating && (visible ? 'apron-spin__overlay--entering' : 'apron-spin__overlay--leaving'),
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={overlayClassNames}>
      <SpinContent icon={icon} text={text} placement={placement} />
    </div>
  );
};

// Spin 组件
export const Spin: React.FC<SpinProps> & {
  show: (options?: Omit<SpinProps, 'loading' | 'children'>) => void;
  close: () => void;
} = ({
  loading = true,
  icon,
  text,
  placement = 'center',
  children,
  className = '',
  fullscreen = false,
}) => {
  // 如果有子元素，则为包裹模式
  if (children) {
    return (
      <div className={`apron-spin-wrapper ${className}`}>
        {children}
        <SpinOverlay
          visible={loading}
          icon={icon}
          text={text}
          placement={placement}
        />
      </div>
    );
  }

  // 无子元素时，仅显示 loading 内容
  if (!loading) return null;

  if (fullscreen) {
    return (
      <div className={`apron-spin apron-spin--fullscreen ${className}`}>
        <div className="apron-spin__overlay apron-spin__overlay--visible">
          <SpinContent icon={icon} text={text} placement={placement} />
        </div>
      </div>
    );
  }

  return (
    <div className={`apron-spin apron-spin--standalone ${className}`}>
      <SpinContent icon={icon} text={text} placement={placement} />
    </div>
  );
};

// 全局实例管理
let spinContainer: HTMLDivElement | null = null;
let spinRoot: ReturnType<typeof createRoot> | null = null;
let currentOptions: Omit<SpinProps, 'loading' | 'children'> = {};

// 全屏 Spin 组件
const FullscreenSpin: React.FC<{
  visible: boolean;
  options: Omit<SpinProps, 'loading' | 'children'>;
}> = ({ visible, options }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(false);
        });
      });
    } else {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
        document.body.style.overflow = '';
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!isVisible) return null;

  const classNames = [
    'apron-spin',
    'apron-spin--fullscreen',
    visible && !isAnimating && 'apron-spin--visible',
    isAnimating && (visible ? 'apron-spin--entering' : 'apron-spin--leaving'),
    options.className,
  ]
    .filter(Boolean)
    .join(' ');

  const overlayClassNames = [
    'apron-spin__overlay',
    visible && !isAnimating && 'apron-spin__overlay--visible',
    isAnimating && (visible ? 'apron-spin__overlay--entering' : 'apron-spin__overlay--leaving'),
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      <div className={overlayClassNames}>
        <SpinContent
          icon={options.icon}
          text={options.text}
          placement={options.placement}
        />
      </div>
    </div>
  );
};

// 渲染全局 Spin
let setGlobalVisible: React.Dispatch<React.SetStateAction<boolean>> | null = null;
let setGlobalOptions: React.Dispatch<React.SetStateAction<Omit<SpinProps, 'loading' | 'children'>>> | null = null;

const GlobalSpinManager: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<Omit<SpinProps, 'loading' | 'children'>>({});

  useEffect(() => {
    setGlobalVisible = setVisible;
    setGlobalOptions = setOptions;
    return () => {
      setGlobalVisible = null;
      setGlobalOptions = null;
    };
  }, []);

  return <FullscreenSpin visible={visible} options={options} />;
};

// 确保全局容器存在
const ensureContainer = () => {
  if (!spinContainer) {
    spinContainer = document.createElement('div');
    spinContainer.className = 'apron-spin-root';
    document.body.appendChild(spinContainer);
    spinRoot = createRoot(spinContainer);
    spinRoot.render(<GlobalSpinManager />);
  }
};

// 显示全屏 Spin
Spin.show = (options: Omit<SpinProps, 'loading' | 'children'> = {}) => {
  ensureContainer();
  currentOptions = options;

  // 等待 React 渲染完成
  setTimeout(() => {
    if (setGlobalOptions) {
      setGlobalOptions(options);
    }
    if (setGlobalVisible) {
      setGlobalVisible(true);
    }
  }, 0);
};

// 关闭全屏 Spin
Spin.close = () => {
  if (setGlobalVisible) {
    setGlobalVisible(false);
  }
};

Spin.displayName = 'Spin';

