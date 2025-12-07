---
title: Tooltip 文字提示
group: 反馈组件
order: 3
---

# Tooltip 文字提示

Tooltip 组件用于在用户将鼠标悬停在元素上时显示简短的提示信息。

## 基础用法

Tooltip 组件需要包裹一个触发元素，并通过 `content` 属性设置提示内容。

```jsx
import { Tooltip } from '@apron-design/react';

export default () => (
  <Tooltip content="这是一个提示信息">
    <button style={{ padding: '8px 16px', cursor: 'pointer' }}>悬停显示提示</button>
  </Tooltip>
);
```

## 不同内容

Tooltip 支持不同长度和类型的提示内容。

```jsx
import { Tooltip } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
    <Tooltip content="简短提示">
      <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>短文本</span>
    </Tooltip>
    <Tooltip content="这是一段较长的提示信息，用于说明某个功能的具体用途">
      <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>长文本</span>
    </Tooltip>
    <Tooltip content="🎉 支持 Emoji">
      <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>Emoji</span>
    </Tooltip>
  </div>
);
```

## 在按钮上使用

Tooltip 常用于为按钮提供额外的说明信息。

```jsx
import { Tooltip } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', gap: '16px' }}>
    <Tooltip content="保存当前内容">
      <button style={{ padding: '8px 16px', cursor: 'pointer' }}>保存</button>
    </Tooltip>
    <Tooltip content="删除此项目">
      <button style={{ padding: '8px 16px', cursor: 'pointer', color: '#ef4444' }}>删除</button>
    </Tooltip>
    <Tooltip content="此操作不可用">
      <button style={{ padding: '8px 16px', cursor: 'not-allowed', opacity: 0.5 }} disabled>
        禁用
      </button>
    </Tooltip>
  </div>
);
```

## 在图标上使用

Tooltip 也常用于为图标提供说明信息。

```jsx
import { Tooltip } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
    <Tooltip content="设置">
      <span style={{ fontSize: '20px', cursor: 'pointer' }}>⚙️</span>
    </Tooltip>
    <Tooltip content="帮助">
      <span style={{ fontSize: '20px', cursor: 'pointer' }}>❓</span>
    </Tooltip>
    <Tooltip content="通知">
      <span style={{ fontSize: '20px', cursor: 'pointer' }}>🔔</span>
    </Tooltip>
    <Tooltip content="用户">
      <span style={{ fontSize: '20px', cursor: 'pointer' }}>👤</span>
    </Tooltip>
  </div>
);
```

## 富文本内容

Tooltip 的内容可以是任意的 React 元素，支持富文本格式。

```jsx
import { Tooltip } from '@apron-design/react';

export default () => (
  <Tooltip
    content={
      <div style={{ textAlign: 'center' }}>
        <strong>快捷键</strong>
        <br />
        <code style={{ fontSize: '12px' }}>Ctrl + S</code>
      </div>
    }
  >
    <button style={{ padding: '8px 16px', cursor: 'pointer' }}>查看快捷键</button>
  </Tooltip>
);
```

## API

### Tooltip

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 提示内容 | `ReactNode` | `-` |
| children | 触发元素 | `ReactElement` | `-` |