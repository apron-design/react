---
title: Modal 对话框
group: 反馈组件
order: 3
---

# Modal 对话框

模态对话框用于显示重要的信息或请求用户输入。它会中断用户的当前操作，直到用户与对话框进行交互。

## 何时使用

- 需要用户确认某些操作时
- 显示重要信息时
- 收集用户输入时
- 展示详细内容时

## 示例

### 基础用法

最简单的对话框，包含标题、内容和默认的操作按钮。

```jsx
import { useState } from 'react';
import { Modal, Button } from '@apron-design/react';

export default function BasicModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>打开对话框</Button>
      <Modal
        open={open}
        title="基础对话框"
        onClose={() => setOpen(false)}
        onOk={() => {
          console.log('确认');
          setOpen(false);
        }}
      >
        <p>这是对话框的内容。</p>
        <p>点击蒙层或按 ESC 键可以关闭对话框。</p>
      </Modal>
    </>
  );
}
```

### 无标题对话框

可以通过省略 `title` 属性来创建无标题的对话框。

```jsx
import { useState } from 'react';
import { Modal, Button } from '@apron-design/react';

export default function WithoutTitleModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>无标题对话框</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onOk={() => setOpen(false)}
        showCancel={false}
        okText="关闭"
      >
        <p>这是一个没有标题的对话框。</p>
      </Modal>
    </>
  );
}
```

### 无底部对话框

通过设置 `showFooter` 为 `false` 来隐藏底部操作区域。

```jsx
import { useState } from 'react';
import { Modal, Button } from '@apron-design/react';

export default function WithoutFooterModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>无底部对话框</Button>
      <Modal
        open={open}
        title="无底部对话框"
        onClose={() => setOpen(false)}
        showFooter={false}
      >
        <p>这是一个没有底部的对话框。</p>
        <p>你可以通过关闭按钮或点击蒙层来关闭它。</p>
      </Modal>
    </>
  );
}
```

### 禁止点击蒙层关闭

通过设置 `closeByOverlay` 为 `false` 来禁止用户通过点击蒙层关闭对话框。

```jsx
import { useState } from 'react';
import { Modal, Button } from '@apron-design/react';

export default function NoCloseByOverlayModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>禁止点击蒙层关闭</Button>
      <Modal
        open={open}
        title="禁止点击蒙层关闭"
        closeByOverlay={false}
        onClose={() => setOpen(false)}
        onOk={() => setOpen(false)}
        showCancel={false}
        okText="知道了"
      >
        <p>这个对话框不能通过点击蒙层来关闭。</p>
        <p>请点击按钮或关闭图标来关闭。</p>
      </Modal>
    </>
  );
}
```

### 不可关闭对话框

通过设置 `closable` 和 `closeByOverlay` 为 `false` 来创建不可关闭的对话框。

```jsx
import { useState } from 'react';
import { Modal, Button } from '@apron-design/react';

export default function NotClosableModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>不可关闭对话框</Button>
      <Modal
        open={open}
        title="重要提示"
        closable={false}
        closeByOverlay={false}
        onClose={() => setOpen(false)}
        footer={
          <Button onClick={() => setOpen(false)}>我已阅读并同意</Button>
        }
      >
        <p>这是一条重要信息，你必须阅读后才能关闭。</p>
        <p>没有关闭按钮，也不能点击蒙层关闭。</p>
      </Modal>
    </>
  );
}
```

### 自定义宽度

通过 `width` 属性来自定义对话框的宽度。

```jsx
import { useState } from 'react';
import { Modal, Button } from '@apron-design/react';

export default function CustomWidthModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>自定义宽度（800px）</Button>
      <Modal
        open={open}
        title="宽对话框"
        width={800}
        onClose={() => setOpen(false)}
        footer={<Button onClick={() => setOpen(false)}>关闭</Button>}
      >
        <p>这是一个宽度为 800px 的对话框。</p>
      </Modal>
    </>
  );
}
```

### 长内容对话框

当内容较长时，对话框会自动显示滚动条。

```jsx
import { useState } from 'react';
import { Modal, Button } from '@apron-design/react';

export default function LongContentModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>长内容对话框</Button>
      <Modal
        open={open}
        title="长内容对话框"
        onClose={() => setOpen(false)}
        footer={<Button onClick={() => setOpen(false)}>关闭</Button>}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>这是第 {i + 1} 段内容。Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        ))}
      </Modal>
    </>
  );
}
```

### 确认对话框

用于确认危险操作的对话框，通常会将确认按钮设置为危险样式。

```jsx
import { useState } from 'react';
import { Modal, Button } from '@apron-design/react';

export default function ConfirmModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>确认对话框</Button>
      <Modal
        open={open}
        title="确认删除"
        width={400}
        onClose={() => setOpen(false)}
        onOk={() => {
          console.log('Confirmed!');
          setOpen(false);
        }}
        okText="确认删除"
        okButtonProps={{ danger: true }}
      >
        <p>确定要删除这条记录吗？此操作不可撤销。</p>
      </Modal>
    </>
  );
}
```

