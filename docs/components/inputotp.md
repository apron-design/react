---
title: InputOtp 验证码输入框
group: 数据录入
order: 1
---

# InputOtp 验证码输入框

用于输入验证码的专用输入框，支持多种格式和交互方式。

## 何时使用

- 需要用户输入短信验证码、邮箱验证码等场景
- 需要格式化显示验证码（如 123-456 格式）
- 需要在移动端弹出数字键盘
- 需要验证完成后自动触发回调

## 示例

### 基础用法

最简单的用法，默认为6位数字验证码。

```jsx
import { InputOtp } from '@apron-design/react';

export default () => <InputOtp format="******" />;
```

### 不同格式

支持多种验证码格式，可以自定义分隔符。

```jsx
import { InputOtp } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h4>4位验证码 (****)</h4>
      <InputOtp format="****" />
    </div>
    <div>
      <h4>6位验证码 (******)</h4>
      <InputOtp format="******" />
    </div>
    <div>
      <h4>带分隔符 (***-***)</h4>
      <InputOtp format="***-***" />
    </div>
    <div>
      <h4>自定义分隔 (**-**-**)</h4>
      <InputOtp format="**-**-**" />
    </div>
    <div>
      <h4>带空格分隔 (*** ***)</h4>
      <InputOtp format="*** ***" />
    </div>
  </div>
);
```

### 不同尺寸

支持默认和小尺寸两种规格。

```jsx
import { InputOtp } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h4>默认尺寸 (高60 宽40)</h4>
      <InputOtp format="****" />
    </div>
    <div>
      <h4>小尺寸 (高40 宽28)</h4>
      <InputOtp format="****" size="small" />
    </div>
  </div>
);
```

### 正方形样式

可以设置为正方形样式，使每个输入位呈现为正方形。

```jsx
import { InputOtp } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h4>正方形 - 默认尺寸 (40x40)</h4>
      <InputOtp format="****" square />
    </div>
    <div>
      <h4>正方形 - 小尺寸 (28x28)</h4>
      <InputOtp format="****" size="small" square />
    </div>
  </div>
);
```

### 输入类型

支持数字和文本两种输入类型，数字类型在移动端会弹出数字键盘。

```jsx
import { InputOtp } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h4>数字类型 (移动端弹出数字键盘)</h4>
      <InputOtp format="****" type="number" />
    </div>
    <div>
      <h4>文本类型 (允许字母)</h4>
      <InputOtp format="****" type="text" />
    </div>
  </div>
);
```

### 不同状态

展示输入框的不同状态：空状态、部分填充、完全填充、禁用等。

```jsx
import { InputOtp } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h4>空状态</h4>
      <InputOtp format="****" />
    </div>
    <div>
      <h4>部分填充</h4>
      <InputOtp format="****" defaultValue="12" />
    </div>
    <div>
      <h4>完全填充</h4>
      <InputOtp format="****" defaultValue="1234" />
    </div>
    <div>
      <h4>禁用</h4>
      <InputOtp format="****" disabled defaultValue="12" />
    </div>
  </div>
);
```

### 状态反馈

支持成功和错误状态的视觉反馈。

```jsx
import { InputOtp } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h4>默认状态</h4>
      <InputOtp format="****" defaultValue="1234" />
    </div>
    <div>
      <h4>成功状态 (success)</h4>
      <InputOtp format="****" defaultValue="1234" status="success" />
    </div>
    <div>
      <h4>错误状态 (error) - 按退格键一次性清空</h4>
      <InputOtp format="****" defaultValue="1234" status="error" />
    </div>
  </div>
);
```

### 交互示例

展示完整的交互流程，包括值变化和输入完成回调。

```jsx
import { useState } from 'react';
import { InputOtp } from '@apron-design/react';

export default () => {
  const [value, setValue] = useState('');
  const [completed, setCompleted] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <InputOtp
        format="***-***"
        value={value}
        onChange={setValue}
        onFinish={() => setCompleted(true)}
        autoFocus
      />
      <div style={{ fontSize: '14px', color: '#666' }}>
        <p style={{ margin: 0 }}>当前值: {value || '(空)'}</p>
        <p style={{ margin: '4px 0 0 0' }}>
          状态: {completed ? '✅ 输入完成' : '输入中...'}
        </p>
      </div>
      <button
        onClick={() => {
          setValue('');
          setCompleted(false);
        }}
        style={{
          padding: '8px 16px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          background: '#fff',
          cursor: 'pointer',
        }}
      >
        重置
      </button>
    </div>
  );
};
```

### 验证流程

模拟完整的验证码验证流程。

```jsx
import { useState } from 'react';
import { InputOtp } from '@apron-design/react';

export default () => {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('default');
  const [message, setMessage] = useState('');

  const handleFinish = (val) => {
    // 模拟验证：123456 为正确验证码
    if (val === '123456') {
      setStatus('success');
      setMessage('✅ 验证成功！');
    } else {
      setStatus('error');
      setMessage('❌ 验证码错误，按退格键重新输入');
    }
  };

  const handleStatusReset = () => {
    setStatus('default');
    setMessage('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
        提示：正确验证码是 123456
      </p>
      <InputOtp
        format="***-***"
        value={value}
        onChange={setValue}
        onFinish={handleFinish}
        status={status}
        onStatusReset={handleStatusReset}
        autoFocus
      />
      {message && (
        <p style={{ 
          margin: 0, 
          color: status === 'success' ? '#16a34a' : '#ef4444',
          fontSize: '14px'
        }}>
          {message}
        </p>
      )}
      <button
        onClick={() => {
          setValue('');
          setStatus('default');
          setMessage('');
        }}
        style={{
          padding: '8px 16px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          background: '#fff',
          cursor: 'pointer',
        }}
      >
        重置
      </button>
    </div>
  );
};
```

## API

### InputOtp

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| format | 格式：* 表示输入位，其他字符直接渲染，如 "****" 或 "***-***" | `string` | `'******'` |
| size | 尺寸 | `'default' \| 'small'` | `'default'` |
| square | 是否为正方形（以宽为准） | `boolean` | `false` |
| type | 输入类型，影响移动端键盘 | `'number' \| 'text'` | `'number'` |
| value | 当前值（受控模式） | `string` | - |
| defaultValue | 默认值 | `string` | `''` |
| status | 状态：success 显示成功样式，error 显示错误样式 | `'default' \| 'success' \| 'error'` | `'default'` |
| onChange | 值改变时的回调 | `(value: string) => void` | - |
| onFinish | 输入完成时的回调（满足长度时自动触发） | `(value: string) => void` | - |
| onComplete | 输入完成时的回调（同 onFinish） | `(value: string) => void` | - |
| onStatusReset | error 状态下按退格键重置时的回调 | `() => void` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| autoFocus | 是否自动聚焦 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |