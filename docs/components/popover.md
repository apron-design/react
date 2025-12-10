---
title: Popover 气泡卡片
group: 反馈组件
order: 3
---

# Popover 气泡卡片

气泡卡片是一种轻量级的弹出框，用于显示额外的信息或确认操作。

## 何时使用

- 需要显示简短的提示信息时
- 需要用户确认某个操作时
- 不想打断用户主要流程但又需要提供额外信息时

## 示例

### 基础用法

最简单的气泡卡片，在点击触发元素时显示内容。

```jsx
import { Popover, Button } from '@apron-design/react';

export default function BasicPopover() {
  return (
    <Popover title="提示标题" content="这是 Popover 的内容区域，可以放置任何文本信息。">
      <Button>点击显示</Button>
    </Popover>
  );
}
```

### 触发方式

Popover 支持两种触发方式：点击和悬停。

#### 点击触发

```jsx
import { Popover, Button } from '@apron-design/react';

export default function ClickPopover() {
  return (
    <Popover mode="click" title="点击触发" content="点击按钮或外部区域关闭。">
      <Button>点击显示</Button>
    </Popover>
  );
}
```

#### 悬停触发

```jsx
import { Popover, Button } from '@apron-design/react';

export default function HoverPopover() {
  return (
    <Popover mode="hover" title="悬停触发" content="鼠标移出后自动关闭。">
      <Button>悬停显示</Button>
    </Popover>
  );
}
```

### 搭配不同元素

Popover 可以与多种元素搭配使用。

#### 搭配链接

```jsx
import { Popover, Link } from '@apron-design/react';

export default function LinkPopover() {
  return (
    <Popover mode="hover" title="链接提示" content="这是链接的详细说明。">
      <Link>悬停查看详情</Link>
    </Popover>
  );
}
```

#### 搭配文本

```jsx
import { Popover } from '@apron-design/react';

export default function TextPopover() {
  return (
    <Popover mode="hover" content="这是一段说明文字">
      <span style={{ cursor: 'pointer', textDecoration: 'underline', color: '#4C9EEA' }}>
        帮助信息
      </span>
    </Popover>
  );
}
```

### 内容变化

Popover 支持不同的内容组合。

#### 只有标题

```jsx
import { Popover, Button } from '@apron-design/react';

export default function TitleOnlyPopover() {
  return (
    <Popover title="只有标题">
      <Button variant="secondary">只有标题</Button>
    </Popover>
  );
}
```

#### 只有内容

```jsx
import { Popover, Button } from '@apron-design/react';

export default function ContentOnlyPopover() {
  return (
    <Popover content="只有内容，没有标题。">
      <Button variant="secondary">只有内容</Button>
    </Popover>
  );
}
```

#### 长内容

```jsx
import { Popover, Button } from '@apron-design/react';

export default function LongContentPopover() {
  return (
    <Popover
      title="详细说明"
      content="这是一段很长的内容，用来测试 Popover 的最大宽度限制。当内容超过 300px 宽度时，会自动换行显示，确保内容可读性良好。"
    >
      <Button>长内容</Button>
    </Popover>
  );
}
```

#### 富文本内容

```jsx
import { Popover, Button } from '@apron-design/react';

export default function RichContentPopover() {
  return (
    <Popover
      title="用户信息"
      content={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>用户名：admin</div>
          <div>邮箱：admin@example.com</div>
          <div>角色：管理员</div>
        </div>
      }
    >
      <Button>查看用户信息</Button>
    </Popover>
  );
}
```

### PopoverConfirm 确认框

专门用于确认操作的气泡卡片。

```jsx
import { PopoverConfirm, Button } from '@apron-design/react';

export default function ConfirmPopover() {
  return (
    <PopoverConfirm
      title="确认删除"
      content="删除后将无法恢复，确定要删除吗？"
      onCancel={() => console.log('取消')}
      onConfirm={() => console.log('确认')}
    >
      <Button variant="primary" danger>删除</Button>
    </PopoverConfirm>
  );
}
```

### PopoverConfirm 自定义文字

可以自定义确认框中的按钮文字。

```jsx
import { PopoverConfirm, Button } from '@apron-design/react';

export default function CustomTextConfirmPopover() {
  return (
    <PopoverConfirm
      title="提交确认"
      content="确定要提交此表单吗？"
      cancelText="返回修改"
      confirmText="确定提交"
      onCancel={() => console.log('返回修改')}
      onConfirm={() => console.log('确定提交')}
    >
      <Button variant="primary">提交</Button>
    </PopoverConfirm>
  );
}
```

### PopoverConfirm 自定义按钮样式

可以自定义确认框中按钮的样式。

```jsx
import { PopoverConfirm, Button } from '@apron-design/react';

export default function CustomVariantConfirmPopover() {
  return (
    <PopoverConfirm
      title="危险操作"
      content="此操作不可逆，请谨慎操作。"
      cancelText="取消"
      confirmText="确认删除"
      cancelVariant="text"
      confirmVariant="primary"
      onCancel={() => console.log('取消')}
      onConfirm={() => console.log('确认删除')}
    >
      <Button danger>危险操作</Button>
    </PopoverConfirm>
  );
}
```

