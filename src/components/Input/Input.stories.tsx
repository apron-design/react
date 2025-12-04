import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Input } from './Input';
import { Textarea } from './Textarea';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      description: '输入框类型',
    },
    clearable: {
      control: 'boolean',
      description: '是否显示清除按钮',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

// Default story
export const Default: Story = {
  args: {
    placeholder: 'Please enter...',
  },
};

// ============================================
// States
// ============================================
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#393939', fontSize: '14px' }}>
          空状态（无焦点）
        </h4>
        <Input placeholder="Please enter..." />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#393939', fontSize: '14px' }}>
          有内容
        </h4>
        <Input defaultValue="Hello World" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#393939', fontSize: '14px' }}>
          禁用
        </h4>
        <Input disabled placeholder="Disabled" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#393939', fontSize: '14px' }}>
          禁用（有内容）
        </h4>
        <Input disabled defaultValue="Disabled with value" />
      </div>
    </div>
  ),
};

// ============================================
// Clearable
// ============================================
export const Clearable: Story = {
  render: () => {
    const [value, setValue] = useState('可清除的内容');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          clearable
          onClear={() => setValue('')}
          placeholder="输入内容后显示清除按钮"
        />
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          当前值: {value || '(空)'}
        </p>
      </div>
    );
  },
};

// ============================================
// Password
// ============================================
export const Password: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#393939', fontSize: '14px' }}>
          密码输入框（点击眼睛图标切换显示）
        </h4>
        <Input type="password" defaultValue="password123" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#393939', fontSize: '14px' }}>
          密码输入框 + 可清除
        </h4>
        <Input type="password" defaultValue="password123" clearable />
      </div>
    </div>
  ),
};

// ============================================
// Prepend & Append
// ============================================
export const PrependAppend: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#393939', fontSize: '14px' }}>
          前置文字 (65px)
        </h4>
        <Input prepend="https://" placeholder="example.com" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#393939', fontSize: '14px' }}>
          后置文字 (50px)
        </h4>
        <Input append=".com" placeholder="domain" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#393939', fontSize: '14px' }}>
          前置 + 后置
        </h4>
        <Input prepend="$" append="USD" placeholder="0.00" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#393939', fontSize: '14px' }}>
          前置自定义 ReactNode
        </h4>
        <Input
          prepend={
            <span style={{ padding: '0 8px', display: 'flex', alignItems: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </span>
          }
          placeholder="Search..."
        />
      </div>
    </div>
  ),
};

// ============================================
// Combined
// ============================================
export const Combined: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input
        prepend="$"
        append="USD"
        clearable
        defaultValue="100.00"
      />
    </div>
  ),
};

// ============================================
// Interactive
// ============================================
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="输入任意内容..."
          clearable
          onClear={() => setValue('')}
        />
        <div style={{ fontSize: '14px', color: '#666' }}>
          <p style={{ margin: 0 }}>当前值: {value || '(空)'}</p>
          <p style={{ margin: '4px 0 0 0' }}>
            状态: {value ? '有内容（白色背景）' : '空（灰色背景）'}
          </p>
        </div>
      </div>
    );
  },
};

// ============================================
// Textarea
// ============================================
export const TextareaDefault: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#393939', fontSize: '14px' }}>
          默认 (3行)
        </h4>
        <Textarea placeholder="Please enter..." />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#393939', fontSize: '14px' }}>
          有内容
        </h4>
        <Textarea defaultValue="This is a textarea with some content. It supports multiple lines of text." />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#393939', fontSize: '14px' }}>
          5 行
        </h4>
        <Textarea rows={5} placeholder="5 rows textarea..." />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#393939', fontSize: '14px' }}>
          可清除（右下角）
        </h4>
        <Textarea clearable defaultValue="Clearable textarea content" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#393939', fontSize: '14px' }}>
          字数限制（右下角显示计数）
        </h4>
        <Textarea max={200} defaultValue="This is some text content." placeholder="最多输入200字..." />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#393939', fontSize: '14px' }}>
          字数限制 + 可清除
        </h4>
        <Textarea max={100} clearable defaultValue="Combined features" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#393939', fontSize: '14px' }}>
          禁用
        </h4>
        <Textarea disabled defaultValue="Disabled textarea" />
      </div>
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
        gap: '24px',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#a1a1aa', fontSize: '14px' }}>
          空状态
        </h4>
        <Input placeholder="Please enter..." />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#a1a1aa', fontSize: '14px' }}>
          有内容
        </h4>
        <Input defaultValue="Dark mode input" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#a1a1aa', fontSize: '14px' }}>
          密码 + 可清除
        </h4>
        <Input type="password" defaultValue="password" clearable />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#a1a1aa', fontSize: '14px' }}>
          Textarea
        </h4>
        <Textarea defaultValue="Dark mode textarea content" clearable />
      </div>
    </div>
  ),
};

// ============================================
// Full Width Demo
// ============================================
export const FullWidth: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input placeholder="Full width input" />
      <Input prepend="Email" append="@gmail.com" placeholder="username" />
      <Textarea placeholder="Full width textarea" />
    </div>
  ),
};

