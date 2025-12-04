import type { Meta, StoryObj } from '@storybook/react';
import { Steps } from './Steps';

const meta: Meta<typeof Steps> = {
  title: 'Components/Steps',
  component: Steps,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: 'number',
      description: '当前步骤索引',
    },
    labelPlacement: {
      control: 'select',
      options: ['top', 'bottom', 'both'],
      description: '标签位置',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Steps>;

const defaultItems = [
  { title: 'Step 1' },
  { title: 'Step 2' },
  { title: 'Current' },
  { title: 'Not reach' },
];

// ============================================
// Basic Steps (Label Bottom)
// ============================================
export const Basic: Story = {
  args: {
    items: defaultItems,
    current: 2,
    labelPlacement: 'bottom',
  },
};

// ============================================
// Label Top
// ============================================
export const LabelTop: Story = {
  args: {
    items: defaultItems,
    current: 2,
    labelPlacement: 'top',
  },
};

// ============================================
// Label Both
// ============================================
export const LabelBoth: Story = {
  args: {
    items: [
      { title: 'Step 1', subtitle: 'Step 2' },
      { title: 'Current', subtitle: 'Step 2' },
      { title: 'Current', subtitle: 'Not reach' },
      { title: 'Not reach', subtitle: '' },
    ],
    current: 1,
    labelPlacement: 'both',
  },
};

// ============================================
// All Placements
// ============================================
export const AllPlacements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <div>
        <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>Label Bottom (Default)</p>
        <Steps items={defaultItems} current={2} labelPlacement="bottom" />
      </div>
      <div>
        <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>Label Top</p>
        <Steps items={defaultItems} current={2} labelPlacement="top" />
      </div>
      <div>
        <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>Label Both</p>
        <Steps
          items={[
            { title: 'Step 1', subtitle: 'Step 2' },
            { title: 'Current', subtitle: 'Step 2' },
            { title: 'Current', subtitle: 'Not reach' },
            { title: 'Not reach', subtitle: '' },
          ]}
          current={1}
          labelPlacement="both"
        />
      </div>
    </div>
  ),
};

// ============================================
// Different Current Steps
// ============================================
export const DifferentCurrentSteps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Current: 0 (First)</p>
        <Steps items={defaultItems} current={0} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Current: 1</p>
        <Steps items={defaultItems} current={1} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Current: 2</p>
        <Steps items={defaultItems} current={2} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Current: 3 (Last)</p>
        <Steps items={defaultItems} current={3} />
      </div>
    </div>
  ),
};

// ============================================
// All Completed
// ============================================
export const AllCompleted: Story = {
  args: {
    items: [
      { title: 'Step 1' },
      { title: 'Step 2' },
      { title: 'Step 3' },
      { title: 'Step 4' },
    ],
    current: 4, // 大于最大索引，全部完成
  },
};

// ============================================
// Custom Step Widths
// ============================================
export const CustomWidths: Story = {
  args: {
    items: [
      { title: 'Short', width: 100 },
      { title: 'Medium Step', width: 150 },
      { title: 'Longer Step Name', width: 200 },
      { title: 'End' },
    ],
    current: 1,
  },
};

// ============================================
// Three Steps
// ============================================
export const ThreeSteps: Story = {
  args: {
    items: [
      { title: 'First' },
      { title: 'Second' },
      { title: 'Third' },
    ],
    current: 1,
  },
};

// ============================================
// Five Steps
// ============================================
export const FiveSteps: Story = {
  args: {
    items: [
      { title: 'Step 1' },
      { title: 'Step 2' },
      { title: 'Step 3' },
      { title: 'Step 4' },
      { title: 'Step 5' },
    ],
    current: 2,
  },
};

// ============================================
// Order Process
// ============================================
export const OrderProcess: Story = {
  args: {
    items: [
      { title: '下单' },
      { title: '付款' },
      { title: '发货' },
      { title: '签收' },
    ],
    current: 2,
  },
};

// ============================================
// Registration Flow
// ============================================
export const RegistrationFlow: Story = {
  args: {
    items: [
      { title: '填写信息', subtitle: '基本信息' },
      { title: '验证身份', subtitle: '手机验证' },
      { title: '设置密码', subtitle: '安全设置' },
      { title: '完成注册', subtitle: '开始使用' },
    ],
    current: 1,
    labelPlacement: 'both',
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
      }}
    >
      <Steps items={defaultItems} current={2} />
    </div>
  ),
};