### PopoverConfirm 搭配链接

确认框也可以与链接搭配使用。

```jsx
import { PopoverConfirm, Link } from '@apron-design/react';

export default function LinkConfirmPopover() {
  return (
    <PopoverConfirm
      title="退出登录"
      content="确定要退出登录吗？"
      onCancel={() => console.log('取消')}
      onConfirm={() => console.log('退出登录')}
    >
      <Link>退出登录</Link>
    </PopoverConfirm>
  );
}
```

### 多个 Popover（互斥）

同一时间只能显示一个 Popover，点击新的会关闭旧的。

```jsx
import { Popover, PopoverConfirm, Button, Link } from '@apron-design/react';

export default function MultiplePopovers() {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Popover title="Popover 1" content="这是第一个 Popover">
        <Button>Popover 1</Button>
      </Popover>
      <Popover title="Popover 2" content="这是第二个 Popover">
        <Button>Popover 2</Button>
      </Popover>
      <PopoverConfirm
        title="确认"
        content="这是一个确认框"
        onConfirm={() => console.log('确认')}
      >
        <Button variant="primary">PopoverConfirm</Button>
      </PopoverConfirm>
    </div>
  );
}
```

### 暗色模式

Popover 在暗色模式下会自动适配主题颜色。

```jsx
import { Popover, PopoverConfirm, Button } from '@apron-design/react';

export default function DarkModePopover() {
  return (
    <div
      data-theme="dark"
      style={{
        padding: '100px 32px',
        backgroundColor: '#18181b',
        borderRadius: '12px',
        display: 'flex',
        gap: '24px',
        justifyContent: 'center',
      }}
    >
      <Popover title="暗色模式" content="Popover 支持暗色模式。">
        <Button>Popover</Button>
      </Popover>
      <PopoverConfirm
        title="确认操作"
        content="在暗色模式下的确认框。"
        onConfirm={() => console.log('确认')}
      >
        <Button variant="primary">PopoverConfirm</Button>
      </PopoverConfirm>
    </div>
  );
}
```

### 完整概览

展示 Popover 和 PopoverConfirm 的各种用法。

```jsx
import { Popover, PopoverConfirm, Button } from '@apron-design/react';

export default function OverviewPopover() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', padding: '50px 0' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>Popover 触发方式</h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Popover mode="click" title="点击触发" content="点击按钮或外部关闭">
            <Button>Click</Button>
          </Popover>
          <Popover mode="hover" title="悬停触发" content="鼠标移出后关闭">
            <Button variant="secondary">Hover</Button>
          </Popover>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>PopoverConfirm</h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          <PopoverConfirm
            title="删除确认"
            content="确定要删除吗？"
            onConfirm={() => console.log('删除')}
          >
            <Button danger>删除</Button>
          </PopoverConfirm>
          <PopoverConfirm
            title="提交确认"
            content="确定要提交吗？"
            cancelText="返回"
            confirmText="提交"
            onConfirm={() => console.log('提交')}
          >
            <Button variant="primary">提交</Button>
          </PopoverConfirm>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>互斥展示</h3>
        <p style={{ margin: '0 0 12px 0', color: '#71717a', fontSize: '14px' }}>
          同一时间只能显示一个 Popover，点击新的会关闭旧的
        </p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Popover title="Popover A" content="内容 A">
            <Button variant="text">A</Button>
          </Popover>
          <Popover title="Popover B" content="内容 B">
            <Button variant="text">B</Button>
          </Popover>
          <Popover title="Popover C" content="内容 C">
            <Button variant="text">C</Button>
          </Popover>
        </div>
      </div>
    </div>
  );
}
```

## API

### Popover Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 触发方式 | `'click'` \| `'hover'` | `'click'` |
| title | 标题 | ReactNode | - |
| content | 内容 | ReactNode | - |
| children | 触发元素 | ReactElement | - |
| className | 自定义类名 | string | - |

### PopoverConfirm Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | ReactNode | - |
| content | 内容 | ReactNode | - |
| cancelText | 取消按钮文字 | string | `'取消'` |
| confirmText | 确定按钮文字 | string | `'确定'` |
| cancelVariant | 取消按钮变种 | [ButtonVariant](./button) | `'default'` |
| confirmVariant | 确定按钮变种 | [ButtonVariant](./button) | `'primary'` |
| onCancel | 取消回调 | `() => void` | - |
| onConfirm | 确定回调 | `() => void` | - |
| children | 触发元素 | ReactElement | - |
| className | 自定义类名 | string | - |

## 注意事项

1. Popover 和 PopoverConfirm 都是通过 Portal 渲染到 body 上的，确保层级高于其他元素
2. 同一时间只能显示一个 Popover，点击新的会自动关闭旧的
3. 点击模式下，点击外部区域会关闭 Popover
4. 悬停模式下，鼠标移出触发元素或 Popover 会延迟关闭
5. Popover 会自动计算位置，确保完全显示在视口内
6. 当窗口大小改变或滚动时，Popover 会重新计算位置
7. PopoverConfirm 专门用于确认操作，提供了取消和确定两个按钮