---
title: Toast 轻提示
group: 反馈组件
order: 3
---

# Toast 轻提示

Toast 组件用于向用户提供简短的操作反馈信息，会在一段时间后自动消失。

## 基础用法

Toast 组件提供了四种类型的提示：`success`、`fail`、`danger` 和 `loading`。可以通过调用相应的方法来显示不同类型的消息。

```jsx
import { Toast, Button } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
    <Button onClick={() => Toast.success('操作成功')}>Success</Button>
    <Button onClick={() => Toast.fail('操作失败')}>Fail</Button>
    <Button onClick={() => Toast.danger('危险警告')}>Danger</Button>
    <Button onClick={() => Toast.loading('加载中...')}>Loading</Button>
  </div>
);
```

## 成功提示

使用 `Toast.success()` 方法显示成功的反馈信息。

```jsx
import { Toast, Button } from '@apron-design/react';

export default () => (
  <Button onClick={() => Toast.success('保存成功')}>
    Show Success Toast
  </Button>
);
```

## 失败提示

使用 `Toast.fail()` 方法显示失败的反馈信息。

```jsx
import { Toast, Button } from '@apron-design/react';

export default () => (
  <Button onClick={() => Toast.fail('操作失败')}>
    Show Fail Toast
  </Button>
);
```

## 危险提示

使用 `Toast.danger()` 方法显示危险或严重警告信息。

```jsx
import { Toast, Button } from '@apron-design/react';

export default () => (
  <Button onClick={() => Toast.danger('危险警告')}>
    Show Danger Toast
  </Button>
);
```

## 加载提示

使用 `Toast.loading()` 方法显示加载状态的提示。注意，加载提示默认不会自动关闭，需要手动调用 `Toast.close()` 方法关闭。

```jsx
import { Toast, Button } from '@apron-design/react';

export default () => {
  const showLoading = () => {
    Toast.loading('加载中...');
    // 3秒后自动关闭
    setTimeout(() => {
      Toast.close();
    }, 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
        Loading Toast 默认不会自动关闭，需要手动调用 Toast.close()
      </p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button onClick={showLoading}>Show Loading (3s)</Button>
        <Button onClick={() => Toast.close()}>Close</Button>
      </div>
    </div>
  );
};
```

## 自定义配置

可以通过传递对象参数来自定义 Toast 的显示行为，包括持续时间和文本内容。

```jsx
import { Toast, Button } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <Button
      onClick={() =>
        Toast.success({
          text: '保存成功',
          duration: 3000,
        })
      }
    >
      Custom Duration (3s)
    </Button>
    <Button
      onClick={() =>
        Toast.show({
          type: 'success',
          text: '自定义配置',
          duration: 1500,
        })
      }
    >
      Using Toast.show()
    </Button>
  </div>
);
```

## 无文本提示

Toast 组件也可以只显示图标，不显示文本内容。

```jsx
import { Toast, Button } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', gap: '8px' }}>
    <Button onClick={() => Toast.success()}>Success (No Text)</Button>
    <Button onClick={() => Toast.fail()}>Fail (No Text)</Button>
  </div>
);
```

## 自定义图标

可以通过 `icon` 属性自定义 Toast 显示的图标。

```jsx
import { Toast, Button } from '@apron-design/react';

export default () => {
  const CustomHeartIcon = () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32 56L27.6 52.04C14.4 40.04 6 32.52 6 23.28C6 15.76 12.04 10 19.6 10C23.84 10 27.92 12.04 32 16.04C36.08 12.04 40.16 10 44.4 10C51.96 10 58 15.76 58 23.28C58 32.52 49.6 40.04 36.4 52.04L32 56Z"
        fill="#ec4899"
      />
    </svg>
  );

  return (
    <Button
      onClick={() =>
        Toast.show({
          icon: <CustomHeartIcon />,
          text: '已收藏',
          duration: 2000,
        })
      }
    >
      Custom Icon
    </Button>
  );
};
```

## 长文本提示

当提示文字较长时，Toast 会自动换行显示。

```jsx
import { Toast, Button } from '@apron-design/react';

export default () => (
  <Button
    onClick={() =>
      Toast.success('这是一段比较长的提示文字，会自动换行显示')
    }
  >
    Long Text
  </Button>
);
```

## 序列提示

可以在异步操作中按顺序显示多个 Toast，例如模拟提交流程。

```jsx
import { Toast, Button } from '@apron-design/react';

export default () => {
  const showSequence = async () => {
    Toast.loading('提交中...');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    Toast.success('提交成功');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
        模拟提交流程：Loading → Success
      </p>
      <Button onClick={showSequence}>Submit</Button>
    </div>
  );
};
```

## 手动关闭

可以通过设置 `duration: 0` 来阻止 Toast 自动关闭，然后通过 `Toast.close()` 方法手动关闭。

```jsx
import { Toast, Button } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', gap: '8px' }}>
    <Button onClick={() => Toast.success({ text: '手动关闭', duration: 0 })}>
      Show (No Auto Close)
    </Button>
    <Button onClick={() => Toast.close()}>Close</Button>
  </div>
);
```

## 暗色模式

Toast 组件支持暗色模式，会根据页面的 `data-theme` 属性自动切换样式。

```jsx
import { Toast, Button } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
      Toast 会根据页面的 data-theme 属性自动切换深色模式。
      <br />
      深色模式下背景为黑色。
    </p>
    <Button onClick={() => Toast.success('Success')}>Show Toast</Button>
  </div>
);
```

## API

### Toast 方法

| 方法名 | 描述 | 参数 | 返回值 |
| --- | --- | --- | --- |
| Toast.show(options) | 显示自定义 Toast | `ToastOptions` | `-` |
| Toast.success(text \| options) | 显示成功提示 | `string \| Omit<ToastOptions, 'type'>` | `-` |
| Toast.fail(text \| options) | 显示失败提示 | `string \| Omit<ToastOptions, 'type'>` | `-` |
| Toast.danger(text \| options) | 显示危险提示 | `string \| Omit<ToastOptions, 'type'>` | `-` |
| Toast.loading(text \| options) | 显示加载提示 | `string \| Omit<ToastOptions, 'type'>` | `-` |
| Toast.close() | 关闭当前显示的 Toast | `-` | `-` |

### ToastOptions

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 提示文字 | `string` | `-` |
| icon | 自定义图标 | `ReactNode` | `-` |
| duration | 显示时长（毫秒），设置为 0 则不自动关闭 | `number` | `2000`（loading 类型默认为 0） |
| type | Toast 类型 | `'success' \| 'fail' \| 'danger' \| 'loading'` | `-` |