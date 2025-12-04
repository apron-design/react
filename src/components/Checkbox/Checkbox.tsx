import React, { forwardRef, useCallback, useId, useState } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import './Checkbox.scss';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  /** 是否选中 */
  checked?: boolean;
  /** 默认是否选中（非受控） */
  defaultChecked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否为半选状态 */
  indeterminate?: boolean;
  /** 复选框的值 */
  value?: string | number;
  /** 选中状态改变时的回调 */
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 标签文本 */
  children?: ReactNode;
  /** 点击文字部分是否可以激活复选框，默认为 false（仅方框可点击） */
  labelClickable?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked,
      disabled = false,
      indeterminate = false,
      value,
      onChange,
      children,
      className = '',
      id,
      labelClickable = false,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const checkboxId = id || autoId;

    // 非受控模式下的内部状态
    const [internalChecked, setInternalChecked] = useState(defaultChecked || false);
    
    // 判断是否为受控模式
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        
        // 非受控模式下更新内部状态
        if (!isControlled) {
          setInternalChecked(e.target.checked);
        }
        
        onChange?.(e.target.checked, e);
      },
      [disabled, isControlled, onChange]
    );

    // 阻止 label 点击事件（当 labelClickable 为 false 时）
    // 但如果点击的是链接，则允许链接正常跳转
    const handleLabelClick = useCallback(
      (e: React.MouseEvent) => {
        if (!labelClickable) {
          // 检查点击目标是否是链接或链接的子元素
          const target = e.target as HTMLElement;
          const isLink = target.tagName === 'A' || target.closest('a');
          
          // 如果不是链接，阻止 label 的默认行为（触发 checkbox）
          if (!isLink) {
            e.preventDefault();
          }
          // 如果是链接，让链接正常工作，同时阻止冒泡到 label
          else {
            e.stopPropagation();
          }
        }
      },
      [labelClickable]
    );

    const classNames = [
      'apron-checkbox',
      disabled && 'apron-checkbox--disabled',
      isChecked && 'apron-checkbox--checked',
      indeterminate && 'apron-checkbox--indeterminate',
      !labelClickable && 'apron-checkbox--label-not-clickable',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={classNames} htmlFor={checkboxId}>
        <span className="apron-checkbox__input-wrapper">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className="apron-checkbox__input"
            checked={isChecked}
            disabled={disabled}
            value={value}
            onChange={handleChange}
            {...props}
          />
          <span className="apron-checkbox__box">
            {indeterminate ? (
              <svg
                className="apron-checkbox__icon apron-checkbox__icon--indeterminate"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="6"
                  y1="12"
                  x2="18"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                className="apron-checkbox__icon apron-checkbox__icon--check"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12.5L10 17.5L19 6.5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        </span>
        {children && (
          <span 
            className="apron-checkbox__label" 
            onClick={handleLabelClick}
          >
            {children}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

