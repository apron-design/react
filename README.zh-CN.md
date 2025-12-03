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
- *A*greement - 一致
- *P*eace - 平和
- *R*ealizing - 意识
- *O*pen - 开放
- *N*ecessity - 必要

## 📦 安装

```bash
npm install @apron-design/react
# 或
yarn add @apron-design/react
# 或
pnpm add @apron-design/react
```

## 🔨 例子

```tsx
import { Button } from '@apron-design/react';
import '@apron-design/react/styles';

function App() {
  return (
    <Button variant="primary" onClick={() => console.log('clicked')}>
      点击我
    </Button>
  );
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

