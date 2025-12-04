import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './DatePicker';
import type { DatePickerValue } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
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
    yearStart: {
      control: 'number',
      description: '年份范围起始',
    },
    yearEnd: {
      control: 'number',
      description: '年份范围结束',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// Default story
export const Default: Story = {
  args: {
    yearStart: 2020,
    yearEnd: 2030,
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
export const EmptyState: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Empty (---- / -- / --)</h4>
      <DatePicker />
    </div>
  ),
};

export const WithYearSelected: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Year Selected (2024 / -- / --)</h4>
      <DatePicker defaultValue={{ year: 2024 }} />
    </div>
  ),
};

export const WithYearAndMonthSelected: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Year & Month Selected (2024 / 05 / --)</h4>
      <DatePicker defaultValue={{ year: 2024, month: 5 }} />
    </div>
  ),
};

export const FullDateSelected: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Full Date Selected (2024 / 03 / 15)</h4>
      <DatePicker defaultValue={{ year: 2024, month: 3, day: 15 }} />
    </div>
  ),
};

// ============================================
// Interactive
// ============================================
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState<DatePickerValue>({});
    return (
      <div style={{ width: '400px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Interactive</h4>
        <DatePicker
          value={value}
          onChange={(val) => setValue(val)}
          yearStart={2022}
          yearEnd={2026}
        />
        <p style={{ margin: '12px 0 0', color: '#666' }}>
          Selected: {value.year || '----'} / {value.month?.toString().padStart(2, '0') || '--'} / {value.day?.toString().padStart(2, '0') || '--'}
        </p>
      </div>
    );
  },
};

// ============================================
// Loading
// ============================================
export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Loading (no value)</h4>
        <DatePicker loading />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Loading (with value)</h4>
        <DatePicker defaultValue={{ year: 2024, month: 3, day: 15 }} loading />
      </div>
    </div>
  ),
};

// ============================================
// Disabled
// ============================================
export const Disabled: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Disabled</h4>
      <DatePicker defaultValue={{ year: 2024, month: 3, day: 15 }} disabled />
    </div>
  ),
};

// ============================================
// Inflow Mode
// ============================================
export const InflowMode: Story = {
  render: () => {
    const [value, setValue] = useState<DatePickerValue>({});
    return (
      <div style={{ width: '400px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Inflow Mode</h4>
        <div style={{ border: '1px solid #e4e4e7', borderRadius: '12px', padding: '16px' }}>
          <p style={{ margin: '0 0 12px', color: '#666' }}>
            Container will expand when dropdown opens
          </p>
          <DatePicker
            value={value}
            onChange={(val) => setValue(val)}
            inflow
          />
          <p style={{ margin: '12px 0 0', color: '#666' }}>
            Selected: {value.year || '----'} / {value.month?.toString().padStart(2, '0') || '--'} / {value.day?.toString().padStart(2, '0') || '--'}
          </p>
        </div>
      </div>
    );
  },
};

// ============================================
// Custom Year Range
// ============================================
export const CustomYearRange: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Short Range (2023-2025)</h4>
        <DatePicker yearStart={2023} yearEnd={2025} />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Long Range (2000-2050)</h4>
        <DatePicker yearStart={2000} yearEnd={2050} />
      </div>
    </div>
  ),
};

// ============================================
// Custom Labels
// ============================================
export const CustomLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>English Labels</h4>
        <DatePicker
          yearLabel="Year"
          monthLabel="Month"
          dayLabel="Day"
          monthLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
        />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Chinese Labels (Default)</h4>
        <DatePicker />
      </div>
    </div>
  ),
};

// ============================================
// All States Overview
// ============================================
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <div style={{ width: '300px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Empty</h4>
        <DatePicker />
      </div>
      <div style={{ width: '300px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Year Selected</h4>
        <DatePicker defaultValue={{ year: 2024 }} />
      </div>
      <div style={{ width: '300px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Year + Month</h4>
        <DatePicker defaultValue={{ year: 2024, month: 5 }} />
      </div>
      <div style={{ width: '300px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Full Date</h4>
        <DatePicker defaultValue={{ year: 2024, month: 3, day: 15 }} />
      </div>
      <div style={{ width: '300px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Loading</h4>
        <DatePicker loading />
      </div>
      <div style={{ width: '300px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Disabled</h4>
        <DatePicker defaultValue={{ year: 2024, month: 3, day: 15 }} disabled />
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
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Empty</h4>
        <DatePicker />
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Selected</h4>
        <DatePicker defaultValue={{ year: 2024, month: 3, day: 15 }} />
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Loading</h4>
        <DatePicker loading />
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Disabled</h4>
        <DatePicker defaultValue={{ year: 2024, month: 3, day: 15 }} disabled />
      </div>
    </div>
  ),
};

