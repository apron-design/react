---
title: Cascader 级联选择
group: 数据录入
order: 1
---

# Cascader 级联选择

级联选择框，用于多级联动选择。

## 何时使用

- 需要从一组相关联的数据集合进行选择，例如省市区、公司部门等
- 支持多级联动选择
- 支持异步加载数据

## 代码演示

### 基本用法

最简单的用法，展示省市区三级联动选择。

```jsx
import React, { useState } from 'react';
import { Cascader } from '@apron-design/react';

const options = [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '余杭区', value: 'yuhang' },
        ],
      },
      {
        label: '宁波市',
        value: 'ningbo',
        children: [
          { label: '海曙区', value: 'haishu' },
          { label: '江北区', value: 'jiangbei' },
        ],
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      {
        label: '南京市',
        value: 'nanjing',
        children: [
          { label: '玄武区', value: 'xuanwu' },
          { label: '秦淮区', value: 'qinhuai' },
        ],
      },
    ],
  },
];

export default () => {
  const [value, setValue] = useState([]);
  
  return (
    <Cascader
      options={options}
      value={value}
      onChange={(val) => setValue(val)}
      placeholder="请选择地区"
    />
  );
};
```

### 禁用状态

通过 `disabled` 属性设置是否禁用。

```jsx
import React from 'react';
import { Cascader } from '@apron-design/react';

const options = [
  {
    label: 'Option 1',
    value: 'option1',
    children: [
      { label: 'Option 1-1', value: 'option1-1' },
      { label: 'Option 1-2', value: 'option1-2' },
    ],
  },
  {
    label: 'Option 2',
    value: 'option2',
    disabled: true,
  },
];

export default () => (
  <Cascader
    options={options}
    defaultValue={['option1', 'option1-1']}
    disabled
  />
);
```

### 加载状态

通过 `loading` 属性设置加载状态。

```jsx
import React from 'react';
import { Cascader } from '@apron-design/react';

const options = [
  {
    label: 'Option 1',
    value: 'option1',
    children: [
      { label: 'Option 1-1', value: 'option1-1' },
    ],
  },
];

export default () => (
  <Cascader
    options={options}
    placeholder="请选择"
    loading
  />
);
```

### 选择即改变

通过 `changeOnSelect` 属性设置在选择过程中就触发 `onChange`，而不是只在选择叶子节点时触发。

```jsx
import React, { useState } from 'react';
import { Cascader } from '@apron-design/react';

const options = [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '余杭区', value: 'yuhang' },
        ],
      },
    ],
  },
];

export default () => {
  const [value, setValue] = useState([]);
  
  return (
    <Cascader
      options={options}
      value={value}
      onChange={(val) => setValue(val)}
      placeholder="请选择地区"
      changeOnSelect
    />
  );
};
```

### 自定义分隔符

通过 `separator` 属性自定义分隔符。

```jsx
import React from 'react';
import { Cascader } from '@apron-design/react';

const options = [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
        ],
      },
    ],
  },
];

export default () => (
  <Cascader
    options={options}
    defaultValue={['zhejiang', 'hangzhou', 'xihu']}
    separator=" → "
  />
);
```

## API

### Cascader

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中的值路径（受控） | `(string \| number)[]` | - |
| defaultValue | 默认选中的值路径（非受控） | `(string \| number)[]` | `[]` |
| options | 选项列表 | `CascaderOption[]` | `[]` |
| placeholder | 占位文本 | `string` | `'Placeholder goes here'` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| inflow | 是否使用 inflow 模式（撑开容器） | `boolean` | `false` |
| onChange | 选中值改变时的回调 | `(value: (string \| number)[], selectedOptions: CascaderOption[]) => void` | - |
| onOpenChange | 下拉框展开/收起回调 | `(open: boolean) => void` | - |
| separator | 值分隔符，用于显示 | `string` | `' / '` |
| changeOnSelect | 是否在选择过程中触发 onChange（而非只在选择叶子节点时） | `boolean` | `false` |

### CascaderOption

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 选项标签 | `ReactNode` | - |
| value | 选项值 | `string \| number` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| children | 子选项 | `CascaderOption[]` | - |