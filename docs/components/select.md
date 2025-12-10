---
title: Select 选择器
group: 数据录入
order: 1
---

# Select 选择器

选择器用于从一组选项中选择一个或多个选项。

## 何时使用

- 需要从多个选项中选择一个值时
- 选项数量较多，不适合使用单选框时
- 表单中需要用户提供选择时

## 代码演示

### 基础用法

最简单的选择器使用方式。

```jsx
import { Select } from '@apron-design/react';

export default function BasicSelect() {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2', disabled: true },
    { label: 'Selected Option', value: 'selected' },
    { label: 'Hover Option', value: 'hover' },
    { label: 'Option 5 goes here', value: 'option5' },
  ];

  return (
    <div style={{ width: '400px' }}>
      <Select options={options} placeholder="Placeholder goes here" />
    </div>
  );
}
```

### 不同状态

选择器支持多种状态：正常、选中/聚焦、加载中、禁用。

```jsx
import { Select } from '@apron-design/react';

const defaultOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2', disabled: true },
  { label: 'Selected Option', value: 'selected' },
  { label: 'Hover Option', value: 'hover' },
  { label: 'Option 5 goes here', value: 'option5' },
];

export default function SelectStates() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '600px' }}>
      <div style={{ display: 'flex', gap: '48px' }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Normal</h4>
          <Select options={defaultOptions} placeholder="Placeholder goes here" />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Selected/Focused</h4>
          <Select options={defaultOptions} defaultValue="option1" />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '48px' }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Loading</h4>
          <Select options={defaultOptions} placeholder="Placeholder goes here" loading />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Loading (with value)</h4>
          <Select options={defaultOptions} defaultValue="option1" loading />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Disabled</h4>
        <div style={{ width: '50%' }}>
          <Select options={defaultOptions} defaultValue="option1" disabled />
        </div>
      </div>
    </div>
  );
}
```

### 正常状态

```jsx
import { Select } from '@apron-design/react';

const defaultOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2', disabled: true },
  { label: 'Selected Option', value: 'selected' },
  { label: 'Hover Option', value: 'hover' },
  { label: 'Option 5 goes here', value: 'option5' },
];

export default function NormalSelect() {
  return (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Normal</h4>
      <Select options={defaultOptions} placeholder="Placeholder goes here" />
    </div>
  );
}
```

### 选中/聚焦状态

```jsx
import { Select } from '@apron-design/react';

const defaultOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2', disabled: true },
  { label: 'Selected Option', value: 'selected' },
  { label: 'Hover Option', value: 'hover' },
  { label: 'Option 5 goes here', value: 'option5' },
];

export default function SelectedFocusedSelect() {
  return (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Selected/Focused</h4>
      <Select
        options={defaultOptions}
        defaultValue="option1"
        placeholder="Placeholder goes here"
      />
    </div>
  );
}
```

### 加载状态

```jsx
import { Select } from '@apron-design/react';

const defaultOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2', disabled: true },
  { label: 'Selected Option', value: 'selected' },
  { label: 'Hover Option', value: 'hover' },
  { label: 'Option 5 goes here', value: 'option5' },
];

export default function LoadingSelect() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Loading (no value)</h4>
        <Select
          options={defaultOptions}
          placeholder="Placeholder goes here"
          loading
        />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Loading (with value)</h4>
        <Select
          options={defaultOptions}
          defaultValue="option1"
          loading
        />
      </div>
    </div>
  );
}
```

### 禁用状态

```jsx
import { Select } from '@apron-design/react';

const defaultOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2', disabled: true },
  { label: 'Selected Option', value: 'selected' },
  { label: 'Hover Option', value: 'hover' },
  { label: 'Option 5 goes here', value: 'option5' },
];

export default function DisabledSelect() {
  return (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Disabled</h4>
      <Select
        options={defaultOptions}
        defaultValue="option1"
        disabled
      />
    </div>
  );
}
```

### 下拉框展开

```jsx
import { useState } from 'react';
import { Select } from '@apron-design/react';
// Types imported from @apron-design/react

const defaultOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2', disabled: true },
  { label: 'Selected Option', value: 'selected' },
  { label: 'Hover Option', value: 'hover' },
  { label: 'Option 5 goes here', value: 'option5' },
];

export default function DropdownOpenSelect() {
  const [value, setValue] = useState('selected');
  return (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Dropdown</h4>
      <Select
        options={defaultOptions}
        value={value}
        onChange={(val) => setValue(val)}
        placeholder="Select an option"
      />
      <p style={{ margin: '12px 0 0', color: '#666' }}>
        Selected: {value || 'None'}
      </p>
    </div>
  );
}
```

### 带滚动条（超过5个选项）

```jsx
import { Select } from '@apron-design/react';

const manyOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
  { label: 'Option 6', value: '6' },
  { label: 'Option 7', value: '7' },
  { label: 'Option 8', value: '8' },
];

export default function WithScrollingSelect() {
  return (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>With Scrolling (8 options)</h4>
      <Select
        options={manyOptions}
        placeholder="Select an option"
      />
    </div>
  );
}
```

### Inflow 模式

在 Inflow 模式下，下拉框会展开容器高度。

