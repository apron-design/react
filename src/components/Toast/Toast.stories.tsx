import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';
import { Button } from '../Button';

const meta: Meta = {
  title: 'Components/Toast',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ============================================
// All Types
// ============================================
export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button onClick={() => Toast.success('Success')}>Success</Button>
      <Button onClick={() => Toast.fail('Fail')}>Fail</Button>
      <Button onClick={() => Toast.danger('Danger')}>Danger</Button>
      <Button onClick={() => Toast.loading('Loading')}>Loading</Button>
    </div>
  ),
};

// ============================================
// Success
// ============================================
export const Success: Story = {
  render: () => (
    <Button onClick={() => Toast.success('操作成功')}>
      Show Success Toast
    </Button>
  ),
};

// ============================================
// Fail
// ============================================
export const Fail: Story = {
  render: () => (
    <Button onClick={() => Toast.fail('操作失败')}>
      Show Fail Toast
    </Button>
  ),
};

// ============================================
// Danger
// ============================================
export const Danger: Story = {
  render: () => (
    <Button onClick={() => Toast.danger('危险警告')}>
      Show Danger Toast
    </Button>
  ),
};

// ============================================
// Loading
// ============================================
export const Loading: Story = {
  render: () => {
    const showLoading = () => {
      Toast.loading('加载中...');
      // 3秒后自动关闭
      setTimeout(() => {
        Toast.close();
      }, 3000);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          Loading Toast 默认不会自动关闭，需要手动调用 Toast.close()
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button onClick={showLoading}>Show Loading (3s)</Button>
          <Button onClick={() => Toast.close()}>Close</Button>
        </div>
      </div>
    );
  },
};

// ============================================
// With Object Options
// ============================================
export const WithObjectOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button
        onClick={() =>
          Toast.success({
            text: '保存成功',
            duration: 3000,
          })
        }
      >
        Custom Duration (3s)
      </Button>
      <Button
        onClick={() =>
          Toast.show({
            type: 'success',
            text: '自定义配置',
            duration: 1500,
          })
        }
      >
        Using Toast.show()
      </Button>
    </div>
  ),
};

// ============================================
// Without Text
// ============================================
export const WithoutText: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button onClick={() => Toast.success()}>Success (No Text)</Button>
      <Button onClick={() => Toast.fail()}>Fail (No Text)</Button>
    </div>
  ),
};

// ============================================
// Custom Icon
// ============================================
export const CustomIcon: Story = {
  render: () => {
    const CustomHeartIcon = () => (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M32 56L27.6 52.04C14.4 40.04 6 32.52 6 23.28C6 15.76 12.04 10 19.6 10C23.84 10 27.92 12.04 32 16.04C36.08 12.04 40.16 10 44.4 10C51.96 10 58 15.76 58 23.28C58 32.52 49.6 40.04 36.4 52.04L32 56Z"
          fill="#ec4899"
        />
      </svg>
    );

    return (
      <Button
        onClick={() =>
          Toast.show({
            icon: <CustomHeartIcon />,
            text: '已收藏',
            duration: 2000,
          })
        }
      >
        Custom Icon
      </Button>
    );
  },
};

// ============================================
// Long Text
// ============================================
export const LongText: Story = {
  render: () => (
    <Button
      onClick={() =>
        Toast.success('这是一段比较长的提示文字，会自动换行显示')
      }
    >
      Long Text
    </Button>
  ),
};

// ============================================
// Sequence Toasts
// ============================================
export const SequenceToasts: Story = {
  render: () => {
    const showSequence = async () => {
      Toast.loading('提交中...');
      await new Promise((resolve) => setTimeout(resolve, 2000));
      Toast.success('提交成功');
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          模拟提交流程：Loading → Success
        </p>
        <Button onClick={showSequence}>Submit</Button>
      </div>
    );
  },
};

// ============================================
// Manual Close
// ============================================
export const ManualClose: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button onClick={() => Toast.success({ text: '手动关闭', duration: 0 })}>
        Show (No Auto Close)
      </Button>
      <Button onClick={() => Toast.close()}>Close</Button>
    </div>
  ),
};

// ============================================
// Dark Mode Preview
// ============================================
export const DarkModeInfo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
        Toast 会根据页面的 data-theme 属性自动切换深色模式。
        <br />
        深色模式下背景为黑色。
      </p>
      <Button onClick={() => Toast.success('Success')}>Show Toast</Button>
    </div>
  ),
};

