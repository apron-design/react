import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: '是否开启',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    size: {
      control: 'select',
      options: ['default', 'small', 'mini'],
      description: '尺寸',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
      description: '变种',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

// Default story
export const Default: Story = {
  args: {},
};

// ============================================
// Sizes
// ============================================
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Default (84 × 40)</h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Switch size="default" />
          <Switch size="default" defaultChecked />
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Small (62 × 30)</h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Switch size="small" />
          <Switch size="small" defaultChecked />
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Mini (42 × 20)</h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Switch size="mini" />
          <Switch size="mini" defaultChecked />
        </div>
      </div>
    </div>
  ),
};

// ============================================
// Variants
// ============================================
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Default / Primary</h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Switch variant="default" />
          <Switch variant="default" defaultChecked />
          <Switch variant="primary" defaultChecked />
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Secondary</h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Switch variant="secondary" />
          <Switch variant="secondary" defaultChecked />
        </div>
      </div>
    </div>
  ),
};

// ============================================
// States
// ============================================
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Off</h4>
        <Switch />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>On</h4>
        <Switch defaultChecked />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Disabled Off</h4>
        <Switch disabled />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Disabled On</h4>
        <Switch disabled defaultChecked />
      </div>
    </div>
  ),
};

// ============================================
// Custom Colors
// ============================================
export const CustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Custom Checked Color (Green)</h4>
        <Switch defaultChecked checkedColor="#22c55e" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Custom Unchecked Color (Pink)</h4>
        <Switch uncheckedColor="#fce7f3" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Both Custom Colors</h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Switch uncheckedColor="#fce7f3" checkedColor="#ec4899" />
          <Switch uncheckedColor="#fce7f3" checkedColor="#ec4899" defaultChecked />
        </div>
      </div>
    </div>
  ),
};

// ============================================
// Interactive Example
// ============================================
export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
        <Switch checked={checked} onChange={setChecked} />
        <p style={{ margin: 0, color: '#666' }}>
          Status: {checked ? 'ON' : 'OFF'}
        </p>
      </div>
    );
  },
};

// ============================================
// All Sizes & Variants
// ============================================
export const AllSizesAndVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {(['default', 'primary', 'secondary'] as const).map((variant) => (
        <div key={variant}>
          <h4 style={{ margin: '0 0 16px 0', color: '#393939', textTransform: 'capitalize' }}>
            {variant}
          </h4>
          <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
            {(['default', 'small', 'mini'] as const).map((size) => (
              <div key={size} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Switch size={size} variant={variant} />
                <Switch size={size} variant={variant} defaultChecked />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ============================================
// Uncontrolled Mode
// ============================================
export const UncontrolledMode: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <h4 style={{ margin: 0, color: '#393939' }}>非受控模式（使用 defaultChecked）</h4>
      <Switch
        defaultChecked
        onChange={(checked) => console.log('Switch changed:', checked)}
      />
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
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Default / Primary</h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Switch />
          <Switch defaultChecked />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Secondary</h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Switch variant="secondary" />
          <Switch variant="secondary" defaultChecked />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Disabled</h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Switch disabled />
          <Switch disabled defaultChecked />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>All Sizes</h4>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Switch size="default" defaultChecked />
          <Switch size="small" defaultChecked />
          <Switch size="mini" defaultChecked />
        </div>
      </div>
    </div>
  ),
};