```jsx
import { useState } from 'react';
import { Select } from '@apron-design/react';
// Types imported from @apron-design/react

const defaultOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2', disabled: true },
  { label: 'Selected Option', value: 'selected' },
  { label: 'Hover Option', value: 'hover' },
  { label: 'Option 5 goes here', value: 'option5' },
];

export default function InflowModeSelect() {
  const [value, setValue] = useState();
  return (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Inflow Mode</h4>
      <div style={{ border: '1px solid #e4e4e7', borderRadius: '12px', padding: '16px' }}>
        <p style={{ margin: '0 0 12px', color: '#666' }}>
          Container will expand when dropdown opens
        </p>
        <Select
          options={defaultOptions}
          value={value}
          onChange={(val) => setValue(val)}
          placeholder="Select an option"
          inflow
        />
        <p style={{ margin: '12px 0 0', color: '#666' }}>
          Selected: {value || 'None'}
        </p>
      </div>
    </div>
  );
}
```

### Float 模式（默认）

在 Float 模式下，下拉框会浮动在内容之上。

```jsx
import { useState } from 'react';
import { Select } from '@apron-design/react';
// Types imported from @apron-design/react

const defaultOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2', disabled: true },
  { label: 'Selected Option', value: 'selected' },
  { label: 'Hover Option', value: 'hover' },
  { label: 'Option 5 goes here', value: 'option5' },
];

export default function FloatModeSelect() {
  const [value, setValue] = useState();
  return (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Float Mode (Default)</h4>
      <div style={{ border: '1px solid #e4e4e7', borderRadius: '12px', padding: '16px' }}>
        <p style={{ margin: '0 0 12px', color: '#666' }}>
          Dropdown floats over content
        </p>
        <Select
          options={defaultOptions}
          value={value}
          onChange={(val) => setValue(val)}
          placeholder="Select an option"
        />
        <p style={{ margin: '12px 0 0', color: '#666' }}>
          Selected: {value || 'None'}
        </p>
      </div>
    </div>
  );
}
```

### 带禁用选项

```jsx
import { Select } from '@apron-design/react';

export default function WithDisabledOptionsSelect() {
  return (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>With Disabled Options</h4>
      <Select
        options={[{
          label: 'Available Option 1', value: '1' }, {
          label: 'Disabled Option', value: '2', disabled: true }, {
          label: 'Available Option 3', value: '3' }, {
          label: 'Another Disabled', value: '4', disabled: true }, {
          label: 'Available Option 5', value: '5' },
        ]}
        placeholder="Select an option"
      />
    </div>
  );
}
```

### 受控模式

在受控模式下，可以通过 `value` 和 `onChange` 属性控制选择器的值。

```jsx
import { useState } from 'react';
import { Select } from '@apron-design/react';
// Types imported from @apron-design/react

const defaultOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2', disabled: true },
  { label: 'Selected Option', value: 'selected' },
  { label: 'Hover Option', value: 'hover' },
  { label: 'Option 5 goes here', value: 'option5' },
];

export default function ControlledModeSelect() {
  const [value, setValue] = useState('option1');
  return (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Controlled Mode</h4>
      <Select
        options={defaultOptions}
        value={value}
        onChange={(val) => setValue(val)}
      />
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <button onClick={() => setValue('option1')}>Set Option 1</button>
        <button onClick={() => setValue('selected')}>Set Selected</button>
      </div>
    </div>
  );
}
```

### 暗色模式

选择器在暗色模式下会自动适配主题颜色。

```jsx
import { Select } from '@apron-design/react';

const defaultOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2', disabled: true },
  { label: 'Selected Option', value: 'selected' },
  { label: 'Hover Option', value: 'hover' },
  { label: 'Option 5 goes here', value: 'option5' },
];

export default function DarkModeSelect() {
  return (
    <div
      data-theme="dark"
      style={{
        padding: '32px',
        backgroundColor: '#18181b',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '400px',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Normal</h4>
        <Select options={defaultOptions} placeholder="Placeholder goes here" />
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Selected</h4>
        <Select options={defaultOptions} defaultValue="option1" />
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Loading</h4>
        <Select options={defaultOptions} placeholder="Placeholder goes here" loading />
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Disabled</h4>
        <Select options={defaultOptions} defaultValue="option1" disabled />
      </div>
    </div>
  );
}
```

## API

### Select Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中的值（受控模式） | string \| number | - |
| defaultValue | 默认选中的值（非受控模式） | string \| number | - |
| options | 选项列表 | SelectOption[] | `[]` |
| placeholder | 占位文本 | string | `'Placeholder goes here'` |
| disabled | 是否禁用 | boolean | `false` |
| loading | 是否加载中 | boolean | `false` |
| inflow | 是否使用 inflow 模式（撑开容器） | boolean | `false` |
| onChange | 选中值改变时的回调 | `(value: string \| number, option: SelectOption) => void` | - |
| className | 自定义类名 | string | - |
| onOpenChange | 下拉框展开/收起回调 | `(open: boolean) => void` | - |

### SelectOption

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 选项标签 | ReactNode | - |
| value | 选项值 | string \| number | - |
| disabled | 是否禁用该选项 | boolean | - |

## 注意事项

1. 选择器支持两种模式：
   - 受控模式：通过 `value` 和 `onChange` 属性控制值
   - 非受控模式：通过 `defaultValue` 属性设置默认值
2. 通过 `inflow` 属性可以切换下拉框的显示模式：
   - `inflow=false`（默认）：下拉框浮动显示
   - `inflow=true`：下拉框撑开容器显示
3. 在加载状态下，选择器会显示加载图标，此时无法进行交互
4. 可以为选项设置 `disabled` 属性来禁用特定选项
5. 选择器支持键盘导航：
   - Enter 或空格键：打开/关闭下拉框
   - Escape 键：关闭下拉框
   - 方向键：导航选项
6. 选择器会自动处理点击外部区域关闭下拉框的逻辑
7. 在暗色模式下，选择器会自动适配主题颜色