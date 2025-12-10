---
title: Timeline 时间轴
group: 数据展示
order: 2
---

# Timeline 时间轴

Timeline 组件用于垂直展示时间流信息，常用于项目里程碑、订单跟踪、版本历史等场景。

## 基础用法

Timeline 组件由两个部分组成：
- `Timeline`: 容器组件
- `TimelineItem`: 时间轴上的每一个节点

```jsx
import { Timeline, TimelineItem } from '@apron-design/react';

export default () => (
  <Timeline>
    <TimelineItem title="The first milestone" date="2017-03-10" />
    <TimelineItem title="The second milestone" date="2018-05-10" />
    <TimelineItem title="The third milestone" date="2019-01-31" />
  </Timeline>
);
```

## 内容位置

通过设置 `side` 属性可以控制内容的显示位置，支持 `right`（默认）、`left` 和 `both` 三种模式。

### 内容在右边（默认）

```jsx
import { Timeline, TimelineItem } from '@apron-design/react';

export default () => (
  <Timeline side="right">
    <TimelineItem title="The first milestone" date="2017-03-10" />
    <TimelineItem title="The second milestone" date="2018-05-10" />
    <TimelineItem title="The third milestone" date="2019-01-31" />
  </Timeline>
);
```

### 内容在左边

```jsx
import { Timeline, TimelineItem } from '@apron-design/react';

export default () => (
  <Timeline side="left">
    <TimelineItem title="The first milestone" date="2017-03-10" />
    <TimelineItem title="The second milestone" date="2018-05-10" />
  </Timeline>
);
```

### 内容交替左右

```jsx
import { Timeline, TimelineItem } from '@apron-design/react';

export default () => (
  <Timeline side="both">
    <TimelineItem title="The first milestone" date="2017-03-10" />
    <TimelineItem title="The second milestone" date="2018-05-10" />
    <TimelineItem title="The third milestone" date="2018-05-10" />
  </Timeline>
);
```

## 不同颜色的点

通过 `dotColor` 属性可以设置时间轴节点的颜色，支持 `default`、`primary`、`main`、`success`、`warning` 和 `danger` 六种颜色。

```jsx
import { Timeline, TimelineItem } from '@apron-design/react';

export default () => (
  <Timeline>
    <TimelineItem title="A Primary Dot" date="2017-03-10" dotColor="primary" />
    <TimelineItem title="A Main Dot" date="2018-05-10" dotColor="main" />
    <TimelineItem title="A Success Dot" date="2019-01-31" dotColor="success" />
    <TimelineItem title="A Warning Dot" date="2019-01-31" dotColor="warning" />
    <TimelineItem title="A Danger Dot" date="2019-01-31" dotColor="danger" />
  </Timeline>
);
```

## 带内容描述

除了标题和日期，还可以通过 `content` 属性添加详细的内容描述。

```jsx
import { Timeline, TimelineItem } from '@apron-design/react';

export default () => (
  <Timeline>
    <TimelineItem
      title="项目启动"
      content="完成项目立项和团队组建"
      date="2023-01-15"
      dotColor="success"
    />
    <TimelineItem
      title="需求评审"
      content="完成产品需求文档评审"
      date="2023-02-20"
      dotColor="success"
    />
    <TimelineItem
      title="开发中"
      content="功能开发进行中"
      date="2023-03-10"
      dotColor="main"
    />
    <TimelineItem
      title="待测试"
      content="等待QA测试"
      date="2023-04-01"
    />
  </Timeline>
);
```

## 使用场景

### 订单跟踪

Timeline 组件非常适合用于展示订单的物流跟踪信息。

```jsx
import { Timeline, TimelineItem } from '@apron-design/react';

export default () => (
  <Timeline>
    <TimelineItem
      title="订单已签收"
      content="您的订单已由本人签收，感谢您的购买"
      date="2023-12-05 14:30"
      dotColor="success"
    />
    <TimelineItem
      title="派送中"
      content="快递员正在派送，请保持电话畅通"
      date="2023-12-05 09:15"
      dotColor="success"
    />
    <TimelineItem
      title="已到达"
      content="快件已到达【北京朝阳区营业点】"
      date="2023-12-04 18:20"
      dotColor="success"
    />
    <TimelineItem
      title="运输中"
      content="快件正在运往【北京转运中心】"
      date="2023-12-03 22:00"
      dotColor="success"
    />
    <TimelineItem
      title="已发货"
      content="商家已发货，快递公司：顺丰速运"
      date="2023-12-02 16:00"
      dotColor="success"
    />
  </Timeline>
);
```

### 版本历史

Timeline 组件也可用于展示产品的版本迭代历史。

```jsx
import { Timeline, TimelineItem } from '@apron-design/react';

export default () => (
  <Timeline side="left">
    <TimelineItem
      title="v2.0.0"
      content="全新设计系统，支持暗色模式"
      date="2023-12-01"
      dotColor="primary"
    />
    <TimelineItem
      title="v1.5.0"
      content="新增 Timeline 组件"
      date="2023-11-15"
      dotColor="main"
    />
    <TimelineItem
      title="v1.0.0"
      content="首个正式版本发布"
      date="2023-10-01"
    />
  </Timeline>
);
```

## 暗色模式

Timeline 组件支持暗色模式，在暗色主题下会自动应用合适的样式。

```jsx
import { Timeline, TimelineItem } from '@apron-design/react';

export default () => (
  <div
    data-theme="dark"
    style={{
      padding: '32px',
      backgroundColor: '#18181b',
      borderRadius: '12px',
      display: 'flex',
      gap: '48px',
    }}
  >
    <div style={{ flex: 1 }}>
      <h4 style={{ margin: '0 0 16px 0', color: '#a1a1aa' }}>右侧内容</h4>
      <Timeline>
        <TimelineItem title="The first milestone" date="2017-03-10" dotColor="primary" />
        <TimelineItem title="The second milestone" date="2018-05-10" dotColor="main" />
        <TimelineItem title="The third milestone" date="2019-01-31" dotColor="success" />
      </Timeline>
    </div>
    <div style={{ flex: 1 }}>
      <h4 style={{ margin: '0 0 16px 0', color: '#a1a1aa' }}>左侧内容</h4>
      <Timeline side="left">
        <TimelineItem title="The first milestone" date="2017-03-10" />
        <TimelineItem title="The second milestone" date="2018-05-10" />
      </Timeline>
    </div>
  </div>
);
```

## API

### Timeline

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| side | 内容显示位置 | `'left' \| 'right' \| 'both'` | `'right'` |
| children | 子元素 | `ReactNode` | `-` |

### TimelineItem

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `ReactNode` | `-` |
| content | 内容 | `ReactNode` | `-` |
| date | 日期 | `ReactNode` | `-` |
| dotColor | 点颜色 | `'default' \| 'primary' \| 'main' \| 'success' \| 'warning' \| 'danger'` | `'default'` |
| children | 子元素（作为 content 使用） | `ReactNode` | `-` |