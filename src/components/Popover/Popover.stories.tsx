import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverConfirm } from './Popover';
import { Button } from '../Button';
import { Link } from '../Link';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['click', 'hover'],
      description: '触发方式',
    },
    title: {
      control: 'text',
      description: '标题',
    },
    content: {
      control: 'text',
      description: '内容',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

// ============================================
// Popover - Default
// ============================================
export const Default: Story = {
  render: () => (
    <Popover title="提示标题" content="这是 Popover 的内容区域，可以放置任何文本信息。">
      <Button>点击显示</Button>
    </Popover>
  ),
};

// ============================================
// Popover - Mode
// ============================================
export const ClickMode: Story = {
  render: () => (
    <Popover mode="click" title="点击触发" content="点击按钮或外部区域关闭。">
      <Button>点击显示</Button>
    </Popover>
  ),
  name: 'Click 模式',
};

export const HoverMode: Story = {
  render: () => (
    <Popover mode="hover" title="悬停触发" content="鼠标移出后自动关闭。">
      <Button>悬停显示</Button>
    </Popover>
  ),
  name: 'Hover 模式',
};

// ============================================
// Popover - Different Triggers
// ============================================
export const WithLink: Story = {
  render: () => (
    <Popover mode="hover" title="链接提示" content="这是链接的详细说明。">
      <Link>悬停查看详情</Link>
    </Popover>
  ),
  name: '搭配链接',
};

export const WithText: Story = {
  render: () => (
    <Popover mode="hover" content="这是一段说明文字">
      <span style={{ cursor: 'pointer', textDecoration: 'underline', color: '#4C9EEA' }}>
        帮助信息
      </span>
    </Popover>
  ),
  name: '搭配文本',
};

// ============================================
// Popover - Content Variations
// ============================================
export const TitleOnly: Story = {
  render: () => (
    <Popover title="只有标题">
      <Button variant="secondary">只有标题</Button>
    </Popover>
  ),
  name: '只有标题',
};

export const ContentOnly: Story = {
  render: () => (
    <Popover content="只有内容，没有标题。">
      <Button variant="secondary">只有内容</Button>
    </Popover>
  ),
  name: '只有内容',
};

export const LongContent: Story = {
  render: () => (
    <Popover
      title="详细说明"
      content="这是一段很长的内容，用来测试 Popover 的最大宽度限制。当内容超过 300px 宽度时，会自动换行显示，确保内容可读性良好。"
    >
      <Button>长内容</Button>
    </Popover>
  ),
  name: '长内容',
};

export const RichContent: Story = {
  render: () => (
    <Popover
      title="用户信息"
      content={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>用户名：admin</div>
          <div>邮箱：admin@example.com</div>
          <div>角色：管理员</div>
        </div>
      }
    >
      <Button>查看用户信息</Button>
    </Popover>
  ),
  name: '富文本内容',
};

// ============================================
// PopoverConfirm
// ============================================
export const Confirm: Story = {
  render: () => (
    <PopoverConfirm
      title="确认删除"
      content="删除后将无法恢复，确定要删除吗？"
      onCancel={() => console.log('取消')}
      onConfirm={() => console.log('确认')}
    >
      <Button variant="primary" danger>删除</Button>
    </PopoverConfirm>
  ),
  name: 'PopoverConfirm',
};

export const ConfirmCustomText: Story = {
  render: () => (
    <PopoverConfirm
      title="提交确认"
      content="确定要提交此表单吗？"
      cancelText="返回修改"
      confirmText="确定提交"
      onCancel={() => console.log('返回修改')}
      onConfirm={() => console.log('确定提交')}
    >
      <Button variant="primary">提交</Button>
    </PopoverConfirm>
  ),
  name: 'PopoverConfirm 自定义文字',
};

export const ConfirmCustomVariant: Story = {
  render: () => (
    <PopoverConfirm
      title="危险操作"
      content="此操作不可逆，请谨慎操作。"
      cancelText="取消"
      confirmText="确认删除"
      cancelVariant="text"
      confirmVariant="primary"
      onCancel={() => console.log('取消')}
      onConfirm={() => console.log('确认删除')}
    >
      <Button danger>危险操作</Button>
    </PopoverConfirm>
  ),
  name: 'PopoverConfirm 自定义按钮样式',
};

export const ConfirmWithLink: Story = {
  render: () => (
    <PopoverConfirm
      title="退出登录"
      content="确定要退出登录吗？"
      onCancel={() => console.log('取消')}
      onConfirm={() => console.log('退出登录')}
    >
      <Link>退出登录</Link>
    </PopoverConfirm>
  ),
  name: 'PopoverConfirm 搭配链接',
};

// ============================================
// Multiple Popovers (只显示一个)
// ============================================
export const MultiplePopovers: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Popover title="Popover 1" content="这是第一个 Popover">
        <Button>Popover 1</Button>
      </Popover>
      <Popover title="Popover 2" content="这是第二个 Popover">
        <Button>Popover 2</Button>
      </Popover>
      <PopoverConfirm
        title="确认"
        content="这是一个确认框"
        onConfirm={() => console.log('确认')}
      >
        <Button variant="primary">PopoverConfirm</Button>
      </PopoverConfirm>
    </div>
  ),
  name: '多个 Popover（互斥）',
};

// ============================================
// Dark Mode
// ============================================
export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      style={{
        padding: '100px 32px',
        backgroundColor: '#18181b',
        borderRadius: '12px',
        display: 'flex',
        gap: '24px',
        justifyContent: 'center',
      }}
    >
      <Popover title="暗色模式" content="Popover 支持暗色模式。">
        <Button>Popover</Button>
      </Popover>
      <PopoverConfirm
        title="确认操作"
        content="在暗色模式下的确认框。"
        onConfirm={() => console.log('确认')}
      >
        <Button variant="primary">PopoverConfirm</Button>
      </PopoverConfirm>
    </div>
  ),
  name: '暗色模式',
};

// ============================================
// Overview
// ============================================
export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', padding: '50px 0' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>Popover 触发方式</h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Popover mode="click" title="点击触发" content="点击按钮或外部关闭">
            <Button>Click</Button>
          </Popover>
          <Popover mode="hover" title="悬停触发" content="鼠标移出后关闭">
            <Button variant="secondary">Hover</Button>
          </Popover>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>PopoverConfirm</h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          <PopoverConfirm
            title="删除确认"
            content="确定要删除吗？"
            onConfirm={() => console.log('删除')}
          >
            <Button danger>删除</Button>
          </PopoverConfirm>
          <PopoverConfirm
            title="提交确认"
            content="确定要提交吗？"
            cancelText="返回"
            confirmText="提交"
            onConfirm={() => console.log('提交')}
          >
            <Button variant="primary">提交</Button>
          </PopoverConfirm>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>互斥展示</h3>
        <p style={{ margin: '0 0 12px 0', color: '#71717a', fontSize: '14px' }}>
          同一时间只能显示一个 Popover，点击新的会关闭旧的
        </p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Popover title="Popover A" content="内容 A">
            <Button variant="text">A</Button>
          </Popover>
          <Popover title="Popover B" content="内容 B">
            <Button variant="text">B</Button>
          </Popover>
          <Popover title="Popover C" content="内容 C">
            <Button variant="text">C</Button>
          </Popover>
        </div>
      </div>
    </div>
  ),
  name: '完整概览',
};

