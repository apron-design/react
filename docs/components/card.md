---
title: Card 卡片
group: 通用组件
order: 0
---

# Card 卡片

通用卡片容器，用于展示结构化内容。

## 何时使用

- 需要展示结构化的信息块
- 需要分组展示相关内容
- 需要在页面中组织内容布局

## 代码演示

### 基础用法

最简单的卡片用法，只包含内容区域。

```jsx
import React from 'react';
import { Card, CardBody } from '@apron-design/react';

export default () => (
  <Card>
    <CardBody>
      这是一个只有 CardBody 的简单卡片。
    </CardBody>
  </Card>
);
```

### 带标题的卡片

使用 CardHeader 组件添加标题。

```jsx
import React from 'react';
import { Card, CardHeader, CardBody } from '@apron-design/react';

export default () => (
  <Card>
    <CardHeader title="卡片标题" />
    <CardBody>
      带有头部的卡片，头部显示标题。
    </CardBody>
  </Card>
);
```

### 带额外操作的卡片

在 CardHeader 中使用 extra 属性添加额外操作。

```jsx
import React from 'react';
import { Card, CardHeader, CardBody, Button } from '@apron-design/react';

export default () => (
  <Card>
    <CardHeader 
      title="卡片标题" 
      extra={<Button variant="link" size="sm">更多</Button>}
    />
    <CardBody>
      头部右侧可以放置额外的操作按钮或链接。
    </CardBody>
  </Card>
);
```

### 带底部的卡片

使用 CardFooter 组件添加底部操作区域。

```jsx
import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Space } from '@apron-design/react';

export default () => (
  <Card>
    <CardHeader title="卡片标题" />
    <CardBody>
      带有底部的卡片，底部通常用于放置操作按钮。
    </CardBody>
    <CardFooter>
      <Space>
        <Button variant="primary" size="sm">确认</Button>
        <Button variant="secondary" size="sm">取消</Button>
      </Space>
    </CardFooter>
  </Card>
);
```

### 完整卡片

包含头部、正文和底部的完整卡片结构。

```jsx
import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Space } from '@apron-design/react';

export default () => (
  <Card>
    <CardHeader 
      title="完整卡片" 
      extra={<Button variant="text" size="sm">编辑</Button>}
    />
    <CardBody>
      <p style={{ margin: '0 0 12px 0' }}>
        这是一个完整的卡片示例，包含头部、正文和底部三个部分。
      </p>
      <p style={{ margin: 0, color: '#71717a', fontSize: '14px' }}>
        卡片可以用于展示结构化的内容，如用户资料、文章预览、设置面板等。
      </p>
    </CardBody>
    <CardFooter>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Space>
          <Button variant="secondary" size="sm">取消</Button>
          <Button variant="primary" size="sm">保存</Button>
        </Space>
      </div>
    </CardFooter>
  </Card>
);
```

## API

### Card

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 子元素 | ReactNode | - |

### CardHeader

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | ReactNode | - |
| extra | 右侧额外内容 | ReactNode | - |
| children | 子元素 | ReactNode | - |

### CardBody

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 子元素 | ReactNode | - |

### CardFooter

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 子元素 | ReactNode | - |