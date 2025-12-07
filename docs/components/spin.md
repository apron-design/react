---
title: Spin 加载中
group: 反馈组件
order: 3
---

# Spin 加载中

Spin 组件用于页面或组件的加载状态指示，提供多种展示方式和位置选项。

## 何时使用

- 页面或组件内容需要异步加载时
- 执行耗时操作需要给用户反馈时
- 需要阻止用户在加载过程中进行操作时

## 示例

### 基础用法

最简单的 Spin 组件使用方式。

```jsx
import { Spin } from '@apron-design/react';

export default function BasicSpin() {
  return <Spin loading={true} />;
}
```

### 带提示文字

可以添加提示文字来说明加载状态。

```jsx
import { Spin } from '@apron-design/react';

export default function WithCustomTextSpin() {
  return <Spin loading={true} text="请稍候..." />;
}
```

### 无提示文字

可以通过设置空字符串隐藏提示文字。

```jsx
import { Spin } from '@apron-design/react';

export default function WithoutTextSpin() {
  return <Spin loading={true} text="" />;
}
```

### 包裹模式

Spin 组件可以包裹其他内容，在加载时显示遮罩层。

```jsx
import { useState } from 'react';
import { Spin, Button } from '@apron-design/react';

export default function WrapperModeSpin() {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Button onClick={() => setLoading(!loading)}>
        {loading ? '关闭 Loading' : '开启 Loading'}
      </Button>
      <Spin loading={loading}>
        <div
          style={{
            padding: '40px',
            background: '#f5f5f5',
            borderRadius: '8px',
          }}
        >
          <h3 style={{ margin: '0 0 16px 0' }}>卡片内容</h3>
          <p style={{ margin: 0 }}>
            这是被 Spin 包裹的内容，当 loading 为 true 时，会显示加载蒙层。
          </p>
        </div>
      </Spin>
    </div>
  );
}
```

### 位置选项

Spin 组件支持多种位置选项。

```jsx
import { Spin } from '@apron-design/react';

export default function AllPlacementsSpin() {
  const placements = [
    'top-left',
    'top',
    'top-right',
    'left',
    'center',
    'right',
    'bottom-left',
    'bottom',
    'bottom-right',
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      {placements.map((placement) => (
        <Spin key={placement} loading={true} placement={placement}>
          <div
            style={{
              width: '200px',
              height: '150px',
              background: '#f5f5f5',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999',
            }}
          >
            {placement}
          </div>
        </Spin>
      ))}
    </div>
  );
}
```

### 位置演示

可以通过按钮切换不同的位置选项。

```jsx
import { useState } from 'react';
import { Spin, Button } from '@apron-design/react';

export default function PlacementDemoSpin() {
  const [placement, setPlacement] = useState('center');

  const placements = [
    'center',
    'top',
    'bottom',
    'left',
    'right',
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '500px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {placements.map((p) => (
          <Button
            key={p}
            variant={placement === p ? 'primary' : 'default'}
            size="sm"
            onClick={() => setPlacement(p)}
          >
            {p}
          </Button>
        ))}
      </div>
      <Spin loading={true} placement={placement}>
        <div
          style={{
            width: '100%',
            height: '300px',
            background: '#f5f5f5',
            borderRadius: '8px',
          }}
        />
      </Spin>
    </div>
  );
}
```

### 自定义图标

可以使用自定义图标替换默认的加载图标。

```jsx
import { Spin } from '@apron-design/react';

export default function CustomIconSpin() {
  const CustomLoadingIcon = () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      style={{ animation: 'spin 1s linear infinite' }}
    >
      <circle cx="16" cy="4" r="3" fill="currentColor" opacity="1" />
      <circle cx="24.5" cy="7.5" r="3" fill="currentColor" opacity="0.875" />
      <circle cx="28" cy="16" r="3" fill="currentColor" opacity="0.75" />
      <circle cx="24.5" cy="24.5" r="3" fill="currentColor" opacity="0.625" />
      <circle cx="16" cy="28" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="7.5" cy="24.5" r="3" fill="currentColor" opacity="0.375" />
      <circle cx="4" cy="16" r="3" fill="currentColor" opacity="0.25" />
      <circle cx="7.5" cy="7.5" r="3" fill="currentColor" opacity="0.125" />
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </svg>
  );

  return (
    <Spin loading={true} icon={<CustomLoadingIcon />} text="自定义图标" />
  );
}
```

### 全屏模式

可以显示全屏的加载状态。

