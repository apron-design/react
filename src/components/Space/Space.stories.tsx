import type { Meta, StoryObj } from '@storybook/react';
import { Space } from './Space';
import { Button } from '../Button';

const meta: Meta<typeof Space> = {
  title: 'Components/Space',
  component: Space,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'baseline'],
      description: '对齐方式',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '间距方向',
    },
    size: {
      control: 'select',
      options: ['small', 'middle', 'large'],
      description: '间距大小',
    },
    wrap: {
      control: 'boolean',
      description: '是否自动换行（仅 horizontal 时有效）',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Space>;

// 示例盒子组件
const Box = ({ children, style }: { children?: React.ReactNode; style?: React.CSSProperties }) => (
  <div
    style={{
      padding: '8px 16px',
      backgroundColor: '#4C9EEA',
      color: '#fff',
      borderRadius: '4px',
      ...style,
    }}
  >
    {children}
  </div>
);

// ============================================
// Default
// ============================================
export const Default: Story = {
  render: () => (
    <Space>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Space>
  ),
};

// ============================================
// Orientation 间距方向
// ============================================
export const Horizontal: Story = {
  render: () => (
    <Space orientation="horizontal">
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Space>
  ),
  name: '水平方向（默认）',
};

export const Vertical: Story = {
  render: () => (
    <Space orientation="vertical">
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Space>
  ),
  name: '垂直方向',
};

// ============================================
// Size 间距大小
// ============================================
export const SizeSmall: Story = {
  render: () => (
    <Space size="small">
      <Box>Small</Box>
      <Box>Small</Box>
      <Box>Small</Box>
    </Space>
  ),
  name: '小间距 (8px)',
};

export const SizeMiddle: Story = {
  render: () => (
    <Space size="middle">
      <Box>Middle</Box>
      <Box>Middle</Box>
      <Box>Middle</Box>
    </Space>
  ),
  name: '中间距 (16px)',
};

export const SizeLarge: Story = {
  render: () => (
    <Space size="large">
      <Box>Large</Box>
      <Box>Large</Box>
      <Box>Large</Box>
    </Space>
  ),
  name: '大间距 (24px)',
};

export const SizeCustom: Story = {
  render: () => (
    <Space size={32}>
      <Box>Custom 32px</Box>
      <Box>Custom 32px</Box>
      <Box>Custom 32px</Box>
    </Space>
  ),
  name: '自定义间距 (32px)',
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>Small (8px)</p>
        <Space size="small">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </Space>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>Middle (16px) - 默认</p>
        <Space size="middle">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </Space>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>Large (24px)</p>
        <Space size="large">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </Space>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>Custom (40px)</p>
        <Space size={40}>
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </Space>
      </div>
    </div>
  ),
  name: '间距大小对比',
};

// ============================================
// Align 对齐方式
// ============================================
export const AlignStart: Story = {
  render: () => (
    <Space align="start">
      <Box style={{ height: '40px' }}>Short</Box>
      <Box style={{ height: '60px' }}>Medium</Box>
      <Box style={{ height: '80px' }}>Tall</Box>
    </Space>
  ),
  name: '顶部对齐',
};

export const AlignCenter: Story = {
  render: () => (
    <Space align="center">
      <Box style={{ height: '40px' }}>Short</Box>
      <Box style={{ height: '60px' }}>Medium</Box>
      <Box style={{ height: '80px' }}>Tall</Box>
    </Space>
  ),
  name: '居中对齐',
};

export const AlignEnd: Story = {
  render: () => (
    <Space align="end">
      <Box style={{ height: '40px' }}>Short</Box>
      <Box style={{ height: '60px' }}>Medium</Box>
      <Box style={{ height: '80px' }}>Tall</Box>
    </Space>
  ),
  name: '底部对齐',
};

export const AlignBaseline: Story = {
  render: () => (
    <Space align="baseline">
      <Box style={{ fontSize: '12px' }}>12px</Box>
      <Box style={{ fontSize: '16px' }}>16px</Box>
      <Box style={{ fontSize: '24px' }}>24px</Box>
    </Space>
  ),
  name: '基线对齐',
};

