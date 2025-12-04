import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import './Input.scss';

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'prefix'> {
  /** 默认行数 */
  rows?: number;
  /** 是否显示清除按钮 */
  clearable?: boolean;
  /** 清除时的回调 */
  onClear?: () => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 最大字数限制，设置后显示字数计数 */
  max?: number;
}

// 清除图标
const ClearIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 18.75C5.175 18.75 1.25 14.825 1.25 10C1.25 5.175 5.175 1.25 10 1.25C14.825 1.25 18.75 5.175 18.75 10C18.75 14.825 14.825 18.75 10 18.75ZM10 2.50562C5.8675 2.50562 2.50562 5.8675 2.50562 10C2.50562 14.1319 5.8675 17.4944 10 17.4944C14.1319 17.4944 17.4944 14.1319 17.4944 10C17.4944 5.8675 14.1319 2.50562 10 2.50562Z" fill="currentColor"/>
    <path d="M10.8799 10.0269L13.5824 7.35376C13.828 7.11126 13.8299 6.71563 13.5874 6.47001C13.3449 6.22438 12.9486 6.22251 12.7036 6.46501L9.99739 9.14125L7.33238 6.46813C7.08801 6.22376 6.69301 6.22251 6.44863 6.46688C6.20426 6.71063 6.20363 7.10626 6.44738 7.35063L9.10864 10.02L6.42551 12.6744C6.17988 12.9175 6.17801 13.3125 6.42051 13.5581C6.54301 13.6819 6.70363 13.7437 6.86488 13.7437C7.02363 13.7437 7.18238 13.6831 7.30426 13.5631L9.99114 10.9056L12.6999 13.6231C12.8218 13.7456 12.9818 13.8069 13.1424 13.8069C13.3024 13.8069 13.4618 13.7456 13.5836 13.6244C13.828 13.3806 13.8286 12.9856 13.5849 12.7406L10.8799 10.0269Z" fill="currentColor"/>
  </svg>
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      rows = 3,
      clearable = false,
      onClear,
      disabled = false,
      max,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      className = '',
      ...props
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');

    // 合并 ref
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(textareaRef.current);
        } else {
          ref.current = textareaRef.current;
        }
      }
    }, [ref]);

    const isControlled = value !== undefined;
    const textareaValue = isControlled ? value : internalValue;
    const hasValue = String(textareaValue).length > 0;
    const isActive = isFocused || hasValue;
    const currentLength = String(textareaValue).length;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!isControlled) {
          setInternalValue(e.target.value);
        }
        onChange?.(e);
      },
      [isControlled, onChange]
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur]
    );

    const handleClear = useCallback(() => {
      if (!isControlled) {
        setInternalValue('');
      }
      onClear?.();
      // 触发 onChange 事件
      if (textareaRef.current) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLTextAreaElement.prototype,
          'value'
        )?.set;
        nativeInputValueSetter?.call(textareaRef.current, '');
        const event = new Event('input', { bubbles: true });
        textareaRef.current.dispatchEvent(event);
      }
      textareaRef.current?.focus();
    }, [isControlled, onClear]);

    const classNames = [
      'apron-textarea',
      isActive && 'apron-textarea--active',
      disabled && 'apron-textarea--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const showClear = clearable && hasValue && !disabled;
    const showFooter = showClear || max !== undefined;

    return (
      <div className={classNames}>
        <div className="apron-textarea__wrapper">
          <textarea
            ref={textareaRef}
            className="apron-textarea__inner"
            rows={rows}
            value={textareaValue}
            disabled={disabled}
            maxLength={max}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
        </div>
        {showFooter && (
          <div className="apron-textarea__footer">
            {max !== undefined && (
              <span className="apron-textarea__count">
                {currentLength}/{max}
              </span>
            )}
            {showClear && (
              <button
                type="button"
                className="apron-textarea__clear-btn"
                onClick={handleClear}
                tabIndex={-1}
              >
                <ClearIcon />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

