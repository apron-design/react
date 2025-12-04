import React, { forwardRef, createContext, useContext } from 'react';

export type Gutter = number | [number, number];

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 栅格间隔，可以是数字或数组 [水平间距, 垂直间距] */
  gutter?: Gutter | { xs?: Gutter; sm?: Gutter; md?: Gutter; lg?: Gutter; xl?: Gutter; xxl?: Gutter };
  /** 水平排列方式 */
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
  /** 垂直对齐方式 */
  align?: 'top' | 'middle' | 'bottom' | 'stretch';
  /** 是否自动换行 */
  wrap?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
}

export interface RowContextState {
  gutter: [number, number];
}

export const RowContext = createContext<RowContextState>({ gutter: [0, 0] });

export const useRowContext = () => useContext(RowContext);

const normalizeGutter = (gutter: Gutter | undefined): [number, number] => {
  if (gutter === undefined) return [0, 0];
  if (typeof gutter === 'number') return [gutter, 0];
  return gutter;
};

export const Row = forwardRef<HTMLDivElement, RowProps>(
  (
    {
      gutter = 0,
      justify = 'start',
      align = 'top',
      wrap = true,
      className,
      style,
      children,
      ...rest
    },
    ref
  ) => {
    // 处理 gutter
    let gutterValue: [number, number] = [0, 0];
    
    if (typeof gutter === 'object' && !Array.isArray(gutter)) {
      // 响应式 gutter，这里简化处理，实际应该根据屏幕宽度选择
      // 在 SSR 环境中默认使用最小断点
      const responsiveGutter = gutter as { xs?: Gutter; sm?: Gutter; md?: Gutter; lg?: Gutter; xl?: Gutter; xxl?: Gutter };
      gutterValue = normalizeGutter(
        responsiveGutter.xs || responsiveGutter.sm || responsiveGutter.md || 
        responsiveGutter.lg || responsiveGutter.xl || responsiveGutter.xxl
      );
    } else {
      gutterValue = normalizeGutter(gutter as Gutter);
    }

    const [horizontalGutter, verticalGutter] = gutterValue;

    const classNames = [
      'apron-row',
      justify !== 'start' && `apron-row--justify-${justify}`,
      align !== 'top' && `apron-row--align-${align}`,
      !wrap && 'apron-row--no-wrap',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const rowStyle: React.CSSProperties = {
      ...style,
      ...(horizontalGutter > 0 && {
        marginLeft: -horizontalGutter / 2,
        marginRight: -horizontalGutter / 2,
      }),
      ...(verticalGutter > 0 && {
        rowGap: verticalGutter,
      }),
    };

    return (
      <RowContext.Provider value={{ gutter: gutterValue }}>
        <div ref={ref} className={classNames} style={rowStyle} {...rest}>
          {children}
        </div>
      </RowContext.Provider>
    );
  }
);

Row.displayName = 'Row';

export default Row;

