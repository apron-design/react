---
title: Radio 单选框
group: 数据录入
order: 1
---

# Radio 单选框

单选框允许用户在一组选项中选择一个选项。

## 何时使用

- 在一组互斥的选项中进行单项选择时
- 需要展示所有可选项供用户比较时
- 表单中需要用户做出明确选择时

## 示例

### 基础用法

最简单的单选框使用方式。

```jsx
import { Radio } from '@apron-design/react';

export default function BasicRadio() {
  return <Radio>Radio</Radio>;
}
```

### 不同状态

单选框支持多种状态：可用、禁用、选中、选中且禁用。

```jsx
import { Radio } from '@apron-design/react';

export default function RadioStates() {
  return (
    <div style={{ display: 'flex', gap: '48px' }}>
      <div style={{ width: '300px' }}>
        <Radio>I have only one line content</Radio>
      </div>
      <div style={{ width: '300px' }}>
        <Radio disabled>I have only one line content</Radio>
      </div>
    </div>
  );
}
```

### 选中状态

展示选中状态的单选框。

```jsx
import { Radio } from '@apron-design/react';

export default function CheckedRadio() {
  return (
    <div style={{ display: 'flex', gap: '48px' }}>
      <div style={{ width: '300px' }}>
        <Radio checked onChange={() => {}}>
          I have 2 lines content to show so this is a 2 lines content
        </Radio>
      </div>
      <div style={{ width: '300px' }}>
        <Radio checked disabled onChange={() => {}}>
          I have 2 lines content to show so this is a 2 lines content
        </Radio>
      </div>
    </div>
  );
}
```

### 所有状态概览

展示单选框的所有可能状态。

```jsx
import { Radio } from '@apron-design/react';

export default function AllStatesRadio() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Available</h4>
        <div style={{ display: 'flex', gap: '48px' }}>
          <div style={{ width: '300px' }}>
            <Radio>I have only one line content</Radio>
          </div>
          <div style={{ width: '300px' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Disabled</h4>
            <Radio disabled>I have only one line content</Radio>
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Checked</h4>
        <div style={{ display: 'flex', gap: '48px' }}>
          <div style={{ width: '300px' }}>
            <Radio checked onChange={() => {}}>
              I have 2 lines content to show so this is a 2 lines content
            </Radio>
          </div>
          <div style={{ width: '300px' }}>
            <Radio checked disabled onChange={() => {}}>
              I have 2 lines content to show so this is a 2 lines content
            </Radio>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 交互式示例

单选框支持受控模式，可以响应用户的点击操作。

```jsx
import { useState } from 'react';
import { Radio } from '@apron-design/react';

export default function InteractiveRadio() {
  const [checked, setChecked] = useState(false);
  return (
    <Radio checked={checked} onChange={setChecked}>
      Click to toggle: {checked ? 'Checked' : 'Unchecked'}
    </Radio>
  );
}
```

### 标签可点击

可以通过 `labelClickable` 属性控制标签是否可点击。

```jsx
import { useState } from 'react';
import { Radio } from '@apron-design/react';

export default function LabelClickableRadio() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>
          labelClickable=false (默认，只能点击圆圈)
        </h4>
        <Radio checked={checked1} onChange={setChecked1}>
          只有点击左边的圆圈才能选中
        </Radio>
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>
          labelClickable=true (点击文字也可以激活)
        </h4>
        <Radio checked={checked2} onChange={setChecked2} labelClickable>
          点击这段文字也可以选中
        </Radio>
      </div>
    </div>
  );
}
```

### RadioGroup 单选框组

使用 RadioGroup 可以方便地管理一组单选框。

```jsx
import { useState } from 'react';
import { RadioGroup } from '@apron-design/react';

export default function RadioGroupExample() {
  const [value, setValue] = useState('apple');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Horizontal (default)</h4>
        <RadioGroup
          value={value}
          onChange={setValue}
          options={[
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
            { label: 'Disabled', value: 'disabled', disabled: true },
          ]}
        />
      </div>
      <div>
        <p style={{ margin: 0, color: '#666' }}>
          Selected: {value || 'None'}
        </p>
      </div>
    </div>
  );
}
```

### 垂直排列

通过 `direction` 属性可以设置单选框组的排列方向。

```jsx
import { useState } from 'react';
import { RadioGroup } from '@apron-design/react';

export default function VerticalRadioGroup() {
  const [value, setValue] = useState('option1');
  return (
    <RadioGroup
      value={value}
      onChange={setValue}
      direction="vertical"
      options={[
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
      ]}
    />
  );
}
```

### 使用子组件

可以通过 RadioGroup.Item 子组件来自定义每个选项。

```jsx
import { useState } from 'react';
import { RadioGroup } from '@apron-design/react';

