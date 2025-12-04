import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Rate } from './Rate';

const meta: Meta<typeof Rate> = {
  title: 'Components/Rate',
  component: Rate,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: '当前值',
    },
    defaultValue: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: '默认值',
    },
    count: {
      control: { type: 'number', min: 1, max: 10 },
      description: '星星总数',
    },
    allowControl: {
      control: 'boolean',
      description: '是否允许交互（设置模式）',
    },
    allowHalf: {
      control: 'boolean',
      description: '是否允许半星',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    showValue: {
      control: 'boolean',
      description: '是否显示数值',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Rate>;

// Default story
export const Default: Story = {
  args: {
    defaultValue: 0,
  },
};

// ============================================
// Display Mode (展示模式)
// ============================================
export const DisplayMode: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Empty (0 stars)</h4>
        <Rate defaultValue={0} />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Full (5 stars)</h4>
        <Rate defaultValue={5} />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Partial (3.7 stars)</h4>
        <Rate defaultValue={3.7} showValue />
      </div>
    </div>
  ),
};

export const DisplayModeExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px' }}>
      <Rate defaultValue={0} />
      <Rate defaultValue={5} />
      <Rate defaultValue={3.7} />
    </div>
  ),
};

export const DisplayModeWithDecimals: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Rate defaultValue={2.3} showValue />
      <Rate defaultValue={3.5} showValue />
      <Rate defaultValue={4.2} showValue />
      <Rate defaultValue={3.7} showValue />
    </div>
  ),
};

// ============================================
// Control Mode (设置模式)
// ============================================
export const ControlMode: Story = {
  render: () => {
    const [value, setValue] = useState(2.5);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>
            Step: 1 (整星)
          </h4>
          <Rate
            value={Math.round(value)}
            allowControl
            onChange={setValue}
            showValue
          />
        </div>
        <div>
          <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>
            Step: 0.5 (半星)
          </h4>
          <Rate
            value={value}
            allowControl
            allowHalf
            onChange={setValue}
            showValue
          />
        </div>
        <p style={{ margin: 0, color: '#666' }}>
          Current Value: {value}
        </p>
      </div>
    );
  },
};

export const ControlModeWholeStars: Story = {
  render: () => {
    const [value, setValue] = useState(3);
    return (
      <div>
        <Rate
          value={value}
          allowControl
          onChange={setValue}
          showValue
        />
        <p style={{ margin: '12px 0 0 0', color: '#666' }}>
          Selected: {value} stars
        </p>
      </div>
    );
  },
};

export const ControlModeHalfStars: Story = {
  render: () => {
    const [value, setValue] = useState(3.5);
    return (
      <div>
        <Rate
          value={value}
          allowControl
          allowHalf
          onChange={setValue}
          showValue
        />
        <p style={{ margin: '12px 0 0 0', color: '#666' }}>
          Selected: {value} stars
        </p>
      </div>
    );
  },
};

// ============================================
// Uncontrolled Mode
// ============================================
export const UncontrolledMode: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>
          非受控模式（使用 defaultValue）
        </h4>
        <Rate
          defaultValue={3}
          allowControl
          onChange={(val) => console.log('Selected:', val)}
          showValue
        />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>
          非受控模式（半星）
        </h4>
        <Rate
          defaultValue={2.5}
          allowControl
          allowHalf
          onChange={(val) => console.log('Selected:', val)}
          showValue
        />
      </div>
    </div>
  ),
};

// ============================================
// Disabled State
// ============================================
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Rate defaultValue={3} allowControl disabled showValue />
      <Rate defaultValue={4.5} allowControl allowHalf disabled showValue />
    </div>
  ),
};

// ============================================
// Different Star Counts
// ============================================
export const DifferentCounts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <span style={{ color: '#666', marginRight: '12px' }}>3 stars:</span>
        <Rate defaultValue={2} count={3} showValue />
      </div>
      <div>
        <span style={{ color: '#666', marginRight: '12px' }}>5 stars:</span>
        <Rate defaultValue={3.5} count={5} showValue />
      </div>
      <div>
        <span style={{ color: '#666', marginRight: '12px' }}>10 stars:</span>
        <Rate defaultValue={7} count={10} showValue />
      </div>
    </div>
  ),
};

// ============================================
// Interactive Example
// ============================================
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h4 style={{ margin: 0, color: '#393939' }}>Click to rate:</h4>
        <Rate
          value={value}
          allowControl
          allowHalf
          onChange={setValue}
          showValue
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setValue(0)}>Reset</button>
          <button onClick={() => setValue(5)}>Max</button>
        </div>
      </div>
    );
  },
};

// ============================================
// All States Overview
// ============================================
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>展示模式</h4>
        <div style={{ display: 'flex', gap: '48px' }}>
          <Rate defaultValue={0} />
          <Rate defaultValue={5} />
          <Rate defaultValue={3.7} showValue />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>设置模式（整星）</h4>
        <Rate defaultValue={2} allowControl showValue />
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>设置模式（半星）</h4>
        <Rate defaultValue={3.5} allowControl allowHalf showValue />
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
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Display Mode</h4>
        <div style={{ display: 'flex', gap: '32px' }}>
          <Rate defaultValue={0} />
          <Rate defaultValue={5} />
          <Rate defaultValue={3.7} showValue />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Control Mode</h4>
        <Rate defaultValue={3} allowControl showValue />
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Disabled</h4>
        <Rate defaultValue={4} allowControl disabled showValue />
      </div>
    </div>
  ),
};

