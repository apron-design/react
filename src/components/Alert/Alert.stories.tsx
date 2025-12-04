import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { message } from '../Message';
import { Button } from '../Button';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: '提示类型',
    },
    message: {
      control: 'text',
      description: '提示内容',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// Default story
export const Default: Story = {
  args: {
    type: 'info',
    message: 'Information goes here',
  },
};

// ============================================
// Static Display (All Types)
// ============================================
export const AllTypes: Story = {
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Alert type="info" message="Information goes here" />
      <Alert type="success" message="Success information goes here" />
      <Alert type="warning" message="Warning information goes here" />
      <Alert type="error" message="Error information goes here" />
    </div>
  ),
};

// ============================================
// Info Type
// ============================================
export const Info: Story = {
  args: {
    type: 'info',
    message: 'Information goes here',
  },
};

// ============================================
// Success Type
// ============================================
export const Success: Story = {
  args: {
    type: 'success',
    message: 'Success information goes here',
  },
};

// ============================================
// Warning Type
// ============================================
export const Warning: Story = {
  args: {
    type: 'warning',
    message: 'Warning information goes here',
  },
};

// ============================================
// Error Type
// ============================================
export const Error: Story = {
  args: {
    type: 'error',
    message: 'Error information goes here',
  },
};

// ============================================
// Long Message
// ============================================
export const LongMessage: Story = {
  render: () => (
    <div style={{ width: '500px' }}>
      <Alert
        type="info"
        message="This is a longer message that demonstrates how the alert component handles text that spans multiple lines. The alert will expand vertically to accommodate the content while maintaining its minimum width."
      />
    </div>
  ),
};

// ============================================
// Global Alert Methods (Interactive)
// ============================================
export const GlobalAlerts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <h4 style={{ margin: 0, color: '#393939' }}>全局提示方法</h4>
      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
        点击按钮触发全局提示，提示会从页面顶部降下，5秒后自动消失
      </p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button onClick={() => message.info('This is an info message')}>
          Info
        </Button>
        <Button onClick={() => message.success('Operation successful!')}>
          Success
        </Button>
        <Button onClick={() => message.warning('Please be careful!')}>
          Warning
        </Button>
        <Button onClick={() => message.error('Something went wrong!')}>
          Error
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button onClick={() => message.clear()}>
          Clear All
        </Button>
      </div>
    </div>
  ),
};

// ============================================
// Multiple Alerts
// ============================================
export const MultipleAlerts: Story = {
  render: () => {
    const showMultiple = () => {
      message.info('First message');
      setTimeout(() => message.success('Second message'), 500);
      setTimeout(() => message.warning('Third message'), 1000);
      setTimeout(() => message.error('Fourth message'), 1500);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
        <h4 style={{ margin: 0, color: '#393939' }}>多个提示排列</h4>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          多个提示会按顺序向下排列，先进先出
        </p>
        <Button onClick={showMultiple}>
          Show Multiple Alerts
        </Button>
      </div>
    );
  },
};

// ============================================
// Custom Duration
// ============================================
export const CustomDuration: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <h4 style={{ margin: 0, color: '#393939' }}>自定义显示时长</h4>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button onClick={() => message.info('2 seconds', 2000)}>
          2s Duration
        </Button>
        <Button onClick={() => message.success('10 seconds', 10000)}>
          10s Duration
        </Button>
        <Button onClick={() => message.warning('Will not auto close', 0)}>
          No Auto Close
        </Button>
      </div>
    </div>
  ),
};

// ============================================
// With HTML Content
// ============================================
export const WithHTMLContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <h4 style={{ margin: 0, color: '#393939' }}>富文本内容</h4>
      <Button
        onClick={() =>
          message.success(
            <span>
              Your file <strong>report.pdf</strong> has been uploaded successfully!
            </span>
          )
        }
      >
        Show Rich Content
      </Button>
    </div>
  ),
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
        gap: '12px',
        width: '400px',
      }}
    >
      <h4 style={{ margin: '0 0 8px 0', color: '#a1a1aa' }}>Dark Mode</h4>
      <Alert type="info" message="Information goes here" />
      <Alert type="success" message="Success information goes here" />
      <Alert type="warning" message="Warning information goes here" />
      <Alert type="error" message="Error information goes here" />
    </div>
  ),
};

