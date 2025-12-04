import React from 'react';
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
