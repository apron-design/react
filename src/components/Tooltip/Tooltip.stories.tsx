import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: '提示内容',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// 基础用法
export const Default: Story = {
  args: {
    content: '这是一个提示信息',
  },
  render: (args) => (
    <Tooltip {...args}>
      <button style={{ padding: '8px 16px', cursor: 'pointer' }}>悬停显示提示</button>
    </Tooltip>
  ),
};

// 不同内容
export const DifferentContent: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Tooltip content="简短提示">
        <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>短文本</span>
      </Tooltip>
      <Tooltip content="这是一段较长的提示信息，用于说明某个功能的具体用途">
        <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>长文本</span>
      </Tooltip>
      <Tooltip content="🎉 支持 Emoji">
        <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>Emoji</span>
      </Tooltip>
    </div>
  ),
};

// 在按钮上使用
export const OnButton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Tooltip content="保存当前内容">
        <button style={{ padding: '8px 16px', cursor: 'pointer' }}>保存</button>
      </Tooltip>
      <Tooltip content="删除此项目">
        <button style={{ padding: '8px 16px', cursor: 'pointer', color: '#ef4444' }}>删除</button>
      </Tooltip>
      <Tooltip content="此操作不可用">
        <button style={{ padding: '8px 16px', cursor: 'not-allowed', opacity: 0.5 }} disabled>
          禁用
        </button>
      </Tooltip>
    </div>
  ),
};

// 在图标上使用
export const OnIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Tooltip content="设置">
        <span style={{ fontSize: '20px', cursor: 'pointer' }}>⚙️</span>
      </Tooltip>
      <Tooltip content="帮助">
        <span style={{ fontSize: '20px', cursor: 'pointer' }}>❓</span>
      </Tooltip>
      <Tooltip content="通知">
        <span style={{ fontSize: '20px', cursor: 'pointer' }}>🔔</span>
      </Tooltip>
      <Tooltip content="用户">
        <span style={{ fontSize: '20px', cursor: 'pointer' }}>👤</span>
      </Tooltip>
    </div>
  ),
};

// 富文本内容
export const RichContent: Story = {
  render: () => (
    <Tooltip
      content={
        <div style={{ textAlign: 'center' }}>
          <strong>快捷键</strong>
          <br />
          <code style={{ fontSize: '12px' }}>Ctrl + S</code>
        </div>
      }
    >
      <button style={{ padding: '8px 16px', cursor: 'pointer' }}>查看快捷键</button>
    </Tooltip>
  ),
};


