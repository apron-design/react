import React, {
  forwardRef,
  useState,
  useCallback,
  useRef,
  useEffect,
  useId,
  useMemo,
} from 'react';
import './DatePicker.scss';

export interface DatePickerValue {
  year?: number;
  month?: number;
  day?: number;
}

export interface DatePickerProps {
  /** 当前选中的值 */
  value?: DatePickerValue;
  /** 默认选中的值（非受控） */
  defaultValue?: DatePickerValue;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 是否使用 inflow 模式（撑开容器） */
  inflow?: boolean;
  /** 选中值改变时的回调 */
  onChange?: (value: DatePickerValue) => void;
  /** 自定义类名 */
  className?: string;
  /** 下拉框展开/收起回调 */
  onOpenChange?: (open: boolean) => void;
  /** 年份范围起始 */
  yearStart?: number;
  /** 年份范围结束 */
  yearEnd?: number;
  /** 年标签 */
  yearLabel?: string;
  /** 月标签 */
  monthLabel?: string;
  /** 日标签 */
  dayLabel?: string;
  /** 月份标签列表 */
  monthLabels?: string[];
}

type TabType = 'year' | 'month' | 'day';

// 下拉箭头图标
const ArrowIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`apron-datepicker__arrow ${isOpen ? 'apron-datepicker__arrow--open' : ''}`}
  >
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Loading 图标
const LoadingIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="apron-datepicker__loading-icon"
  >
    <path d="M10 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 15V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    <path d="M4.34 4.34L6.46 6.46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
    <path d="M13.54 13.54L15.66 15.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <path d="M2 10H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <path d="M15 10H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <path d="M4.34 15.66L6.46 13.54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    <path d="M13.54 6.46L15.66 4.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

