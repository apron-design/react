---
title: Input 输入框
group: 数据录入
order: 1
---

# Input 输入框

通过鼠标或键盘输入内容，是最基础的表单域包装。

## 何时使用

- 需要用户输入表单域内容时
- 提供组合型输入框，比如带前后置内容的输入框
- 需要带清除功能的输入框时

## 示例

### 基础用法

最简单的用法，适用于大部分业务场景。

```jsx
import { Input } from '@apron-design/react';

export default () => (
  <Input placeholder="Please enter..." />
);
```

### 不同状态

展示输入框的不同状态：空状态、有内容、禁用等。

```jsx
import { Input } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div>
      <h4>空状态（无焦点）</h4>
      <Input placeholder="Please enter..." />
    </div>
    <div>
      <h4>有内容</h4>
      <Input defaultValue="Hello World" />
    </div>
    <div>
      <h4>禁用</h4>
      <Input disabled placeholder="Disabled" />
    </div>
    <div>
      <h4>禁用（有内容）</h4>
      <Input disabled defaultValue="Disabled with value" />
    </div>
  </div>
);
```

### 可清除输入框

带清除图标的输入框，点击图标清除内容。

```jsx
import { useState } from 'react';
import { Input } from '@apron-design/react';

export default () => {
  const [value, setValue] = useState('可清除的内容');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        clearable
        onClear={() => setValue('')}
        placeholder="输入内容后显示清除按钮"
      />
      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
        当前值: {value || '(空)'}
      </p>
    </div>
  );
};
```

### 密码输入框

用于输入密码，可切换明文/密文显示。

```jsx
import { Input } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div>
      <h4>密码输入框（点击眼睛图标切换显示）</h4>
      <Input type="password" defaultValue="password123" />
    </div>
    <div>
      <h4>密码输入框 + 可清除</h4>
      <Input type="password" defaultValue="password123" clearable />
    </div>
  </div>
);
```

### 前置/后置内容

用于配置一些固定组合，如域名、货币单位等。

```jsx
import { Input } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div>
      <h4>前置文字 (65px)</h4>
      <Input prepend="https://" placeholder="example.com" />
    </div>
    <div>
      <h4>后置文字 (50px)</h4>
      <Input append=".com" placeholder="domain" />
    </div>
    <div>
      <h4>前置 + 后置</h4>
      <Input prepend="$" append="USD" placeholder="0.00" />
    </div>
    <div>
      <h4>前置自定义 ReactNode</h4>
      <Input
        prepend={
          <span style={{ padding: '0 8px', display: 'flex', alignItems: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </span>
        }
        placeholder="Search..."
      />
    </div>
  </div>
);
```

### 组合使用

将各种功能组合使用。

```jsx
import { Input } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input
      prepend="$"
      append="USD"
      clearable
      defaultValue="100.00"
    />
  </div>
);
```

### Textarea 文本域

用于多行文本输入。

```jsx
import { Textarea } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div>
      <h4>默认 (3行)</h4>
      <Textarea placeholder="Please enter..." />
    </div>
    <div>
      <h4>有内容</h4>
      <Textarea defaultValue="This is a textarea with some content. It supports multiple lines of text." />
    </div>
    <div>
      <h4>5 行</h4>
      <Textarea rows={5} placeholder="5 rows textarea..." />
    </div>
    <div>
      <h4>可清除（右下角）</h4>
      <Textarea clearable defaultValue="Clearable textarea content" />
    </div>
    <div>
      <h4>字数限制（右下角显示计数）</h4>
      <Textarea max={200} defaultValue="This is some text content." placeholder="最多输入200字..." />
    </div>
    <div>
      <h4>字数限制 + 可清除</h4>
      <Textarea max={100} clearable defaultValue="Combined features" />
    </div>
    <div>
      <h4>禁用</h4>
      <Textarea disabled defaultValue="Disabled textarea" />
    </div>
  </div>
);
```

## API

### Input

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 输入框类型 | `'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'` |
| clearable | 是否显示清除按钮 | `boolean` | `false` |
| onClear | 清除时的回调 | `() => void` | - |
| prepend | 输入框前置内容（内部） | `ReactNode` | - |
| append | 输入框后置内容（内部） | `ReactNode` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| value | 输入框内容（受控） | `string` | - |
| defaultValue | 输入框默认内容 | `string` | - |
| onChange | 输入框内容变化时的回调 | `React.ChangeEventHandler<HTMLInputElement>` | - |
| onFocus | 输入框获得焦点时的回调 | `React.FocusEventHandler<HTMLInputElement>` | - |
| onBlur | 输入框失去焦点时的回调 | `React.FocusEventHandler<HTMLInputElement>` | - |
| className | 自定义类名 | `string` | - |

### Textarea

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rows | 默认行数 | `number` | `3` |
| clearable | 是否显示清除按钮 | `boolean` | `false` |
| onClear | 清除时的回调 | `() => void` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| max | 最大字数限制，设置后显示字数计数 | `number` | - |
| value | 输入框内容（受控） | `string` | - |
| defaultValue | 输入框默认内容 | `string` | - |
| onChange | 输入框内容变化时的回调 | `React.ChangeEventHandler<HTMLTextAreaElement>` | - |
| onFocus | 输入框获得焦点时的回调 | `React.FocusEventHandler<HTMLTextAreaElement>` | - |
| onBlur | 输入框失去焦点时的回调 | `React.FocusEventHandler<HTMLTextAreaElement>` | - |
| className | 自定义类名 | `string` | - |