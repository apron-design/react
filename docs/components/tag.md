---
title: Tag 标签
group: 数据展示
order: 2
---

# Tag 标签

Tag 组件用于标记和分类内容，可以作为关键词或小型状态指示器使用。

## 基础用法

最简单的用法是直接使用 Tag 组件包裹文本内容。

```jsx
import { Tag } from '@apron-design/react';

export default () => <Tag>标签</Tag>;
```

## 变体

Tag 组件提供两种变体：`primary` 和 `default`。

```jsx
import { Space } from '@apron-design/react';

export default () => (
  <Space>
    <Tag variant="primary">Primary 标签</Tag>
    <Tag variant="default">Default 标签</Tag>
  </Space>
);
```

## 可关闭标签

通过设置 `closable` 属性，可以让标签变成可关闭的状态。当用户点击关闭按钮时会触发 `onClose` 回调。

```jsx
import { Space } from '@apron-design/react';

export default () => (
  <Space>
    <Tag variant="primary" closable onClose={() => console.log('Primary closed')}>
      Primary 可关闭
    </Tag>
    <Tag variant="default" closable onClose={() => console.log('Default closed')}>
      Default 可关闭
    </Tag>
  </Space>
);
```

## 交互示例

以下是一个更复杂的交互示例，展示了如何动态管理标签：

```jsx
import React, { useState } from 'react';
import { Space } from '@apron-design/react';

export default () => {
  const [tags, setTags] = useState(['标签1', '标签2', '标签3', '标签4']);

  const handleClose = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Space wrap>
      {tags.map((tag) => (
        <Tag key={tag} closable onClose={() => handleClose(tag)}>
          {tag}
        </Tag>
      ))}
      {tags.length === 0 && <span style={{ color: '#a1a1aa' }}>所有标签已删除</span>}
    </Space>
  );
};
```

## 使用场景

### 标签组

在实际应用中，Tag 组件通常以组的形式出现，用于表示技术栈、分类等信息。

```jsx
import { Space } from '@apron-design/react';

export default () => (
  <Space wrap>
    <Tag variant="primary">React</Tag>
    <Tag variant="primary">TypeScript</Tag>
    <Tag variant="primary">Vue</Tag>
    <Tag variant="default">JavaScript</Tag>
    <Tag variant="default">CSS</Tag>
  </Space>
);
```

### 状态标签

Tag 组件也常用于表示不同的状态。

```jsx
import { Space } from '@apron-design/react';

export default () => (
  <Space>
    <Tag variant="primary">进行中</Tag>
    <Tag variant="default">已完成</Tag>
    <Tag variant="default">待处理</Tag>
  </Space>
);
```

### 可编辑标签

结合状态管理，可以创建可编辑的标签系统。

```jsx
import React, { useState } from 'react';
import { Space } from '@apron-design/react';

export default () => {
  const [tags, setTags] = useState(['前端', '后端', '设计']);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ color: '#71717a', fontSize: '14px' }}>点击 X 删除标签</div>
      <Space wrap>
        {tags.map((tag) => (
          <Tag
            key={tag}
            variant="default"
            closable
            onClose={() => setTags(tags.filter((t) => t !== tag))}
          >
            {tag}
          </Tag>
        ))}
      </Space>
    </div>
  );
};
```

## 暗色模式

Tag 组件支持暗色模式，在暗色主题下会自动应用合适的样式。

```jsx
import { Space } from '@apron-design/react';

export default () => (
  <div
    data-theme="dark"
    style={{
      padding: '32px',
      backgroundColor: '#18181b',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    }}
  >
    <div>
      <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>变体</h4>
      <Space>
        <Tag variant="primary">Primary</Tag>
        <Tag variant="default">Default</Tag>
      </Space>
    </div>
    <div>
      <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>可关闭</h4>
      <Space>
        <Tag variant="primary" closable>Primary</Tag>
        <Tag variant="default" closable>Default</Tag>
      </Space>
    </div>
  </div>
);
```

## API

### Tag

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 标签变体 | `'primary' \| 'default'` | `'default'` |
| closable | 是否可关闭 | `boolean` | `false` |
| onClose | 关闭回调 | `() => void` | `-` |
| children | 子元素 | `ReactNode` | `-` |