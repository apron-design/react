import React, { createContext, useContext, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { Checkbox } from './Checkbox';
import type { CheckboxProps } from './Checkbox';

export type CheckboxValueType = string | number;

export interface CheckboxOptionType {
  label: ReactNode;
  value: CheckboxValueType;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  /** 当前选中的值数组 */
  value?: CheckboxValueType[];
  /** 默认选中的值数组（非受控） */
  defaultValue?: CheckboxValueType[];
  /** 选项配置 */
  options?: (CheckboxOptionType | string | number)[];
  /** 是否禁用整组 */
  disabled?: boolean;
  /** 排列方向 */
  direction?: 'horizontal' | 'vertical';
  /** 选中值改变时的回调 */
  onChange?: (checkedValues: CheckboxValueType[]) => void;
  /** 子元素 */
  children?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 点击文字部分是否可以激活复选框，默认为 true */
  labelClickable?: boolean;
}

interface CheckboxGroupContextValue {
  value: CheckboxValueType[];
  disabled: boolean;
  labelClickable: boolean;
  onChange: (optionValue: CheckboxValueType, checked: boolean) => void;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(
  null
);

export const useCheckboxGroup = () => useContext(CheckboxGroupContext);

export const CheckboxGroup: React.FC<CheckboxGroupProps> & {
  Item: typeof CheckboxGroupItem;
} = ({
  value,
  defaultValue,
  options,
  disabled = false,
  direction = 'horizontal',
  onChange,
  children,
  className = '',
  labelClickable = true,
}) => {
  const [internalValue, setInternalValue] = React.useState<CheckboxValueType[]>(
    defaultValue || []
  );

  const mergedValue = value !== undefined ? value : internalValue;

  const handleChange = useCallback(
    (optionValue: CheckboxValueType, checked: boolean) => {
      let newValue: CheckboxValueType[];

      if (checked) {
        newValue = [...mergedValue, optionValue];
      } else {
        newValue = mergedValue.filter((v) => v !== optionValue);
      }

      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [mergedValue, value, onChange]
  );

  const contextValue = useMemo(
    () => ({
      value: mergedValue,
      disabled,
      labelClickable,
      onChange: handleChange,
    }),
    [mergedValue, disabled, labelClickable, handleChange]
  );

  const classNames = [
    'apron-checkbox-group',
    `apron-checkbox-group--${direction}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderOptions = () => {
    if (options) {
      return options.map((option) => {
        const opt: CheckboxOptionType =
          typeof option === 'string' || typeof option === 'number'
            ? { label: option, value: option }
            : option;

        return (
          <Checkbox
            key={opt.value.toString()}
            value={opt.value}
            checked={mergedValue.includes(opt.value)}
            disabled={disabled || opt.disabled}
            labelClickable={labelClickable}
            onChange={(checked) => handleChange(opt.value, checked)}
          >
            {opt.label}
          </Checkbox>
        );
      });
    }
    return children;
  };

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div className={classNames} role="group">
        {renderOptions()}
      </div>
    </CheckboxGroupContext.Provider>
  );
};

// CheckboxGroup.Item 子组件
interface CheckboxGroupItemProps extends Omit<CheckboxProps, 'checked' | 'onChange'> {
  value: CheckboxValueType;
}

const CheckboxGroupItem: React.FC<CheckboxGroupItemProps> = ({
  value,
  disabled,
  children,
  ...props
}) => {
  const group = useCheckboxGroup();

  if (!group) {
    console.warn('Checkbox.Group.Item must be used within a Checkbox.Group');
    return null;
  }

  const isChecked = group.value.includes(value);
  const isDisabled = disabled || group.disabled;

  return (
    <Checkbox
      {...props}
      value={value}
      checked={isChecked}
      disabled={isDisabled}
      labelClickable={group.labelClickable}
      onChange={(checked) => group.onChange(value, checked)}
    >
      {children}
    </Checkbox>
  );
};

CheckboxGroupItem.displayName = 'CheckboxGroup.Item';
CheckboxGroup.Item = CheckboxGroupItem;

CheckboxGroup.displayName = 'CheckboxGroup';