### 自定义按钮文字和变种

可以通过 `okText`、`cancelText` 和按钮属性来自定义按钮的文字和样式。

```jsx
import { useState } from 'react';
import { Modal, Button } from '@apron-design/react';

export default function CustomButtonsModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>自定义按钮</Button>
      <Modal
        open={open}
        title="自定义按钮文字和变种"
        onClose={() => setOpen(false)}
        onOk={() => {
          console.log('提交');
          setOpen(false);
        }}
        okText="提交"
        cancelText="返回"
        okButtonProps={{ variant: 'secondary' }}
        cancelButtonProps={{ variant: 'text' }}
      >
        <p>确认按钮使用 secondary 变种，取消按钮使用 text 变种。</p>
      </Modal>
    </>
  );
}
```

### 只有确认按钮

通过设置 `showCancel` 为 `false` 来只显示确认按钮。

```jsx
import { useState } from 'react';
import { Modal, Button } from '@apron-design/react';

export default function WithoutCancelModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>只有确认按钮</Button>
      <Modal
        open={open}
        title="提示"
        onClose={() => setOpen(false)}
        onOk={() => setOpen(false)}
        showCancel={false}
        okText="知道了"
      >
        <p>这个对话框只有一个确认按钮。</p>
      </Modal>
    </>
  );
}
```

### 表单对话框

在对话框中嵌入表单以收集用户输入。

```jsx
import { useState } from 'react';
import { Modal, Button } from '@apron-design/react';

export default function FormModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>表单对话框</Button>
      <Modal
        open={open}
        title="新建用户"
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button onClick={() => setOpen(false)}>取消</Button>
            <Button onClick={() => setOpen(false)}>提交</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
              用户名
            </label>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxSizing: 'border-box',
              }}
              placeholder="请输入用户名"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
              邮箱
            </label>
            <input
              type="email"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxSizing: 'border-box',
              }}
              placeholder="请输入邮箱"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
```

### 自定义底部

通过 `footer` 属性来自定义底部内容。

```jsx
import { useState } from 'react';
import { Modal, Button } from '@apron-design/react';

export default function CustomFooterModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>自定义底部</Button>
      <Modal
        open={open}
        title="自定义底部"
        onClose={() => setOpen(false)}
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button onClick={() => console.log('帮助')}>帮助</Button>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button onClick={() => setOpen(false)}>取消</Button>
              <Button onClick={() => setOpen(false)}>确定</Button>
            </div>
          </div>
        }
      >
        <p>这个对话框有自定义的底部布局。</p>
      </Modal>
    </>
  );
}
```

### 深色模式

在深色模式下，对话框会自动适应主题颜色。

```jsx
import { useState } from 'react';
import { Modal, Button } from '@apron-design/react';

export default function DarkModeModal() {
  const [open, setOpen] = useState(false);

  return (
    <div data-theme="dark" style={{ padding: '32px', backgroundColor: '#18181b', borderRadius: '12px' }}>
      <Button onClick={() => setOpen(true)}>Dark Mode Modal</Button>
      <Modal
        open={open}
        title="深色模式"
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button onClick={() => setOpen(false)}>取消</Button>
            <Button onClick={() => setOpen(false)}>确定</Button>
          </>
        }
      >
        <p>这是深色模式下的对话框。</p>
      </Modal>
    </div>
  );
}
```

## API

### Modal Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否显示对话框 | boolean | `false` |
| title | 标题 | ReactNode | - |
| closable | 是否显示关闭按钮 | boolean | `true` |
| closeByOverlay | 点击蒙层是否可以关闭 | boolean | `true` |
| onClose | 关闭时的回调 | `() => void` | - |
| onOk | 点击确认按钮的回调 | `() => void` | - |
| width | 对话框宽度 | number \| string | `520` |
| footer | 自定义 footer，设置为 null 则不显示 | ReactNode \| null | - |
| showFooter | 是否显示 footer | boolean | `true` |
| okText | 确认按钮文字 | string | `'确定'` |
| cancelText | 取消按钮文字 | string | `'取消'` |
| okButtonProps | 确认按钮属性 | [ButtonProps](./button) | - |
| cancelButtonProps | 取消按钮属性 | [ButtonProps](./button) | - |
| showCancel | 是否显示取消按钮 | boolean | `true` |
| children | 子元素（正文内容） | ReactNode | - |
| className | 自定义类名 | string | - |
| centered | 是否居中显示 | boolean | `true` |
| afterOpenChange | 打开/关闭动画完成后的回调 | `(open: boolean) => void` | - |

## 注意事项

1. 对话框打开时会阻止页面滚动
2. 按 ESC 键可以关闭对话框（除非设置了 `closable={false}`）
3. 点击蒙层可以关闭对话框（除非设置了 `closeByOverlay={false}`）
4. 对话框会在页面 body 上创建 Portal，确保层级高于其他元素