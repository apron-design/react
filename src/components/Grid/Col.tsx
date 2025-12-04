import React, { forwardRef } from 'react';
import { useRowContext } from './Row';

type ColSpanType = number | string;

interface ColSize {
  span?: ColSpanType;
  offset?: number;
  order?: number;
  push?: number;
  pull?: number;
}

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 栅格占位格数，为 0 时相当于 display: none */
  span?: ColSpanType;
  /** 栅格左侧的间隔格数 */
  offset?: number;
  /** 栅格顺序 */
  order?: number;
  /** 栅格向右移动格数 */
  push?: number;
  /** 栅格向左移动格数 */
  pull?: number;
  /** flex 布局属性 */
  flex?: string | number;
  /** xs 屏幕 < 576px */
  xs?: ColSpanType | ColSize;
  /** sm 屏幕 ≥ 576px */
  sm?: ColSpanType | ColSize;
  /** md 屏幕 ≥ 768px */
  md?: ColSpanType | ColSize;
  /** lg 屏幕 ≥ 992px */
  lg?: ColSpanType | ColSize;
  /** xl 屏幕 ≥ 1200px */
  xl?: ColSpanType | ColSize;
  /** xxl 屏幕 ≥ 1600px */
  xxl?: ColSpanType | ColSize;
  /** 子元素 */
  children?: React.ReactNode;
}

const parseFlex = (flex: string | number): string => {
  if (typeof flex === 'number') {
    return `${flex} ${flex} auto`;
  }
  
  if (/^\d+(\.\d+)?(px|em|rem|%|vw|vh)?$/.test(flex)) {
    return `0 0 ${flex}`;
  }
  
  return flex;
};

export const Col = forwardRef<HTMLDivElement, ColProps>(
  (
    {
      span,
      offset,
      order,
      push,
      pull,
      flex,
      xs,
      sm,
      md,
      lg,
      xl,
      xxl,
      className,
      style,
      children,
      ...rest
    },
    ref
  ) => {
    const { gutter } = useRowContext();
    const [horizontalGutter] = gutter;

    // 生成响应式类名
    const sizeClassNames: string[] = [];
    
    const sizes = { xs, sm, md, lg, xl, xxl };
    
    Object.entries(sizes).forEach(([size, value]) => {
      if (value === undefined) return;
      
      if (typeof value === 'number' || typeof value === 'string') {
        if (Number(value) > 0) {
          sizeClassNames.push(`apron-col-${size}-${value}`);
        } else if (Number(value) === 0) {
          sizeClassNames.push(`apron-col-${size}-0`);
        }
      } else if (typeof value === 'object') {
        const sizeProps = value as ColSize;
        if (sizeProps.span !== undefined) {
          sizeClassNames.push(`apron-col-${size}-${sizeProps.span}`);
        }
        if (sizeProps.offset !== undefined) {
          sizeClassNames.push(`apron-col-${size}-offset-${sizeProps.offset}`);
        }
        if (sizeProps.order !== undefined) {
          sizeClassNames.push(`apron-col-${size}-order-${sizeProps.order}`);
        }
        if (sizeProps.push !== undefined) {
          sizeClassNames.push(`apron-col-${size}-push-${sizeProps.push}`);
        }
        if (sizeProps.pull !== undefined) {
          sizeClassNames.push(`apron-col-${size}-pull-${sizeProps.pull}`);
        }
      }
    });

    const classNames = [
      'apron-col',
      span !== undefined && `apron-col-${span}`,
      offset !== undefined && `apron-col-offset-${offset}`,
      order !== undefined && `apron-col-order-${order}`,
      push !== undefined && `apron-col-push-${push}`,
      pull !== undefined && `apron-col-pull-${pull}`,
      ...sizeClassNames,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const colStyle: React.CSSProperties = {
      ...style,
      ...(horizontalGutter > 0 && {
        paddingLeft: horizontalGutter / 2,
        paddingRight: horizontalGutter / 2,
      }),
      ...(flex && {
        flex: parseFlex(flex),
      }),
    };

    return (
      <div ref={ref} className={classNames} style={colStyle} {...rest}>
        {children}
      </div>
    );
  }
);

Col.displayName = 'Col';

export default Col;

