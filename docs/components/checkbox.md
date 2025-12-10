---
title: Checkbox 复选框
group: 数据录入
order: 1
---

# Checkbox 复选框

复选框用于在一组可选项中进行多项选择。

## 何时使用

- 需要在多个选项中选择一个或多个选项时
- 支持单独使用或组合使用
- 支持全选/反选等复杂交互

## 代码演示

### 基本用法

最简单的用法，展示可用、选中、禁用等状态。

```jsx
import React from 'react';
import { Checkbox } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Checkbox>未选中状态</Checkbox>
    <Checkbox checked onChange={() => {}}>已选中状态</Checkbox>
    <Checkbox disabled>禁用状态</Checkbox>
    <Checkbox checked disabled onChange={() => {}}>选中且禁用状态</Checkbox>
  </div>
);
```

### 半选状态

通过 `indeterminate` 属性设置半选状态，常用于实现全选效果。

```jsx
import React from 'react';
import { Checkbox } from '@apron-design/react';

export default () => (
  <Checkbox indeterminate onChange={() => {}}>
    半选状态
  </Checkbox>
);
```

### 受控组件

通过 `checked` 和 `onChange` 实现受控组件。

```jsx
import React, { useState } from 'react';
import { Checkbox } from '@apron-design/react';

export default () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <Checkbox checked={checked} onChange={setChecked}>
      点击切换状态: {checked ? '已选中' : '未选中'}
    </Checkbox>
  );
};
```

### 文字点击

通过 `labelClickable` 属性控制点击文字是否可以激活复选框。

```jsx
import React, { useState } from 'react';
import { Checkbox } from '@apron-design/react';

export default () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox checked={checked1} onChange={setChecked1}>
        默认状态（只能点击方框）
      </Checkbox>
      <Checkbox checked={checked2} onChange={setChecked2} labelClickable>
        可点击文字（点击文字也可以激活）
      </Checkbox>
    </div>
  );
};
```

### 复选框组

使用 `CheckboxGroup` 组合多个复选框。

```jsx
import React, { useState } from 'react';
import { CheckboxGroup } from '@apron-design/react';

export default () => {
  const [value, setValue] = useState(['apple']);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CheckboxGroup
        value={value}
        onChange={setValue}
        options={[
          { label: '苹果', value: 'apple' },
          { label: '香蕉', value: 'banana' },
          { label: '橙子', value: 'orange' },
          { label: '葡萄', value: 'grape' },
        ]}
      />
      <p style={{ margin: 0 }}>
        已选中: {value.join(', ') || '无'}
      </p>
    </div>
  );
};
```

### 垂直排列

通过 `direction` 属性设置垂直排列。

```jsx
import React, { useState } from 'react';
import { CheckboxGroup } from '@apron-design/react';

export default () => {
  const [value, setValue] = useState(['option1']);
  
  return (
    <CheckboxGroup
      value={value}
      onChange={setValue}
      direction="vertical"
      options={[
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
        { label: '选项三', value: 'option3' },
      ]}
    />
  );
};
```

### 全选效果

实现全选/反选的典型交互模式。

```jsx
import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@apron-design/react';

export default () => {
  const allOptions = ['apple', 'banana', 'orange', 'grape'];
  const [checkedList, setCheckedList] = useState(['apple', 'banana']);

  const checkAll = allOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < allOptions.length;

  const onCheckAllChange = (checked) => {
    setCheckedList(checked ? allOptions : []);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox
        indeterminate={indeterminate}
        checked={checkAll}
        onChange={onCheckAllChange}
      >
        全选
      </Checkbox>
      <div style={{ borderLeft: '2px solid #e4e4e7', paddingLeft: '16px' }}>
        <CheckboxGroup
          direction="vertical"
          value={checkedList}
          onChange={(values) => setCheckedList(values)}
          options={allOptions.map((item) => ({
            label: item.charAt(0).toUpperCase() + item.slice(1),
            value: item,
          }))}
        />
      </div>
    </div>
  );
};
```

## API

### Checkbox

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 是否选中（受控） | `boolean` | - |
| defaultChecked | 默认是否选中（非受控） | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| indeterminate | 是否为半选状态 | `boolean` | `false` |
| value | 复选框的值 | `string \| number` | - |
| onChange | 选中状态改变时的回调 | `(checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void` | - |
| children | 标签文本 | `ReactNode` | - |
| labelClickable | 点击文字部分是否可以激活复选框 | `boolean` | `false` |

### CheckboxGroup

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中的值数组（受控） | `(string \| number)[]` | - |
| defaultValue | 默认选中的值数组（非受控） | `(string \| number)[]` | `[]` |
| options | 选项配置 | `(CheckboxOptionType \| string \| number)[]` | - |
| disabled | 是否禁用整组 | `boolean` | `false` |
| direction | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| onChange | 选中值改变时的回调 | `(checkedValues: (string \| number)[]) => void` | - |
| children | 子元素 | `ReactNode` | - |
| labelClickable | 点击文字部分是否可以激活复选框 | `boolean` | `true` |

### CheckboxOptionType

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 选项标签 | `ReactNode` | - |
| value | 选项值 | `string \| number` | - |
| disabled | 是否禁用 | `boolean` | `false` |

### CheckboxGroup.Item

作为 `CheckboxGroup` 的子组件使用，用于自定义选项。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项值 | `string \| number` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| children | 标签文本 | `ReactNode` | - |