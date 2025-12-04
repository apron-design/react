import React, { createContext, useContext, useCallback, useMemo } from 'react';
import type { ReactNode, FormHTMLAttributes } from 'react';
import './Form.scss';

export type FormLayout = 'horizontal' | 'vertical' | 'inline';

export interface FormInstance<T = Record<string, unknown>> {
  getFieldValue: (name: keyof T) => unknown;
  getFieldsValue: () => T;
  setFieldValue: (name: keyof T, value: unknown) => void;
  setFieldsValue: (values: Partial<T>) => void;
  resetFields: () => void;
  validateFields: () => Promise<T>;
  validateField: (name: keyof T) => Promise<unknown>;
  getFieldError: (name: keyof T) => string | undefined;
  getFieldsError: () => Record<keyof T, string | undefined>;
  isFieldTouched: (name: keyof T) => boolean;
  isFieldValidating: (name: keyof T) => boolean;
  submit: () => void;
}

export interface FormProps<T = Record<string, unknown>>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** 表单实例 */
  form?: FormInstance<T>;
  /** 初始值 */
  initialValues?: Partial<T>;
  /** 表单布局 */
  layout?: FormLayout;
  /** 是否使用浮动标签 */
  floatingLabel?: boolean;
  /** 标签宽度（horizontal 布局时有效） */
  labelWidth?: number | string;
  /** 标签对齐方式 */
  labelAlign?: 'left' | 'right';
  /** 是否禁用整个表单 */
  disabled?: boolean;
  /** 表单提交回调 */
  onFinish?: (values: T) => void;
  /** 表单提交失败回调 */
  onFinishFailed?: (errors: Record<string, string>) => void;
  /** 字段值改变回调 */
  onValuesChange?: (changedValues: Partial<T>, allValues: T) => void;
  /** 子元素 */
  children?: ReactNode;
}

// Form Context
export interface FormContextValue {
  layout: FormLayout;
  floatingLabel: boolean;
  labelWidth?: number | string;
  labelAlign: 'left' | 'right';
  disabled: boolean;
  // 表单状态管理
  values: Record<string, unknown>;
  errors: Record<string, string | undefined>;
  touched: Record<string, boolean>;
  validating: Record<string, boolean>;
  // 方法
  getFieldValue: (name: string) => unknown;
  setFieldValue: (name: string, value: unknown) => void;
  getFieldError: (name: string) => string | undefined;
  setFieldError: (name: string, error: string | undefined) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  setFieldValidating: (name: string, validating: boolean) => void;
  registerField: (name: string, rules?: ValidationRule[]) => void;
  unregisterField: (name: string) => void;
  validateField: (name: string) => Promise<unknown>;
}

export const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('FormItem must be used within a Form');
  }
  return context;
};

// 验证规则
export interface ValidationRule {
  required?: boolean;
  message?: string;
  min?: number;
  max?: number;
  pattern?: RegExp;
  validator?: (value: unknown) => Promise<void> | void;
  type?: 'string' | 'number' | 'email' | 'url';
}

// 验证函数
const validateValue = async (
  value: unknown,
  rules: ValidationRule[]
): Promise<string | undefined> => {
  for (const rule of rules) {
    // Required
    if (rule.required) {
      if (value === undefined || value === null || value === '') {
        return rule.message || '此字段为必填项';
      }
    }

    // 如果值为空且不是 required，跳过后续验证
    if (value === undefined || value === null || value === '') {
      continue;
    }

    // Min length
    if (rule.min !== undefined && typeof value === 'string') {
      if (value.length < rule.min) {
        return rule.message || `最少需要 ${rule.min} 个字符`;
      }
    }

    // Max length
    if (rule.max !== undefined && typeof value === 'string') {
      if (value.length > rule.max) {
        return rule.message || `最多允许 ${rule.max} 个字符`;
      }
    }

    // Pattern
    if (rule.pattern && typeof value === 'string') {
      if (!rule.pattern.test(value)) {
        return rule.message || '格式不正确';
      }
    }

    // Type validation
    if (rule.type) {
      switch (rule.type) {
        case 'email':
          if (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return rule.message || '请输入有效的邮箱地址';
          }
          break;
        case 'url':
          if (typeof value === 'string') {
            try {
              new URL(value);
            } catch {
              return rule.message || '请输入有效的 URL';
            }
          }
          break;
        case 'number':
          if (isNaN(Number(value))) {
            return rule.message || '请输入数字';
          }
          break;
      }
    }

    // Custom validator
    if (rule.validator) {
      try {
        await rule.validator(value);
      } catch (e) {
        return rule.message || (e instanceof Error ? e.message : '验证失败');
      }
    }
  }

  return undefined;
};

