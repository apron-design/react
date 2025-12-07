import React, { useEffect, useId, useMemo, useCallback, useState } from 'react';
import type { ReactNode, ReactElement } from 'react';
import { useFormContext, ValidationRule } from './Form';

export interface FormItemProps {
  /** 字段名 */
  name?: string;
  /** 标签文本 */
  label?: ReactNode;
  /** 是否必填（显示红色星号） */
  required?: boolean;
  /** 验证规则 */
  rules?: ValidationRule[];
  /** 是否使用浮动标签（覆盖 Form 级别设置） */
  floatingLabel?: boolean;
  /** 帮助文本 */
  help?: ReactNode;
  /** 额外提示 */
  extra?: ReactNode;
  /** 是否隐藏标签 */
  noLabel?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 子元素 */
  children?: ReactNode;
  /** 标签宽度（覆盖 Form 级别设置） */
  labelWidth?: number | string;
  /** 值属性名 */
  valuePropName?: string;
  /** 触发方式 */
  trigger?: string;
  /** 值收集触发方式 */
  validateTrigger?: string | string[];
}

export const FormItem: React.FC<FormItemProps> = ({
  name,
  label,
  required,
  rules = [],
  floatingLabel: itemFloatingLabel,
  help,
  extra,
  noLabel = false,
  className = '',
  children,
  labelWidth: itemLabelWidth,
  valuePropName = 'value',
  trigger = 'onChange',
  validateTrigger = 'onBlur',
}) => {
  const formContext = useFormContext();
  const itemId = useId();
  const [isFocused, setIsFocused] = useState(false);

  // 确定是否使用浮动标签
  const useFloatingLabel = itemFloatingLabel ?? formContext.floatingLabel;

  // 确定标签宽度
  const labelWidth = itemLabelWidth ?? formContext.labelWidth;

  // 合并 required 规则
  const mergedRules = useMemo(() => {
    if (required && !rules.some((r) => r.required)) {
      return [{ required: true, message: `${label || name} 是必填项` }, ...rules];
    }
    return rules;
  }, [required, rules, label, name]);

  // 是否有必填规则
  const isRequired = required || mergedRules.some((r) => r.required);

  // 注册/注销字段
  useEffect(() => {
    if (name) {
      formContext.registerField(name, mergedRules);
      return () => {
        formContext.unregisterField(name);
      };
    }
  }, [name, mergedRules, formContext]);

  // 获取字段值和错误
  const value = name ? formContext.getFieldValue(name) : undefined;
  const error = name ? formContext.getFieldError(name) : undefined;

  // 是否有值
  const hasValue = value !== undefined && value !== null && value !== '';

  // 处理值变化
  const handleChange = useCallback(
    (newValue: unknown) => {
      if (name) {
        formContext.setFieldValue(name, newValue);
        formContext.setFieldTouched(name, true);

        // 如果 validateTrigger 包含 onChange，则触发验证
        const triggers = Array.isArray(validateTrigger) ? validateTrigger : [validateTrigger];
        if (triggers.includes('onChange')) {
          formContext.validateField(name).catch(() => {});
        }
      }
    },
    [name, formContext, validateTrigger]
  );

  // 处理失焦
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (name) {
      formContext.setFieldTouched(name, true);

      // 如果 validateTrigger 包含 onBlur，则触发验证
      const triggers = Array.isArray(validateTrigger) ? validateTrigger : [validateTrigger];
      if (triggers.includes('onBlur')) {
        formContext.validateField(name).catch(() => {});
      }
    }
  }, [name, formContext, validateTrigger]);

  // 处理聚焦
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  // 克隆子元素并注入 props
  const renderChildren = () => {
    if (!children) return null;

    const child = React.Children.only(children) as ReactElement;
    
    if (!name) {
      return child;
    }

    const childProps: Record<string, unknown> = {
      id: itemId,
      [valuePropName]: value,
      disabled: formContext.disabled || (child.props as Record<string, unknown>).disabled,
      onFocus: (e: React.FocusEvent) => {
        handleFocus();
        const onFocus = (child.props as Record<string, unknown>).onFocus;
        if (typeof onFocus === 'function') {
          onFocus(e);
        }
      },
      onBlur: (e: React.FocusEvent) => {
        handleBlur();
        const onBlur = (child.props as Record<string, unknown>).onBlur;
        if (typeof onBlur === 'function') {
          onBlur(e);
        }
      },
    };

    // 处理不同的 trigger
    if (trigger === 'onChange') {
      childProps.onChange = (e: unknown) => {
        // 处理事件对象和直接值
        let newValue: unknown;
        if (e && typeof e === 'object' && 'target' in e) {
          const target = (e as React.ChangeEvent<HTMLInputElement>).target;
          newValue = target.type === 'checkbox' ? target.checked : target.value;
        } else {
          newValue = e;
        }
        handleChange(newValue);
        const onChange = (child.props as Record<string, unknown>).onChange;
        if (typeof onChange === 'function') {
          onChange(e);
        }
      };
    }

    // 浮动标签模式下，需要传递 placeholder 为空（由 label 替代）
    if (useFloatingLabel && label) {
      childProps.placeholder = '';
    }

    return React.cloneElement(child, childProps);
  };

  const classNames = [
    'apron-form-item',
    `apron-form-item--${formContext.layout}`,
    useFloatingLabel && 'apron-form-item--floating-label',
    useFloatingLabel && (isFocused || hasValue) && 'apron-form-item--floating-active',
    error && 'apron-form-item--error',
    isRequired && 'apron-form-item--required',
    formContext.disabled && 'apron-form-item--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const labelStyle: React.CSSProperties = {};
  if (labelWidth && formContext.layout === 'horizontal') {
    labelStyle.width = typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth;
    labelStyle.textAlign = formContext.labelAlign;
  }

  return (
    <div className={classNames}>
      {/* 标签 */}
      {!noLabel && label && !useFloatingLabel && (
        <label
          htmlFor={itemId}
          className="apron-form-item__label"
          style={labelStyle}
        >
          {label}
          {isRequired && <span className="apron-form-item__required">*</span>}
        </label>
      )}

      {/* 控件容器 */}
      <div className="apron-form-item__control">
        {/* 浮动标签 */}
        {useFloatingLabel && label && (
          <label
            htmlFor={itemId}
            className="apron-form-item__floating-label"
          >
            {label}
            {isRequired && <span className="apron-form-item__required">*</span>}
          </label>
        )}

        {/* 子元素 */}
        <div className="apron-form-item__content">
          {renderChildren()}
        </div>

        {/* 错误信息 */}
        {error && (
          <div className="apron-form-item__error">{error}</div>
        )}

        {/* 帮助文本 */}
        {help && !error && (
          <div className="apron-form-item__help">{help}</div>
        )}

        {/* 额外提示 */}
        {extra && (
          <div className="apron-form-item__extra">{extra}</div>
        )}
      </div>
    </div>
  );
};

FormItem.displayName = 'FormItem';

