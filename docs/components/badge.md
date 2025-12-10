---
title: Badge 徽标数
group: 数据展示
order: 2
---

# Badge 徽标数

图标右上角的圆形徽标数字。

## 何时使用

- 当需要在图标或文字右上角展示数字或状态时
- 用于展示消息数量、状态提示等

## 代码演示

### 基本用法

最简单的用法，在右上角展示数字。

```jsx
import React from 'react';
import { Badge } from '@apron-design/react';

export default () => (
  <Badge count={5}>
    <div style={{ width: '50px', height: '50px', borderRadius: '8px', backgroundColor: '#f0f0f0' }} />
  </Badge>
);
```

### 红点

不显示数字，只显示一个小红点。

```jsx
import React from 'react';
import { Badge } from '@apron-design/react';

export default () => (
  <Badge dot>
    <div style={{ width: '50px', height: '50px', borderRadius: '8px', backgroundColor: '#f0f0f0' }} />
  </Badge>
);
```

### 数字徽标

展示具体的数字，当数字大于 overflowCount 时会显示为 `{overflowCount}+`。

```jsx
import React from 'react';
import { Badge, Space } from '@apron-design/react';

export default () => (
  <Space>
    <Badge count={5}>
      <div style={{ width: '50px', height: '50px', borderRadius: '8px', backgroundColor: '#f0f0f0' }} />
    </Badge>
    <Badge count={99}>
      <div style={{ width: '50px', height: '50px', borderRadius: '8px', backgroundColor: '#f0f0f0' }} />
    </Badge>
    <Badge count={100}>
      <div style={{ width: '50px', height: '50px', borderRadius: '8px', backgroundColor: '#f0f0f0' }} />
    </Badge>
    <Badge count={100} overflowCount={10}>
      <div style={{ width: '50px', height: '50px', borderRadius: '8px', backgroundColor: '#f0f0f0' }} />
    </Badge>
  </Space>
);
```

### 自定义内容

可以自定义徽标内容，比如 "New"、"Hot" 等。

```jsx
import React from 'react';
import { Badge, Space } from '@apron-design/react';

export default () => (
  <Space>
    <Badge content="New">
      <div style={{ width: '50px', height: '50px', borderRadius: '8px', backgroundColor: '#f0f0f0' }} />
    </Badge>
    <Badge content="Hot">
      <div style={{ width: '50px', height: '50px', borderRadius: '8px', backgroundColor: '#f0f0f0' }} />
    </Badge>
  </Space>
);
```

### 配合其他组件

徽标可以配合头像、按钮等其他组件一起使用。

```jsx
import React from 'react';
import { Badge, Avatar, Button, Space } from '@apron-design/react';

export default () => (
  <Space>
    <Badge dot>
      <Avatar>U</Avatar>
    </Badge>
    <Badge count={5}>
      <Button>消息</Button>
    </Badge>
  </Space>
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dot | 不展示数字，只有一个小红点 | boolean | false |
| count | 展示的数字 | number | - |
| overflowCount | 展示封顶的数字值，超过会显示为 `{overflowCount}+` | number | 99 |
| content | 自定义内容 | string | - |
| children | 徽标包裹的子元素 | ReactNode | - |