```jsx
import { Spin, Button } from '@apron-design/react';

export default function FullscreenModeSpin() {
  const handleShow = () => {
    Spin.show({ text: '全屏加载中...' });
    setTimeout(() => {
      Spin.close();
    }, 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
        点击按钮显示全屏 Spin，3秒后自动关闭
      </p>
      <Button onClick={handleShow}>显示全屏 Spin</Button>
    </div>
  );
}
```

### 全屏不同位置

全屏模式也支持不同的位置选项。

```jsx
import { Spin, Button } from '@apron-design/react';

export default function FullscreenPlacementsSpin() {
  const placements = [
    'center',
    'top',
    'bottom',
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
  ];

  const handleShow = (placement) => {
    Spin.show({ text: `位置: ${placement}`, placement });
    setTimeout(() => {
      Spin.close();
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
        点击按钮显示不同位置的全屏 Spin
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {placements.map((p) => (
          <Button key={p} onClick={() => handleShow(p)}>
            {p}
          </Button>
        ))}
      </div>
    </div>
  );
}
```

### 卡片中使用

在卡片组件中使用 Spin 显示加载状态。

```jsx
import { useState } from 'react';
import { Spin, Button } from '@apron-design/react';

export default function InCardSpin() {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ width: '400px' }}>
      <Spin loading={loading}>
        <div
          style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            padding: '24px',
          }}
        >
          <h3 style={{ margin: '0 0 16px 0' }}>数据统计</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 600 }}>1,234</div>
              <div style={{ color: '#666', fontSize: '14px' }}>总用户</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 600 }}>5,678</div>
              <div style={{ color: '#666', fontSize: '14px' }}>总订单</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 600 }}>¥12,345</div>
              <div style={{ color: '#666', fontSize: '14px' }}>总收入</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 600 }}>98%</div>
              <div style={{ color: '#666', fontSize: '14px' }}>满意度</div>
            </div>
          </div>
        </div>
      </Spin>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => setLoading(!loading)}>
          {loading ? '加载完成' : '重新加载'}
        </Button>
      </div>
    </div>
  );
}
```

### 表格加载

在表格中使用 Spin 显示加载状态。

```jsx
import { useState } from 'react';
import { Spin, Button } from '@apron-design/react';

export default function TableLoadingSpin() {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ width: '600px' }}>
      <Spin loading={loading} text="数据加载中...">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>ID</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>名称</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>状态</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>{i}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>项目 {i}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>进行中</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>编辑</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Spin>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => setLoading(!loading)}>
          {loading ? '加载完成' : '重新加载'}
        </Button>
      </div>
    </div>
  );
}
```

## API

### Spin Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 是否显示加载中 | boolean | `true` |
| icon | 自定义图标 | ReactNode | - |
| text | 提示文字 | string | - |
| placement | 位置 | `'center'` \| `'top'` \| `'bottom'` \| `'left'` \| `'right'` \| `'top-left'` \| `'top-right'` \| `'bottom-left'` \| `'bottom-right'` | `'center'` |
| children | 子元素 | ReactNode | - |
| className | 自定义类名 | string | - |
| fullscreen | 是否全屏 | boolean | `false` |

### Spin Static Methods

| 方法 | 说明 | 参数 |
| --- | --- | --- |
| Spin.show(options) | 显示全屏 Spin | `options`: Omit<SpinProps, 'loading' \| 'children'> |
| Spin.close() | 关闭全屏 Spin | - |

## 注意事项

1. Spin 组件有两种使用方式：
   - 独立使用：直接显示加载状态
   - 包裹使用：包裹其他内容，在加载时显示遮罩层
2. 通过 `loading` 属性控制是否显示加载状态
3. 通过 `placement` 属性可以设置加载图标的位置：
   - `'center'`：居中（默认）
   - `'top'`、`'bottom'`、`'left'`、`'right'`：对应边缘居中
   - `'top-left'`、`'top-right'`、`'bottom-left'`、`'bottom-right'`：对应角落
4. 通过 `text` 属性可以设置提示文字
5. 通过 `icon` 属性可以自定义加载图标
6. 全屏模式：
   - 使用 `Spin.show()` 方法显示全屏加载状态
   - 使用 `Spin.close()` 方法关闭全屏加载状态
   - 全屏模式会阻止页面滚动
7. Spin 组件在显示和隐藏时都有淡入淡出动画效果
8. 在暗色模式下，Spin 组件会自动适配主题颜色