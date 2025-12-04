import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { AvatarGroup } from './AvatarGroup';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['mini', 'small', 'middle', 'large'],
      description: '头像尺寸',
    },
    square: {
      control: 'boolean',
      description: '是否为方形',
    },
    src: {
      control: 'text',
      description: '图片地址',
    },
    alt: {
      control: 'text',
      description: '图片替代文本',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// 示例图标
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

// ============================================
// Default
// ============================================
export const Default: Story = {
  args: {
    children: 'A',
  },
};

// ============================================
// 内容类型
// ============================================
export const WithText: Story = {
  args: {
    children: 'U',
  },
  name: '文字头像',
};

export const WithIcon: Story = {
  args: {
    children: <UserIcon />,
  },
  name: '图标头像',
};

export const WithImage: Story = {
  args: {
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    alt: 'User Avatar',
  },
  name: '图片头像',
};

export const ContentTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar>A</Avatar>
      <Avatar><UserIcon /></Avatar>
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
    </div>
  ),
  name: '内容类型对比',
};

// ============================================
// Sizes 尺寸
// ============================================
export const SizeMini: Story = {
  args: {
    size: 'mini',
    children: 'U',
  },
  name: 'Mini (28px)',
};

export const SizeSmall: Story = {
  args: {
    size: 'small',
    children: 'U',
  },
  name: 'Small (34px)',
};

export const SizeMiddle: Story = {
  args: {
    size: 'middle',
    children: 'U',
  },
  name: 'Middle (40px)',
};

export const SizeLarge: Story = {
  args: {
    size: 'large',
    children: 'U',
  },
  name: 'Large (64px)',
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar size="mini">U</Avatar>
      <Avatar size="small">U</Avatar>
      <Avatar size="middle">U</Avatar>
      <Avatar size="large">U</Avatar>
    </div>
  ),
  name: '尺寸对比',
};

export const AllSizesWithImage: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar size="mini" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mini" />
      <Avatar size="small" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Small" />
      <Avatar size="middle" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Middle" />
      <Avatar size="large" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Large" />
    </div>
  ),
  name: '尺寸对比（图片）',
};

// ============================================
// Shape 形状
// ============================================
export const Circle: Story = {
  args: {
    children: 'A',
    square: false,
  },
  name: '圆形（默认）',
};

export const Square: Story = {
  args: {
    children: 'A',
    square: true,
  },
  name: '方形',
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar>圆</Avatar>
      <Avatar square>方</Avatar>
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Circle" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Square" square />
    </div>
  ),
  name: '形状对比',
};

// ============================================
// Avatar Group
// ============================================
export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=User1" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=User2" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=User3" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=User4" />
    </AvatarGroup>
  ),
  name: '头像组',
};

export const GroupWithText: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar style={{ backgroundColor: '#4C9EEA', color: '#fff' }}>A</Avatar>
      <Avatar style={{ backgroundColor: '#22c55e', color: '#fff' }}>B</Avatar>
      <Avatar style={{ backgroundColor: '#f59e0b', color: '#fff' }}>C</Avatar>
      <Avatar style={{ backgroundColor: '#ef4444', color: '#fff' }}>D</Avatar>
    </AvatarGroup>
  ),
  name: '头像组（文字）',
};

export const GroupMixed: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar style={{ backgroundColor: '#4C9EEA', color: '#fff' }}>A</Avatar>
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mix1" />
      <Avatar style={{ backgroundColor: '#22c55e', color: '#fff' }}><UserIcon /></Avatar>
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mix2" />
    </AvatarGroup>
  ),
  name: '头像组（混合）',
};

export const GroupSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>Mini</p>
        <AvatarGroup>
          <Avatar size="mini" src="https://api.dicebear.com/7.x/avataaars/svg?seed=A1" />
          <Avatar size="mini" src="https://api.dicebear.com/7.x/avataaars/svg?seed=A2" />
          <Avatar size="mini" src="https://api.dicebear.com/7.x/avataaars/svg?seed=A3" />
        </AvatarGroup>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>Small</p>
        <AvatarGroup>
          <Avatar size="small" src="https://api.dicebear.com/7.x/avataaars/svg?seed=B1" />
          <Avatar size="small" src="https://api.dicebear.com/7.x/avataaars/svg?seed=B2" />
          <Avatar size="small" src="https://api.dicebear.com/7.x/avataaars/svg?seed=B3" />
        </AvatarGroup>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>Middle</p>
        <AvatarGroup>
          <Avatar size="middle" src="https://api.dicebear.com/7.x/avataaars/svg?seed=C1" />
          <Avatar size="middle" src="https://api.dicebear.com/7.x/avataaars/svg?seed=C2" />
          <Avatar size="middle" src="https://api.dicebear.com/7.x/avataaars/svg?seed=C3" />
        </AvatarGroup>
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>Large</p>
        <AvatarGroup>
          <Avatar size="large" src="https://api.dicebear.com/7.x/avataaars/svg?seed=D1" />
          <Avatar size="large" src="https://api.dicebear.com/7.x/avataaars/svg?seed=D2" />
          <Avatar size="large" src="https://api.dicebear.com/7.x/avataaars/svg?seed=D3" />
        </AvatarGroup>
      </div>
    </div>
  ),
  name: '头像组尺寸',
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
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>单个头像</h4>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Avatar>A</Avatar>
          <Avatar><UserIcon /></Avatar>
          <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dark" />
          <Avatar square>方</Avatar>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>头像组</h4>
        <AvatarGroup>
          <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dark1" />
          <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dark2" />
          <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dark3" />
          <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dark4" />
        </AvatarGroup>
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
      {/* Sizes */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>尺寸</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Avatar size="mini">U</Avatar>
            <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#71717a' }}>Mini 28px</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar size="small">U</Avatar>
            <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#71717a' }}>Small 34px</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar size="middle">U</Avatar>
            <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#71717a' }}>Middle 40px</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar size="large">U</Avatar>
            <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#71717a' }}>Large 64px</p>
          </div>
        </div>
      </div>

      {/* Shapes */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>形状</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Avatar>A</Avatar>
            <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#71717a' }}>圆形（默认）</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar square>A</Avatar>
            <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#71717a' }}>方形</p>
          </div>
        </div>
      </div>

      {/* Content Types */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>内容类型</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Avatar>A</Avatar>
            <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#71717a' }}>文字</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar><UserIcon /></Avatar>
            <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#71717a' }}>图标</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Overview" />
            <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#71717a' }}>图片</p>
          </div>
        </div>
      </div>

      {/* Avatar Group */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>头像组</h3>
        <AvatarGroup>
          <Avatar style={{ backgroundColor: '#4C9EEA', color: '#fff' }}>A</Avatar>
          <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=G1" />
          <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=G2" />
          <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=G3" />
        </AvatarGroup>
      </div>
    </div>
  ),
  name: '完整概览',
};

