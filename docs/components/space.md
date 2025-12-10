---
title: Space 间距
group: 通用组件
order: 0
---

# Space 间距

Space 组件用于在组件之间添加统一的间距，简化布局代码。

## 何时使用

- 需要在多个组件之间添加统一间距时
- 希望简化布局代码，避免手动设置 margin 或 gap 时
- 需要灵活控制间距方向和大小时

## 示例

### 基础用法

最简单的 Space 组件使用方式。

```jsx
import { Space } from '@apron-design/react';

// 示例盒子组件
const Box = ({ children, style }) => (
  <div
    style={{
      padding: '8px 16px',
      backgroundColor: '#4C9EEA',
      color: '#fff',
      borderRadius: '4px',
      ...style,
    }}
  >
    {children}
  </div>
);

export default function BasicSpace() {
  return (
    <Space>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Space>
  );
}
```

### 间距方向

Space 组件支持水平和垂直两种方向。

#### 水平方向（默认）

```jsx
import { Space } from '@apron-design/react';

const Box = ({ children, style }) => (
  <div
    style={{
      padding: '8px 16px',
      backgroundColor: '#4C9EEA',
      color: '#fff',
      borderRadius: '4px',
      ...style,
    }}
  >
    {children}
  </div>
);

export default function HorizontalSpace() {
  return (
    <Space orientation="horizontal">
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Space>
  );
}
```

#### 垂直方向

```jsx
import { Space } from '@apron-design/react';

const Box = ({ children, style }) => (
  <div
    style={{
      padding: '8px 16px',
      backgroundColor: '#4C9EEA',
      color: '#fff',
      borderRadius: '4px',
      ...style,
    }}
  >
    {children}
  </div>
);

export default function VerticalSpace() {
  return (
    <Space orientation="vertical">
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Space>
  );
}
```

### 间距大小

Space 组件提供多种预设间距大小，也支持自定义数值。

#### 小间距 (8px)

```jsx
import { Space } from '@apron-design/react';

const Box = ({ children, style }) => (
  <div
    style={{
      padding: '8px 16px',
      backgroundColor: '#4C9EEA',
      color: '#fff',
      borderRadius: '4px',
      ...style,
    }}
  >
    {children}
  </div>
);

export default function SizeSmallSpace() {
  return (
    <Space size="small">
      <Box>Small</Box>
      <Box>Small</Box>
      <Box>Small</Box>
    </Space>
  );
}
```

#### 中间距 (16px) - 默认

```jsx
import { Space } from '@apron-design/react';

const Box = ({ children, style }) => (
  <div
    style={{
      padding: '8px 16px',
      backgroundColor: '#4C9EEA',
      color: '#fff',
      borderRadius: '4px',
      ...style,
    }}
  >
    {children}
  </div>
);

export default function SizeMiddleSpace() {
  return (
    <Space size="middle">
      <Box>Middle</Box>
      <Box>Middle</Box>
      <Box>Middle</Box>
    </Space>
  );
}
```

#### 大间距 (24px)

```jsx
import { Space } from '@apron-design/react';

const Box = ({ children, style }) => (
  <div
    style={{
      padding: '8px 16px',
      backgroundColor: '#4C9EEA',
      color: '#fff',
      borderRadius: '4px',
      ...style,
    }}
  >
    {children}
  </div>
);

export default function SizeLargeSpace() {
  return (
    <Space size="large">
      <Box>Large</Box>
      <Box>Large</Box>
      <Box>Large</Box>
    </Space>
  );
}
```

#### 自定义间距 (32px)

```jsx
import { Space } from '@apron-design/react';

const Box = ({ children, style }) => (
  <div
    style={{
      padding: '8px 16px',
      backgroundColor: '#4C9EEA',
      color: '#fff',
      borderRadius: '4px',
      ...style,
    }}
  >
    {children}
  </div>
);

export default function SizeCustomSpace() {
  return (
    <Space size={32}>
      <Box>Custom 32px</Box>
      <Box>Custom 32px</Box>
      <Box>Custom 32px</Box>
    </Space>
  );
}
```

#### 间距大小对比

```jsx
import { Space } from '@apron-design/react';

const Box = ({ children, style }) => (
  <div
    style={{
      padding: '8px 16px',
      backgroundColor: '#4C9EEA',
      color: '#fff',
      borderRadius: '4px',
      ...style,
    }}
  >
    {children}
  </div>
);

export default function AllSizesSpace() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>Small (8px)</p>
        <Space size="small">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </Space>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>Middle (16px) - 默认</p>
        <Space size="middle">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </Space>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>Large (24px)</p>
        <Space size="large">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </Space>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>Custom (40px)</p>
        <Space size={40}>
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </Space>
      </div>
    </div>
  );
}
```

### 对齐方式

Space 组件支持多种对齐方式。

#### 顶部对齐

