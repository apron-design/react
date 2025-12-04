import React, { useState, useCallback, useMemo } from 'react';
import './Rate.scss';

export interface RateProps {
  /** 当前值 */
  value?: number;
  /** 默认值 */
  defaultValue?: number;
  /** 星星总数 */
  count?: number;
  /** 是否允许交互（设置模式） */
  allowControl?: boolean;
  /** 是否允许半星（仅设置模式有效） */
  allowHalf?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示数值 */
  showValue?: boolean;
  /** 值改变时的回调 */
  onChange?: (value: number) => void;
  /** 自定义类名 */
  className?: string;
}

// 黄色实心星星（已选中）
const StarFull = () => (
  <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip-star-full)">
      <path d="M12.0684 1.42766L14.3166 6.1909C14.4912 6.55826 14.8262 6.81354 15.2155 6.87259L20.245 7.6362C21.2216 7.7848 21.6133 9.04077 20.9055 9.76132L17.2655 13.4697C16.9847 13.755 16.8573 14.1678 16.9234 14.5713L17.7821 19.8074C17.9495 20.824 16.9269 21.6011 16.0528 21.1212L11.5542 18.6494C11.2075 18.4583 10.7922 18.4583 10.4456 18.6494L5.94682 21.1212C5.07274 21.6011 4.05012 20.824 4.21763 19.8074L5.07633 14.5713C5.14291 14.1678 5.01437 13.7551 4.73364 13.4697L1.09473 9.76132C0.387072 9.04077 0.777494 7.7847 1.75524 7.6362L6.78418 6.87259C7.17226 6.81364 7.50782 6.55828 7.68179 6.1909L9.93048 1.42766C10.3682 0.501896 11.6319 0.501896 12.0684 1.42766Z" fill="#EFBB47"/>
    </g>
    <defs>
      <clipPath id="clip-star-full">
        <rect width="22" height="22" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

// 空心星星（展示模式未选中）
const StarEmpty = () => (
  <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip-star-empty)">
      <path d="M20.0181 7.45378L14.8627 6.65753C14.716 6.65753 14.6083 6.58078 14.5717 6.46806L12.3193 1.57781C12.175 1.27561 11.9573 1.04777 11.6663 0.896674C10.94 0.517733 10.067 0.819926 9.70498 1.57781L7.41828 6.42728C7.34496 6.50403 7.23727 6.61675 7.12729 6.61675L1.97189 7.41301C1.64653 7.48976 1.35553 7.64085 1.13786 7.8687C0.592535 8.47548 0.592535 9.46121 1.17452 10.0296L4.84058 13.819C4.9139 13.8934 4.98722 14.0469 4.95056 14.1596L4.07987 19.5031C4.00655 19.8053 4.07987 20.1483 4.22423 20.4505C4.58854 21.2084 5.45923 21.4746 6.18557 21.0956L10.7956 18.5558C10.9033 18.5174 11.05 18.5174 11.1577 18.5558L15.77 21.0956C16.0244 21.2467 16.3497 21.2851 16.6774 21.2467C17.477 21.0956 18.0201 20.3378 17.8757 19.5031L17.005 14.1596C17.005 14.0469 17.0417 13.8958 17.115 13.819L20.8177 10.0296C21.0721 9.80417 21.2164 9.49958 21.2531 9.15901C21.3608 8.32438 20.8177 7.5665 20.0181 7.45378ZM15.8433 12.6822C15.4607 13.0827 15.2499 13.6967 15.3553 14.2795L16.1893 19.3976L11.774 16.9681C11.2883 16.6779 10.6605 16.6779 10.177 16.9729L5.76168 19.4024L6.56134 14.2843C6.66445 13.7039 6.49031 13.0875 6.07329 12.687L2.52638 9.05828L7.46411 8.25963C8.05526 8.18528 8.54101 7.82313 8.78618 7.2787L10.9766 2.63308L13.1327 7.30988C13.4123 7.82073 13.8957 8.21646 14.4548 8.29081L19.3925 9.05348L15.8433 12.6822Z" fill="#F3F3F3"/>
    </g>
    <defs>
      <clipPath id="clip-star-empty">
        <rect width="22" height="22" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

