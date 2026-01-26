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

## 🔨 Usage

### Full Import

Import all components and styles globally. Suitable for quick start or when bundle size is not a concern:

```tsx
// Import global styles in your entry file (e.g., main.tsx or App.tsx)
import '@apron-design/react/styles';

// Then use components anywhere
import { Button, Input, Modal, Toast } from '@apron-design/react';

function App() {
  return (
    <div>
      <Button variant="primary" onClick={() => Toast.success('Success!')}>
        Click me
      </Button>
      <Input placeholder="Enter content" />
    </div>
  );
}
```

### On-demand Import

Import only the components you need to reduce bundle size:

```tsx
// Method: Import components from main package (recommended)
// Styles still need to be imported once globally
import '@apron-design/react/styles';

import { Button } from '@apron-design/react';
import { Input, Textarea } from '@apron-design/react';
import { Modal, Drawer } from '@apron-design/react';

function App() {
  return <Button variant="primary">Button</Button>;
}
```

> 💡 **Tip**: Since the component library uses ES Module format, modern bundlers (like Vite, Webpack 5+) will automatically perform Tree Shaking, only bundling the component code you actually use.

### Component List

The library provides the following components:

**General**
- `Button` - Button
- `Link` - Link

**Layout**
- `Row` / `Col` - Grid layout
- `Space` - Spacing
- `Divider` - Divider

**Data Display**
- `Avatar` / `AvatarGroup` - Avatar
- `Badge` - Badge
- `Card` - Card
- `Collapse` - Collapse panel
- `Empty` - Empty state
- `Image` - Image
- `Pagination` - Pagination
- `Skeleton` - Skeleton screen
- `Steps` - Steps
- `Tabs` - Tabs
- `Tag` - Tag
- `Timeline` - Timeline
- `Tooltip` - Tooltip
- `Popover` - Popover

**Data Entry**
- `Input` / `Textarea` - Input
- `InputOtp` - OTP Input
- `Select` - Select
- `Cascader` - Cascading selector
- `DatePicker` - Date picker
- `Checkbox` / `CheckboxGroup` - Checkbox
- `Radio` / `RadioGroup` - Radio
- `Rate` - Rate
- `Switch` - Switch
- `Form` / `FormItem` - Form

**Feedback**
- `Alert` - Alert
- `Message` - Global message
- `Modal` - Modal dialog
- `Drawer` - Drawer
- `ResponsiveModal` - Responsive modal
- `Spin` - Loading
- `Toast` - Toast

### Global Methods

Some components provide global methods that can be called anywhere:

```tsx
import { Message, Toast, Spin } from '@apron-design/react';

// Message notification
Message.success('Operation successful');
Message.error('Operation failed');
Message.warning('Warning message');
Message.info('Info message');

// Toast (mobile)
Toast.success('Success');
Toast.fail('Failed');
Toast.loading('Loading...');
Toast.close();

// Global loading
Spin.show({ text: 'Loading...' });
Spin.close();
```

### SSR Support

The component library supports Server-Side Rendering (SSR) and can be used with frameworks like Next.js and Remix:

```tsx
// Next.js App Router example
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
    <Card title="Welcome">
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}
```

> ⚠️ **Note**: Global methods (like `Toast.show()`, `Spin.show()`, `Message.success()`) rely on browser APIs and can only be called on the client side. In SSR environments, ensure these methods are called within `useEffect` or event handlers.

```tsx
'use client'; // Required in Next.js for client components

import { useEffect } from 'react';
import { Toast } from '@apron-design/react';

export default function MyComponent() {
  useEffect(() => {
    // ✅ Correct: Call within useEffect
    Toast.success('Page loaded');
  }, []);

  const handleClick = () => {
    // ✅ Correct: Call within event handler
    Toast.success('Click successful');
  };

  return <button onClick={handleClick}>Click</button>;
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

The component library supports two ways to enable dark mode:

#### Method 1: Manual Setting

Manually set dark mode using the `apron-theme` attribute on the `body` element:

```javascript
// Set dark mode
document.body.setAttribute('apron-theme', 'dark');

// Restore light mode
document.body.removeAttribute('apron-theme');
```

Or use the provided utility functions:

```tsx
import { setDarkMode, removeDarkMode, toggleDarkMode, isDarkMode } from '@apron-design/react';

// Set dark mode
setDarkMode();

// Restore light mode
removeDarkMode();

// Toggle dark mode
toggleDarkMode();

// Check if currently in dark mode
const isDark = isDarkMode();
```

**Note**: The component library only supports manual theme setting and no longer supports automatically following the system theme. Please use the above functions to manually control theme switching.

## 📄 License

MIT
