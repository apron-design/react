---
title: Steps 步骤条
group: 导航组件
order: 4
---

# Steps 步骤条

Steps 组件用于引导用户按照流程完成任务，显示当前所在步骤和进度。

## 何时使用

- 需要引导用户按步骤完成复杂任务时
- 显示多步骤表单的进度时
- 展示操作流程或状态变更过程时

## 示例

### 基础用法

最简单的 Steps 组件使用方式。

```jsx
import { Steps } from '@apron-design/react';

const defaultItems = [
  { title: 'Step 1' },
  { title: 'Step 2' },
  { title: 'Current' },
  { title: 'Not reach' },
];

export default function BasicSteps() {
  return (
    <Steps items={defaultItems} current={2} labelPlacement="bottom" />
  );
}
```

### 标签位置

Steps 组件支持多种标签位置。

#### 标签在底部（默认）

```jsx
import { Steps } from '@apron-design/react';

const defaultItems = [
  { title: 'Step 1' },
  { title: 'Step 2' },
  { title: 'Current' },
  { title: 'Not reach' },
];

export default function LabelBottomSteps() {
  return (
    <Steps items={defaultItems} current={2} labelPlacement="bottom" />
  );
}
```

#### 标签在顶部

```jsx
import { Steps } from '@apron-design/react';

const defaultItems = [
  { title: 'Step 1' },
  { title: 'Step 2' },
  { title: 'Current' },
  { title: 'Not reach' },
];

export default function LabelTopSteps() {
  return (
    <Steps items={defaultItems} current={2} labelPlacement="top" />
  );
}
```

#### 标签在上下两侧

```jsx
import { Steps } from '@apron-design/react';

export default function LabelBothSteps() {
  return (
    <Steps
      items={[
        { title: 'Step 1', subtitle: 'Step 2' },
        { title: 'Current', subtitle: 'Step 2' },
        { title: 'Current', subtitle: 'Not reach' },
        { title: 'Not reach', subtitle: '' },
      ]}
      current={1}
      labelPlacement="both"
    />
  );
}
```

#### 所有标签位置对比

```jsx
import { Steps } from '@apron-design/react';

const defaultItems = [
  { title: 'Step 1' },
  { title: 'Step 2' },
  { title: 'Current' },
  { title: 'Not reach' },
];

export default function AllPlacementsSteps() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <div>
        <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>Label Bottom (Default)</p>
        <Steps items={defaultItems} current={2} labelPlacement="bottom" />
      </div>
      <div>
        <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>Label Top</p>
        <Steps items={defaultItems} current={2} labelPlacement="top" />
      </div>
      <div>
        <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>Label Both</p>
        <Steps
          items={[
            { title: 'Step 1', subtitle: 'Step 2' },
            { title: 'Current', subtitle: 'Step 2' },
            { title: 'Current', subtitle: 'Not reach' },
            { title: 'Not reach', subtitle: '' },
          ]}
          current={1}
          labelPlacement="both"
        />
      </div>
    </div>
  );
}
```

### 不同当前步骤

展示不同当前步骤的效果。

```jsx
import { Steps } from '@apron-design/react';

const defaultItems = [
  { title: 'Step 1' },
  { title: 'Step 2' },
  { title: 'Current' },
  { title: 'Not reach' },
];

export default function DifferentCurrentSteps() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Current: 0 (First)</p>
        <Steps items={defaultItems} current={0} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Current: 1</p>
        <Steps items={defaultItems} current={1} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Current: 2</p>
        <Steps items={defaultItems} current={2} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Current: 3 (Last)</p>
        <Steps items={defaultItems} current={3} />
      </div>
    </div>
  );
}
```

### 全部完成

当 current 值大于最大索引时，所有步骤都会显示为已完成状态。

```jsx
import { Steps } from '@apron-design/react';

export default function AllCompletedSteps() {
  return (
    <Steps
      items={[
        { title: 'Step 1' },
        { title: 'Step 2' },
        { title: 'Step 3' },
        { title: 'Step 4' },
      ]}
      current={4} // 大于最大索引，全部完成
    />
  );
}
```

