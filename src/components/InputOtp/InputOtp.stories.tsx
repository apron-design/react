import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { InputOtp } from './InputOtp';

const meta: Meta<typeof InputOtp> = {
  title: 'Components/InputOtp',
  component: InputOtp,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    format: {
      control: 'text',
      description: '格式：* 表示输入位，其他字符直接渲染',
    },
    size: {
      control: 'select',
      options: ['default', 'small'],
      description: '尺寸',
    },
    square: {
      control: 'boolean',
      description: '是否为正方形',
    },
    type: {
      control: 'select',
      options: ['number', 'text'],
      description: '输入类型',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputOtp>;

// Default story
export const Default: Story = {
  args: {
    format: '******',
  },
};

// ============================================
// Formats
// ============================================
export const Formats: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939', fontSize: '14px' }}>
          4位验证码 (****)
        </h4>
        <InputOtp format="****" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939', fontSize: '14px' }}>
          6位验证码 (******)
        </h4>
        <InputOtp format="******" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939', fontSize: '14px' }}>
          带分隔符 (***-***)
        </h4>
        <InputOtp format="***-***" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939', fontSize: '14px' }}>
          自定义分隔 (**-**-**)
        </h4>
        <InputOtp format="**-**-**" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939', fontSize: '14px' }}>
          带空格分隔 (*** ***)
        </h4>
        <InputOtp format="*** ***" />
      </div>
    </div>
  ),
};

// ============================================
// Sizes
// ============================================
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939', fontSize: '14px' }}>
          默认尺寸 (高60 宽40)
        </h4>
        <InputOtp format="****" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939', fontSize: '14px' }}>
          小尺寸 (高40 宽28)
        </h4>
        <InputOtp format="****" size="small" />
      </div>
    </div>
  ),
};

// ============================================
// Square
// ============================================
export const Square: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939', fontSize: '14px' }}>
          正方形 - 默认尺寸 (40x40)
        </h4>
        <InputOtp format="****" square />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939', fontSize: '14px' }}>
          正方形 - 小尺寸 (28x28)
        </h4>
        <InputOtp format="****" size="small" square />
      </div>
    </div>
  ),
};

// ============================================
// Types
// ============================================
export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939', fontSize: '14px' }}>
          数字类型 (移动端弹出数字键盘)
        </h4>
        <InputOtp format="****" type="number" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939', fontSize: '14px' }}>
          文本类型 (允许字母)
        </h4>
        <InputOtp format="****" type="text" />
      </div>
    </div>
  ),
};

// ============================================
// States
// ============================================
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939', fontSize: '14px' }}>
          空状态
        </h4>
        <InputOtp format="****" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939', fontSize: '14px' }}>
          部分填充
        </h4>
        <InputOtp format="****" defaultValue="12" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939', fontSize: '14px' }}>
          完全填充
        </h4>
        <InputOtp format="****" defaultValue="1234" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939', fontSize: '14px' }}>
          禁用
        </h4>
        <InputOtp format="****" disabled defaultValue="12" />
      </div>
    </div>
  ),
};

// ============================================
// Status
// ============================================
export const Status: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939', fontSize: '14px' }}>
          默认状态
        </h4>
        <InputOtp format="****" defaultValue="1234" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#22c55e', fontSize: '14px' }}>
          成功状态 (success)
        </h4>
        <InputOtp format="****" defaultValue="1234" status="success" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#ef4444', fontSize: '14px' }}>
          错误状态 (error) - 按退格键一次性清空
        </h4>
        <InputOtp format="****" defaultValue="1234" status="error" />
      </div>
    </div>
  ),
};

// ============================================
// Interactive
// ============================================
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [completed, setCompleted] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <InputOtp
          format="***-***"
          value={value}
          onChange={setValue}
          onFinish={() => setCompleted(true)}
          autoFocus
        />
        <div style={{ fontSize: '14px', color: '#666' }}>
          <p style={{ margin: 0 }}>当前值: {value || '(空)'}</p>
          <p style={{ margin: '4px 0 0 0' }}>
            状态: {completed ? '✅ 输入完成' : '输入中...'}
          </p>
        </div>
        <button
          onClick={() => {
            setValue('');
            setCompleted(false);
          }}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            background: '#fff',
            cursor: 'pointer',
          }}
        >
          重置
        </button>
      </div>
    );
  },
};

// ============================================
// Verification Flow (模拟验证流程)
// ============================================
export const VerificationFlow: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [status, setStatus] = useState<'default' | 'success' | 'error'>('default');
    const [message, setMessage] = useState('');

    const handleFinish = (val: string) => {
      // 模拟验证：123456 为正确验证码
      if (val === '123456') {
        setStatus('success');
        setMessage('✅ 验证成功！');
      } else {
        setStatus('error');
        setMessage('❌ 验证码错误，按退格键重新输入');
      }
    };

    const handleStatusReset = () => {
      setStatus('default');
      setMessage('');
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          提示：正确验证码是 123456
        </p>
        <InputOtp
          format="***-***"
          value={value}
          onChange={setValue}
          onFinish={handleFinish}
          status={status}
          onStatusReset={handleStatusReset}
          autoFocus
        />
        {message && (
          <p style={{ 
            margin: 0, 
            color: status === 'success' ? '#16a34a' : '#ef4444',
            fontSize: '14px'
          }}>
            {message}
          </p>
        )}
        <button
          onClick={() => {
            setValue('');
            setStatus('default');
            setMessage('');
          }}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            background: '#fff',
            cursor: 'pointer',
          }}
        >
          重置
        </button>
      </div>
    );
  },
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
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa', fontSize: '14px' }}>
          空状态
        </h4>
        <InputOtp format="****" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa', fontSize: '14px' }}>
          部分填充
        </h4>
        <InputOtp format="****" defaultValue="12" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa', fontSize: '14px' }}>
          带分隔符
        </h4>
        <InputOtp format="***-***" defaultValue="123456" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa', fontSize: '14px' }}>
          禁用
        </h4>
        <InputOtp format="****" disabled defaultValue="12" />
      </div>
    </div>
  ),
};

