---
title: Collapse 折叠面板
group: 导航组件
order: 4
---

# Collapse 折叠面板

可以折叠/展开的内容区域。

## 何时使用

- 对复杂区域进行分组和隐藏
- 手风琴是一种特殊的折叠面板，只允许单个内容区域展开

## 代码演示

### 基本用法

可以同时展开多个面板，可以分别展开或折叠。

```jsx
import React from 'react';
import { Collapse, CollapseItem } from '@apron-design/react';

export default () => (
  <Collapse>
    <CollapseItem itemKey="1" title="折叠面板标题 1">
      这是折叠面板的内容区域。可以放置任何内容，
      包括文字、图片、表格等各种元素。
    </CollapseItem>
    <CollapseItem itemKey="2" title="折叠面板标题 2">
      第二个折叠面板的内容。折叠面板可以用于展示 FAQ、
      设置选项、详细信息等场景。
    </CollapseItem>
    <CollapseItem itemKey="3" title="折叠面板标题 3">
      第三个折叠面板的内容。每个面板都可以独立展开或折叠。
    </CollapseItem>
  </Collapse>
);
```

### 默认展开

通过 `defaultActiveKeys` 属性设置默认展开的面板。

```jsx
import React from 'react';
import { Collapse, CollapseItem } from '@apron-design/react';

export default () => (
  <Collapse defaultActiveKeys={['1']}>
    <CollapseItem itemKey="1" title="默认展开的面板">
      这个面板默认是展开状态。通过 defaultActiveKeys 属性
      可以指定哪些面板默认展开。
    </CollapseItem>
    <CollapseItem itemKey="2" title="折叠面板标题 2">
      第二个面板默认是折叠状态。
    </CollapseItem>
    <CollapseItem itemKey="3" title="折叠面板标题 3">
      第三个面板默认也是折叠状态。
    </CollapseItem>
  </Collapse>
);
```

### 手风琴模式

通过 `accordion` 属性设置手风琴模式，每次只能展开一个面板。

```jsx
import React from 'react';
import { Collapse, CollapseItem } from '@apron-design/react';

export default () => (
  <Collapse accordion defaultActiveKeys={['1']}>
    <CollapseItem itemKey="1" title="手风琴面板 1">
      手风琴模式下，每次只能展开一个面板。
      展开新面板时，其他面板会自动折叠。
    </CollapseItem>
    <CollapseItem itemKey="2" title="手风琴面板 2">
      点击这个面板，上面的面板会自动折叠。
    </CollapseItem>
    <CollapseItem itemKey="3" title="手风琴面板 3">
      这种模式适合在有限空间内展示大量内容。
    </CollapseItem>
  </Collapse>
);
```

### 禁用状态

通过 `disabled` 属性禁用某个面板。

```jsx
import React from 'react';
import { Collapse, CollapseItem } from '@apron-design/react';

export default () => (
  <Collapse defaultActiveKeys={['1']}>
    <CollapseItem itemKey="1" title="正常面板">
      这是一个正常可以操作的面板。
    </CollapseItem>
    <CollapseItem itemKey="2" title="禁用的面板" disabled>
      这个面板被禁用了，无法展开或折叠。
    </CollapseItem>
    <CollapseItem itemKey="3" title="另一个正常面板">
      这也是一个正常的面板。
    </CollapseItem>
  </Collapse>
);
```

### FAQ 场景

使用折叠面板展示常见问题解答。

```jsx
import React from 'react';
import { Collapse, CollapseItem } from '@apron-design/react';

export default () => (
  <Collapse>
    <CollapseItem itemKey="1" title="如何创建账号？">
      点击页面右上角的「注册」按钮，填写您的邮箱和密码，
      然后点击「创建账号」即可完成注册。我们会向您的邮箱
      发送一封验证邮件，请点击邮件中的链接完成验证。
    </CollapseItem>
    <CollapseItem itemKey="2" title="忘记密码怎么办？">
      点击登录页面的「忘记密码」链接，输入您注册时使用的
      邮箱地址，我们会向您发送密码重置链接。请在 24 小时内
      完成密码重置操作。
    </CollapseItem>
    <CollapseItem itemKey="3" title="如何联系客服？">
      您可以通过以下方式联系我们的客服团队：
      <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
        <li>在线客服：工作日 9:00-18:00</li>
        <li>邮箱：support@example.com</li>
        <li>电话：400-XXX-XXXX</li>
      </ul>
    </CollapseItem>
  </Collapse>
);
```

## API

### Collapse

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| accordion | 是否为手风琴模式（每次只能展开一个） | `boolean` | `false` |
| defaultActiveKeys | 默认展开的项目 key 数组 | `string[]` | `[]` |
| children | 子元素 | `ReactNode` | - |

### CollapseItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| itemKey | 唯一标识 | `string` | - |
| title | 标题 | `ReactNode` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| children | 子元素（正文内容） | `ReactNode` | - |