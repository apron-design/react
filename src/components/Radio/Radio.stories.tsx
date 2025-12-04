import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: '是否选中',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    labelClickable: {
      control: 'boolean',
      description: '点击文字部分是否可以激活单选框',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

// Default story
export const Default: Story = {
  args: {
    children: 'Radio',
  },
};

// ============================================
// States
// ============================================
export const Available: Story = {
  render: () => (
    <Radio>I have only one line content</Radio>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Radio disabled>I have only one line content</Radio>
  ),
};

export const Checked: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px' }}>
      <Radio checked onChange={() => {}}>
        I have 2 lines content to show so this is a 2 lines content
      </Radio>
      <Radio checked disabled onChange={() => {}}>
        I have 2 lines content to show so this is a 2 lines content
      </Radio>
    </div>
  ),
};

// ============================================
// All States Overview
// ============================================
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Available</h4>
        <div style={{ display: 'flex', gap: '48px' }}>
          <div style={{ width: '300px' }}>
            <Radio>I have only one line content</Radio>
          </div>
          <div style={{ width: '300px' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Disabled</h4>
            <Radio disabled>I have only one line content</Radio>
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Checked</h4>
        <div style={{ display: 'flex', gap: '48px' }}>
          <div style={{ width: '300px' }}>
            <Radio checked onChange={() => {}}>
              I have 2 lines content to show so this is a 2 lines content
            </Radio>
          </div>
          <div style={{ width: '300px' }}>
            <Radio checked disabled onChange={() => {}}>
              I have 2 lines content to show so this is a 2 lines content
            </Radio>
          </div>
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
      <Radio checked={checked} onChange={setChecked}>
        Click to toggle: {checked ? 'Checked' : 'Unchecked'}
      </Radio>
    );
  },
};

// ============================================
// Label Clickable
// ============================================
export const LabelClickable: Story = {
  render: () => {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>
            labelClickable=false (默认，只能点击圆圈)
          </h4>
          <Radio checked={checked1} onChange={setChecked1}>
            只有点击左边的圆圈才能选中
          </Radio>
        </div>
        <div>
          <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>
            labelClickable=true (点击文字也可以激活)
          </h4>
          <Radio checked={checked2} onChange={setChecked2} labelClickable>
            点击这段文字也可以选中
          </Radio>
        </div>
      </div>
    );
  },
};

// ============================================
// Radio Group
// ============================================
export const Group: Story = {
  render: () => {
    const [value, setValue] = useState<string | number>('apple');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Horizontal (default)</h4>
          <RadioGroup
            value={value}
            onChange={setValue}
            options={[
              { label: 'Apple', value: 'apple' },
              { label: 'Banana', value: 'banana' },
              { label: 'Orange', value: 'orange' },
              { label: 'Disabled', value: 'disabled', disabled: true },
            ]}
          />
        </div>
        <div>
          <p style={{ margin: 0, color: '#666' }}>
            Selected: {value || 'None'}
          </p>
        </div>
      </div>
    );
  },
};

export const GroupVertical: Story = {
  render: () => {
    const [value, setValue] = useState<string | number>('option1');
    return (
      <RadioGroup
        value={value}
        onChange={setValue}
        direction="vertical"
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ]}
      />
    );
  },
};

export const GroupWithChildren: Story = {
  render: () => {
    const [value, setValue] = useState<string | number>('a');
    return (
      <RadioGroup value={value} onChange={setValue}>
        <RadioGroup.Item value="a">Custom Item A</RadioGroup.Item>
        <RadioGroup.Item value="b">Custom Item B</RadioGroup.Item>
        <RadioGroup.Item value="c" disabled>
          Custom Item C (Disabled)
        </RadioGroup.Item>
      </RadioGroup>
    );
  },
};

export const GroupDisabled: Story = {
  render: () => (
    <RadioGroup
      disabled
      defaultValue="apple"
      options={[
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
      ]}
    />
  ),
};

// ============================================
// Uncontrolled Mode
// ============================================
export const UncontrolledGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>非受控模式（使用 defaultValue）</h4>
        <RadioGroup
          name="fruit"
          defaultValue="banana"
          options={[
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
          ]}
          onChange={(val) => console.log('Selected:', val)}
        />
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
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Available</h4>
        <div style={{ display: 'flex', gap: '32px' }}>
          <Radio>Unchecked</Radio>
          <Radio checked onChange={() => {}}>Checked</Radio>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Disabled</h4>
        <div style={{ display: 'flex', gap: '32px' }}>
          <Radio disabled>Unchecked</Radio>
          <Radio checked disabled onChange={() => {}}>Checked</Radio>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Radio Group</h4>
        <RadioGroup
          defaultValue="option1"
          direction="horizontal"
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
          ]}
        />
      </div>
    </div>
  ),
};

