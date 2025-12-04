import React, { forwardRef, useState, useCallback, useRef, useEffect, useMemo } from 'react';
import type { InputHTMLAttributes } from 'react';
import './InputOtp.scss';

export type InputOtpSize = 'default' | 'small';
export type InputOtpStatus = 'default' | 'success' | 'error';

export interface InputOtpProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange'> {
  /** 格式：* 表示输入位，其他字符直接渲染，如 "****" 或 "***-***" */
  format?: string;
  /** 尺寸 */
  size?: InputOtpSize;
  /** 是否为正方形（以宽为准） */
  square?: boolean;
  /** 输入类型，影响移动端键盘 */
  type?: 'number' | 'text';
  /** 当前值 */
  value?: string;
  /** 默认值 */
  defaultValue?: string;
  /** 状态：success 显示成功样式，error 显示错误样式 */
  status?: InputOtpStatus;
  /** 值改变时的回调 */
  onChange?: (value: string) => void;
  /** 输入完成时的回调（满足长度时自动触发） */
  onFinish?: (value: string) => void;
  /** 输入完成时的回调（同 onFinish） */
  onComplete?: (value: string) => void;
  /** error 状态下按退格键重置时的回调 */
  onStatusReset?: () => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否自动聚焦 */
  autoFocus?: boolean;
}

export const InputOtp = forwardRef<HTMLInputElement, InputOtpProps>(
  (
    {
      format = '******',
      size = 'default',
      square = false,
      type = 'number',
      value,
      defaultValue = '',
      status = 'default',
      onChange,
      onFinish,
      onComplete,
      onStatusReset,
      disabled = false,
      autoFocus = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue);

    // 合并 ref
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(inputRef.current);
        } else {
          ref.current = inputRef.current;
        }
      }
    }, [ref]);

    // 自动聚焦
    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, [autoFocus]);

    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : internalValue;

    // 解析 format，获取输入位数量和结构
    const formatInfo = useMemo(() => {
      const slots: Array<{ type: 'input' | 'separator'; char?: string; index?: number }> = [];
      let inputIndex = 0;

      for (const char of format) {
        if (char === '*') {
          slots.push({ type: 'input', index: inputIndex });
          inputIndex++;
        } else {
          slots.push({ type: 'separator', char });
        }
      }

      return {
        slots,
        inputCount: inputIndex,
      };
    }, [format]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;

        // 如果是数字类型，只允许数字
        if (type === 'number') {
          newValue = newValue.replace(/\D/g, '');
        }

        // 限制长度
        newValue = newValue.slice(0, formatInfo.inputCount);

        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);

        // 检查是否输入完成
        if (newValue.length === formatInfo.inputCount) {
          onFinish?.(newValue);
          onComplete?.(newValue);
        }
      },
      [isControlled, onChange, onFinish, onComplete, formatInfo.inputCount, type]
    );

    // 处理键盘事件（error 状态下按退格键清空所有内容）
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (status === 'error' && e.key === 'Backspace') {
          e.preventDefault();
          // 清空所有内容
          if (!isControlled) {
            setInternalValue('');
          }
          onChange?.('');
          // 通知外部重置状态
          onStatusReset?.();
        }
      },
      [status, isControlled, onChange, onStatusReset]
    );

    const handleFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
      setIsFocused(false);
    }, []);

    const handleContainerClick = useCallback(() => {
      if (!disabled && inputRef.current) {
        inputRef.current.focus();
      }
    }, [disabled]);

    // 获取当前光标应该在哪个位置
    const cursorIndex = Math.min(inputValue.length, formatInfo.inputCount - 1);

    const classNames = [
      'apron-input-otp',
      `apron-input-otp--${size}`,
      square && 'apron-input-otp--square',
      isFocused && 'apron-input-otp--focused',
      disabled && 'apron-input-otp--disabled',
      status !== 'default' && `apron-input-otp--${status}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={classNames} onClick={handleContainerClick}>
        {/* 隐藏的实际输入框 */}
        <input
          ref={inputRef}
          type={type === 'number' ? 'tel' : 'text'}
          inputMode={type === 'number' ? 'numeric' : 'text'}
          pattern={type === 'number' ? '[0-9]*' : undefined}
          className="apron-input-otp__hidden-input"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          autoComplete="one-time-code"
          {...props}
        />

        {/* 展示框 */}
        <div className="apron-input-otp__display">
          {formatInfo.slots.map((slot, idx) => {
            if (slot.type === 'separator') {
              return (
                <span key={idx} className="apron-input-otp__separator">
                  {slot.char}
                </span>
              );
            }

            const inputIdx = slot.index!;
            const char = inputValue[inputIdx] || '';
            const isActive = isFocused && inputIdx === cursorIndex;
            const isFilled = char !== '';

            return (
              <span
                key={idx}
                className={[
                  'apron-input-otp__slot',
                  isActive && 'apron-input-otp__slot--active',
                  isFilled && 'apron-input-otp__slot--filled',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {char}
                {isActive && !isFilled && <span className="apron-input-otp__cursor" />}
              </span>
            );
          })}
        </div>
      </div>
    );
  }
);

InputOtp.displayName = 'InputOtp';