// 灰色实心星星（设置模式未选中）
const StarGray = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip-star-gray)">
      <path d="M10.9713 1.29786L13.0151 5.62808C13.1738 5.96204 13.4784 6.19411 13.8323 6.2478L18.4045 6.94198C19.2924 7.07708 19.6484 8.21887 19.005 8.87391L15.6959 12.2452C15.4407 12.5046 15.3248 12.8798 15.3849 13.2466L16.1656 18.0067C16.3178 18.9309 15.3881 19.6374 14.5935 19.2011L10.5038 16.954C10.1887 16.7803 9.81114 16.7803 9.49597 16.954L5.4062 19.2011C4.61158 19.6374 3.68194 18.9309 3.83421 18.0067L4.61485 13.2466C4.67538 12.8798 4.55853 12.5046 4.30331 12.2452L0.995217 8.87391C0.351888 8.21887 0.706817 7.07699 1.59568 6.94198L6.16744 6.2478C6.52024 6.1942 6.8253 5.96206 6.98345 5.62808L9.02771 1.29786C9.42563 0.456255 10.5745 0.456255 10.9713 1.29786Z" fill="#F3F3F3"/>
    </g>
    <defs>
      <clipPath id="clip-star-gray">
        <rect width="20" height="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

export const Rate: React.FC<RateProps> = ({
  value,
  defaultValue = 0,
  count = 5,
  allowControl = false,
  allowHalf = false,
  disabled = false,
  showValue = false,
  onChange,
  className = '',
}) => {
  // 内部状态
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  // 判断是否为受控模式
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // 显示的值（hover 时显示 hover 值，否则显示当前值）
  const displayValue = hoverValue !== null ? hoverValue : currentValue;

  // 计算星星位置对应的值
  const getValueFromPosition = useCallback(
    (starIndex: number, isHalf: boolean) => {
      if (allowHalf && isHalf) {
        return starIndex + 0.5;
      }
      return starIndex + 1;
    },
    [allowHalf]
  );

  // 处理鼠标移动
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>, starIndex: number) => {
      if (!allowControl || disabled) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const isHalf = allowHalf && x < rect.width / 2;

      setHoverValue(getValueFromPosition(starIndex, isHalf));
    },
    [allowControl, disabled, allowHalf, getValueFromPosition]
  );

  // 处理鼠标离开
  const handleMouseLeave = useCallback(() => {
    if (!allowControl || disabled) return;
    setHoverValue(null);
  }, [allowControl, disabled]);

  // 处理点击
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>, starIndex: number) => {
      if (!allowControl || disabled) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const isHalf = allowHalf && x < rect.width / 2;

      const newValue = getValueFromPosition(starIndex, isHalf);

      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [allowControl, disabled, allowHalf, getValueFromPosition, isControlled, onChange]
  );

  // 渲染单个星星
  const renderStar = useCallback(
    (index: number) => {
      const starValue = index + 1;
      const halfStarValue = index + 0.5;

      // 计算填充比例
      let fillPercentage = 0;
      if (displayValue >= starValue) {
        fillPercentage = 100;
      } else if (displayValue >= halfStarValue) {
        fillPercentage = ((displayValue - index) / 1) * 100;
      }

      const isActive = fillPercentage > 0;
      const isPartial = fillPercentage > 0 && fillPercentage < 100;

      return (
        <span
          key={index}
          className={`apron-rate__star ${isActive ? 'apron-rate__star--active' : ''} ${
            allowControl && !disabled ? 'apron-rate__star--interactive' : ''
          }`}
          onMouseMove={(e) => handleMouseMove(e, index)}
          onClick={(e) => handleClick(e, index)}
        >
          {/* 底层：未选中的星星 */}
          <span className="apron-rate__star-bg">
            {allowControl ? <StarGray /> : <StarEmpty />}
          </span>

          {/* 上层：选中的星星（通过 clip 控制显示比例） */}
          {isActive && (
            <span
              className="apron-rate__star-fg"
              style={{
                clipPath: isPartial ? `inset(0 ${100 - fillPercentage}% 0 0)` : undefined,
              }}
            >
              <StarFull />
            </span>
          )}
        </span>
      );
    },
    [displayValue, allowControl, disabled, handleMouseMove, handleClick]
  );

  // 生成星星数组
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, index) => renderStar(index));
  }, [count, renderStar]);

  // 格式化显示的数值
  const formattedValue = displayValue.toFixed(1);

  const classNames = [
    'apron-rate',
    allowControl && 'apron-rate--interactive',
    disabled && 'apron-rate--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} onMouseLeave={handleMouseLeave}>
      <div className="apron-rate__stars">{stars}</div>
      {showValue && <span className="apron-rate__value">{formattedValue}</span>}
    </div>
  );
};

Rate.displayName = 'Rate';

