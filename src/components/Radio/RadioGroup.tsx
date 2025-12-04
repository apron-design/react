import React, { createContext, useContext, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { Radio } from './Radio';
import type { RadioProps } from './Radio';

export type RadioValueType = string | number;

export interface RadioOptionType {
  label: ReactNode;
  value: RadioValueType;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** 当前选中的值 */
  value?: RadioValueType;
  /** 默认选中的值（非受控） */
  defaultValue?: RadioValueType;
  /** 选项配置 */
  options?: (RadioOptionType | string | number)[];
  /** 是否禁用整组 */
  disabled?: boolean;
  /** 排列方向 */
  direction?: 'horizontal' | 'vertical';
  /** 选中值改变时的回调 */
  onChange?: (value: RadioValueType) => void;
  /** 子元素 */
  children?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** RadioGroup 的 name 属性 */
  name?: string;
  /** 点击文字部分是否可以激活单选框，默认为 true */
  labelClickable?: boolean;
}

interface RadioGroupContextValue {
  value: RadioValueType | undefined;
  disabled: boolean;
  labelClickable: boolean;
  name?: string;
  onChange: (optionValue: RadioValueType) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export const useRadioGroup = () => useContext(RadioGroupContext);

export const RadioGroup: React.FC<RadioGroupProps> & {
  Item: typeof RadioGroupItem;
} = ({
  value,
  defaultValue,
  options,
  disabled = false,
  direction = 'horizontal',
  onChange,
  children,
  className = '',
  name,
  labelClickable = true,
}) => {
  const [internalValue, setInternalValue] = React.useState<RadioValueType | undefined>(
    defaultValue
  );

  const mergedValue = value !== undefined ? value : internalValue;

  const handleChange = useCallback(
    (optionValue: RadioValueType) => {
      if (value === undefined) {
        setInternalValue(optionValue);
      }
      onChange?.(optionValue);
    },
    [value, onChange]
  );

  const contextValue = useMemo(
    () => ({
      value: mergedValue,
      disabled,
      labelClickable,
      name,
      onChange: handleChange,
    }),
    [mergedValue, disabled, labelClickable, name, handleChange]
  );

  const classNames = [
    'apron-radio-group',
    `apron-radio-group--${direction}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderOptions = () => {
    if (options) {
      return options.map((option) => {
        const opt: RadioOptionType =
          typeof option === 'string' || typeof option === 'number'
            ? { label: option, value: option }
            : option;

        return (
          <Radio
            key={opt.value.toString()}
            value={opt.value}
            name={name}
            checked={mergedValue === opt.value}
            disabled={disabled || opt.disabled}
            labelClickable={labelClickable}
            onChange={() => handleChange(opt.value)}
          >
            {opt.label}
          </Radio>
        );
      });
    }
    return children;
  };

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div className={classNames} role="radiogroup">
        {renderOptions()}
      </div>
    </RadioGroupContext.Provider>
  );
};

// RadioGroup.Item 子组件
interface RadioGroupItemProps extends Omit<RadioProps, 'checked' | 'onChange' | 'name'> {
  value: RadioValueType;
}

const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
  value,
  disabled,
  children,
  ...props
}) => {
  const group = useRadioGroup();

  if (!group) {
    console.warn('Radio.Group.Item must be used within a Radio.Group');
    return null;
  }

  const isChecked = group.value === value;
  const isDisabled = disabled || group.disabled;

  return (
    <Radio
      {...props}
      value={value}
      name={group.name}
      checked={isChecked}
      disabled={isDisabled}
      labelClickable={group.labelClickable}
      onChange={() => group.onChange(value)}
    >
      {children}
    </Radio>
  );
};

RadioGroupItem.displayName = 'RadioGroup.Item';
RadioGroup.Item = RadioGroupItem;

RadioGroup.displayName = 'RadioGroup';

