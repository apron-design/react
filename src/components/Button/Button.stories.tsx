import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: '按钮变体样式',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '按钮尺寸',
    },
    loading: {
      control: 'boolean',
      description: '是否为加载状态',
    },
    block: {
      control: 'boolean',
      description: '是否为块级按钮',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 基础用法
export const Primary: Story = {
  args: {
    children: '主要按钮',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: '次要按钮',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: '轮廓按钮',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: '幽灵按钮',
    variant: 'ghost',
  },
};

export const Danger: Story = {
  args: {
    children: '危险按钮',
    variant: 'danger',
  },
};

// 尺寸
export const Small: Story = {
  args: {
    children: '小按钮',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: '中按钮',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: '大按钮',
    size: 'lg',
  },
};

// 状态
export const Loading: Story = {
  args: {
    children: '加载中',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: '禁用按钮',
    disabled: true,
  },
};

export const Block: Story = {
  args: {
    children: '块级按钮',
    block: true,
  },
};

// 带图标
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export const WithIconLeft: Story = {
  args: {
    children: '搜索',
    iconLeft: <SearchIcon />,
  },
};

export const WithIconRight: Story = {
  args: {
    children: '下一步',
    iconRight: <ArrowRightIcon />,
  },
};

// 所有变体展示
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

// 所有尺寸展示
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

