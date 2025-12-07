---
title: Tabs 标签页
group: 导航组件
order: 4
---

# Tabs 标签页

Tabs 组件用于组织和展示不同类别的内容，允许用户在不同的视图之间进行切换。

## 基础用法

Tabs 组件由四个部分组成：
- `Tabs`: 容器组件
- `TabList`: 标签列表容器
- `Tab`: 单个标签项
- `TabPanel`: 标签对应的内容面板

```jsx
import { Tabs, TabList, Tab, TabPanel } from '@apron-design/react';

export default () => (
  <Tabs defaultActiveKey="1">
    <TabList>
      <Tab tabKey="1">标签一</Tab>
      <Tab tabKey="2">标签二</Tab>
      <Tab tabKey="3">标签三</Tab>
    </TabList>
    <TabPanel tabKey="1">
      这是标签一的内容区域。Tab 组件可以用于组织和展示不同类别的信息。
    </TabPanel>
    <TabPanel tabKey="2">
      这是标签二的内容区域。点击不同的标签可以切换显示不同的内容。
    </TabPanel>
    <TabPanel tabKey="3">
      这是标签三的内容区域。每个 TabPanel 对应一个 Tab。
    </TabPanel>
  </Tabs>
);
```

## 胶囊模式

通过设置 `capsule` 属性，可以启用胶囊样式的标签页，这种样式更加紧凑且具有视觉焦点。

```jsx
import React from 'react';
import { Tabs, TabList, Tab, TabPanel } from '@apron-design/react';

export default () => (
  <Tabs defaultActiveKey="1" capsule>
    <TabList>
      <Tab tabKey="1">标签一</Tab>
      <Tab tabKey="2">标签二</Tab>
      <Tab tabKey="3">标签三</Tab>
    </TabList>
    <TabPanel tabKey="1">
      胶囊模式的标签一内容。选中的标签有圆角背景。
    </TabPanel>
    <TabPanel tabKey="2">
      胶囊模式的标签二内容。
    </TabPanel>
    <TabPanel tabKey="3">
      胶囊模式的标签三内容。
    </TabPanel>
  </Tabs>
);
```

## 带额外操作

可以通过 `extra` 属性在标签栏右侧添加额外的操作元素。

```jsx
import React from 'react';
import { Tabs, TabList, Tab, TabPanel, Button } from '@apron-design/react';

export default () => (
  <Tabs defaultActiveKey="1" extra={<Button size="sm">操作按钮</Button>}>
    <TabList>
      <Tab tabKey="1">标签一</Tab>
      <Tab tabKey="2">标签二</Tab>
      <Tab tabKey="3">标签三</Tab>
    </TabList>
    <TabPanel tabKey="1">
      右侧有额外操作按钮的 Tab 组件。
    </TabPanel>
    <TabPanel tabKey="2">
      标签二内容。
    </TabPanel>
    <TabPanel tabKey="3">
      标签三内容。
    </TabPanel>
  </Tabs>
);
```

## 禁用状态

通过给 `Tab` 组件设置 `disabled` 属性来禁用某个标签。

```jsx
import React from 'react';
import { Tabs, TabList, Tab, TabPanel } from '@apron-design/react';

export default () => (
  <Tabs defaultActiveKey="1">
    <TabList>
      <Tab tabKey="1">可用</Tab>
      <Tab tabKey="2" disabled>禁用</Tab>
      <Tab tabKey="3">可用</Tab>
    </TabList>
    <TabPanel tabKey="1">
      标签一内容。标签二被禁用，无法点击。
    </TabPanel>
    <TabPanel tabKey="2">
      标签二内容（无法访问）。
    </TabPanel>
    <TabPanel tabKey="3">
      标签三内容。
    </TabPanel>
  </Tabs>
);
```

## 使用场景

### 用户资料页

Tabs 组件常用于用户资料页，用来组织不同类型的信息。

