import React, { forwardRef, useCallback, useId, useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import './Switch.scss';

export type SwitchSize = 'default' | 'small' | 'mini';
export type SwitchVariant = 'default' | 'primary' | 'secondary';

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'size'> {
  /** 是否开启 */
  checked?: boolean;
  /** 默认是否开启（非受控） */
  defaultChecked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 尺寸 */
  size?: SwitchSize;
  /** 变种 */
  variant?: SwitchVariant;
  /** 自定义开启时的颜色 */
  checkedColor?: string;
  /** 自定义关闭时的颜色 */
  uncheckedColor?: string;
  /** 状态改变时的回调 */
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked,
      disabled = false,
      size = 'default',
      variant = 'default',
      checkedColor,
      uncheckedColor,
      onChange,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const switchId = id || autoId;

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

    const classNames = [
      'apron-switch',
      `apron-switch--${size}`,
      `apron-switch--${variant}`,
      disabled && 'apron-switch--disabled',
      isChecked && 'apron-switch--checked',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // 自定义颜色样式
    const customStyle: React.CSSProperties & Record<string, string> = {};
    if (checkedColor && isChecked) {
      customStyle['--apron-switch-checked-bg'] = checkedColor;
    }
    if (uncheckedColor && !isChecked) {
      customStyle['--apron-switch-unchecked-bg'] = uncheckedColor;
    }

    return (
      <label
        className={classNames}
        htmlFor={switchId}
        style={Object.keys(customStyle).length > 0 ? customStyle as React.CSSProperties : undefined}
      >
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={switchId}
          className="apron-switch__input"
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          aria-checked={isChecked}
          {...props}
        />
        <span className="apron-switch__track">
          <span className="apron-switch__thumb" />
        </span>
      </label>
    );
  }
);

Switch.displayName = 'Switch';

