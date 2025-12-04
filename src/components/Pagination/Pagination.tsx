import React, { useMemo, useCallback } from 'react';
import './Pagination.scss';

export type PaginationSize = 'large' | 'default' | 'small';

export interface PaginationProps {
  /** 数据总数 */
  count: number;
  /** 每页条数 */
  pageSize?: number;
  /** 当前页码 */
  current?: number;
  /** 默认当前页码 */
  defaultCurrent?: number;
  /** 页码改变时的回调 */
  onChange?: (page: number) => void;
  /** 尺寸 */
  size?: PaginationSize;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
}

// 左箭头图标
const LeftArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.5 9L4.5 6L7.5 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 右箭头图标
const RightArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.5 3L7.5 6L4.5 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 省略号图标
const EllipsisIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="2" cy="6" r="1" fill="currentColor" />
    <circle cx="6" cy="6" r="1" fill="currentColor" />
    <circle cx="10" cy="6" r="1" fill="currentColor" />
  </svg>
);

export const Pagination: React.FC<PaginationProps> = ({
  count,
  pageSize = 10,
  current,
  defaultCurrent = 1,
  onChange,
  size = 'default',
  disabled = false,
  className = '',
}) => {
  // 受控/非受控模式
  const [internalCurrent, setInternalCurrent] = React.useState(defaultCurrent);
  const currentPage = current ?? internalCurrent;

  // 计算总页数
  const totalPages = useMemo(() => Math.ceil(count / pageSize), [count, pageSize]);

  // 处理页码变化
  const handlePageChange = useCallback(
    (page: number) => {
      if (disabled) return;
      if (page < 1 || page > totalPages) return;
      if (page === currentPage) return;

      if (current === undefined) {
        setInternalCurrent(page);
      }
      onChange?.(page);
    },
    [disabled, totalPages, currentPage, current, onChange]
  );

  // 生成页码列表
  const pageNumbers = useMemo(() => {
    const pages: (number | 'ellipsis-left' | 'ellipsis-right')[] = [];

    if (totalPages <= 7) {
      // 页码数不超过7，全部显示
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 页码数超过7，显示 前3 ... 后3 或根据当前位置调整
      const showLeftEllipsis = currentPage > 4;
      const showRightEllipsis = currentPage < totalPages - 3;

      if (!showLeftEllipsis && showRightEllipsis) {
        // 当前页靠近开头：1 2 3 4 5 ... 最后
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('ellipsis-right');
        pages.push(totalPages);
      } else if (showLeftEllipsis && !showRightEllipsis) {
        // 当前页靠近结尾：1 ... 倒数5 倒数4 倒数3 倒数2 倒数1
        pages.push(1);
        pages.push('ellipsis-left');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else if (showLeftEllipsis && showRightEllipsis) {
        // 当前页在中间：1 ... 前一页 当前页 后一页 ... 最后
        pages.push(1);
        pages.push('ellipsis-left');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis-right');
        pages.push(totalPages);
      }
    }

    return pages;
  }, [totalPages, currentPage]);

  if (totalPages <= 0) return null;

  const classNames = [
    'apron-pagination',
    `apron-pagination--${size}`,
    disabled && 'apron-pagination--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={classNames} aria-label="分页导航">
      {/* 上一页按钮 */}
      <button
        type="button"
        className={`apron-pagination__item apron-pagination__arrow ${
          currentPage === 1 ? 'apron-pagination__item--disabled' : ''
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={disabled || currentPage === 1}
        aria-label="上一页"
      >
        <LeftArrowIcon />
      </button>

      {/* 页码 */}
      {pageNumbers.map((page, index) => {
        if (page === 'ellipsis-left' || page === 'ellipsis-right') {
          return (
            <span
              key={`${page}-${index}`}
              className="apron-pagination__item apron-pagination__ellipsis"
            >
              <EllipsisIcon />
            </span>
          );
        }

        return (
          <button
            key={page}
            type="button"
            className={`apron-pagination__item ${
              page === currentPage ? 'apron-pagination__item--active' : ''
            }`}
            onClick={() => handlePageChange(page)}
            disabled={disabled}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        );
      })}

      {/* 下一页按钮 */}
      <button
        type="button"
        className={`apron-pagination__item apron-pagination__arrow ${
          currentPage === totalPages ? 'apron-pagination__item--disabled' : ''
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={disabled || currentPage === totalPages}
        aria-label="下一页"
      >
        <RightArrowIcon />
      </button>
    </nav>
  );
};

Pagination.displayName = 'Pagination';

