import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    dashed: {
      control: 'boolean',
      description: '是否为虚线',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: '文字对齐方式',
    },
    children: {
      control: 'text',
      description: '分割线中的文字内容',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Divider>;

// ============================================
// Default (无文字)
// ============================================
export const Default: Story = {
  args: {},
};

// ============================================
// 实线 vs 虚线
// ============================================
export const Solid: Story = {
  args: {
    dashed: false,
  },
  name: '实线',
};

export const Dashed: Story = {
  args: {
    dashed: true,
  },
  name: '虚线',
};

export const LineStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>实线</p>
        <Divider />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>虚线</p>
        <Divider dashed />
      </div>
    </div>
  ),
  name: '线条样式对比',
};

// ============================================
// 带文字
// ============================================
export const WithText: Story = {
  args: {
    children: '分割线文字',
  },
  name: '带文字',
};

export const WithTextDashed: Story = {
  args: {
    children: '虚线分割',
    dashed: true,
  },
  name: '带文字虚线',
};

// ============================================
// 对齐方式
// ============================================
export const AlignLeft: Story = {
  args: {
    children: '左对齐',
    align: 'left',
  },
  name: '左对齐',
};

export const AlignCenter: Story = {
  args: {
    children: '居中对齐',
    align: 'center',
  },
  name: '居中对齐',
};

export const AlignRight: Story = {
  args: {
    children: '右对齐',
    align: 'right',
  },
  name: '右对齐',
};

export const AllAlignments: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Divider align="left">左对齐（默认）</Divider>
      <Divider align="center">居中对齐</Divider>
      <Divider align="right">右对齐</Divider>
    </div>
  ),
  name: '对齐方式对比',
};

export const AllAlignmentsDashed: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Divider align="left" dashed>左对齐（虚线）</Divider>
      <Divider align="center" dashed>居中对齐（虚线）</Divider>
      <Divider align="right" dashed>右对齐（虚线）</Divider>
    </div>
  ),
  name: '对齐方式对比（虚线）',
};

// ============================================
// 使用场景
// ============================================
export const UsageExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ margin: 0, color: '#393939' }}>
        这是第一段文字内容，展示了分割线在文档中的使用方式。
        分割线可以帮助用户区分不同的内容区块。
      </p>
      <Divider />
      <p style={{ margin: 0, color: '#393939' }}>
        这是第二段文字内容，被分割线分隔开来。
        实线分割线提供了清晰的视觉分隔。
      </p>
      <Divider dashed />
      <p style={{ margin: 0, color: '#393939' }}>
        这是第三段文字内容，使用虚线分割。
        虚线分割线提供了更柔和的视觉分隔。
      </p>
      <Divider align="center">或者</Divider>
      <p style={{ margin: 0, color: '#393939' }}>
        带文字的分割线可以作为选项分隔符使用。
      </p>
    </div>
  ),
  name: '使用场景示例',
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
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>无文字</h4>
        <Divider />
        <div style={{ height: '16px' }} />
        <Divider dashed />
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>带文字 - 对齐方式</h4>
        <Divider align="left">左对齐</Divider>
        <Divider align="center">居中对齐</Divider>
        <Divider align="right">右对齐</Divider>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>虚线 + 文字</h4>
        <Divider align="left" dashed>左对齐虚线</Divider>
        <Divider align="center" dashed>居中虚线</Divider>
        <Divider align="right" dashed>右对齐虚线</Divider>
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
      {/* 无文字 */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>无文字</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '14px', color: '#71717a' }}>实线：</span>
            <Divider />
          </div>
          <div>
            <span style={{ fontSize: '14px', color: '#71717a' }}>虚线：</span>
            <Divider dashed />
          </div>
        </div>
      </div>

      {/* 实线 + 文字 */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>实线 + 文字</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Divider align="left">左对齐</Divider>
          <Divider align="center">居中对齐</Divider>
          <Divider align="right">右对齐</Divider>
        </div>
      </div>

      {/* 虚线 + 文字 */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>虚线 + 文字</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Divider align="left" dashed>左对齐</Divider>
          <Divider align="center" dashed>居中对齐</Divider>
          <Divider align="right" dashed>右对齐</Divider>
        </div>
      </div>
    </div>
  ),
  name: '完整概览',
};

