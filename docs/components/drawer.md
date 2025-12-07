---
title: Drawer 抽屉
group: 反馈组件
order: 3
---

# Drawer 抽屉

屏幕边缘滑出的浮层面板，用于承载临时内容或操作。

## 何时使用

- 需要从屏幕边缘滑出一个面板来承载内容
- 用于移动端或空间受限的场景
- 替代 Modal 对话框，提供更自然的过渡效果

## 示例

### 基础用法

最简单的用法，从右侧滑出抽屉。

```jsx
import { useState } from 'react';
import { Drawer, Button } from '@apron-design/react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>打开抽屉</Button>
      <Drawer
        open={open}
        title="基础抽屉"
        onClose={() => setOpen(false)}
        onOk={() => {
          console.log('确认');
          setOpen(false);
        }}
      >
        <p>这是抽屉的内容。</p>
        <p>默认从右侧展开。</p>
      </Drawer>
    </>
  );
};
```

### 不同方向

支持从上、右、下、左四个方向滑出。

```jsx
import { useState } from 'react';
import { Drawer, Button } from '@apron-design/react';

export default () => {
  const [openRight, setOpenRight] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);
  const [openTop, setOpenTop] = useState(false);
  const [openBottom, setOpenBottom] = useState(false);

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button onClick={() => setOpenTop(true)}>上</Button>
      <Button onClick={() => setOpenRight(true)}>右</Button>
      <Button onClick={() => setOpenBottom(true)}>下</Button>
      <Button onClick={() => setOpenLeft(true)}>左</Button>

      <Drawer
        open={openRight}
        title="右侧抽屉"
        placement="right"
        onClose={() => setOpenRight(false)}
        onOk={() => setOpenRight(false)}
      >
        <p>从右侧展开</p>
      </Drawer>

      <Drawer
        open={openLeft}
        title="左侧抽屉"
        placement="left"
        onClose={() => setOpenLeft(false)}
        onOk={() => setOpenLeft(false)}
      >
        <p>从左侧展开</p>
      </Drawer>

      <Drawer
        open={openTop}
        title="顶部抽屉"
        placement="top"
        height={250}
        onClose={() => setOpenTop(false)}
        onOk={() => setOpenTop(false)}
      >
        <p>从顶部展开</p>
      </Drawer>

      <Drawer
        open={openBottom}
        title="底部抽屉"
        placement="bottom"
        height={250}
        onClose={() => setOpenBottom(false)}
        onOk={() => setOpenBottom(false)}
      >
        <p>从底部展开</p>
      </Drawer>
    </div>
  );
};
```

### 自定义尺寸

可以自定义抽屉的宽度（左右方向）或高度（上下方向）。

```jsx
import { useState } from 'react';
import { Drawer, Button } from '@apron-design/react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>宽抽屉（600px）</Button>
      <Drawer
        open={open}
        title="自定义宽度"
        width={600}
        onClose={() => setOpen(false)}
        onOk={() => setOpen(false)}
      >
        <p>这是一个宽度为 600px 的抽屉。</p>
      </Drawer>
    </>
  );
};
```

### 移动端模式

为移动端优化的抽屉样式，提供更好的用户体验。

```jsx
import { useState } from 'react';
import { Drawer, Button } from '@apron-design/react';

export default () => {
  const [openRight, setOpenRight] = useState(false);
  const [openBottom, setOpenBottom] = useState(false);

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button onClick={() => setOpenRight(true)}>移动端右侧抽屉</Button>
      <Button onClick={() => setOpenBottom(true)}>移动端底部抽屉</Button>

      <Drawer
        open={openRight}
        title="移动端抽屉"
        placement="right"
        isMobile={true}
        onClose={() => setOpenRight(false)}
        onOk={() => setOpenRight(false)}
      >
        <p>移动端模式会给非靠边的角落加上 20px 的圆角。</p>
      </Drawer>

      <Drawer
        open={openBottom}
        title="移动端底部抽屉"
        placement="bottom"
        height={300}
        isMobile={true}
        onClose={() => setOpenBottom(false)}
        onOk={() => setOpenBottom(false)}
      >
        <p>这是移动端底部抽屉，常用于操作菜单。</p>
      </Drawer>
    </div>
  );
};
```

### 无底部抽屉

通过 `showFooter` 属性隐藏底部操作栏。

```jsx
import { useState } from 'react';
import { Drawer, Button } from '@apron-design/react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>无底部抽屉</Button>
      <Drawer
        open={open}
        title="无底部抽屉"
        showFooter={false}
        onClose={() => setOpen(false)}
      >
        <p>这是一个没有底部的抽屉。</p>
        <p>你可以通过关闭按钮或点击蒙层来关闭它。</p>
      </Drawer>
    </>
  );
};
```

### 表单抽屉

在抽屉中放置表单，常用于新建或编辑操作。

```jsx
import { useState } from 'react';
import { Drawer, Button } from '@apron-design/react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>新建用户</Button>
      <Drawer
        open={open}
        title="新建用户"
        width={450}
        onClose={() => setOpen(false)}
        onOk={() => {
          console.log('提交表单');
          setOpen(false);
        }}
        okText="创建"
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
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
              角色
            </label>
            <select
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxSizing: 'border-box',
              }}
            >
              <option>管理员</option>
              <option>编辑</option>
              <option>访客</option>
            </select>
          </div>
        </div>
      </Drawer>
    </>
  );
};
```

## API

### Drawer

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否显示抽屉 | `boolean` | `false` |
| title | 标题 | `ReactNode` | - |
| placement | 抽屉方向 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` |
| closable | 是否显示关闭按钮 | `boolean` | `true` |
| closeByOverlay | 点击蒙层是否可以关闭 | `boolean` | `true` |
| onClose | 关闭时的回调 | `() => void` | - |
| onOk | 点击确认按钮的回调 | `() => void` | - |
| width | 抽屉宽度（左右方向时有效） | `number \| string` | `378` |
| height | 抽屉高度（上下方向时有效） | `number \| string` | `378` |
| footer | 自定义 footer，设置为 null 则不显示 | `ReactNode \| null` | - |
| showFooter | 是否显示 footer | `boolean` | `true` |
| okText | 确认按钮文字 | `string` | `'确定'` |
| cancelText | 取消按钮文字 | `string` | `'取消'` |
| okButtonProps | 确认按钮属性 | `Omit<ButtonProps, 'children' \| 'onClick'>` | - |
| cancelButtonProps | 取消按钮属性 | `Omit<ButtonProps, 'children' \| 'onClick'>` | - |
| showCancel | 是否显示取消按钮 | `boolean` | `true` |
| isMobile | 是否为移动端模式 | `boolean` | `false` |
| children | 子元素（正文内容） | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| afterOpenChange | 打开/关闭动画完成后的回调 | `(open: boolean) => void` | - |