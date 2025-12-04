import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import './Input.scss';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'prefix'> {
  /** 输入框类型 */
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  /** 是否显示清除按钮 */
  clearable?: boolean;
  /** 清除时的回调 */
  onClear?: () => void;
  /** 输入框前置内容（内部） */
  prepend?: ReactNode;
  /** 输入框后置内容（内部） */
  append?: ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
}

// 清除图标
const ClearIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 18.75C5.175 18.75 1.25 14.825 1.25 10C1.25 5.175 5.175 1.25 10 1.25C14.825 1.25 18.75 5.175 18.75 10C18.75 14.825 14.825 18.75 10 18.75ZM10 2.50562C5.8675 2.50562 2.50562 5.8675 2.50562 10C2.50562 14.1319 5.8675 17.4944 10 17.4944C14.1319 17.4944 17.4944 14.1319 17.4944 10C17.4944 5.8675 14.1319 2.50562 10 2.50562Z" fill="currentColor"/>
    <path d="M10.8799 10.0269L13.5824 7.35376C13.828 7.11126 13.8299 6.71563 13.5874 6.47001C13.3449 6.22438 12.9486 6.22251 12.7036 6.46501L9.99739 9.14125L7.33238 6.46813C7.08801 6.22376 6.69301 6.22251 6.44863 6.46688C6.20426 6.71063 6.20363 7.10626 6.44738 7.35063L9.10864 10.02L6.42551 12.6744C6.17988 12.9175 6.17801 13.3125 6.42051 13.5581C6.54301 13.6819 6.70363 13.7437 6.86488 13.7437C7.02363 13.7437 7.18238 13.6831 7.30426 13.5631L9.99114 10.9056L12.6999 13.6231C12.8218 13.7456 12.9818 13.8069 13.1424 13.8069C13.3024 13.8069 13.4618 13.7456 13.5836 13.6244C13.828 13.3806 13.8286 12.9856 13.5849 12.7406L10.8799 10.0269Z" fill="currentColor"/>
  </svg>
);

// 显示密码图标（眼睛打开）
const EyeOpenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 3.99998C14.7448 3.99998 19.2 7.00559 19.2 9.99999C19.2 12.9944 14.7448 16 10 16C5.2552 16 0.800003 12.9944 0.800003 9.99999C0.800003 7.00559 5.2552 3.99998 10 3.99998ZM10 5.19999C5.8408 5.19999 2 7.79119 2 9.99999C2 12.2088 5.8408 14.8 10 14.8C14.1592 14.8 18 12.2088 18 9.99999C18 7.79119 14.1592 5.19999 10 5.19999ZM10 6.59999C10.4465 6.59999 10.8886 6.68793 11.3011 6.8588C11.7136 7.02966 12.0884 7.2801 12.4042 7.59582C12.7199 7.91154 12.9703 8.28636 13.1412 8.69886C13.3121 9.11137 13.4 9.55349 13.4 9.99999C13.4 10.4465 13.3121 10.8886 13.1412 11.3011C12.9703 11.7136 12.7199 12.0884 12.4042 12.4042C12.0884 12.7199 11.7136 12.9703 11.3011 13.1412C10.8886 13.312 10.4465 13.4 10 13.4C9.09827 13.4 8.23346 13.0418 7.59584 12.4042C6.95822 11.7665 6.6 10.9017 6.6 9.99999C6.6 9.09825 6.95822 8.23345 7.59584 7.59582C8.23346 6.9582 9.09827 6.59999 10 6.59999ZM10 7.79999C9.41653 7.79999 8.85695 8.03177 8.44437 8.44435C8.03179 8.85693 7.8 9.41651 7.8 9.99999C7.8 10.5835 8.03179 11.143 8.44437 11.5556C8.85695 11.9682 9.41653 12.2 10 12.2C10.5835 12.2 11.1431 11.9682 11.5556 11.5556C11.9682 11.143 12.2 10.5835 12.2 9.99999C12.2 9.41651 11.9682 8.85693 11.5556 8.44435C11.1431 8.03177 10.5835 7.79999 10 7.79999Z" fill="currentColor"/>
  </svg>
);

