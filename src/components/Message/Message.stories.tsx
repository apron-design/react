import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { message } from './Message';
import { Button } from '../Button';

const meta: Meta<typeof message> = {
  title: 'Components/Message',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof message>;

// ============================================
// 基本使用
// ============================================
export const Basic: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <h4 style={{ margin: 0, color: '#393939' }}>基本使用</h4>
      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
        点击按钮触发全局提示，提示会从页面顶部降下，默认 5 秒后自动消失
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
    </div>
  ),
};

// ============================================
// 使用 message.show() 方法
// ============================================
export const UsingShow: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <h4 style={{ margin: 0, color: '#393939' }}>使用 message.show() 方法</h4>
      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
        可以通过 message.show() 方法动态指定提示类型
      </p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button onClick={() => message.show('info', 'Info message via show()')}>
          Show Info
        </Button>
        <Button onClick={() => message.show('success', 'Success message via show()')}>
          Show Success
        </Button>
        <Button onClick={() => message.show('warning', 'Warning message via show()')}>
          Show Warning
        </Button>
        <Button onClick={() => message.show('error', 'Error message via show()')}>
          Show Error
        </Button>
      </div>
    </div>
  ),
};

// ============================================
// 多个提示排列
// ============================================
export const MultipleMessages: Story = {
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
          Show Multiple Messages
        </Button>
      </div>
    );
  },
};

// ============================================
// 自定义显示时长
// ============================================
export const CustomDuration: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <h4 style={{ margin: 0, color: '#393939' }}>自定义显示时长</h4>
      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
        可以通过 duration 参数自定义显示时长（毫秒），设置为 0 则不自动关闭
      </p>
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
// 富文本内容
// ============================================
export const RichContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <h4 style={{ margin: 0, color: '#393939' }}>富文本内容</h4>
      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
        支持 ReactNode 类型的内容，可以显示富文本
      </p>
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
// 移除单个消息
// ============================================
const RemoveMessageComponent = () => {
  const [messageId, setMessageId] = useState<string | null>(null);

  const showMessage = () => {
    const id = message.info('This message can be removed manually', 0);
    setMessageId(id);
  };

  const removeMessage = () => {
    if (messageId) {
      message.remove(messageId);
      setMessageId(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <h4 style={{ margin: 0, color: '#393939' }}>移除单个消息</h4>
      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
        可以通过 message.remove(id) 方法移除指定的消息
      </p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button onClick={showMessage}>
          Show Message
        </Button>
        <Button onClick={removeMessage} disabled={!messageId}>
          Remove Message
        </Button>
      </div>
    </div>
  );
};

export const RemoveMessage: Story = {
  render: () => <RemoveMessageComponent />,
};

// ============================================
// 清除所有消息
// ============================================
export const ClearAll: Story = {
  render: () => {
    const showMultiple = () => {
      message.info('Message 1', 0);
      message.success('Message 2', 0);
      message.warning('Message 3', 0);
      message.error('Message 4', 0);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
        <h4 style={{ margin: 0, color: '#393939' }}>清除所有消息</h4>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          可以通过 message.clear() 方法一次性清除所有消息
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button onClick={showMultiple}>
            Show Multiple Messages
          </Button>
          <Button onClick={() => message.clear()}>
            Clear All
          </Button>
        </div>
      </div>
    );
  },
};

// ============================================
// 完整示例
// ============================================
export const CompleteExample: Story = {
  render: () => {
    const handleSuccess = () => {
      message.success('操作成功！');
    };

    const handleError = () => {
      message.error('操作失败，请重试');
    };

    const handleWarning = () => {
      message.warning('请注意：此操作不可撤销');
    };

    const handleInfo = () => {
      message.info('提示：请检查您的输入');
    };

    const handleCustom = () => {
      const id = message.show('info', '自定义消息，3秒后关闭', 3000);
      setTimeout(() => {
        message.remove(id);
      }, 2000);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '500px' }}>
        <h4 style={{ margin: 0, color: '#393939' }}>完整示例</h4>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          展示 Message 组件的各种使用场景
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button onClick={handleSuccess} variant="primary">
              成功操作
            </Button>
            <Button onClick={handleError} variant="default">
              错误操作
            </Button>
            <Button onClick={handleWarning}>
              警告提示
            </Button>
            <Button onClick={handleInfo}>
              信息提示
            </Button>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button onClick={handleCustom}>
              自定义时长
            </Button>
            <Button onClick={() => message.clear()}>
              清除所有
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

