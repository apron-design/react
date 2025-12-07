---
title: Message 全局提示
group: 反馈组件
order: 3
---

# Message 全局提示

全局展示操作反馈信息，常用于通知用户操作结果。

## 何时使用

- 需要向用户显示操作反馈时
- 需要全局性的简短通知时
- 不希望打断用户操作流程的通知场景

## 示例

### 基础用法

最简单的用法，通过不同方法显示不同类型的消息。

```jsx
import { message, Button } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <Button onClick={() => message.info('This is an info message')}>
      Info
    </Button>
    <Button onClick={() => message.success('Operation successful!')}>
      Success
    </Button>
    <Button onClick={() => message.warning('Please be careful!')}>
      Warning
    </Button>
    <Button onClick={() => message.error('Something went wrong!')}>
      Error
    </Button>
  </div>
);
```

### 使用 message.show() 方法

可以通过 message.show() 方法动态指定提示类型。

```jsx
import { message, Button } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <Button onClick={() => message.show('info', 'Info message via show()')}>
      Show Info
    </Button>
    <Button onClick={() => message.show('success', 'Success message via show()')}>
      Show Success
    </Button>
    <Button onClick={() => message.show('warning', 'Warning message via show()')}>
      Show Warning
    </Button>
    <Button onClick={() => message.show('error', 'Error message via show()')}>
      Show Error
    </Button>
  </div>
);
```

### 多个提示排列

多个提示会按顺序向下排列，先进先出。

```jsx
import { message, Button } from '@apron-design/react';

export default () => {
  const showMultiple = () => {
    message.info('First message');
    setTimeout(() => message.success('Second message'), 500);
    setTimeout(() => message.warning('Third message'), 1000);
    setTimeout(() => message.error('Fourth message'), 1500);
  };

  return (
    <Button onClick={showMultiple}>
      Show Multiple Messages
    </Button>
  );
};
```

### 自定义显示时长

可以自定义消息显示时长，设置为 0 则不自动关闭。

```jsx
import { message, Button } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <Button onClick={() => message.info('2 seconds', 2000)}>
      2s Duration
    </Button>
    <Button onClick={() => message.success('10 seconds', 10000)}>
      10s Duration
    </Button>
    <Button onClick={() => message.warning('Will not auto close', 0)}>
      No Auto Close
    </Button>
  </div>
);
```

### 富文本内容

支持 ReactNode 类型的内容，可以显示富文本。

```jsx
import { message, Button } from '@apron-design/react';

export default () => (
  <Button
    onClick={() =>
      message.success(
        <span>
          Your file <strong>report.pdf</strong> has been uploaded successfully!
        </span>
      )
    }
  >
    Show Rich Content
  </Button>
);
```

### 移除单个消息

可以通过 message.remove(id) 方法移除指定的消息。

```jsx
import { useState } from 'react';
import { message, Button } from '@apron-design/react';

const RemoveMessageComponent = () => {
  const [messageId, setMessageId] = useState(null);

  const showMessage = () => {
    const id = message.info('This message can be removed manually', 0);
    setMessageId(id);
  };

  const removeMessage = () => {
    if (messageId) {
      message.remove(messageId);
      setMessageId(null);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button onClick={showMessage}>
        Show Message
      </Button>
      <Button onClick={removeMessage} disabled={!messageId}>
        Remove Message
      </Button>
    </div>
  );
};

export default RemoveMessageComponent;
```

### 清除所有消息

可以通过 message.clear() 方法一次性清除所有消息。

```jsx
import { message, Button } from '@apron-design/react';

export default () => {
  const showMultiple = () => {
    message.info('Message 1', 0);
    message.success('Message 2', 0);
    message.warning('Message 3', 0);
    message.error('Message 4', 0);
  };

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button onClick={showMultiple}>
        Show Multiple Messages
      </Button>
      <Button onClick={() => message.clear()}>
        Clear All
      </Button>
    </div>
  );
};
```

### 完整示例

展示 Message 组件的各种使用场景。

```jsx
import { message, Button } from '@apron-design/react';

export default () => {
  const handleSuccess = () => {
    message.success('操作成功！');
  };

  const handleError = () => {
    message.error('操作失败，请重试');
  };

  const handleWarning = () => {
    message.warning('请注意：此操作不可撤销');
  };

  const handleInfo = () => {
    message.info('提示：请检查您的输入');
  };

  const handleCustom = () => {
    const id = message.show('info', '自定义消息，3秒后关闭', 3000);
    setTimeout(() => {
      message.remove(id);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button onClick={handleSuccess} variant="primary">
          成功操作
        </Button>
        <Button onClick={handleError} variant="default">
          错误操作
        </Button>
        <Button onClick={handleWarning}>
          警告提示
        </Button>
        <Button onClick={handleInfo}>
          信息提示
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button onClick={handleCustom}>
          自定义时长
        </Button>
        <Button onClick={() => message.clear()}>
          清除所有
        </Button>
      </div>
    </div>
  );
};
```

## API

### message

| 方法 | 说明 | 类型 |
| --- | --- | --- |
| message.show | 显示消息 | `(type: 'info' \| 'success' \| 'warning' \| 'error', message: React.ReactNode, duration?: number) => string` |
| message.info | 显示信息消息 | `(message: React.ReactNode, duration?: number) => string` |
| message.success | 显示成功消息 | `(message: React.ReactNode, duration?: number) => string` |
| message.warning | 显示警告消息 | `(message: React.ReactNode, duration?: number) => string` |
| message.error | 显示错误消息 | `(message: React.ReactNode, duration?: number) => string` |
| message.remove | 移除指定消息 | `(id: string) => void` |
| message.clear | 清除所有消息 | `() => void` |

### 参数说明

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 消息类型 | `'info' \| 'success' \| 'warning' \| 'error'` | - |
| message | 消息内容 | `React.ReactNode` | - |
| duration | 显示时长（毫秒），设置为 0 则不自动关闭 | `number` | `5000` |
| id | 消息唯一标识符，用于移除消息 | `string` | - |