export default function RadioGroupWithChildren() {
  const [value, setValue] = useState('a');
  return (
    <RadioGroup value={value} onChange={setValue}>
      <RadioGroup.Item value="a">Custom Item A</RadioGroup.Item>
      <RadioGroup.Item value="b">Custom Item B</RadioGroup.Item>
      <RadioGroup.Item value="c" disabled>
        Custom Item C (Disabled)
      </RadioGroup.Item>
    </RadioGroup>
  );
}
```

### 禁用整组

可以通过 `disabled` 属性禁用整个单选框组。

```jsx
import { RadioGroup } from '@apron-design/react';

export default function DisabledRadioGroup() {
  return (
    <RadioGroup
      disabled
      defaultValue="apple"
      options={[
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
      ]}
    />
  );
}
```

### 非受控模式

可以使用 `defaultValue` 属性设置默认选中项。

```jsx
import { RadioGroup } from '@apron-design/react';

export default function UncontrolledRadioGroup() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>非受控模式（使用 defaultValue）</h4>
        <RadioGroup
          name="fruit"
          defaultValue="banana"
          options={[
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
          ]}
          onChange={(val) => console.log('Selected:', val)}
        />
      </div>
    </div>
  );
}
```

### 暗色模式

单选框在暗色模式下会自动适配主题颜色。

```jsx
import { RadioGroup, Radio } from '@apron-design/react';

export default function DarkModeRadio() {
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
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Available</h4>
        <div style={{ display: 'flex', gap: '32px' }}>
          <Radio>Unchecked</Radio>
          <Radio checked onChange={() => {}}>Checked</Radio>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Disabled</h4>
        <div style={{ display: 'flex', gap: '32px' }}>
          <Radio disabled>Unchecked</Radio>
          <Radio checked disabled onChange={() => {}}>Checked</Radio>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Radio Group</h4>
        <RadioGroup
          defaultValue="option1"
          direction="horizontal"
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
          ]}
        />
      </div>
    </div>
  );
}
```

## API

### Radio Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 是否选中（受控模式） | boolean | - |
| defaultChecked | 默认是否选中（非受控模式） | boolean | - |
| disabled | 是否禁用 | boolean | `false` |
| value | 单选框的值 | string \| number | - |
| onChange | 选中状态改变时的回调 | `(checked: boolean, e: ChangeEvent<HTMLInputElement>) => void` | - |
| children | 标签文本 | ReactNode | - |
| labelClickable | 点击文字部分是否可以激活单选框 | boolean | `false` |
| className | 自定义类名 | string | - |
| id | 自定义 ID | string | - |
| name | name 属性 | string | - |

### RadioGroup Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中的值（受控模式） | string \| number | - |
| defaultValue | 默认选中的值（非受控模式） | string \| number | - |
| options | 选项配置 | RadioOptionType[] | - |
| disabled | 是否禁用整组 | boolean | `false` |
| direction | 排列方向 | `'horizontal'` \| `'vertical'` | `'horizontal'` |
| onChange | 选中值改变时的回调 | `(value: string \| number) => void` | - |
| children | 子元素 | ReactNode | - |
| className | 自定义类名 | string | - |
| name | RadioGroup 的 name 属性 | string | - |
| labelClickable | 点击文字部分是否可以激活单选框 | boolean | `true` |

### RadioOptionType

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 选项标签 | ReactNode | - |
| value | 选项值 | string \| number | - |
| disabled | 是否禁用该选项 | boolean | - |

### RadioGroup.Item Props

继承 Radio 的所有属性，但以下属性除外：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 单选框的值 | string \| number | - |
| checked | 是否选中（由 RadioGroup 控制） | boolean | - |
| onChange | 选中状态改变时的回调（由 RadioGroup 控制） | function | - |
| name | name 属性（由 RadioGroup 控制） | string | - |

## 注意事项

1. 单选框在同一组内是互斥的，只能有一个被选中
2. RadioGroup 会自动为每个 Radio 分配相同的 name 属性，确保它们属于同一组
3. 在受控模式下，需要同时提供 `value` 和 `onChange` 属性
4. 在非受控模式下，可以使用 `defaultValue` 设置默认选中项
5. 通过 `labelClickable` 属性可以控制标签是否可点击，默认情况下 Radio 的标签不可点击，RadioGroup 中的标签可点击
6. RadioGroup 支持两种排列方向：水平（horizontal）和垂直（vertical）
7. 可以通过 `options` 属性快速配置选项，也可以通过子组件的方式自定义每个选项