```jsx
import { Space } from '@apron-design/react';

const Box = ({ children, style }) => (
  <div
    style={{
      padding: '8px 16px',
      backgroundColor: '#4C9EEA',
      color: '#fff',
      borderRadius: '4px',
      ...style,
    }}
  >
    {children}
  </div>
);

export default function AlignStartSpace() {
  return (
    <Space align="start">
      <Box style={{ height: '40px' }}>Short</Box>
      <Box style={{ height: '60px' }}>Medium</Box>
      <Box style={{ height: '80px' }}>Tall</Box>
    </Space>
  );
}
```

#### 居中对齐

```jsx
import { Space } from '@apron-design/react';

const Box = ({ children, style }) => (
  <div
    style={{
      padding: '8px 16px',
      backgroundColor: '#4C9EEA',
      color: '#fff',
      borderRadius: '4px',
      ...style,
    }}
  >
    {children}
  </div>
);

export default function AlignCenterSpace() {
  return (
    <Space align="center">
      <Box style={{ height: '40px' }}>Short</Box>
      <Box style={{ height: '60px' }}>Medium</Box>
      <Box style={{ height: '80px' }}>Tall</Box>
    </Space>
  );
}
```

#### 底部对齐

```jsx
import { Space } from '@apron-design/react';

const Box = ({ children, style }) => (
  <div
    style={{
      padding: '8px 16px',
      backgroundColor: '#4C9EEA',
      color: '#fff',
      borderRadius: '4px',
      ...style,
    }}
  >
    {children}
  </div>
);

export default function AlignEndSpace() {
  return (
    <Space align="end">
      <Box style={{ height: '40px' }}>Short</Box>
      <Box style={{ height: '60px' }}>Medium</Box>
      <Box style={{ height: '80px' }}>Tall</Box>
    </Space>
  );
}
```

#### 基线对齐

```jsx
import { Space } from '@apron-design/react';

const Box = ({ children, style }) => (
  <div
    style={{
      padding: '8px 16px',
      backgroundColor: '#4C9EEA',
      color: '#fff',
      borderRadius: '4px',
      ...style,
    }}
  >
    {children}
  </div>
);

export default function AlignBaselineSpace() {
  return (
    <Space align="baseline">
      <Box style={{ fontSize: '12px' }}>12px</Box>
      <Box style={{ fontSize: '16px' }}>16px</Box>
      <Box style={{ fontSize: '24px' }}>24px</Box>
    </Space>
  );
}
```

#### 对齐方式对比

```jsx
import { Space } from '@apron-design/react';

const Box = ({ children, style }) => (
  <div
    style={{
      padding: '8px 16px',
      backgroundColor: '#4C9EEA',
      color: '#fff',
      borderRadius: '4px',
      ...style,
    }}
  >
    {children}
  </div>
);

export default function AllAlignmentsSpace() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>Start</p>
        <Space align="start">
          <Box style={{ height: '40px' }}>A</Box>
          <Box style={{ height: '60px' }}>B</Box>
          <Box style={{ height: '80px' }}>C</Box>
        </Space>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>Center</p>
        <Space align="center">
          <Box style={{ height: '40px' }}>A</Box>
          <Box style={{ height: '60px' }}>B</Box>
          <Box style={{ height: '80px' }}>C</Box>
        </Space>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>End</p>
        <Space align="end">
          <Box style={{ height: '40px' }}>A</Box>
          <Box style={{ height: '60px' }}>B</Box>
          <Box style={{ height: '80px' }}>C</Box>
        </Space>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>Baseline</p>
        <Space align="baseline">
          <Box style={{ fontSize: '12px' }}>12px</Box>
          <Box style={{ fontSize: '16px' }}>16px</Box>
          <Box style={{ fontSize: '24px' }}>24px</Box>
        </Space>
      </div>
    </div>
  );
}
```

### 自动换行

Space 组件支持自动换行功能。

#### 自动换行

```jsx
import { Space } from '@apron-design/react';

const Box = ({ children, style }) => (
  <div
    style={{
      padding: '8px 16px',
      backgroundColor: '#4C9EEA',
      color: '#fff',
      borderRadius: '4px',
      ...style,
    }}
  >
    {children}
  </div>
);

export default function WrapSpace() {
  return (
    <div style={{ width: '300px', border: '1px dashed #d4d4d8', padding: '16px' }}>
      <Space wrap>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
        <Box>Item 4</Box>
        <Box>Item 5</Box>
        <Box>Item 6</Box>
        <Box>Item 7</Box>
        <Box>Item 8</Box>
      </Space>
    </div>
  );
}
```

#### 不换行

