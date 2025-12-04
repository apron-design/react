import React from 'react';
import './Steps.scss';

export type StepStatus = 'completed' | 'current' | 'pending';
export type StepLabelPlacement = 'top' | 'bottom' | 'both';

export interface StepItem {
  /** 步骤标题 */
  title: string;
  /** 步骤副标题（用于 both 模式） */
  subtitle?: string;
  /** 步骤状态 */
  status?: StepStatus;
  /** 单独设置宽度 */
  width?: number | string;
}

export interface StepsProps {
  /** 步骤数据 */
  items: StepItem[];
  /** 当前步骤索引（从 0 开始） */
  current?: number;
  /** 标签位置 */
  labelPlacement?: StepLabelPlacement;
  /** 自定义类名 */
  className?: string;
}

// 已完成图标（勾号）
const CompletedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="10" fill="currentColor" />
    <path
      d="M6 10L9 13L14 7"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 当前步骤图标（圆圈带点）
const CurrentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" />
    <circle cx="12" cy="12" r="4" fill="currentColor" />
    <circle cx="12" cy="6" r="1.5" fill="currentColor" />
    <circle cx="12" cy="18" r="1.5" fill="currentColor" />
    <circle cx="6" cy="12" r="1.5" fill="currentColor" />
    <circle cx="18" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

// 待处理图标（灰色圆点）
const PendingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" />
    <circle cx="12" cy="12" r="5" fill="currentColor" />
  </svg>
);

// 单个步骤组件
const Step: React.FC<{
  item: StepItem;
  status: StepStatus;
  isFirst: boolean;
  isLast: boolean;
  nextStatus?: StepStatus;
  labelPlacement: StepLabelPlacement;
}> = ({ item, status, isFirst, isLast, nextStatus, labelPlacement }) => {
  const classNames = [
    'apron-step',
    `apron-step--${status}`,
  ]
    .filter(Boolean)
    .join(' ');

  const stepStyle: React.CSSProperties = item.width
    ? { width: typeof item.width === 'number' ? `${item.width}px` : item.width, flex: 'none' }
    : {};

  // 获取连接线的类名
  const getLineClass = () => {
    if (status === 'completed' && nextStatus === 'completed') {
      return 'apron-step__line--completed';
    }
    if (status === 'completed' && nextStatus === 'current') {
      return 'apron-step__line--completed-to-current';
    }
    if (status === 'current' && nextStatus === 'pending') {
      return 'apron-step__line--current-to-pending';
    }
    return 'apron-step__line--pending';
  };

  const renderIcon = () => {
    switch (status) {
      case 'completed':
        return <CompletedIcon />;
      case 'current':
        return <CurrentIcon />;
      case 'pending':
      default:
        return <PendingIcon />;
    }
  };

  const renderLabel = (position: 'top' | 'bottom') => {
    if (labelPlacement === 'both') {
      if (position === 'top') {
        return item.title;
      }
      return item.subtitle || '';
    }
    if (labelPlacement === position) {
      return item.title;
    }
    return null;
  };

  return (
    <div className={classNames} style={stepStyle}>
      {/* 顶部标签 */}
      {(labelPlacement === 'top' || labelPlacement === 'both') && (
        <div className="apron-step__label apron-step__label--top">
          {renderLabel('top')}
        </div>
      )}

      {/* 图标和连接线 */}
      <div className="apron-step__content">
        <div className="apron-step__icon">
          {renderIcon()}
        </div>
        {!isLast && (
          <div className={`apron-step__line ${getLineClass()}`} />
        )}
      </div>

      {/* 底部标签 */}
      {(labelPlacement === 'bottom' || labelPlacement === 'both') && (
        <div className="apron-step__label apron-step__label--bottom">
          {renderLabel('bottom')}
        </div>
      )}
    </div>
  );
};

export const Steps: React.FC<StepsProps> = ({
  items,
  current = 0,
  labelPlacement = 'bottom',
  className = '',
}) => {
  // 根据 current 计算每个步骤的状态
  const getStatus = (index: number): StepStatus => {
    if (items[index].status) {
      return items[index].status!;
    }
    if (index < current) return 'completed';
    if (index === current) return 'current';
    return 'pending';
  };

  const classNames = [
    'apron-steps',
    `apron-steps--label-${labelPlacement}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {items.map((item, index) => (
        <Step
          key={index}
          item={item}
          status={getStatus(index)}
          isFirst={index === 0}
          isLast={index === items.length - 1}
          nextStatus={index < items.length - 1 ? getStatus(index + 1) : undefined}
          labelPlacement={labelPlacement}
        />
      ))}
    </div>
  );
};

Steps.displayName = 'Steps';