export const AllAlignments: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>Start</p>
        <Space align="start">
          <Box style={{ height: '40px' }}>A</Box>
          <Box style={{ height: '60px' }}>B</Box>
          <Box style={{ height: '80px' }}>C</Box>
        </Space>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>Center</p>
        <Space align="center">
          <Box style={{ height: '40px' }}>A</Box>
          <Box style={{ height: '60px' }}>B</Box>
          <Box style={{ height: '80px' }}>C</Box>
        </Space>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>End</p>
        <Space align="end">
          <Box style={{ height: '40px' }}>A</Box>
          <Box style={{ height: '60px' }}>B</Box>
          <Box style={{ height: '80px' }}>C</Box>
        </Space>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>Baseline</p>
        <Space align="baseline">
          <Box style={{ fontSize: '12px' }}>12px</Box>
          <Box style={{ fontSize: '16px' }}>16px</Box>
          <Box style={{ fontSize: '24px' }}>24px</Box>
        </Space>
      </div>
    </div>
  ),
  name: '对齐方式对比',
};

// ============================================
// Wrap 自动换行
// ============================================
export const Wrap: Story = {
  render: () => (
    <div style={{ width: '300px', border: '1px dashed #d4d4d8', padding: '16px' }}>
      <Space wrap>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
        <Box>Item 4</Box>
        <Box>Item 5</Box>
        <Box>Item 6</Box>
        <Box>Item 7</Box>
        <Box>Item 8</Box>
      </Space>
    </div>
  ),
  name: '自动换行',
};

export const NoWrap: Story = {
  render: () => (
    <div style={{ width: '300px', border: '1px dashed #d4d4d8', padding: '16px', overflow: 'auto' }}>
      <Space wrap={false}>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
        <Box>Item 4</Box>
        <Box>Item 5</Box>
        <Box>Item 6</Box>
        <Box>Item 7</Box>
        <Box>Item 8</Box>
      </Space>
    </div>
  ),
  name: '不换行',
};

// ============================================
// 使用场景
// ============================================
export const WithButtons: Story = {
  render: () => (
    <Space>
      <Button variant="primary">确认</Button>
      <Button variant="secondary">取消</Button>
      <Button variant="text">重置</Button>
    </Space>
  ),
  name: '按钮组',
};

export const VerticalForm: Story = {
  render: () => (
    <Space orientation="vertical" size="large" align="start">
      <div>
        <label style={{ display: 'block', marginBottom: '4px', color: '#393939' }}>用户名</label>
        <input
          type="text"
          placeholder="请输入用户名"
          style={{
            padding: '8px 12px',
            border: '1px solid #d4d4d8',
            borderRadius: '4px',
            width: '200px',
          }}
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', color: '#393939' }}>密码</label>
        <input
          type="password"
          placeholder="请输入密码"
          style={{
            padding: '8px 12px',
            border: '1px solid #d4d4d8',
            borderRadius: '4px',
            width: '200px',
          }}
        />
      </div>
      <Space>
        <Button variant="primary">登录</Button>
        <Button variant="secondary">注册</Button>
      </Space>
    </Space>
  ),
  name: '垂直表单布局',
};

// ============================================
// Complete Overview
// ============================================
export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Orientation */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>方向</h3>
        <div style={{ display: 'flex', gap: '48px' }}>
          <div>
            <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>水平（默认）</p>
            <Space orientation="horizontal">
              <Box>A</Box>
              <Box>B</Box>
              <Box>C</Box>
            </Space>
          </div>
          <div>
            <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>垂直</p>
            <Space orientation="vertical">
              <Box>A</Box>
              <Box>B</Box>
              <Box>C</Box>
            </Space>
          </div>
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>间距大小</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Space size="small">
            <Box>Small</Box>
            <Box>8px</Box>
          </Space>
          <Space size="middle">
            <Box>Middle</Box>
            <Box>16px</Box>
          </Space>
          <Space size="large">
            <Box>Large</Box>
            <Box>24px</Box>
          </Space>
        </div>
      </div>

      {/* Wrap */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>自动换行</h3>
        <div style={{ width: '250px', border: '1px dashed #d4d4d8', padding: '12px' }}>
          <Space wrap size="small">
            <Box>Tag 1</Box>
            <Box>Tag 2</Box>
            <Box>Tag 3</Box>
            <Box>Tag 4</Box>
            <Box>Tag 5</Box>
          </Space>
        </div>
      </div>
    </div>
  ),
  name: '完整概览',
};

