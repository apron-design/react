import React, {
  forwardRef,
  useState,
  useCallback,
  useRef,
  useEffect,
  useId,
} from 'react';
import type { ReactNode } from 'react';
import './Select.scss';

export type SelectValueType = string | number;

export interface SelectOption {
  label: ReactNode;
  value: SelectValueType;
  disabled?: boolean;
}

export interface SelectProps {
  /** 当前选中的值 */
  value?: SelectValueType;
  /** 默认选中的值（非受控） */
  defaultValue?: SelectValueType;
  /** 选项列表 */
  options?: SelectOption[];
  /** 占位文本 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 是否使用 inflow 模式（撑开容器） */
  inflow?: boolean;
  /** 选中值改变时的回调 */
  onChange?: (value: SelectValueType, option: SelectOption) => void;
  /** 自定义类名 */
  className?: string;
  /** 下拉框展开/收起回调 */
  onOpenChange?: (open: boolean) => void;
}

// 下拉箭头图标
const ArrowIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`apron-select__arrow ${isOpen ? 'apron-select__arrow--open' : ''}`}
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
    className="apron-select__loading-icon"
  >
    <path
      d="M10 2V5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M10 15V18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.3"
    />
    <path
      d="M4.34 4.34L6.46 6.46"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.9"
    />
    <path
      d="M13.54 13.54L15.66 15.66"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.4"
    />
    <path
      d="M2 10H5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.8"
    />
    <path
      d="M15 10H18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
    <path
      d="M4.34 15.66L6.46 13.54"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.7"
    />
    <path
      d="M13.54 6.46L15.66 4.34"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      value,
      defaultValue,
      options = [],
      placeholder = 'Placeholder goes here',
      disabled = false,
      loading = false,
      inflow = false,
      onChange,
      className = '',
      onOpenChange,
    },
    ref
  ) => {
    const selectId = useId();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<SelectValueType | undefined>(
      defaultValue
    );

    // 判断是否为受控模式
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    // 获取当前选中的选项
    const selectedOption = options.find((opt) => opt.value === currentValue);
    const hasValue = currentValue !== undefined;
    const isActive = isOpen || hasValue;

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

    // 选择选项
    const handleSelect = useCallback(
      (option: SelectOption) => {
        if (option.disabled) return;

        if (!isControlled) {
          setInternalValue(option.value);
        }
        onChange?.(option.value, option);
        setIsOpen(false);
        onOpenChange?.(false);
      },
      [isControlled, onChange, onOpenChange]
    );

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
          case 'ArrowDown':
            e.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
              onOpenChange?.(true);
            }
            break;
          case 'ArrowUp':
            e.preventDefault();
            if (isOpen) {
              setIsOpen(false);
              onOpenChange?.(false);
            }
            break;
        }
      },
      [disabled, loading, isOpen, toggleDropdown, onOpenChange]
    );

    const classNames = [
      'apron-select',
      isActive && 'apron-select--active',
      isOpen && 'apron-select--open',
      disabled && 'apron-select--disabled',
      loading && 'apron-select--loading',
      inflow && 'apron-select--inflow',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={containerRef}
        className={classNames}
        tabIndex={disabled || loading ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
        aria-controls={`${selectId}-listbox`}
        onKeyDown={handleKeyDown}
      >
        {/* 选择器头部 */}
        <div className="apron-select__trigger" onClick={toggleDropdown}>
          <span
            className={`apron-select__value ${
              !hasValue ? 'apron-select__value--placeholder' : ''
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="apron-select__suffix">
            {loading ? <LoadingIcon /> : <ArrowIcon isOpen={isOpen} />}
          </span>
        </div>

        {/* 下拉选项 */}
        {isOpen && !loading && (
          <div
            id={`${selectId}-listbox`}
            className="apron-select__dropdown"
            role="listbox"
          >
            <div className="apron-select__options">
              {options.map((option) => {
                const isSelected = option.value === currentValue;
                const optionClassNames = [
                  'apron-select__option',
                  isSelected && 'apron-select__option--selected',
                  option.disabled && 'apron-select__option--disabled',
                ]
                  .filter(Boolean)
                  .join(' ');

                return (
                  <div
                    key={option.value}
                    className={optionClassNames}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled}
                    onClick={() => handleSelect(option)}
                  >
                    {option.label}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

