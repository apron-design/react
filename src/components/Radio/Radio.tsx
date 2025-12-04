import React, { forwardRef, useCallback, useId, useState } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import './Radio.scss';

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  /** 是否选中 */
  checked?: boolean;
  /** 默认是否选中（非受控） */
  defaultChecked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 单选框的值 */
  value?: string | number;
  /** 选中状态改变时的回调 */
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 标签文本 */
  children?: ReactNode;
  /** 点击文字部分是否可以激活单选框，默认为 false（仅圆圈可点击） */
  labelClickable?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      checked,
      defaultChecked,
      disabled = false,
      value,
      onChange,
      children,
      className = '',
      id,
      labelClickable = false,
      name,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const radioId = id || autoId;

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
          
          // 如果不是链接，阻止 label 的默认行为（触发 radio）
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
      'apron-radio',
      disabled && 'apron-radio--disabled',
      isChecked && 'apron-radio--checked',
      !labelClickable && 'apron-radio--label-not-clickable',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={classNames} htmlFor={radioId}>
        <span className="apron-radio__input-wrapper">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            name={name}
            className="apron-radio__input"
            checked={isChecked}
            disabled={disabled}
            value={value}
            onChange={handleChange}
            {...props}
          />
          <span className="apron-radio__circle">
            <span className="apron-radio__dot" />
          </span>
        </span>
        {children && (
          <span 
            className="apron-radio__label" 
            onClick={handleLabelClick}
          >
            {children}
          </span>
        )}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

