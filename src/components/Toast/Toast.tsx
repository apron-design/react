import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { ReactNode } from 'react';
import './Toast.scss';

export type ToastType = 'success' | 'fail' | 'danger' | 'loading';

export interface ToastOptions {
  /** 提示文字 */
  text?: string;
  /** 自定义图标 */
  icon?: ReactNode;
  /** 显示时长（毫秒），设置为 0 则不自动关闭 */
  duration?: number;
  /** Toast 类型 */
  type?: ToastType;
}

// 成功图标
const SuccessIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" fill="#22c55e" />
    <path
      d="M20 32L28 40L44 24"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 失败图标
const FailIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" fill="#dc2626" />
    <path
      d="M22 22L42 42M42 22L22 42"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

// 危险图标
const DangerIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M32 6L60 56H4L32 6Z"
      fill="#eab308"
      stroke="#eab308"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M32 26V38"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <circle cx="32" cy="46" r="2.5" fill="white" />
  </svg>
);

// 加载图标
const LoadingIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="apron-toast__loading-icon"
  >
    <path
      d="M32 8C18.745 8 8 18.745 8 32"
      stroke="#1d4ed8"
      strokeWidth="6"
      strokeLinecap="round"
    />
  </svg>
);

const iconMap: Record<ToastType, React.FC> = {
  success: SuccessIcon,
  fail: FailIcon,
  danger: DangerIcon,
  loading: LoadingIcon,
};

// Toast 内容组件
const ToastContent: React.FC<{
  type?: ToastType;
  text?: string;
  icon?: ReactNode;
}> = ({ type = 'success', text, icon }) => {
  const Icon = iconMap[type];

  return (
    <div className="apron-toast__content">
      <div className="apron-toast__icon">
        {icon || <Icon />}
      </div>
      {text && <div className="apron-toast__text">{text}</div>}
    </div>
  );
};

// Toast 容器组件
const ToastContainer: React.FC<{
  visible: boolean;
  options: ToastOptions;
}> = ({ visible, options }) => {
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

  const classNames = [
    'apron-toast',
    visible && !isAnimating && 'apron-toast--visible',
    isAnimating && (visible ? 'apron-toast--entering' : 'apron-toast--leaving'),
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="apron-toast__overlay">
      <div className={classNames}>
        <ToastContent
          type={options.type}
          text={options.text}
          icon={options.icon}
        />
      </div>
    </div>
  );
};

// 全局状态管理
let toastContainer: HTMLDivElement | null = null;
let toastRoot: ReturnType<typeof createRoot> | null = null;
let setGlobalVisible: React.Dispatch<React.SetStateAction<boolean>> | null = null;
let setGlobalOptions: React.Dispatch<React.SetStateAction<ToastOptions>> | null = null;
let autoCloseTimer: ReturnType<typeof setTimeout> | null = null;

const GlobalToastManager: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<ToastOptions>({});

  useEffect(() => {
    setGlobalVisible = setVisible;
    setGlobalOptions = setOptions;
    return () => {
      setGlobalVisible = null;
      setGlobalOptions = null;
    };
  }, []);

  return <ToastContainer visible={visible} options={options} />;
};

// SSR 检查
const canUseDOM = typeof window !== 'undefined' && typeof document !== 'undefined';

// 确保容器存在
const ensureContainer = () => {
  if (!canUseDOM) return;
  
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'apron-toast-root';
    document.body.appendChild(toastContainer);
    toastRoot = createRoot(toastContainer);
    toastRoot.render(<GlobalToastManager />);
  }
};

// 显示 Toast
const showToast = (options: ToastOptions) => {
  ensureContainer();

  // 清除之前的自动关闭定时器
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer);
    autoCloseTimer = null;
  }

  setTimeout(() => {
    if (setGlobalOptions) {
      setGlobalOptions(options);
    }
    if (setGlobalVisible) {
      setGlobalVisible(true);
    }

    // 自动关闭（loading 类型默认不自动关闭）
    const duration = options.duration ?? (options.type === 'loading' ? 0 : 2000);
    if (duration > 0) {
      autoCloseTimer = setTimeout(() => {
        if (setGlobalVisible) {
          setGlobalVisible(false);
        }
      }, duration);
    }
  }, 0);
};

// 关闭 Toast
const closeToast = () => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer);
    autoCloseTimer = null;
  }
  if (setGlobalVisible) {
    setGlobalVisible(false);
  }
};

// 解析参数
const parseArgs = (
  textOrOptions?: string | ToastOptions,
  type?: ToastType
): ToastOptions => {
  if (typeof textOrOptions === 'string') {
    return { text: textOrOptions, type };
  }
  return { ...textOrOptions, type: textOrOptions?.type ?? type };
};

// 导出的 Toast 对象
export const Toast = {
  show: (options: ToastOptions) => showToast(options),
  close: closeToast,
  success: (textOrOptions?: string | Omit<ToastOptions, 'type'>) =>
    showToast(parseArgs(textOrOptions as string | ToastOptions, 'success')),
  fail: (textOrOptions?: string | Omit<ToastOptions, 'type'>) =>
    showToast(parseArgs(textOrOptions as string | ToastOptions, 'fail')),
  danger: (textOrOptions?: string | Omit<ToastOptions, 'type'>) =>
    showToast(parseArgs(textOrOptions as string | ToastOptions, 'danger')),
  loading: (textOrOptions?: string | Omit<ToastOptions, 'type'>) =>
    showToast(parseArgs(textOrOptions as string | ToastOptions, 'loading')),
};

