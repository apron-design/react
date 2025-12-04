import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
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
    indeterminate: {
      control: 'boolean',
      description: '是否为半选状态',
    },
    labelClickable: {
      control: 'boolean',
      description: '点击文字部分是否可以激活复选框',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Default story
export const Default: Story = {
  args: {
    children: 'Checkbox',
  },
};

// ============================================
// States
// ============================================
export const Available: Story = {
  render: () => (
    <Checkbox>I have only one line content</Checkbox>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Checkbox disabled>I have only one line content</Checkbox>
  ),
};

export const Checked: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px' }}>
      <Checkbox checked onChange={() => {}}>
        I have 2 lines content to show so this is a 2 lines content
      </Checkbox>
      <Checkbox checked disabled onChange={() => {}}>
        I have 2 lines content to show so this is a 2 lines content
      </Checkbox>
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px' }}>
      <Checkbox indeterminate onChange={() => {}}>
        I have 2 lines content to show so this is a 2 lines content
      </Checkbox>
      <Checkbox indeterminate disabled onChange={() => {}}>
        I have 2 lines content to show so this is a 2 lines content
      </Checkbox>
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
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>available</h4>
        <div style={{ display: 'flex', gap: '48px' }}>
          <div style={{ width: '300px' }}>
            <Checkbox>I have only one line content</Checkbox>
          </div>
          <div style={{ width: '300px' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Disabled</h4>
            <Checkbox disabled>I have only one line content</Checkbox>
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>checked</h4>
        <div style={{ display: 'flex', gap: '48px' }}>
          <div style={{ width: '300px' }}>
            <Checkbox checked onChange={() => {}}>
              I have 2 lines content to show so this is a 2 lines content
            </Checkbox>
          </div>
          <div style={{ width: '300px' }}>
            <Checkbox checked disabled onChange={() => {}}>
              I have 2 lines content to show so this is a 2 lines content
            </Checkbox>
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>indeterminate</h4>
        <div style={{ display: 'flex', gap: '48px' }}>
          <div style={{ width: '300px' }}>
            <Checkbox indeterminate onChange={() => {}}>
              I have 2 lines content to show so this is a 2 lines content
            </Checkbox>
          </div>
          <div style={{ width: '300px' }}>
            <Checkbox indeterminate disabled onChange={() => {}}>
              I have 2 lines content to show so this is a 2 lines content
            </Checkbox>
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
      <Checkbox checked={checked} onChange={setChecked}>
        Click to toggle: {checked ? 'Checked' : 'Unchecked'}
      </Checkbox>
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
            labelClickable=false (默认，只能点击方框)
          </h4>
          <Checkbox checked={checked1} onChange={setChecked1}>
            只有点击左边的方框才能勾选
          </Checkbox>
        </div>
        <div>
          <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>
            labelClickable=true (点击文字也可以激活)
          </h4>
          <Checkbox checked={checked2} onChange={setChecked2} labelClickable>
            点击这段文字也可以勾选
          </Checkbox>
        </div>
      </div>
    );
  },
};

// ============================================
// With Link in Label
// ============================================
export const WithLink: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>
            文字中包含链接（labelClickable=false 时链接可正常点击）
          </h4>
          <Checkbox checked={checked} onChange={setChecked}>
            我已阅读并同意
            <a 
              href="https://example.com/terms" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#4C9EEA', marginLeft: '4px' }}
            >
              《用户服务协议》
            </a>
            和
            <a 
              href="https://example.com/privacy" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#4C9EEA', marginLeft: '4px' }}
            >
              《隐私政策》
            </a>
          </Checkbox>
        </div>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          提示：点击方框可勾选，点击链接可跳转（不会触发勾选）
        </p>
      </div>
    );
  },
};

// ============================================
// Checkbox Group
// ============================================
export const Group: Story = {
  render: () => {
    const [value, setValue] = useState<(string | number)[]>(['apple']);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Horizontal (default)</h4>
          <CheckboxGroup
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
            Selected: {value.join(', ') || 'None'}
          </p>
        </div>
      </div>
    );
  },
};

export const GroupVertical: Story = {
  render: () => {
    const [value, setValue] = useState<(string | number)[]>(['option1']);
    return (
      <CheckboxGroup
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
    const [value, setValue] = useState<(string | number)[]>([]);
    return (
      <CheckboxGroup value={value} onChange={setValue}>
        <CheckboxGroup.Item value="a">Custom Item A</CheckboxGroup.Item>
        <CheckboxGroup.Item value="b">Custom Item B</CheckboxGroup.Item>
        <CheckboxGroup.Item value="c" disabled>
          Custom Item C (Disabled)
        </CheckboxGroup.Item>
      </CheckboxGroup>
    );
  },
};

export const GroupDisabled: Story = {
  render: () => (
    <CheckboxGroup
      disabled
      defaultValue={['apple']}
      options={[
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
      ]}
    />
  ),
};

// ============================================
// Select All Pattern
// ============================================
export const SelectAllPattern: Story = {
  render: () => {
    const allOptions = ['apple', 'banana', 'orange', 'grape'];
    const [checkedList, setCheckedList] = useState<string[]>(['apple', 'banana']);

    const checkAll = allOptions.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < allOptions.length;

    const onCheckAllChange = (checked: boolean) => {
      setCheckedList(checked ? allOptions : []);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Checkbox
          indeterminate={indeterminate}
          checked={checkAll}
          onChange={onCheckAllChange}
        >
          Select All
        </Checkbox>
        <div style={{ borderLeft: '2px solid #e4e4e7', paddingLeft: '16px' }}>
          <CheckboxGroup
            direction="vertical"
            value={checkedList}
            onChange={(values) => setCheckedList(values as string[])}
            options={allOptions.map((item) => ({
              label: item.charAt(0).toUpperCase() + item.slice(1),
              value: item,
            }))}
          />
        </div>
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
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Available</h4>
        <div style={{ display: 'flex', gap: '32px' }}>
          <Checkbox>Unchecked</Checkbox>
          <Checkbox checked onChange={() => {}}>Checked</Checkbox>
          <Checkbox indeterminate onChange={() => {}}>Indeterminate</Checkbox>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Disabled</h4>
        <div style={{ display: 'flex', gap: '32px' }}>
          <Checkbox disabled>Unchecked</Checkbox>
          <Checkbox checked disabled onChange={() => {}}>Checked</Checkbox>
          <Checkbox indeterminate disabled onChange={() => {}}>Indeterminate</Checkbox>
        </div>
      </div>
    </div>
  ),
};