// 获取某月的天数
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      defaultValue,
      disabled = false,
      loading = false,
      inflow = false,
      onChange,
      className = '',
      onOpenChange,
      yearStart = 2020,
      yearEnd = 2030,
      yearLabel = '年',
      monthLabel = '月',
      dayLabel = '日',
      monthLabels = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    },
    ref
  ) => {
    const pickerId = useId();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('year');
    const [internalValue, setInternalValue] = useState<DatePickerValue>(
      defaultValue || {}
    );

    // 判断是否为受控模式
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    // 获取显示的值
    const displayValue = useMemo(() => {
      const year = currentValue.year ? String(currentValue.year) : '----';
      const month = currentValue.month ? String(currentValue.month).padStart(2, '0') : '--';
      const day = currentValue.day ? String(currentValue.day).padStart(2, '0') : '--';
      return `${year} / ${month} / ${day}`;
    }, [currentValue]);

    const hasValue = currentValue.year !== undefined || currentValue.month !== undefined || currentValue.day !== undefined;
    const isActive = isOpen || hasValue;

    // 生成年份列表
    const years = useMemo(() => {
      const list: number[] = [];
      for (let i = yearStart; i <= yearEnd; i++) {
        list.push(i);
      }
      return list;
    }, [yearStart, yearEnd]);

    // 生成月份列表
    const months = useMemo(() => {
      return Array.from({ length: 12 }, (_, i) => i + 1);
    }, []);

    // 生成日期列表
    const days = useMemo(() => {
      const year = currentValue.year || new Date().getFullYear();
      const month = currentValue.month || 1;
      const daysInMonth = getDaysInMonth(year, month);
      return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    }, [currentValue.year, currentValue.month]);

    // 合并 ref
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(containerRef.current);
        } else {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current =
            containerRef.current;
        }
      }
    }, [ref]);

    // 点击外部关闭
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          onOpenChange?.(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen, onOpenChange]);

    // 切换下拉框
    const toggleDropdown = useCallback(() => {
      if (disabled || loading) return;
      const newOpen = !isOpen;
      setIsOpen(newOpen);
      onOpenChange?.(newOpen);
    }, [disabled, loading, isOpen, onOpenChange]);

    // 选择年份
    const handleSelectYear = useCallback(
      (year: number) => {
        const newValue = { ...currentValue, year };
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
        setActiveTab('month');
      },
      [currentValue, isControlled, onChange]
    );

    // 选择月份
    const handleSelectMonth = useCallback(
      (month: number) => {
        const newValue = { ...currentValue, month };
        // 如果当前选中的日期超出了新月份的天数，则清除日期
        if (newValue.day && newValue.year) {
          const daysInMonth = getDaysInMonth(newValue.year, month);
          if (newValue.day > daysInMonth) {
            newValue.day = undefined;
          }
        }
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
        setActiveTab('day');
      },
      [currentValue, isControlled, onChange]
    );

    // 选择日期
    const handleSelectDay = useCallback(
      (day: number) => {
        const newValue = { ...currentValue, day };
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
        setIsOpen(false);
        onOpenChange?.(false);
      },
      [currentValue, isControlled, onChange, onOpenChange]
    );

    // 切换 tab
    const handleTabChange = useCallback((tab: TabType) => {
      setActiveTab(tab);
    }, []);

    // 键盘导航
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled || loading) return;

        switch (e.key) {
          case 'Enter':
          case ' ':
            e.preventDefault();
            toggleDropdown();
            break;
          case 'Escape':
            setIsOpen(false);
            onOpenChange?.(false);
            break;
        }
      },
      [disabled, loading, toggleDropdown, onOpenChange]
    );

    const classNames = [
      'apron-datepicker',
      isActive && 'apron-datepicker--active',
      isOpen && 'apron-datepicker--open',
      disabled && 'apron-datepicker--disabled',
      loading && 'apron-datepicker--loading',
      inflow && 'apron-datepicker--inflow',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // 渲染选项列表
    const renderOptions = () => {
      switch (activeTab) {
        case 'year':
          return years.map((year) => {
            const isSelected = currentValue.year === year;
            return (
              <div
                key={year}
                className={`apron-datepicker__option ${isSelected ? 'apron-datepicker__option--selected' : ''}`}
                onClick={() => handleSelectYear(year)}
              >
                {year}
              </div>
            );
          });
        case 'month':
          return months.map((month) => {
            const isSelected = currentValue.month === month;
            const isDisabled = !currentValue.year;
            return (
              <div
                key={month}
                className={`apron-datepicker__option ${isSelected ? 'apron-datepicker__option--selected' : ''} ${isDisabled ? 'apron-datepicker__option--disabled' : ''}`}
                onClick={() => !isDisabled && handleSelectMonth(month)}
              >
                {monthLabels[month - 1]}
              </div>
            );
          });
        case 'day':
          return days.map((day) => {
            const isSelected = currentValue.day === day;
            const isDisabled = !currentValue.year || !currentValue.month;
            return (
              <div
                key={day}
                className={`apron-datepicker__option ${isSelected ? 'apron-datepicker__option--selected' : ''} ${isDisabled ? 'apron-datepicker__option--disabled' : ''}`}
                onClick={() => !isDisabled && handleSelectDay(day)}
              >
                {day}
              </div>
            );
          });
        default:
          return null;
      }
    };

    return (
      <div
        ref={containerRef}
        className={classNames}
        tabIndex={disabled || loading ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
        aria-controls={`${pickerId}-listbox`}
        onKeyDown={handleKeyDown}
      >
        {/* 选择器头部 */}
        <div className="apron-datepicker__trigger" onClick={toggleDropdown}>
          <span className={`apron-datepicker__value ${!hasValue ? 'apron-datepicker__value--placeholder' : ''}`}>
            {displayValue}
          </span>
          <span className="apron-datepicker__suffix">
            {loading ? <LoadingIcon /> : <ArrowIcon isOpen={isOpen} />}
          </span>
        </div>

        {/* 下拉选项 */}
        {isOpen && !loading && (
          <div
            id={`${pickerId}-listbox`}
            className="apron-datepicker__dropdown"
            role="listbox"
          >
            {/* 选项列表 */}
            <div className="apron-datepicker__options">
              {renderOptions()}
            </div>

            {/* Tab 切换 */}
            <div className="apron-datepicker__tabs">
              <button
                type="button"
                className={`apron-datepicker__tab ${activeTab === 'year' ? 'apron-datepicker__tab--active' : ''}`}
                onClick={() => handleTabChange('year')}
              >
                {yearLabel}
              </button>
              <button
                type="button"
                className={`apron-datepicker__tab ${activeTab === 'month' ? 'apron-datepicker__tab--active' : ''}`}
                onClick={() => handleTabChange('month')}
              >
                {monthLabel}
              </button>
              <button
                type="button"
                className={`apron-datepicker__tab ${activeTab === 'day' ? 'apron-datepicker__tab--active' : ''}`}
                onClick={() => handleTabChange('day')}
              >
                {dayLabel}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

