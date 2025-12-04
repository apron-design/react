import { useRef } from 'react';
import type { FormInstance } from './Form';

/**
 * 创建表单实例的 Hook
 * 用法：const [form] = useForm();
 */
export function useForm<T extends Record<string, unknown> = Record<string, unknown>>(): [FormInstance<T>] {
  const formRef = useRef<FormInstance<T>>({
    getFieldValue: () => undefined,
    getFieldsValue: () => ({} as T),
    setFieldValue: () => {},
    setFieldsValue: () => {},
    resetFields: () => {},
    validateFields: () => Promise.resolve({} as T),
    validateField: () => Promise.resolve(undefined),
    getFieldError: () => undefined,
    getFieldsError: () => ({} as Record<keyof T, string | undefined>),
    isFieldTouched: () => false,
    isFieldValidating: () => false,
    submit: () => {},
  });

  return [formRef.current];
}

