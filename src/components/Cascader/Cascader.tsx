import React, {
  forwardRef,
  useState,
  useCallback,
  useRef,
  useEffect,
  useId,
  useMemo,
} from 'react';
import type { ReactNode } from 'react';
import './Cascader.scss';

export type CascaderValueType = (string | number)[];

export interface CascaderOption {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
  children?: CascaderOption[];
}

export interface CascaderProps {
  /** 当前选中的值路径 */
  value?: CascaderValueType;
  /** 默认选中的值路径（非受控） */
  defaultValue?: CascaderValueType;
  /** 选项列表 */
  options?: CascaderOption[];
  /** 占位文本 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 是否使用 inflow 模式（撑开容器） */
  inflow?: boolean;
  /** 选中值改变时的回调 */
  onChange?: (value: CascaderValueType, selectedOptions: CascaderOption[]) => void;
  /** 自定义类名 */
  className?: string;
  /** 下拉框展开/收起回调 */
  onOpenChange?: (open: boolean) => void;
  /** 值分隔符，用于显示 */
  separator?: string;
  /** 是否在选择过程中触发 onChange（而非只在选择叶子节点时） */
  changeOnSelect?: boolean;
}

// 下拉箭头图标
const ArrowIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`apron-cascader__arrow ${isOpen ? 'apron-cascader__arrow--open' : ''}`}
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
    className="apron-cascader__loading-icon"
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

// 根据值路径获取选中的选项
const getSelectedOptions = (
  options: CascaderOption[],
  valuePath: CascaderValueType
): CascaderOption[] => {
  const result: CascaderOption[] = [];
  let currentOptions = options;

  for (const val of valuePath) {
    const found = currentOptions.find((opt) => opt.value === val);
    if (found) {
      result.push(found);
      currentOptions = found.children || [];
    } else {
      break;
    }
  }

  return result;
};

// 获取各层级的选项列表
const getColumnsOptions = (
  options: CascaderOption[],
  expandedPath: CascaderValueType
): CascaderOption[][] => {
  const columns: CascaderOption[][] = [options];
  let currentOptions = options;

  for (const val of expandedPath) {
    const found = currentOptions.find((opt) => opt.value === val);
    if (found?.children && found.children.length > 0) {
      columns.push(found.children);
      currentOptions = found.children;
    } else {
      break;
    }
  }

  return columns;
};

export const Cascader = forwardRef<HTMLDivElement, CascaderProps>(
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
      separator = ' / ',
      changeOnSelect = false,
    },
    ref
  ) => {
    const cascaderId = useId();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<CascaderValueType>(
      defaultValue || []
    );
    // 展开路径（用于显示子级列）
    const [expandedPath, setExpandedPath] = useState<CascaderValueType>([]);

    // 判断是否为受控模式
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    // 获取选中的选项
    const selectedOptions = useMemo(
      () => getSelectedOptions(options, currentValue),
      [options, currentValue]
    );

    // 获取显示的值
    const displayValue = useMemo(() => {
      if (selectedOptions.length === 0) return '';
      return selectedOptions.map((opt) => opt.label).join(separator);
    }, [selectedOptions, separator]);

    const hasValue = currentValue.length > 0;
    const isActive = isOpen || hasValue;

    // 获取各列的选项
    const columnsOptions = useMemo(
      () => getColumnsOptions(options, expandedPath),
      [options, expandedPath]
    );

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

    // 打开时初始化展开路径
    useEffect(() => {
      if (isOpen) {
        setExpandedPath(currentValue);
      }
    }, [isOpen, currentValue]);

    // 切换下拉框
    const toggleDropdown = useCallback(() => {
      if (disabled || loading) return;
      const newOpen = !isOpen;
      setIsOpen(newOpen);
      onOpenChange?.(newOpen);
    }, [disabled, loading, isOpen, onOpenChange]);

    // 选择选项
    const handleSelect = useCallback(
      (option: CascaderOption, columnIndex: number) => {
        if (option.disabled) return;

        // 构建新的值路径
        const newPath = [...expandedPath.slice(0, columnIndex), option.value];
        setExpandedPath(newPath);

        const newSelectedOptions = getSelectedOptions(options, newPath);
        const hasChildren = option.children && option.children.length > 0;

        // 如果是叶子节点或 changeOnSelect 为 true，则触发 onChange
        if (!hasChildren || changeOnSelect) {
          if (!isControlled) {
            setInternalValue(newPath);
          }
          onChange?.(newPath, newSelectedOptions);

          // 如果是叶子节点，关闭下拉框
          if (!hasChildren) {
            setIsOpen(false);
            onOpenChange?.(false);
          }
        }
      },
      [expandedPath, options, isControlled, onChange, onOpenChange, changeOnSelect]
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
      'apron-cascader',
      isActive && 'apron-cascader--active',
      isOpen && 'apron-cascader--open',
      disabled && 'apron-cascader--disabled',
      loading && 'apron-cascader--loading',
      inflow && 'apron-cascader--inflow',
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
        aria-controls={`${cascaderId}-listbox`}
        onKeyDown={handleKeyDown}
      >
        {/* 选择器头部 */}
        <div className="apron-cascader__trigger" onClick={toggleDropdown}>
          <span
            className={`apron-cascader__value ${
              !hasValue ? 'apron-cascader__value--placeholder' : ''
            }`}
          >
            {displayValue || placeholder}
          </span>
          <span className="apron-cascader__suffix">
            {loading ? <LoadingIcon /> : <ArrowIcon isOpen={isOpen} />}
          </span>
        </div>

        {/* 下拉选项 */}
        {isOpen && !loading && (
          <div
            id={`${cascaderId}-listbox`}
            className="apron-cascader__dropdown"
            role="listbox"
          >
            <div className="apron-cascader__columns">
              {columnsOptions.map((columnOptions, columnIndex) => (
                <div key={columnIndex} className="apron-cascader__column">
                  <div className="apron-cascader__options">
                    {columnOptions.map((option) => {
                      const isSelected = expandedPath[columnIndex] === option.value;
                      const isFinalSelected =
                        currentValue[columnIndex] === option.value &&
                        columnIndex === currentValue.length - 1;
                      const optionClassNames = [
                        'apron-cascader__option',
                        isSelected && 'apron-cascader__option--expanded',
                        isFinalSelected && 'apron-cascader__option--selected',
                        option.disabled && 'apron-cascader__option--disabled',
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
                          onClick={() => handleSelect(option, columnIndex)}
                        >
                          <span className="apron-cascader__option-label">
                            {option.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Cascader.displayName = 'Cascader';

