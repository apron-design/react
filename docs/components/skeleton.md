---
title: Skeleton 骨架屏
group: 反馈组件
order: 3
---

# Skeleton 骨架屏

骨架屏是一种用于在内容加载过程中提供视觉反馈的 UI 组件，通过显示占位元素来提升用户体验。

## 何时使用

- 页面或组件内容需要异步加载时
- 希望在内容加载过程中提供更好的用户体验时
- 需要减少页面闪烁和布局跳动时

## 示例

### 基础用法

最简单的骨架屏使用方式。

```jsx
import { Skeleton } from '@apron-design/react';

export default function BasicSkeleton() {
  return (
    <div style={{ width: '400px' }}>
      <Skeleton loading={true} />
    </div>
  );
}
```

### 与内容结合使用

骨架屏常与实际内容结合使用，在加载完成时切换显示。

```jsx
import { useState } from 'react';
import { Skeleton, Button } from '@apron-design/react';

export default function WithContentSkeleton() {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ width: '400px' }}>
      <Button onClick={() => setLoading(!loading)} style={{ marginBottom: '16px' }}>
        {loading ? '显示内容' : '显示骨架屏'}
      </Button>
      <Skeleton loading={loading}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="avatar"
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          />
          <div>
            <h4 style={{ margin: '0 0 8px 0' }}>用户名称</h4>
            <p style={{ margin: 0, color: '#666' }}>
              这是用户的个人简介，可以包含多行文本内容。
            </p>
          </div>
        </div>
      </Skeleton>
    </div>
  );
}
```

### 无动画效果

通过 `animated` 属性可以关闭骨架屏的动画效果。

```jsx
import { Skeleton } from '@apron-design/react';

export default function WithoutAnimationSkeleton() {
  return (
    <div style={{ width: '400px' }}>
      <Skeleton loading={true} animated={false} />
    </div>
  );
}
```

### 基础元素变体

Skeleton 提供了多种基础元素变体。

```jsx
import { Skeleton } from '@apron-design/react';

export default function ElementVariantsSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Text</p>
        <Skeleton.Element variant="text" width="100%" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Circular</p>
        <Skeleton.Element variant="circular" width={40} height={40} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Rectangular</p>
        <Skeleton.Element variant="rectangular" width="100%" height={100} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Rounded</p>
        <Skeleton.Element variant="rounded" width="100%" height={100} />
      </div>
    </div>
  );
}
```

### 头像骨架

用于显示用户头像的加载状态。

```jsx
import { Skeleton } from '@apron-design/react';

export default function AvatarSkeleton() {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Skeleton.Avatar size="sm" />
      <Skeleton.Avatar size="md" />
      <Skeleton.Avatar size="lg" />
      <Skeleton.Avatar size={64} />
      <Skeleton.Avatar size="md" shape="square" />
    </div>
  );
}
```

### 标题和段落骨架

用于显示标题和段落文本的加载状态。

```jsx
import { Skeleton } from '@apron-design/react';

export default function TitleAndParagraphSkeleton() {
  return (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Skeleton.Title />
      <Skeleton.Paragraph rows={3} />
    </div>
  );
}
```

### 段落宽度控制

可以自定义段落每一行的宽度。

```jsx
import { Skeleton } from '@apron-design/react';

export default function ParagraphWidthsSkeleton() {
  return (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>默认宽度</p>
        <Skeleton.Paragraph rows={4} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>自定义每行宽度</p>
        <Skeleton.Paragraph rows={4} width={['100%', '80%', '90%', '50%']} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>统一宽度</p>
        <Skeleton.Paragraph rows={4} width="80%" />
      </div>
    </div>
  );
}
```

### 按钮骨架

用于显示按钮的加载状态。

```jsx
import { Skeleton } from '@apron-design/react';

export default function ButtonSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Skeleton.Button size="sm" />
        <Skeleton.Button size="md" />
        <Skeleton.Button size="lg" />
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Skeleton.Button shape="default" />
        <Skeleton.Button shape="circle" />
        <Skeleton.Button shape="round" />
      </div>
      <div style={{ width: '300px' }}>
        <Skeleton.Button block />
      </div>
    </div>
  );
}
```

### 图片骨架

用于显示图片的加载状态。

```jsx
import { Skeleton } from '@apron-design/react';

export default function ImageSkeleton() {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Skeleton.Image width={100} height={100} />
      <Skeleton.Image width={150} height={100} />
      <Skeleton.Image width={200} height={150} />
    </div>
  );
}
```

### 卡片骨架

用于显示卡片组件的加载状态。

```jsx
import { Skeleton } from '@apron-design/react';

export default function CardSkeleton() {
  return (
    <div
      style={{
        width: '300px',
        padding: '16px',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
      }}
    >
      <Skeleton.Image width="100%" height={150} />
      <div style={{ marginTop: '16px' }}>
        <Skeleton.Title width="60%" />
        <div style={{ marginTop: '12px' }}>
          <Skeleton.Paragraph rows={2} />
        </div>
      </div>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <Skeleton.Button size="sm" />
        <Skeleton.Button size="sm" />
      </div>
    </div>
  );
}
```