```jsx
import { Space } from '@apron-design/react';

const Box = ({ children, style }) => (
  <div
    style={{
      padding: '8px 16px',
      backgroundColor: '#4C9EEA',
      color: '#fff',
      borderRadius: '4px',
      ...style,
    }}
  >
    {children}
  </div>
);

export default function NoWrapSpace() {
  return (
    <div style={{ width: '300px', border: '1px dashed #d4d4d8', padding: '16px', overflow: 'auto' }}>
      <Space wrap={false}>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
        <Box>Item 4</Box>
        <Box>Item 5</Box>
        <Box>Item 6</Box>
        <Box>Item 7</Box>
        <Box>Item 8</Box>
      </Space>
    </div>
  );
}
```

### 使用场景

#### 按钮组

```jsx
import { Space, Button } from '@apron-design/react';

export default function WithButtonsSpace() {
  return (
    <Space>
      <Button variant="primary">确认</Button>
      <Button variant="secondary">取消</Button>
      <Button variant="text">重置</Button>
    </Space>
  );
}
```

#### 垂直表单布局

```jsx
import { Space, Button } from '@apron-design/react';

export default function VerticalFormSpace() {
  return (
    <Space orientation="vertical" size="large" align="start">
      <div>
        <label style={{ display: 'block', marginBottom: '4px', color: '#393939' }}>用户名</label>
        <input
          type="text"
          placeholder="请输入用户名"
          style={{
            padding: '8px 12px',
            border: '1px solid #d4d4d8',
            borderRadius: '4px',
            width: '200px',
          }}
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', color: '#393939' }}>密码</label>
        <input
          type="password"
          placeholder="请输入密码"
          style={{
            padding: '8px 12px',
            border: '1px solid #d4d4d8',
            borderRadius: '4px',
            width: '200px',
          }}
        />
      </div>
      <Space>
        <Button variant="primary">登录</Button>
        <Button variant="secondary">注册</Button>
      </Space>
    </Space>
  );
}
```

#### 完整概览

```jsx
import { Space, Button } from '@apron-design/react';

const Box = ({ children, style }) => (
  <div
    style={{
      padding: '8px 16px',
      backgroundColor: '#4C9EEA',
      color: '#fff',
      borderRadius: '4px',
      ...style,
    }}
  >
    {children}
  </div>
);

export default function OverviewSpace() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Orientation */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>方向</h3>
        <div style={{ display: 'flex', gap: '48px' }}>
          <div>
            <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>水平（默认）</p>
            <Space orientation="horizontal">
              <Box>A</Box>
              <Box>B</Box>
              <Box>C</Box>
            </Space>
          </div>
          <div>
            <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>垂直</p>
            <Space orientation="vertical">
              <Box>A</Box>
              <Box>B</Box>
              <Box>C</Box>
            </Space>
          </div>
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>间距大小</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Space size="small">
            <Box>Small</Box>
            <Box>8px</Box>
          </Space>
          <Space size="middle">
            <Box>Middle</Box>
            <Box>16px</Box>
          </Space>
          <Space size="large">
            <Box>Large</Box>
            <Box>24px</Box>
          </Space>
        </div>
      </div>

      {/* Wrap */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>自动换行</h3>
        <div style={{ width: '250px', border: '1px dashed #d4d4d8', padding: '12px' }}>
          <Space wrap size="small">
            <Box>Tag 1</Box>
            <Box>Tag 2</Box>
            <Box>Tag 3</Box>
            <Box>Tag 4</Box>
            <Box>Tag 5</Box>
          </Space>
        </div>
      </div>
    </div>
  );
}
```

## API

### Space Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | 对齐方式 | `'start'` \| `'end'` \| `'center'` \| `'baseline'` | - |
| orientation | 间距方向 | `'horizontal'` \| `'vertical'` | `'horizontal'` |
| size | 间距大小 | `'small'` \| `'middle'` \| `'large'` \| number | `'middle'` |
| wrap | 是否自动换行（仅 horizontal 时有效） | boolean | `false` |
| children | 子元素 | ReactNode | - |
| className | 自定义类名 | string | - |
| style | 自定义样式 | CSSProperties | - |

## 注意事项

1. Space 组件主要用于在组件之间添加统一的间距，简化布局代码
2. 通过 `orientation` 属性可以设置间距方向：
   - `horizontal`（默认）：水平方向添加间距
   - `vertical`：垂直方向添加间距
3. 通过 `size` 属性可以设置间距大小：
   - 预设值：`'small'`（8px）、`'middle'`（16px，默认）、`'large'`（24px）
   - 自定义数值：可以直接传入数字作为间距值（单位：px）
4. 通过 `align` 属性可以设置对齐方式：
   - `'start'`：顶部对齐
   - `'center'`：居中对齐
   - `'end'`：底部对齐
   - `'baseline'`：基线对齐
5. 通过 `wrap` 属性可以控制是否自动换行（仅在水平方向时有效）
6. Space 组件会自动过滤掉空的子元素（如 null、undefined 等）
7. Space 组件使用 CSS Flexbox 实现，具有良好的浏览器兼容性