### 自定义步骤宽度

可以为每个步骤单独设置宽度。

```jsx
import { Steps } from '@apron-design/react';

export default function CustomWidthsSteps() {
  return (
    <Steps
      items={[
        { title: 'Short', width: 100 },
        { title: 'Medium Step', width: 150 },
        { title: 'Longer Step Name', width: 200 },
        { title: 'End' },
      ]}
      current={1}
    />
  );
}
```

### 三步骤

```jsx
import { Steps } from '@apron-design/react';

export default function ThreeSteps() {
  return (
    <Steps
      items={[
        { title: 'First' },
        { title: 'Second' },
        { title: 'Third' },
      ]}
      current={1}
    />
  );
}
```

### 五步骤

```jsx
import { Steps } from '@apron-design/react';

export default function FiveSteps() {
  return (
    <Steps
      items={[
        { title: 'Step 1' },
        { title: 'Step 2' },
        { title: 'Step 3' },
        { title: 'Step 4' },
        { title: 'Step 5' },
      ]}
      current={2}
    />
  );
}
```

### 订单流程

```jsx
import { Steps } from '@apron-design/react';

export default function OrderProcessSteps() {
  return (
    <Steps
      items={[
        { title: '下单' },
        { title: '付款' },
        { title: '发货' },
        { title: '签收' },
      ]}
      current={2}
    />
  );
}
```

### 注册流程

```jsx
import { Steps } from '@apron-design/react';

export default function RegistrationFlowSteps() {
  return (
    <Steps
      items={[
        { title: '填写信息', subtitle: '基本信息' },
        { title: '验证身份', subtitle: '手机验证' },
        { title: '设置密码', subtitle: '安全设置' },
        { title: '完成注册', subtitle: '开始使用' },
      ]}
      current={1}
      labelPlacement="both"
    />
  );
}
```

### 暗色模式

Steps 组件在暗色模式下会自动适配主题颜色。

```jsx
import { Steps } from '@apron-design/react';

const defaultItems = [
  { title: 'Step 1' },
  { title: 'Step 2' },
  { title: 'Current' },
  { title: 'Not reach' },
];

export default function DarkModeSteps() {
  return (
    <div
      data-theme="dark"
      style={{
        padding: '32px',
        backgroundColor: '#18181b',
        borderRadius: '12px',
      }}
    >
      <Steps items={defaultItems} current={2} />
    </div>
  );
}
```

## API

### Steps Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 步骤数据 | StepItem[] | - |
| current | 当前步骤索引（从 0 开始） | number | `0` |
| labelPlacement | 标签位置 | `'top'` \| `'bottom'` \| `'both'` | `'bottom'` |
| className | 自定义类名 | string | - |

### StepItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 步骤标题 | string | - |
| subtitle | 步骤副标题（用于 both 模式） | string | - |
| status | 步骤状态 | `'completed'` \| `'current'` \| `'pending'` | - |
| width | 单独设置宽度 | number \| string | - |

## 注意事项

1. Steps 组件用于展示多步骤流程的进度状态
2. 通过 `current` 属性控制当前步骤，索引从 0 开始
3. 通过 `labelPlacement` 属性控制标签位置：
   - `'bottom'`（默认）：标签显示在步骤图标下方
   - `'top'`：标签显示在步骤图标上方
   - `'both'`：标签同时显示在步骤图标上下方，需要设置 `subtitle` 属性
4. 步骤状态会根据 `current` 值自动计算：
   - 索引小于 `current` 的步骤为已完成（completed）
   - 索引等于 `current` 的步骤为当前步骤（current）
   - 索引大于 `current` 的步骤为待处理（pending）
5. 可以为每个步骤单独设置宽度，通过 `width` 属性实现
6. 当 `current` 值大于最大索引时，所有步骤都会显示为已完成状态
7. 连接线的颜色会根据相邻步骤的状态动态变化
8. 在暗色模式下，Steps 组件会自动适配主题颜色