# Apron Design

An intelligent, modern React component library built with TypeScript + SCSS.

> Intelligent design System Connect swift experience. Fully open source product design system.

English | [简体中文](./README.zh-CN.md)

## ✨ Features

- 🎨 SCSS-based styling system with theme customization support
- 📦 Supports both ESM and CommonJS module formats
- 🔧 Full TypeScript type support
- ✅ Unit testing with Vitest
- 🌙 Dark mode support

## 📚 Design Philosophy

We intentionally provide a consistent, peaceful, awareness-guiding, open, and necessary set of components for the visual system, to facilitate the design and development of our products and business.

### Why?

Apron refers to the airport apron.

We hope that when these components are arranged together, they will be as neat as an airport apron, while also reflecting our design philosophy:
- **A**greement
- **P**eace
- **R**ealizing
- **O**pen
- **N**ecessity

## 📦 Installation

```bash
npm install @apron-design/react
# or
yarn add @apron-design/react
# or
pnpm add @apron-design/react
```

## 🔨 Example

```tsx
import { Button } from '@apron-design/react';
import '@apron-design/react/styles';

function App() {
  return (
    <Button variant="primary" onClick={() => console.log('clicked')}>
      Click me
    </Button>
  );
}
```

## 🎨 Theme Customization

### Using CSS Variables

The component library uses CSS variables for theme customization. You can customize the theme by overriding these variables:

```css
:root {
  --apron-color-primary: #3b82f6;
  --apron-color-primary-hover: #2563eb;
  --apron-radius-md: 6px;
}
```

### Dark Mode

Add the `data-theme="dark"` attribute to the root element to enable dark mode:

```html
<html data-theme="dark">
  ...
</html>
```

## 📄 License

MIT
