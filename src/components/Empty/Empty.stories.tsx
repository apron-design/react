import type { Meta, StoryObj } from '@storybook/react';
import { Empty } from './Empty';
import { Button } from '../Button';

const meta: Meta<typeof Empty> = {
  title: 'Components/Empty',
  component: Empty,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false,
      description: '自定义图标',
    },
    children: {
      control: 'text',
      description: '提示文字',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Empty>;

// ============================================
// Default
// ============================================
export const Default: Story = {
  render: () => <Empty />,
};

// ============================================
// 自定义文字
// ============================================
export const CustomText: Story = {
  render: () => <Empty>没有找到相关数据</Empty>,
  name: '自定义文字',
};

export const LongText: Story = {
  render: () => (
    <Empty>
      暂无数据，请稍后再试或联系管理员
    </Empty>
  ),
  name: '长文字',
};

// ============================================
// 自定义图标
// ============================================
const SearchIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const FileIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const ImageIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

export const CustomIcon: Story = {
  render: () => <Empty icon={<SearchIcon />}>未找到搜索结果</Empty>,
  name: '自定义图标',
};

export const FileEmpty: Story = {
  render: () => <Empty icon={<FileIcon />}>暂无文件</Empty>,
  name: '文件为空',
};

export const ImageEmpty: Story = {
  render: () => <Empty icon={<ImageIcon />}>暂无图片</Empty>,
  name: '图片为空',
};

// ============================================
// 带操作按钮
// ============================================
export const WithAction: Story = {
  render: () => (
    <Empty>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <span>暂无数据</span>
        <Button variant="primary" size="sm">立即创建</Button>
      </div>
    </Empty>
  ),
  name: '带操作按钮',
};

export const SearchEmpty: Story = {
  render: () => (
    <Empty icon={<SearchIcon />}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <span>未找到相关内容</span>
        <span style={{ fontSize: '14px', color: '#a1a1aa' }}>
          试试其他关键词或调整筛选条件
        </span>
      </div>
    </Empty>
  ),
  name: '搜索为空',
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
      }}
    >
      <Empty>暂无数据</Empty>
    </div>
  ),
  name: '暗色模式',
};

export const DarkModeCustom: Story = {
  render: () => (
    <div
      data-theme="dark"
      style={{
        padding: '32px',
        backgroundColor: '#18181b',
        borderRadius: '12px',
      }}
    >
      <Empty icon={<SearchIcon />}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <span>未找到相关内容</span>
          <Button variant="primary" size="sm">重新搜索</Button>
        </div>
      </Empty>
    </div>
  ),
  name: '暗色模式 + 自定义',
};

// ============================================
// Overview
// ============================================
export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>默认空状态</h3>
        <Empty />
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>自定义文字</h3>
        <Empty>没有找到相关数据</Empty>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>自定义图标</h3>
        <Empty icon={<FileIcon />}>暂无文件</Empty>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>带操作按钮</h3>
        <Empty>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <span>暂无数据</span>
            <Button variant="primary" size="sm">立即创建</Button>
          </div>
        </Empty>
      </div>
    </div>
  ),
  name: '完整概览',
};

