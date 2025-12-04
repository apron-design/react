import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: '链接变种',
    },
    underline: {
      control: 'select',
      options: ['always', 'hover', 'never'],
      description: '下划线显示方式',
    },
    danger: {
      control: 'boolean',
      description: '是否为危险链接（红色）',
    },
    href: {
      control: 'text',
      description: '链接地址',
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: '链接打开方式',
    },
    children: {
      control: 'text',
      description: '链接文本',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

// 默认链接 (Secondary)
export const Default: Story = {
  args: {
    children: '默认链接',
    href: '#',
  },
};

// Primary 变种
export const Primary: Story = {
  args: {
    children: 'Primary 链接',
    href: '#',
    variant: 'primary',
  },
};

// Secondary 变种
export const Secondary: Story = {
  args: {
    children: 'Secondary 链接',
    href: '#',
    variant: 'secondary',
  },
};

// 危险链接
export const Danger: Story = {
  args: {
    children: '危险链接',
    href: '#',
    danger: true,
  },
};

// 下划线: always
export const UnderlineAlways: Story = {
  args: {
    children: '始终有下划线',
    href: '#',
    underline: 'always',
  },
};

// 下划线: hover
export const UnderlineHover: Story = {
  args: {
    children: '悬停时有下划线',
    href: '#',
    underline: 'hover',
  },
};

// 下划线: never
export const UnderlineNever: Story = {
  args: {
    children: '从不显示下划线',
    href: '#',
    underline: 'never',
  },
};

// 新窗口打开
export const NewTab: Story = {
  args: {
    children: '新窗口打开',
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
};

// 所有变体展示
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ margin: 0 }}>变种 (Variant)</h4>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Link href="#" variant="primary">
          Primary 链接
        </Link>
        <Link href="#" variant="secondary">
          Secondary 链接
        </Link>
      </div>

      <h4 style={{ margin: 0 }}>下划线 (Underline)</h4>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Link href="#" underline="always">
          Always
        </Link>
        <Link href="#" underline="hover">
          Hover
        </Link>
        <Link href="#" underline="never">
          Never
        </Link>
      </div>

      <h4 style={{ margin: 0 }}>危险链接 (Danger)</h4>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Link href="#" danger>
          危险链接
        </Link>
        <Link href="#" danger underline="always">
          危险链接 (带下划线)
        </Link>
      </div>

      <h4 style={{ margin: 0 }}>内联文本</h4>
      <div>
        <span>
          这是一段包含{' '}
          <Link href="#" variant="primary">
            Primary 链接
          </Link>{' '}
          和{' '}
          <Link href="#" variant="secondary">
            Secondary 链接
          </Link>{' '}
          的文本。
        </span>
      </div>
    </div>
  ),
};

// 深色模式展示
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div
      data-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '24px',
        borderRadius: '8px',
        color: '#f4f4f5',
      }}
    >
      <h4 style={{ margin: 0 }}>变种 (Variant)</h4>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Link href="#" variant="primary">
          Primary 链接
        </Link>
        <Link href="#" variant="secondary">
          Secondary 链接
        </Link>
      </div>

      <h4 style={{ margin: 0 }}>下划线 (Underline)</h4>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Link href="#" underline="always">
          Always
        </Link>
        <Link href="#" underline="hover">
          Hover
        </Link>
        <Link href="#" underline="never">
          Never
        </Link>
      </div>

      <h4 style={{ margin: 0 }}>危险链接 (Danger)</h4>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Link href="#" danger>
          危险链接
        </Link>
        <Link href="#" danger underline="always">
          危险链接 (带下划线)
        </Link>
      </div>

      <h4 style={{ margin: 0 }}>内联文本</h4>
      <div>
        <span>
          这是一段包含{' '}
          <Link href="#" variant="primary">
            Primary 链接
          </Link>{' '}
          和{' '}
          <Link href="#" variant="secondary">
            Secondary 链接
          </Link>{' '}
          的文本。
        </span>
      </div>
    </div>
  ),
};

// Light & Dark 模式对比
export const LightAndDark: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Light Mode */}
      <div
        style={{
          flex: 1,
          padding: '24px',
          backgroundColor: '#ffffff',
          color: '#18181b',
        }}
      >
        <h3 style={{ margin: '0 0 16px 0' }}>☀️ Light Mode</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="#" variant="primary">
              Primary
            </Link>
            <Link href="#" variant="secondary">
              Secondary
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="#" underline="always">
              Always
            </Link>
            <Link href="#" underline="hover">
              Hover
            </Link>
            <Link href="#" underline="never">
              Never
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="#" danger>
              Danger
            </Link>
            <Link href="#" danger underline="always">
              Danger + Underline
            </Link>
          </div>
        </div>
      </div>

      {/* Dark Mode */}
      <div
        data-theme="dark"
        style={{
          flex: 1,
          padding: '24px',
          backgroundColor: '#18181b',
          color: '#f4f4f5',
        }}
      >
        <h3 style={{ margin: '0 0 16px 0' }}>🌙 Dark Mode</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="#" variant="primary">
              Primary
            </Link>
            <Link href="#" variant="secondary">
              Secondary
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="#" underline="always">
              Always
            </Link>
            <Link href="#" underline="hover">
              Hover
            </Link>
            <Link href="#" underline="never">
              Never
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="#" danger>
              Danger
            </Link>
            <Link href="#" danger underline="always">
              Danger + Underline
            </Link>
          </div>
        </div>
      </div>
    </div>
  ),
};