```jsx
import React from 'react';
import { Tabs, TabList, Tab, TabPanel, Button } from '@apron-design/react';

export default () => (
  <Tabs defaultActiveKey="info">
    <TabList>
      <Tab tabKey="info">基本信息</Tab>
      <Tab tabKey="security">安全设置</Tab>
      <Tab tabKey="notification">通知设置</Tab>
    </TabList>
    <TabPanel tabKey="info">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div><strong>用户名：</strong>admin</div>
        <div><strong>邮箱：</strong>admin@example.com</div>
        <div><strong>注册时间：</strong>2024-01-01</div>
      </div>
    </TabPanel>
    <TabPanel tabKey="security">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div><strong>密码：</strong>******** <Button variant="link" size="sm">修改</Button></div>
        <div><strong>两步验证：</strong>已开启</div>
      </div>
    </TabPanel>
    <TabPanel tabKey="notification">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div><strong>邮件通知：</strong>开启</div>
        <div><strong>短信通知：</strong>关闭</div>
      </div>
    </TabPanel>
  </Tabs>
);
```

### 筛选标签

在数据列表页面中，Tabs 组件也可以作为筛选条件使用。

```jsx
import React from 'react';
import { Tabs, TabList, Tab, TabPanel } from '@apron-design/react';

export default () => (
  <Tabs defaultActiveKey="all" capsule extra={<span style={{ color: '#71717a', fontSize: '14px' }}>共 128 条</span>}>
    <TabList>
      <Tab tabKey="all">全部</Tab>
      <Tab tabKey="pending">待审核 (12)</Tab>
      <Tab tabKey="approved">已通过</Tab>
      <Tab tabKey="rejected">已拒绝</Tab>
    </TabList>
    <TabPanel tabKey="all">
      显示所有数据...
    </TabPanel>
    <TabPanel tabKey="pending">
      显示待审核数据...
    </TabPanel>
    <TabPanel tabKey="approved">
      显示已通过数据...
    </TabPanel>
    <TabPanel tabKey="rejected">
      显示已拒绝数据...
    </TabPanel>
  </Tabs>
);
```

## 暗色模式

Tabs 组件支持暗色模式，在暗色主题下会自动应用合适的样式。

```jsx
import React from 'react';
import { Tabs, TabList, Tab, TabPanel } from '@apron-design/react';

export default () => (
  <div
    data-theme="dark"
    style={{
      padding: '32px',
      backgroundColor: '#18181b',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
    }}
  >
    <div>
      <h4 style={{ margin: '0 0 16px 0', color: '#a1a1aa' }}>默认模式</h4>
      <Tabs defaultActiveKey="1">
        <TabList>
          <Tab tabKey="1">标签一</Tab>
          <Tab tabKey="2">标签二</Tab>
          <Tab tabKey="3" disabled>禁用</Tab>
        </TabList>
        <TabPanel tabKey="1">
          <span style={{ color: '#e4e4e7' }}>暗色模式下的标签一内容。</span>
        </TabPanel>
        <TabPanel tabKey="2">
          <span style={{ color: '#e4e4e7' }}>暗色模式下的标签二内容。</span>
        </TabPanel>
      </Tabs>
    </div>

    <div>
      <h4 style={{ margin: '0 0 16px 0', color: '#a1a1aa' }}>胶囊模式</h4>
      <Tabs defaultActiveKey="1" capsule>
        <TabList>
          <Tab tabKey="1">全部</Tab>
          <Tab tabKey="2">待处理</Tab>
          <Tab tabKey="3">已完成</Tab>
        </TabList>
        <TabPanel tabKey="1">
          <span style={{ color: '#e4e4e7' }}>暗色模式胶囊标签内容。</span>
        </TabPanel>
        <TabPanel tabKey="2">
          <span style={{ color: '#e4e4e7' }}>待处理内容。</span>
        </TabPanel>
        <TabPanel tabKey="3">
          <span style={{ color: '#e4e4e7' }}>已完成内容。</span>
        </TabPanel>
      </Tabs>
    </div>
  </div>
);
```

## API

### Tabs

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultActiveKey | 默认选中的 Tab key | `string` | `''` |
| capsule | 是否为胶囊形 | `boolean` | `false` |
| extra | 右侧额外内容 | `ReactNode` | `-` |
| children | 子元素 | `ReactNode` | `-` |

### TabList

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| extra | 右侧额外内容（由 Tabs 传入） | `ReactNode` | `-` |
| children | 子元素 | `ReactNode` | `-` |

### Tab

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tabKey | Tab 的唯一标识 | `string` | `-` |
| disabled | 是否禁用 | `boolean` | `false` |
| children | 子元素 | `ReactNode` | `-` |

### TabPanel

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tabKey | 对应的 Tab key | `string` | `-` |
| children | 子元素 | `ReactNode` | `-` |