// 隐藏密码图标（眼睛关闭）
const EyeClosedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.99979 12.4455C6.64524 12.4455 3.29524 11.4227 0.908882 9.38184C0.771451 9.26128 0.687539 9.09107 0.675605 8.90865C0.663671 8.72623 0.724692 8.54654 0.845245 8.40911C0.965798 8.27168 1.13601 8.18777 1.31843 8.17583C1.50085 8.1639 1.68054 8.22492 1.81797 8.34547C6.02706 11.9818 13.9907 11.9818 18.1816 8.34547C18.319 8.22492 18.4987 8.1639 18.6812 8.17583C18.8636 8.18777 19.0338 8.27168 19.1543 8.40911C19.2749 8.54654 19.3359 8.72623 19.324 8.90865C19.312 9.09107 19.2281 9.26128 19.0907 9.38184C16.7043 11.4227 13.3543 12.4455 9.99979 12.4455Z" fill="currentColor"/>
    <path d="M7.50893 15.4546C7.46815 15.4591 7.42699 15.4591 7.3862 15.4546C7.29301 15.4418 7.2035 15.4098 7.12336 15.3605C7.04323 15.3112 6.97424 15.2458 6.92079 15.1684C6.86734 15.091 6.83059 15.0033 6.8129 14.9109C6.79521 14.8186 6.79695 14.7235 6.81802 14.6318L7.27257 11.95C7.28809 11.8605 7.32109 11.7749 7.36969 11.6981C7.4183 11.6213 7.48155 11.5548 7.55583 11.5025C7.63012 11.4502 7.71399 11.413 7.80265 11.393C7.89131 11.3731 7.98303 11.3709 8.07257 11.3864C8.1621 11.4019 8.24771 11.4349 8.32449 11.4835C8.40127 11.5321 8.46773 11.5954 8.52007 11.6696C8.57241 11.7439 8.6096 11.8278 8.62953 11.9165C8.64946 12.0051 8.65172 12.0968 8.6362 12.1864L8.18166 14.8682C8.15871 15.0305 8.07809 15.179 7.95455 15.2867C7.83101 15.3944 7.67281 15.454 7.50893 15.4546ZM17.7271 14.0909C17.6372 14.0907 17.5482 14.0726 17.4655 14.0374C17.3827 14.0023 17.3079 13.9509 17.2453 13.8864L15.0044 11.6136C14.9335 11.552 14.8761 11.4764 14.8358 11.3915C14.7955 11.3066 14.7732 11.2144 14.7702 11.1204C14.7673 11.0265 14.7838 10.933 14.8187 10.8458C14.8536 10.7586 14.9061 10.6795 14.973 10.6135C15.0399 10.5476 15.1197 10.4962 15.2074 10.4625C15.2952 10.4289 15.3889 10.4137 15.4827 10.418C15.5766 10.4222 15.6686 10.4459 15.7528 10.4874C15.8371 10.5289 15.9119 10.5873 15.9726 10.6591L18.2135 12.9318C18.3412 13.0597 18.4129 13.233 18.4129 13.4136C18.4129 13.5943 18.3412 13.7676 18.2135 13.8955C18.0823 14.0203 17.9082 14.0903 17.7271 14.0909ZM2.27257 14.0909C2.1025 14.0825 1.94115 14.0131 1.81802 13.8955C1.69034 13.7676 1.61862 13.5943 1.61862 13.4136C1.61862 13.233 1.69034 13.0597 1.81802 12.9318L4.05893 10.6591C4.1161 10.5768 4.1907 10.5082 4.27741 10.458C4.36413 10.4079 4.46083 10.3775 4.56064 10.3689C4.66045 10.3604 4.76091 10.3739 4.85489 10.4086C4.94886 10.4433 5.03404 10.4983 5.10436 10.5696C5.17469 10.6409 5.22842 10.7269 5.26176 10.8214C5.29509 10.9158 5.30719 11.0165 5.29722 11.1162C5.28724 11.2158 5.25542 11.3121 5.20402 11.3981C5.15262 11.4841 5.08291 11.5577 4.99984 11.6136L2.75893 13.8864C2.69583 13.9515 2.62022 14.0032 2.53664 14.0383C2.45306 14.0735 2.36324 14.0914 2.27257 14.0909ZM12.5226 15.4546C12.3628 15.4538 12.2084 15.3969 12.0863 15.2939C11.9641 15.1909 11.8821 15.0483 11.8544 14.8909L11.3998 12.2091C11.3692 12.1171 11.3585 12.0197 11.3685 11.9233C11.3785 11.8268 11.4089 11.7337 11.4578 11.6499C11.5066 11.5662 11.5728 11.4939 11.6518 11.4377C11.7308 11.3816 11.8209 11.3429 11.9161 11.3243C12.0112 11.3058 12.1092 11.3077 12.2035 11.33C12.2979 11.3523 12.3864 11.3945 12.4631 11.4537C12.5399 11.5129 12.6031 11.5878 12.6487 11.6734C12.6942 11.759 12.7209 11.8533 12.7271 11.95L13.1817 14.6318C13.198 14.7199 13.1967 14.8104 13.1779 14.898C13.159 14.9856 13.123 15.0686 13.0718 15.1421C13.0206 15.2157 12.9554 15.2784 12.8799 15.3265C12.8043 15.3747 12.7199 15.4074 12.6317 15.4227C12.5965 15.437 12.5599 15.4477 12.5226 15.4546Z" fill="currentColor"/>
  </svg>
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      clearable = false,
      onClear,
      prepend,
      append,
      disabled = false,
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
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const [showPassword, setShowPassword] = useState(false);

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

    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : internalValue;
    const hasValue = String(inputValue).length > 0;
    const isActive = isFocused || hasValue;
    const isPassword = type === 'password';
    const actualType = isPassword && showPassword ? 'text' : type;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
          setInternalValue(e.target.value);
        }
        onChange?.(e);
      },
      [isControlled, onChange]
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
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
      if (inputRef.current) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set;
        nativeInputValueSetter?.call(inputRef.current, '');
        const event = new Event('input', { bubbles: true });
        inputRef.current.dispatchEvent(event);
      }
      inputRef.current?.focus();
    }, [isControlled, onClear]);

    const togglePasswordVisibility = useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    const classNames = [
      'apron-input',
      isActive && 'apron-input--active',
      disabled && 'apron-input--disabled',
      prepend && 'apron-input--has-prepend',
      append && 'apron-input--has-append',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const renderPrepend = () => {
      if (!prepend) return null;
      const isString = typeof prepend === 'string';
      return (
        <span
          className={`apron-input__prepend ${isString ? 'apron-input__prepend--string' : ''}`}
        >
          {prepend}
        </span>
      );
    };

    const renderAppend = () => {
      if (!append) return null;
      const isString = typeof append === 'string';
      return (
        <span
          className={`apron-input__append ${isString ? 'apron-input__append--string' : ''}`}
        >
          {append}
        </span>
      );
    };

    const renderSuffix = () => {
      const showClear = clearable && hasValue && !disabled;
      const showPasswordToggle = isPassword && !disabled;

      if (!showClear && !showPasswordToggle) return null;

      return (
        <span className="apron-input__suffix">
          {showPasswordToggle && (
            <button
              type="button"
              className="apron-input__icon-btn"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
            </button>
          )}
          {showClear && (
            <button
              type="button"
              className="apron-input__icon-btn apron-input__clear-btn"
              onClick={handleClear}
              tabIndex={-1}
            >
              <ClearIcon />
            </button>
          )}
        </span>
      );
    };

    return (
      <div className={classNames}>
        {renderPrepend()}
        <input
          ref={inputRef}
          type={actualType}
          className="apron-input__inner"
          value={inputValue}
          disabled={disabled}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {renderAppend()}
        {renderSuffix()}
      </div>
    );
  }
);

Input.displayName = 'Input';

