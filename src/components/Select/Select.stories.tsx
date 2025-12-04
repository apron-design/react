import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './Select';
import type { SelectValueType } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    loading: {
      control: 'boolean',
      description: '是否加载中',
    },
    inflow: {
      control: 'boolean',
      description: '是否使用 inflow 模式',
    },
    placeholder: {
      control: 'text',
      description: '占位文本',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const defaultOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2', disabled: true },
  { label: 'Selected Option', value: 'selected' },
  { label: 'Hover Option', value: 'hover' },
  { label: 'Option 5 goes here', value: 'option5' },
];

const manyOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
  { label: 'Option 6', value: '6' },
  { label: 'Option 7', value: '7' },
  { label: 'Option 8', value: '8' },
];

// Default story
export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Placeholder goes here',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

// ============================================
// States
// ============================================
export const Normal: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Normal</h4>
      <Select options={defaultOptions} placeholder="Placeholder goes here" />
    </div>
  ),
};

export const SelectedFocused: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Selected/Focused</h4>
      <Select
        options={defaultOptions}
        defaultValue="option1"
        placeholder="Placeholder goes here"
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Loading (no value)</h4>
        <Select
          options={defaultOptions}
          placeholder="Placeholder goes here"
          loading
        />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Loading (with value)</h4>
        <Select
          options={defaultOptions}
          defaultValue="option1"
          loading
        />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Disabled</h4>
      <Select
        options={defaultOptions}
        defaultValue="option1"
        disabled
      />
    </div>
  ),
};

// ============================================
// Dropdown Open
// ============================================
export const DropdownOpen: Story = {
  render: () => {
    const [value, setValue] = useState<SelectValueType>('selected');
    return (
      <div style={{ width: '400px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Dropdown</h4>
        <Select
          options={defaultOptions}
          value={value}
          onChange={(val) => setValue(val)}
          placeholder="Select an option"
        />
        <p style={{ margin: '12px 0 0', color: '#666' }}>
          Selected: {value || 'None'}
        </p>
      </div>
    );
  },
};

// ============================================
// With Scrolling (more than 5 options)
// ============================================
export const WithScrolling: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>With Scrolling (8 options)</h4>
      <Select
        options={manyOptions}
        placeholder="Select an option"
      />
    </div>
  ),
};

// ============================================
// Inflow Mode
// ============================================
export const InflowMode: Story = {
  render: () => {
    const [value, setValue] = useState<SelectValueType | undefined>();
    return (
      <div style={{ width: '400px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Inflow Mode</h4>
        <div style={{ border: '1px solid #e4e4e7', borderRadius: '12px', padding: '16px' }}>
          <p style={{ margin: '0 0 12px', color: '#666' }}>
            Container will expand when dropdown opens
          </p>
          <Select
            options={defaultOptions}
            value={value}
            onChange={(val) => setValue(val)}
            placeholder="Select an option"
            inflow
          />
          <p style={{ margin: '12px 0 0', color: '#666' }}>
            Selected: {value || 'None'}
          </p>
        </div>
      </div>
    );
  },
};

// ============================================
// Float Mode (Default)
// ============================================
export const FloatMode: Story = {
  render: () => {
    const [value, setValue] = useState<SelectValueType | undefined>();
    return (
      <div style={{ width: '400px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Float Mode (Default)</h4>
        <div style={{ border: '1px solid #e4e4e7', borderRadius: '12px', padding: '16px' }}>
          <p style={{ margin: '0 0 12px', color: '#666' }}>
            Dropdown floats over content
          </p>
          <Select
            options={defaultOptions}
            value={value}
            onChange={(val) => setValue(val)}
            placeholder="Select an option"
          />
          <p style={{ margin: '12px 0 0', color: '#666' }}>
            Selected: {value || 'None'}
          </p>
        </div>
      </div>
    );
  },
};

// ============================================
// With Disabled Options
// ============================================
export const WithDisabledOptions: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>With Disabled Options</h4>
      <Select
        options={[
          { label: 'Available Option 1', value: '1' },
          { label: 'Disabled Option', value: '2', disabled: true },
          { label: 'Available Option 3', value: '3' },
          { label: 'Another Disabled', value: '4', disabled: true },
          { label: 'Available Option 5', value: '5' },
        ]}
        placeholder="Select an option"
      />
    </div>
  ),
};

// ============================================
// Controlled Mode
// ============================================
export const ControlledMode: Story = {
  render: () => {
    const [value, setValue] = useState<SelectValueType>('option1');
    return (
      <div style={{ width: '400px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Controlled Mode</h4>
        <Select
          options={defaultOptions}
          value={value}
          onChange={(val) => setValue(val)}
        />
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <button onClick={() => setValue('option1')}>Set Option 1</button>
          <button onClick={() => setValue('selected')}>Set Selected</button>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '600px' }}>
      <div style={{ display: 'flex', gap: '48px' }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Normal</h4>
          <Select options={defaultOptions} placeholder="Placeholder goes here" />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Selected/Focused</h4>
          <Select options={defaultOptions} defaultValue="option1" />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '48px' }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Loading</h4>
          <Select options={defaultOptions} placeholder="Placeholder goes here" loading />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Loading (with value)</h4>
          <Select options={defaultOptions} defaultValue="option1" loading />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Disabled</h4>
        <div style={{ width: '50%' }}>
          <Select options={defaultOptions} defaultValue="option1" disabled />
        </div>
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
        width: '400px',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Normal</h4>
        <Select options={defaultOptions} placeholder="Placeholder goes here" />
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Selected</h4>
        <Select options={defaultOptions} defaultValue="option1" />
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Loading</h4>
        <Select options={defaultOptions} placeholder="Placeholder goes here" loading />
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Disabled</h4>
        <Select options={defaultOptions} defaultValue="option1" disabled />
      </div>
    </div>
  ),
};

