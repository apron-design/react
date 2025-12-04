import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './Alert.scss';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  /** 提示类型 */
  type?: AlertType;
  /** 提示内容 */
  message: React.ReactNode;
  /** 自定义类名 */
  className?: string;
}

// 图标组件
const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#4C9EEA"/>
    <text x="12" y="16" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">i</text>
  </svg>
);

const SuccessIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#22c55e"/>
    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#f59e0b"/>
    <path d="M12 8V13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="1" fill="white"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#ef4444"/>
    <path d="M9 9L15 15M15 9L9 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const iconMap = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

// Alert 组件（静态展示）
export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  message,
  className = '',
}) => {
  const Icon = iconMap[type];

  const classNames = [
    'apron-alert',
    `apron-alert--${type}`,
    'apron-alert--static',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      <span className="apron-alert__icon">
        <Icon />
      </span>
      <span className="apron-alert__message">{message}</span>
    </div>
  );
};

Alert.displayName = 'Alert';

// ============================================
// 全局 Alert 管理器
// ============================================

interface AlertItem {
  id: string;
  type: AlertType;
  message: React.ReactNode;
  visible: boolean;
  leaving: boolean;
}

// 全局状态管理
let alertContainer: HTMLDivElement | null = null;
let alertRoot: ReturnType<typeof createRoot> | null = null;
let setGlobalAlerts: React.Dispatch<React.SetStateAction<AlertItem[]>> | null = null;
const alertTimers: Map<string, ReturnType<typeof setTimeout>> = new Map();

// 单个 Alert 项组件（用于全局显示）
const AlertItemComponent: React.FC<{
  alert: AlertItem;
  onRemove: (id: string) => void;
}> = ({ alert, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    if (alert.visible && !alert.leaving) {
      setIsVisible(true);
      setIsLeaving(false);
      // 触发进入动画
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsEntering(true);
        });
      });
    } else if (alert.leaving) {
      setIsLeaving(true);
      setIsEntering(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onRemove(alert.id);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [alert.visible, alert.leaving, alert.id, onRemove]);

  if (!isVisible) return null;

  const Icon = iconMap[alert.type];
  const classNames = [
    'apron-alert',
    `apron-alert--${alert.type}`,
    isEntering && !isLeaving && 'apron-alert--visible',
    isLeaving && 'apron-alert--leaving',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      <span className="apron-alert__icon">
        <Icon />
      </span>
      <span className="apron-alert__message">{alert.message}</span>
    </div>
  );
};

// 全局 Alert 容器组件
const GlobalAlertManager: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  useEffect(() => {
    setGlobalAlerts = setAlerts;
    return () => {
      setGlobalAlerts = null;
    };
  }, []);

  const handleRemove = (id: string) => {
    if (setGlobalAlerts) {
      setGlobalAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }
    // 清除定时器
    const timer = alertTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      alertTimers.delete(id);
    }
  };

  if (alerts.length === 0) return null;

  return (
    <div className="apron-alert-container">
      {alerts.map((alert) => (
        <AlertItemComponent key={alert.id} alert={alert} onRemove={handleRemove} />
      ))}
    </div>
  );
};

// SSR 检查
const canUseDOM = typeof window !== 'undefined' && typeof document !== 'undefined';

// 确保容器存在
const ensureContainer = () => {
  if (!canUseDOM) return;

  if (!alertContainer) {
    alertContainer = document.createElement('div');
    alertContainer.className = 'apron-alert-root';
    document.body.appendChild(alertContainer);
    alertRoot = createRoot(alertContainer);
    alertRoot.render(<GlobalAlertManager />);
  }
};

// 生成唯一 ID
const generateId = () => {
  return `apron-alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// 显示 Alert
const showAlert = (
  type: AlertType,
  message: React.ReactNode,
  duration: number = 5000
): string => {
  ensureContainer();

  const id = generateId();
  const newAlert: AlertItem = {
    id,
    type,
    message,
    visible: true,
    leaving: false,
  };

  if (setGlobalAlerts) {
    setGlobalAlerts((prev) => [...prev, newAlert]);
  }

  // 自动关闭
  if (duration > 0) {
    const timer = setTimeout(() => {
      removeAlert(id);
    }, duration);
    alertTimers.set(id, timer);
  }

  return id;
};

// 移除 Alert
const removeAlert = (id: string) => {
  if (setGlobalAlerts) {
    setGlobalAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, leaving: true } : alert
      )
    );
  }
};

// 清除所有 Alerts
const clearAllAlerts = () => {
  if (setGlobalAlerts) {
    setGlobalAlerts((prev) =>
      prev.map((alert) => ({ ...alert, leaving: true }))
    );
  }
  // 清除所有定时器
  alertTimers.forEach((timer) => clearTimeout(timer));
  alertTimers.clear();
};

// 导出的 alert 对象
export const alert = {
  info: (message: React.ReactNode, duration?: number) =>
    showAlert('info', message, duration),
  success: (message: React.ReactNode, duration?: number) =>
    showAlert('success', message, duration),
  warning: (message: React.ReactNode, duration?: number) =>
    showAlert('warning', message, duration),
  error: (message: React.ReactNode, duration?: number) =>
    showAlert('error', message, duration),
  remove: removeAlert,
  clear: clearAllAlerts,
};