### 列表骨架

用于显示列表项的加载状态。

```jsx
import { Skeleton } from '@apron-design/react';

export default function ListSkeleton() {
  return (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ display: 'flex', gap: '12px' }}>
          <Skeleton.Avatar />
          <div style={{ flex: 1 }}>
            <Skeleton.Title width="40%" />
            <div style={{ marginTop: '8px' }}>
              <Skeleton.Paragraph rows={2} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 表格骨架

用于显示表格的加载状态。

```jsx
import { Skeleton } from '@apron-design/react';

export default function TableSkeleton() {
  return (
    <div style={{ width: '600px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['ID', '名称', '状态', '操作'].map((header) => (
              <th
                key={header}
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #e0e0e0',
                  background: '#f5f5f5',
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                <Skeleton.Element variant="text" width={30} />
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                <Skeleton.Element variant="text" width={100} />
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                <Skeleton.Element variant="text" width={60} />
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                <Skeleton.Button size="sm" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### 个人信息卡片骨架

用于显示个人信息卡片的加载状态。

```jsx
import { Skeleton } from '@apron-design/react';

export default function ProfileCardSkeleton() {
  return (
    <div
      style={{
        width: '300px',
        padding: '24px',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Skeleton.Avatar size={80} />
      </div>
      <div style={{ marginTop: '16px' }}>
        <Skeleton.Title width="50%" />
      </div>
      <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center' }}>
        <Skeleton.Element variant="text" width={120} />
      </div>
      <div style={{ marginTop: '16px' }}>
        <Skeleton.Paragraph rows={2} width={['80%', '60%']} />
      </div>
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
        <Skeleton.Button shape="round" />
        <Skeleton.Button shape="round" />
      </div>
    </div>
  );
}
```

### 暗色模式

骨架屏在暗色模式下会自动适配主题颜色。

```jsx
import { Skeleton } from '@apron-design/react';

export default function DarkModeSkeleton() {
  return (
    <div
      data-theme="dark"
      style={{
        padding: '24px',
        backgroundColor: '#18181b',
        borderRadius: '12px',
        width: '400px',
      }}
    >
      <Skeleton loading={true} />
    </div>
  );
}
```

## API

### Skeleton Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 是否显示骨架屏 | boolean | `true` |
| animated | 是否显示动画 | boolean | `true` |
| children | 子元素（loading 为 false 时显示） | ReactNode | - |
| className | 自定义类名 | string | - |

### Skeleton.Element Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 形状 | `'text'` \| `'circular'` \| `'rectangular'` \| `'rounded'` | `'text'` |
| width | 宽度 | number \| string | - |
| height | 高度 | number \| string | - |
| animated | 是否显示动画 | boolean | `true` |
| className | 自定义类名 | string | - |
| style | 自定义样式 | CSSProperties | - |

### Skeleton.Avatar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 尺寸 | number \| `'sm'` \| `'md'` \| `'lg'` | `'md'` |
| shape | 形状 | `'circle'` \| `'square'` | `'circle'` |
| animated | 是否显示动画 | boolean | `true` |
| className | 自定义类名 | string | - |

### Skeleton.Title Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 宽度 | number \| string | `'40%'` |
| animated | 是否显示动画 | boolean | `true` |
| className | 自定义类名 | string | - |

### Skeleton.Paragraph Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rows | 行数 | number | `3` |
| width | 每行宽度，可以是数组 | number \| string \| (number \| string)[] | - |
| animated | 是否显示动画 | boolean | `true` |
| className | 自定义类名 | string | - |

### Skeleton.Button Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 尺寸 | `'sm'` \| `'md'` \| `'lg'` | `'md'` |
| shape | 形状 | `'default'` \| `'circle'` \| `'round'` | `'default'` |
| block | 是否块级 | boolean | `false` |
| animated | 是否显示动画 | boolean | `true` |
| className | 自定义类名 | string | - |

### Skeleton.Image Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 宽度 | number \| string | `200` |
| height | 高度 | number \| string | `200` |
| animated | 是否显示动画 | boolean | `true` |
| className | 自定义类名 | string | - |

## 注意事项

1. 骨架屏主要用于在内容加载过程中提供视觉反馈，提升用户体验
2. 通过 `loading` 属性控制是否显示骨架屏，当 `loading` 为 `false` 时会显示实际内容
3. 通过 `animated` 属性可以控制是否显示加载动画效果
4. Skeleton 提供了多种预设组件：
   - `Skeleton.Element`：基础元素骨架
   - `Skeleton.Avatar`：头像骨架
   - `Skeleton.Title`：标题骨架
   - `Skeleton.Paragraph`：段落骨架
   - `Skeleton.Button`：按钮骨架
   - `Skeleton.Image`：图片骨架
5. 可以通过 `width` 和 `height` 属性自定义骨架元素的尺寸
6. `Skeleton.Paragraph` 支持自定义每行的宽度，可以通过数组形式分别设置每行宽度
7. 在暗色模式下，骨架屏会自动适配主题颜色
8. 骨架屏组件不包含任何业务逻辑，仅用于UI展示