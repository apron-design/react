---
title: DatePicker 日期选择器
group: 数据录入
order: 1
---

# DatePicker 日期选择器

用于选择日期的组件，支持年、月、日三级联动选择。

## 何时使用

当需要用户输入一个日期时使用，支持多种交互状态和自定义配置。

## 示例

### 基础用法

最简单的用法，适用于大多数场景。

```jsx
import { useState } from 'react';
import { DatePicker } from '@apron-design/react';

export default () => {
  const [value, setValue] = useState({});
  
  return (
    <DatePicker 
      value={value} 
      onChange={(val) => setValue(val)} 
      yearStart={2020}
      yearEnd={2030}
    />
  );
};
```

### 不同选择状态

展示日期选择器的不同选择状态。

```jsx
import { DatePicker } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
    <div>
      <h4>空状态</h4>
      <DatePicker />
    </div>
    <div>
      <h4>仅选择年份</h4>
      <DatePicker defaultValue={{ year: 2024 }} />
    </div>
    <div>
      <h4>选择年月</h4>
      <DatePicker defaultValue={{ year: 2024, month: 5 }} />
    </div>
    <div>
      <h4>完整日期</h4>
      <DatePicker defaultValue={{ year: 2024, month: 3, day: 15 }} />
    </div>
  </div>
);
```

### 加载状态

展示加载中的状态，可以有值或无值。

```jsx
import { DatePicker } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h4>加载中（无值）</h4>
      <DatePicker loading />
    </div>
    <div>
      <h4>加载中（有值）</h4>
      <DatePicker defaultValue={{ year: 2024, month: 3, day: 15 }} loading />
    </div>
  </div>
);
```

### 禁用状态

禁用日期选择器，用户无法进行操作。

```jsx
import { DatePicker } from '@apron-design/react';

export default () => (
  <div>
    <h4>禁用状态</h4>
    <DatePicker defaultValue={{ year: 2024, month: 3, day: 15 }} disabled />
  </div>
);
```

### Inflow 模式

使用 inflow 模式，容器会在下拉框打开时自动扩展。

```jsx
import { useState } from 'react';
import { DatePicker } from '@apron-design/react';

export default () => {
  const [value, setValue] = useState({});
  
  return (
    <div style={{ border: '1px solid #e4e4e7', borderRadius: '12px', padding: '16px' }}>
      <p style={{ margin: '0 0 12px', color: '#666' }}>
        容器将在下拉框打开时扩展
      </p>
      <DatePicker
        value={value}
        onChange={(val) => setValue(val)}
        inflow
      />
    </div>
  );
};
```

### 自定义年份范围

可以自定义可选择的年份范围。

```jsx
import { DatePicker } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h4>短范围 (2023-2025)</h4>
      <DatePicker yearStart={2023} yearEnd={2025} />
    </div>
    <div>
      <h4>长范围 (2000-2050)</h4>
      <DatePicker yearStart={2000} yearEnd={2050} />
    </div>
  </div>
);
```

### 自定义标签

可以自定义年、月、日的标签文本。

```jsx
import { DatePicker } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h4>英文标签</h4>
      <DatePicker
        yearLabel="Year"
        monthLabel="Month"
        dayLabel="Day"
        monthLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
      />
    </div>
    <div>
      <h4>中文标签（默认）</h4>
      <DatePicker />
    </div>
  </div>
);
```

## API

### DatePicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中的值（受控模式） | `{ year?: number; month?: number; day?: number }` | - |
| defaultValue | 默认选中的值（非受控模式） | `{ year?: number; month?: number; day?: number }` | `{}` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| inflow | 是否使用 inflow 模式（撑开容器） | `boolean` | `false` |
| onChange | 选中值改变时的回调 | `(value: { year?: number; month?: number; day?: number }) => void` | - |
| className | 自定义类名 | `string` | - |
| onOpenChange | 下拉框展开/收起回调 | `(open: boolean) => void` | - |
| yearStart | 年份范围起始 | `number` | `2020` |
| yearEnd | 年份范围结束 | `number` | `2030` |
| yearLabel | 年标签 | `string` | `'年'` |
| monthLabel | 月标签 | `string` | `'月'` |
| dayLabel | 日标签 | `string` | `'日'` |
| monthLabels | 月份标签列表 | `string[]` | `['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']` |