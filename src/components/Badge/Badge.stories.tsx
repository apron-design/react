import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { Avatar } from '../Avatar';
import { Button } from '../Button';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    dot: {
      control: 'boolean',
      description: '显示红点',
    },
    count: {
      control: 'number',
      description: '显示数字',
    },
    overflowCount: {
      control: 'number',
      description: '数字溢出值',
    },
    content: {
      control: 'text',
      description: '自定义内容',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// 示例盒子组件
const Box = ({ size = 40 }: { size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      backgroundColor: '#e4e4e7',
      borderRadius: '8px',
    }}
  />
);

// ============================================
// Default
// ============================================
export const Default: Story = {
  render: () => (
    <Badge count={5}>
      <Box />
    </Badge>
  ),
};

// ============================================
// Dot 红点
// ============================================
export const Dot: Story = {
  render: () => (
    <Badge dot>
      <Box />
    </Badge>
  ),
  name: '红点',
};

export const DotWithAvatar: Story = {
  render: () => (
    <Badge dot>
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Badge" />
    </Badge>
  ),
  name: '红点 + 头像',
};

// ============================================
// Count 数字
// ============================================
export const CountSingle: Story = {
  render: () => (
    <Badge count={5}>
      <Box />
    </Badge>
  ),
  name: '单位数字',
};

export const CountDouble: Story = {
  render: () => (
    <Badge count={25}>
      <Box />
    </Badge>
  ),
  name: '双位数字',
};

export const CountTriple: Story = {
  render: () => (
    <Badge count={100}>
      <Box />
    </Badge>
  ),
  name: '三位数字',
};

export const CountOverflow: Story = {
  render: () => (
    <Badge count={100} overflowCount={99}>
      <Box />
    </Badge>
  ),
  name: '数字溢出 (99+)',
};

export const CountCustomOverflow: Story = {
  render: () => (
    <Badge count={1000} overflowCount={999}>
      <Box />
    </Badge>
  ),
  name: '自定义溢出值 (999+)',
};

export const CountZero: Story = {
  render: () => (
    <Badge count={0}>
      <Box />
    </Badge>
  ),
  name: '数字为0（不显示）',
};

export const AllCounts: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <Badge count={1}>
        <Box />
      </Badge>
      <Badge count={5}>
        <Box />
      </Badge>
      <Badge count={10}>
        <Box />
      </Badge>
      <Badge count={99}>
        <Box />
      </Badge>
      <Badge count={100}>
        <Box />
      </Badge>
    </div>
  ),
  name: '数字对比',
};

// ============================================
// Content 自定义内容
// ============================================
export const ContentNew: Story = {
  render: () => (
    <Badge content="New">
      <Box />
    </Badge>
  ),
  name: '自定义内容 - New',
};

export const ContentHot: Story = {
  render: () => (
    <Badge content="Hot">
      <Box />
    </Badge>
  ),
  name: '自定义内容 - Hot',
};

// ============================================
// 与其他组件配合
// ============================================
export const WithAvatar: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <Badge dot>
        <Avatar>U</Avatar>
      </Badge>
      <Badge count={5}>
        <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Badge1" />
      </Badge>
      <Badge count={99}>
        <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Badge2" />
      </Badge>
      <Badge count={100}>
        <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Badge3" />
      </Badge>
    </div>
  ),
  name: '配合头像',
};

export const WithButton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <Badge dot>
        <Button>消息</Button>
      </Badge>
      <Badge count={5}>
        <Button variant="secondary">通知</Button>
      </Badge>
    </div>
  ),
  name: '配合按钮',
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
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>红点</h4>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Badge dot>
            <Avatar>U</Avatar>
          </Badge>
          <Badge dot>
            <Box />
          </Badge>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>数字</h4>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Badge count={5}>
            <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dark1" />
          </Badge>
          <Badge count={99}>
            <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dark2" />
          </Badge>
          <Badge count={100}>
            <Box />
          </Badge>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>自定义内容</h4>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Badge content="New">
            <Box />
          </Badge>
          <Badge content="Hot">
            <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dark3" />
          </Badge>
        </div>
      </div>
    </div>
  ),
  name: '暗色模式',
};

// ============================================
// Complete Overview
// ============================================
export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Dot */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>红点 (dot)</h3>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Badge dot>
            <Box />
          </Badge>
          <Badge dot>
            <Avatar>U</Avatar>
          </Badge>
        </div>
      </div>

      {/* Count */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>数字 (count)</h3>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Badge count={1}>
              <Box />
            </Badge>
            <p style={{ margin: '12px 0 0', fontSize: '12px', color: '#71717a' }}>单位数</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge count={25}>
              <Box />
            </Badge>
            <p style={{ margin: '12px 0 0', fontSize: '12px', color: '#71717a' }}>双位数</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge count={100}>
              <Box />
            </Badge>
            <p style={{ margin: '12px 0 0', fontSize: '12px', color: '#71717a' }}>99+</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>自定义内容 (content)</h3>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Badge content="New">
            <Box />
          </Badge>
          <Badge content="Hot">
            <Box />
          </Badge>
          <Badge content="VIP">
            <Avatar>U</Avatar>
          </Badge>
        </div>
      </div>
    </div>
  ),
  name: '完整概览',
};