export function Form<T extends Record<string, unknown> = Record<string, unknown>>({
  form,
  initialValues = {} as Partial<T>,
  layout = 'vertical',
  floatingLabel = false,
  labelWidth,
  labelAlign = 'right',
  disabled = false,
  onFinish,
  onFinishFailed,
  onValuesChange,
  children,
  className = '',
  ...props
}: FormProps<T>) {
  // 内部状态
  const [values, setValues] = React.useState<Record<string, unknown>>(
    initialValues as Record<string, unknown>
  );
  const [errors, setErrors] = React.useState<Record<string, string | undefined>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [validating, setValidating] = React.useState<Record<string, boolean>>({});
  const fieldsRef = React.useRef<Record<string, ValidationRule[]>>({});

  // 获取字段值
  const getFieldValue = useCallback(
    (name: string) => values[name],
    [values]
  );

  // 设置字段值
  const setFieldValue = useCallback(
    (name: string, value: unknown) => {
      setValues((prev) => {
        const newValues = { ...prev, [name]: value };
        onValuesChange?.({ [name]: value } as Partial<T>, newValues as T);
        return newValues;
      });
    },
    [onValuesChange]
  );

  // 获取字段错误
  const getFieldError = useCallback(
    (name: string) => errors[name],
    [errors]
  );

  // 设置字段错误
  const setFieldError = useCallback((name: string, error: string | undefined) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  // 设置字段已触摸
  const setFieldTouched = useCallback((name: string, isTouched: boolean) => {
    setTouched((prev) => ({ ...prev, [name]: isTouched }));
  }, []);

  // 设置字段验证中
  const setFieldValidating = useCallback((name: string, isValidating: boolean) => {
    setValidating((prev) => ({ ...prev, [name]: isValidating }));
  }, []);

  // 注册字段
  const registerField = useCallback((name: string, rules?: ValidationRule[]) => {
    fieldsRef.current[name] = rules || [];
  }, []);

  // 注销字段
  const unregisterField = useCallback((name: string) => {
    delete fieldsRef.current[name];
  }, []);

  // 验证单个字段
  const validateField = useCallback(
    async (name: string): Promise<unknown> => {
      const rules = fieldsRef.current[name] || [];
      if (rules.length === 0) return values[name];

      setFieldValidating(name, true);
      const error = await validateValue(values[name], rules);
      setFieldError(name, error);
      setFieldValidating(name, false);

      if (error) {
        throw new Error(error);
      }
      return values[name];
    },
    [values, setFieldError, setFieldValidating]
  );

  // 验证所有字段
  const validateFields = useCallback(async (): Promise<T> => {
    const fieldNames = Object.keys(fieldsRef.current);
    const newErrors: Record<string, string | undefined> = {};
    let hasError = false;

    for (const name of fieldNames) {
      const rules = fieldsRef.current[name] || [];
      if (rules.length > 0) {
        setFieldValidating(name, true);
        const error = await validateValue(values[name], rules);
        newErrors[name] = error;
        setFieldValidating(name, false);
        if (error) hasError = true;
      }
    }

    setErrors(newErrors);

    if (hasError) {
      throw newErrors;
    }

    return values as T;
  }, [values, setFieldValidating]);

  // 重置表单
  const resetFields = useCallback(() => {
    setValues(initialValues as Record<string, unknown>);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  // 提交表单
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const validatedValues = await validateFields();
        onFinish?.(validatedValues);
      } catch (err) {
        onFinishFailed?.(err as Record<string, string>);
      }
    },
    [validateFields, onFinish, onFinishFailed]
  );

  // Context 值
  const contextValue = useMemo<FormContextValue>(
    () => ({
      layout,
      floatingLabel,
      labelWidth,
      labelAlign,
      disabled,
      values,
      errors,
      touched,
      validating,
      getFieldValue,
      setFieldValue,
      getFieldError,
      setFieldError,
      setFieldTouched,
      setFieldValidating,
      registerField,
      unregisterField,
      validateField,
    }),
    [
      layout,
      floatingLabel,
      labelWidth,
      labelAlign,
      disabled,
      values,
      errors,
      touched,
      validating,
      getFieldValue,
      setFieldValue,
      getFieldError,
      setFieldError,
      setFieldTouched,
      setFieldValidating,
      registerField,
      unregisterField,
      validateField,
    ]
  );

  // 如果提供了外部 form 实例，则同步方法
  React.useEffect(() => {
    if (form) {
      Object.assign(form, {
        getFieldValue,
        getFieldsValue: () => values as T,
        setFieldValue,
        setFieldsValue: (newValues: Partial<T>) => {
          setValues((prev) => ({ ...prev, ...newValues }));
        },
        resetFields,
        validateFields,
        validateField,
        getFieldError,
        getFieldsError: () => errors as Record<keyof T, string | undefined>,
        isFieldTouched: (name: keyof T) => touched[name as string] || false,
        isFieldValidating: (name: keyof T) => validating[name as string] || false,
        submit: () => handleSubmit(new Event('submit') as unknown as React.FormEvent),
      });
    }
  }, [
    form,
    getFieldValue,
    values,
    setFieldValue,
    resetFields,
    validateFields,
    validateField,
    getFieldError,
    errors,
    touched,
    validating,
    handleSubmit,
  ]);

  const classNames = [
    'apron-form',
    `apron-form--${layout}`,
    floatingLabel && 'apron-form--floating-label',
    disabled && 'apron-form--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <FormContext.Provider value={contextValue}>
      <form className={classNames} onSubmit={handleSubmit} {...props}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

Form.displayName = 'Form';

