# Apron Design

一个智慧、现代化的 React 组件库，基于 TypeScript + SCSS 构建。

> Intelligent design System Connect swift experience. Fully open source product design system.

[English](./README.md) | 简体中文

## ✨ 特性

- 🎨 基于 SCSS 的样式系统，支持主题定制
- 📦 支持 ESM 和 CommonJS 两种模块格式
- 🔧 完整的 TypeScript 类型支持
- ✅ 使用 Vitest 进行单元测试
- 🌙 支持暗黑模式

## 📚 设计初衷
我们有意识地为视觉系统提供一套一致的、平和的、引导用户意识的、开放的并且必要的组件套组，为我们的产品和业务的设计和开发体提供便捷。

### 为什么？
Apron 指的是机场停机坪

我们希望这套组件排列在一起时像停机坪一样整齐，同时也符合我们的设计理念：
- **A**greement - 一致
- **P**eace - 平和
- **R**ealizing - 意识
- **O**pen - 开放
- **N**ecessity - 必要

## 📦 安装

```bash
npm install @apron-design/react
# 或
yarn add @apron-design/react
# 或
pnpm add @apron-design/react
```

## 🔨 使用方法

### 全局引用

全局引用会导入所有组件和样式，适合快速开始或不关心包体积的场景：

```tsx
// 在入口文件（如 main.tsx 或 App.tsx）中引入全局样式
import '@apron-design/react/styles';

// 然后在任意组件中使用
import { Button, Input, Modal, Toast } from '@apron-design/react';

function App() {
  return (
    <div>
      <Button variant="primary" onClick={() => Toast.success('成功！')}>
        点击我
      </Button>
      <Input placeholder="请输入内容" />
    </div>
  );
}
```

### 按需引用

按需引用只导入需要的组件，可以有效减少打包体积：

```tsx
// 方式一：从主包按需导入组件（推荐）
// 样式仍需全局引入一次
import '@apron-design/react/styles';

import { Button } from '@apron-design/react';
import { Input, Textarea } from '@apron-design/react';
import { Modal, Drawer } from '@apron-design/react';

function App() {
  return <Button variant="primary">按钮</Button>;
}
```

> 💡 **提示**：由于组件库使用 ES Module 格式，现代打包工具（如 Vite、Webpack 5+）会自动进行 Tree Shaking，只打包实际使用的组件代码。

### 组件列表

组件库提供以下组件：

**通用组件**
- `Button` - 按钮
- `Link` - 链接

**布局组件**
- `Row` / `Col` - 栅格布局
- `Space` - 间距
- `Divider` - 分割线

**数据展示**
- `Avatar` / `AvatarGroup` - 头像
- `Badge` - 徽标
- `Card` - 卡片
- `Collapse` - 折叠面板
- `Empty` - 空状态
- `Image` - 图片
- `Pagination` - 分页器
- `Skeleton` - 骨架屏
- `Steps` - 步骤条
- `Tabs` - 标签页
- `Tag` - 标签
- `Timeline` - 时间线
- `Tooltip` - 文字提示
- `Popover` - 气泡卡片

**数据录入**
- `Input` / `Textarea` - 输入框
- `InputOtp` - 验证码输入
- `Select` - 选择器
- `Cascader` - 级联选择器
- `DatePicker` - 日期选择器
- `Checkbox` / `CheckboxGroup` - 复选框
- `Radio` / `RadioGroup` - 单选框
- `Rate` - 评分
- `Switch` - 开关
- `Form` / `FormItem` - 表单

**反馈组件**
- `Alert` - 警告提示
- `Message` - 全局消息
- `Modal` - 对话框
- `Drawer` - 抽屉
- `ResponsiveModal` - 响应式对话框
- `Spin` - 加载中
- `Toast` - 轻提示

### 全局方法

部分组件提供全局方法，可以在任意位置调用：

```tsx
import { Message, Toast, Spin } from '@apron-design/react';

// 消息提示
Message.success('操作成功');
Message.error('操作失败');
Message.warning('警告信息');
Message.info('提示信息');

// Toast 提示（移动端）
Toast.success('成功');
Toast.fail('失败');
Toast.loading('加载中...');
Toast.close();

// 全局加载
Spin.show({ text: '加载中...' });
Spin.close();
```

### SSR 支持

组件库支持服务端渲染（SSR），可以在 Next.js、Remix 等框架中使用：

```tsx
// Next.js App Router 示例
// app/layout.tsx
import '@apron-design/react/styles';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

// app/page.tsx
import { Button, Card } from '@apron-design/react';

export default function Page() {
  return (
    <Card title="欢迎">
      <Button variant="primary">开始使用</Button>
    </Card>
  );
}
```

> ⚠️ **注意**：全局方法（如 `Toast.show()`、`Spin.show()`、`Message.success()`）依赖浏览器 API，只能在客户端调用。在 SSR 环境中，请确保这些方法在 `useEffect` 或事件处理函数中调用。

```tsx
'use client'; // Next.js 中需要标记为客户端组件

import { useEffect } from 'react';
import { Toast } from '@apron-design/react';

export default function MyComponent() {
  useEffect(() => {
    // ✅ 正确：在 useEffect 中调用
    Toast.success('页面加载完成');
  }, []);

  const handleClick = () => {
    // ✅ 正确：在事件处理函数中调用
    Toast.success('点击成功');
  };

  return <button onClick={handleClick}>点击</button>;
}
```

## 🎨 主题定制

### 使用 CSS 变量

组件库使用 CSS 变量来实现主题定制，你可以通过覆盖这些变量来自定义主题：

```css
:root {
  --apron-color-primary: #3b82f6;
  --apron-color-primary-hover: #2563eb;
  --apron-radius-md: 6px;
}
```

### 暗黑模式

添加 `data-theme="dark"` 属性到根元素即可启用暗黑模式：

```html
<html data-theme="dark">
  ...
</html>
```
## 📄 License

MIT

