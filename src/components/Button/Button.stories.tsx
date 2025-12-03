import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'default', 'text', 'link'],
      description: '按钮变体',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: '按钮尺寸',
    },
    dashed: {
      control: 'boolean',
      description: '是否为虚线边框',
    },
    danger: {
      control: 'boolean',
      description: '是否为危险按钮（红色）',
    },
    loading: {
      control: 'boolean',
      description: '是否为加载状态',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    block: {
      control: 'boolean',
      description: '是否为块级按钮',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Default story
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
};

// ============================================
// Types
// ============================================
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="default">Default</Button>
        <Button variant="text">Text</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>
  ),
};

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const DefaultVariant: Story = {
  args: {
    children: 'Default Button',
    variant: 'default',
  },
};

export const Text: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
  },
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
  },
};

// ============================================
// Dashed
// ============================================
export const Dashed: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="primary" dashed>Primary Dashed</Button>
      <Button variant="secondary" dashed>Secondary Dashed</Button>
      <Button variant="default" dashed>Default Dashed</Button>
    </div>
  ),
};

// ============================================
// Danger
// ============================================
export const Danger: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="primary" danger>Primary Danger</Button>
      <Button variant="secondary" danger>Secondary Danger</Button>
      <Button variant="default" danger>Default Danger</Button>
      <Button variant="text" danger>Text Danger</Button>
      <Button variant="link" danger>Link Danger</Button>
    </div>
  ),
};

export const DangerDashed: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="primary" danger dashed>Primary</Button>
      <Button variant="secondary" danger dashed>Secondary</Button>
      <Button variant="default" danger dashed>Default</Button>
    </div>
  ),
};

// ============================================
// Sizes
// ============================================
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="md" variant="primary">Medium (40px)</Button>
      <Button size="sm" variant="primary">Small (30px)</Button>
    </div>
  ),
};

// ============================================
// States
// ============================================
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="default" disabled>Default</Button>
      <Button variant="text" disabled>Text</Button>
      <Button variant="link" disabled>Link</Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    children: 'Loading...',
    loading: true,
  },
};

export const Block: Story = {
  args: {
    children: 'Block Button',
    block: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

// ============================================
// With Icons
// ============================================
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button iconLeft={<SearchIcon />}>Search</Button>
      <Button iconRight={<ArrowIcon />}>Next</Button>
      <Button iconLeft={<SearchIcon />} iconRight={<ArrowIcon />}>
        Both Icons
      </Button>
    </div>
  ),
};

// ============================================
// Dark Mode
// ============================================
export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      style={{
        padding: '32px',
        backgroundColor: '#18181b',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* All Variants */}
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Variants (Dark Mode)</h4>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="default">Default</Button>
          <Button variant="text">Text</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      {/* Dashed */}
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Dashed (Dark Mode)</h4>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="primary" dashed>Primary</Button>
          <Button variant="secondary" dashed>Secondary</Button>
          <Button variant="default" dashed>Default</Button>
        </div>
      </div>

      {/* Danger */}
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Danger (Dark Mode)</h4>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="primary" danger>Primary</Button>
          <Button variant="secondary" danger>Secondary</Button>
          <Button variant="default" danger>Default</Button>
          <Button variant="text" danger>Text</Button>
          <Button variant="link" danger>Link</Button>
        </div>
      </div>

      {/* Disabled */}
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Disabled (Dark Mode)</h4>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="default" disabled>Default</Button>
          <Button variant="text" disabled>Text</Button>
          <Button variant="link" disabled>Link</Button>
        </div>
      </div>
    </div>
  ),
};

// ============================================
// Complete Overview
// ============================================
export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Normal */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>Normal</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="default">Default</Button>
          <Button variant="text">Text</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      {/* Dashed */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>Dashed</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" dashed>Primary</Button>
          <Button variant="secondary" dashed>Secondary</Button>
          <Button variant="default" dashed>Default</Button>
        </div>
      </div>

      {/* Danger */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>Danger</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" danger>Primary</Button>
          <Button variant="secondary" danger>Secondary</Button>
          <Button variant="default" danger>Default</Button>
          <Button variant="text" danger>Text</Button>
          <Button variant="link" danger>Link</Button>
        </div>
      </div>

      {/* Danger + Dashed */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>Danger + Dashed</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" danger dashed>Primary</Button>
          <Button variant="secondary" danger dashed>Secondary</Button>
          <Button variant="default" danger dashed>Default</Button>
        </div>
      </div>

      {/* Disabled */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>Disabled</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="default" disabled>Default</Button>
          <Button variant="text" disabled>Text</Button>
          <Button variant="link" disabled>Link</Button>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>Sizes</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="primary" size="md">Medium (40px)</Button>
          <Button variant="primary" size="sm">Small (30px)</Button>
        </div>
      </div>
    </div>
  ),
};
