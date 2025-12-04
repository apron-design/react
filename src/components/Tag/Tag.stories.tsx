import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';
import { Space } from '../Space';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'default'],
      description: '标签变体',
    },
    closable: {
      control: 'boolean',
      description: '是否可关闭',
    },
    onClose: {
      action: 'closed',
      description: '关闭回调',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

// ============================================
// Default
// ============================================
export const Default: Story = {
  args: {
    children: '标签',
  },
};

// ============================================
// Variants
// ============================================
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary 标签',
  },
  name: 'Primary 变体',
};

export const DefaultVariant: Story = {
  args: {
    variant: 'default',
    children: 'Default 标签',
  },
  name: 'Default 变体',
};

export const AllVariants: Story = {
  render: () => (
    <Space>
      <Tag variant="primary">Primary</Tag>
      <Tag variant="default">Default</Tag>
    </Space>
  ),
  name: '变体对比',
};

// ============================================
// Closable
// ============================================
export const Closable: Story = {
  args: {
    closable: true,
    children: '可关闭标签',
  },
  name: '可关闭',
};

export const ClosablePrimary: Story = {
  args: {
    variant: 'primary',
    closable: true,
    children: 'Primary 可关闭',
  },
  name: 'Primary 可关闭',
};

export const ClosableDefault: Story = {
  args: {
    variant: 'default',
    closable: true,
    children: 'Default 可关闭',
  },
  name: 'Default 可关闭',
};

export const AllClosable: Story = {
  render: () => (
    <Space>
      <Tag variant="primary" closable onClose={() => console.log('Primary closed')}>
        Primary
      </Tag>
      <Tag variant="default" closable onClose={() => console.log('Default closed')}>
        Default
      </Tag>
    </Space>
  ),
  name: '可关闭对比',
};

// ============================================
// Interactive Example
// ============================================
const InteractiveTagsExample = () => {
  const [tags, setTags] = useState(['标签1', '标签2', '标签3', '标签4']);

  const handleClose = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Space wrap>
      {tags.map((tag) => (
        <Tag key={tag} closable onClose={() => handleClose(tag)}>
          {tag}
        </Tag>
      ))}
      {tags.length === 0 && <span style={{ color: '#a1a1aa' }}>所有标签已删除</span>}
    </Space>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTagsExample />,
  name: '交互示例',
};

// ============================================
// Use Cases
// ============================================
export const TagGroup: Story = {
  render: () => (
    <Space wrap>
      <Tag variant="primary">React</Tag>
      <Tag variant="primary">TypeScript</Tag>
      <Tag variant="primary">Vue</Tag>
      <Tag variant="default">JavaScript</Tag>
      <Tag variant="default">CSS</Tag>
    </Space>
  ),
  name: '标签组',
};

export const StatusTags: Story = {
  render: () => (
    <Space>
      <Tag variant="primary">进行中</Tag>
      <Tag variant="default">已完成</Tag>
      <Tag variant="default">待处理</Tag>
    </Space>
  ),
  name: '状态标签',
};

export const EditableTags: Story = {
  render: () => {
    const [tags, setTags] = useState(['前端', '后端', '设计']);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ color: '#71717a', fontSize: '14px' }}>点击 X 删除标签</div>
        <Space wrap>
          {tags.map((tag) => (
            <Tag
              key={tag}
              variant="default"
              closable
              onClose={() => setTags(tags.filter((t) => t !== tag))}
            >
              {tag}
            </Tag>
          ))}
        </Space>
      </div>
    );
  },
  name: '可编辑标签',
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
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>变体</h4>
        <Space>
          <Tag variant="primary">Primary</Tag>
          <Tag variant="default">Default</Tag>
        </Space>
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>可关闭</h4>
        <Space>
          <Tag variant="primary" closable>Primary</Tag>
          <Tag variant="default" closable>Default</Tag>
        </Space>
      </div>
    </div>
  ),
  name: '暗色模式',
};

// ============================================
// Overview
// ============================================
export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>变体</h3>
        <Space>
          <Tag variant="primary">Primary</Tag>
          <Tag variant="default">Default</Tag>
        </Space>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>可关闭</h3>
        <Space>
          <Tag variant="primary" closable>Primary</Tag>
          <Tag variant="default" closable>Default</Tag>
        </Space>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>标签组</h3>
        <Space wrap>
          <Tag variant="primary">React</Tag>
          <Tag variant="primary">Vue</Tag>
          <Tag variant="default">Angular</Tag>
          <Tag variant="default">Svelte</Tag>
        </Space>
      </div>
    </div>
  ),
  name: '完整概览',
};

