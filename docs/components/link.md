---
title: Link 链接
group: 导航组件
order: 4
---

# Link 链接

链接组件，用于页面跳转或外部链接。

## 何时使用

- 需要在页面中添加可点击的链接时
- 需要统一链接样式时
- 需要区分不同类型链接（主要、次要、危险）时

## 示例

### 基础用法

最简单的用法，创建一个基本链接。

```jsx
import { Link } from '@apron-design/react';

export default () => (
  <Link href="#">默认链接</Link>
);
```

### 链接变种

支持主色和次色两种变种。

```jsx
import { Link } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', gap: '16px' }}>
    <Link href="#" variant="primary">
      Primary 链接
    </Link>
    <Link href="#" variant="secondary">
      Secondary 链接
    </Link>
  </div>
);
```

### 下划线样式

支持三种下划线显示方式：始终显示、悬停显示、从不显示。

```jsx
import { Link } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', gap: '16px' }}>
    <Link href="#" underline="always">
      始终有下划线
    </Link>
    <Link href="#" underline="hover">
      悬停时有下划线
    </Link>
    <Link href="#" underline="never">
      从不显示下划线
    </Link>
  </div>
);
```

### 危险链接

用于表示危险操作的链接，显示为红色。

```jsx
import { Link } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', gap: '16px' }}>
    <Link href="#" danger>
      危险链接
    </Link>
    <Link href="#" danger underline="always">
      危险链接 (带下划线)
    </Link>
  </div>
);
```

### 新窗口打开

设置 target="_blank" 使链接在新窗口打开。

```jsx
import { Link } from '@apron-design/react';

export default () => (
  <Link href="https://example.com" target="_blank" rel="noopener noreferrer">
    新窗口打开
  </Link>
);
```

### 内联文本中的链接

链接可以嵌入到普通文本中使用。

```jsx
import { Link } from '@apron-design/react';

export default () => (
  <span>
    这是一段包含{' '}
    <Link href="#" variant="primary">
      Primary 链接
    </Link>{' '}
    和{' '}
    <Link href="#" variant="secondary">
      Secondary 链接
    </Link>{' '}
    的文本。
  </span>
);
```

### 所有变体展示

展示所有链接变体的组合效果。

```jsx
import { Link } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <h4>变种 (Variant)</h4>
    <div style={{ display: 'flex', gap: '16px' }}>
      <Link href="#" variant="primary">
        Primary 链接
      </Link>
      <Link href="#" variant="secondary">
        Secondary 链接
      </Link>
    </div>

    <h4>下划线 (Underline)</h4>
    <div style={{ display: 'flex', gap: '16px' }}>
      <Link href="#" underline="always">
        Always
      </Link>
      <Link href="#" underline="hover">
        Hover
      </Link>
      <Link href="#" underline="never">
        Never
      </Link>
    </div>

    <h4>危险链接 (Danger)</h4>
    <div style={{ display: 'flex', gap: '16px' }}>
      <Link href="#" danger>
        危险链接
      </Link>
      <Link href="#" danger underline="always">
        危险链接 (带下划线)
      </Link>
    </div>

    <h4>内联文本</h4>
    <div>
      <span>
        这是一段包含{' '}
        <Link href="#" variant="primary">
          Primary 链接
        </Link>{' '}
        和{' '}
        <Link href="#" variant="secondary">
          Secondary 链接
        </Link>{' '}
        的文本。
      </span>
    </div>
  </div>
);
```

## API

### Link

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 链接变种 | `'primary' \| 'secondary'` | `'secondary'` |
| underline | 下划线显示方式 | `'always' \| 'hover' \| 'never'` | `'never'` |
| danger | 是否为危险链接（红色） | `boolean` | `false` |
| href | 链接地址 | `string` | - |
| target | 链接打开方式 | `'_self' \| '_blank' \| '_parent' \| '_top'` | - |
| children | 链接文本 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |