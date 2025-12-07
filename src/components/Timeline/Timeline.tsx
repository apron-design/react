import React, { forwardRef, createContext, useContext } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import './Timeline.scss';

// ============================================
// Types
// ============================================
export type TimelineSide = 'left' | 'right' | 'both';
export type TimelineDotColor = 'default' | 'primary' | 'main' | 'success' | 'warning' | 'danger';

// ============================================
// Timeline Context
// ============================================
interface TimelineContextValue {
  side: TimelineSide;
}

const TimelineContext = createContext<TimelineContextValue>({ side: 'right' });

// ============================================
// Timeline
// ============================================
export interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  /** 内容显示位置 */
  side?: TimelineSide;
  /** 子元素 */
  children?: ReactNode;
}

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ side = 'right', children, className = '', ...props }, ref) => {
    const classNames = [
      'apron-timeline',
      `apron-timeline--${side}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <TimelineContext.Provider value={{ side }}>
        <div ref={ref} className={classNames} {...props}>
          {children}
        </div>
      </TimelineContext.Provider>
    );
  }
);

Timeline.displayName = 'Timeline';

// ============================================
// TimelineItem
// ============================================
export interface TimelineItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'content'> {
  /** 标题 */
  title?: ReactNode;
  /** 内容 */
  content?: ReactNode;
  /** 日期 */
  date?: ReactNode;
  /** 点颜色 */
  dotColor?: TimelineDotColor;
  /** 子元素（作为 content 使用） */
  children?: ReactNode;
}

export const TimelineItem = forwardRef<HTMLDivElement, TimelineItemProps>(
  (
    {
      title,
      content,
      date,
      dotColor = 'default',
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const { side } = useContext(TimelineContext);

    const classNames = [
      'apron-timeline-item',
      `apron-timeline-item--dot-${dotColor}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const renderContent = () => (
      <div className="apron-timeline-item__content">
        {title && <div className="apron-timeline-item__title">{title}</div>}
        {(content || children) && (
          <div className="apron-timeline-item__text">{content || children}</div>
        )}
        {date && <div className="apron-timeline-item__date">{date}</div>}
      </div>
    );

    // both 模式下，内容区域的位置由 CSS :nth-child 控制
    if (side === 'both') {
      return (
        <div ref={ref} className={classNames} {...props}>
          <div className="apron-timeline-item__left">{renderContent()}</div>
          <div className="apron-timeline-item__dot" />
          <div className="apron-timeline-item__right">{renderContent()}</div>
        </div>
      );
    }

    return (
      <div ref={ref} className={classNames} {...props}>
        <div className="apron-timeline-item__dot" />
        {renderContent()}
      </div>
    );
  }
);

TimelineItem.displayName = 'TimelineItem';

