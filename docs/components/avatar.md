---
title: Avatar 头像
group: 数据展示
order: 2
---

# Avatar 头像

用来代表用户或事物，支持图片、图标或字符展示。

## 何时使用

- 需要展示用户或事物的头像
- 需要多种尺寸和形状的头像展示
- 需要展示一组用户的头像

## 代码演示

### 基本用法

头像有三种类型：图片、图标和字符，其中图标和字符会自动根据内容调整背景色。

```jsx
import React from 'react';
import { Avatar, Space } from '@apron-design/react';

const UserIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4" fill="#393939" />
      <path d="M20 19C20 16.7909 16.4183 15 12 15C7.58172 15 4 16.7909 4 19" stroke="#393939" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default () => (
  <Space>
    <Avatar>A</Avatar>
    <Avatar><UserIcon /></Avatar>
    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
  </Space>
);
```

### 尺寸

头像有四种尺寸：迷你（mini）、小（small）、中（middle，默认）、大（large）。

```jsx
import React from 'react';
import { Avatar, Space } from '@apron-design/react';

export default () => (
  <Space>
    <Avatar size="mini">U</Avatar>
    <Avatar size="small">U</Avatar>
    <Avatar size="middle">U</Avatar>
    <Avatar size="large">U</Avatar>
  </Space>
);
```

### 形状

头像支持两种形状：圆形（默认）和方形。

```jsx
import React from 'react';
import { Avatar, Space } from '@apron-design/react';

export default () => (
  <Space>
    <Avatar>A</Avatar>
    <Avatar square>A</Avatar>
  </Space>
);
```

### 头像组

头像组合展现，常用于展示一组用户。

```jsx
import React from 'react';
import { Avatar, AvatarGroup } from '@apron-design/react';

export default () => (
  <AvatarGroup>
    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=User1" />
    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=User2" />
    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=User3" />
    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=User4" />
  </AvatarGroup>
);
```

### 自定义样式

可以自定义头像的背景色、字体颜色等样式。

```jsx
import React from 'react';
import { Avatar, Space } from '@apron-design/react';

export default () => (
  <Space>
    <Avatar style={{ backgroundColor: '#4C9EEA', color: '#fff' }}>A</Avatar>
    <Avatar style={{ backgroundColor: '#22c55e', color: '#fff' }}>B</Avatar>
    <Avatar style={{ backgroundColor: '#f59e0b', color: '#fff' }}>C</Avatar>
  </Space>
);
```

## API

### Avatar

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 设置头像尺寸 | `mini` \| `small` \| `middle` \| `large` | `middle` |
| square | 是否为方形头像 | boolean | false |
| src | 图片头像的资源地址 | string | - |
| alt | 图片头像的替代文本 | string | - |
| imgProps | 透传给 img 元素的属性 | ImgHTMLAttributes | - |
| children | 子元素（文字或图标） | ReactNode | - |

### AvatarGroup

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 子元素（Avatar 组件） | ReactNode | - |