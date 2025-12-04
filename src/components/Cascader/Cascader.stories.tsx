import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Cascader } from './Cascader';
import type { CascaderValueType, CascaderOption } from './Cascader';

const meta: Meta<typeof Cascader> = {
  title: 'Components/Cascader',
  component: Cascader,
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
    separator: {
      control: 'text',
      description: '分隔符',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Cascader>;

const defaultOptions: CascaderOption[] = [
  {
    label: 'Option 1',
    value: 'option1',
    children: [
      { label: 'Option 1', value: 'option1-1' },
      { label: 'Hover Option', value: 'option1-2' },
    ],
  },
  {
    label: 'Option 2',
    value: 'option2',
    disabled: true,
  },
  {
    label: 'Selected Option',
    value: 'selected',
    children: [
      { label: 'Sub Option 1', value: 'selected-1' },
      { label: 'Sub Option 2', value: 'selected-2' },
    ],
  },
  {
    label: 'Hover Option',
    value: 'hover',
    children: [
      { label: 'Child 1', value: 'hover-1' },
      { label: 'Child 2', value: 'hover-2' },
    ],
  },
  {
    label: 'Option 5 goes here',
    value: 'option5',
  },
];

const regionOptions: CascaderOption[] = [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '余杭区', value: 'yuhang' },
        ],
      },
      {
        label: '宁波市',
        value: 'ningbo',
        children: [
          { label: '海曙区', value: 'haishu' },
          { label: '江北区', value: 'jiangbei' },
        ],
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      {
        label: '南京市',
        value: 'nanjing',
        children: [
          { label: '玄武区', value: 'xuanwu' },
          { label: '秦淮区', value: 'qinhuai' },
        ],
      },
      {
        label: '苏州市',
        value: 'suzhou',
        children: [
          { label: '姑苏区', value: 'gusu' },
          { label: '吴中区', value: 'wuzhong' },
        ],
      },
    ],
  },
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
      <Cascader options={defaultOptions} placeholder="Placeholder goes here" />
    </div>
  ),
};

export const SelectedFocused: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Selected/Focused</h4>
      <Cascader
        options={defaultOptions}
        defaultValue={['option1', 'option1-2']}
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
        <Cascader
          options={defaultOptions}
          placeholder="Placeholder goes here"
          loading
        />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Loading (with value)</h4>
        <Cascader
          options={defaultOptions}
          defaultValue={['option1', 'option1-1']}
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
      <Cascader
        options={defaultOptions}
        defaultValue={['option1', 'option1-1']}
        disabled
      />
    </div>
  ),
};

// ============================================
// Cascader Open
// ============================================
export const CascaderOpen: Story = {
  render: () => {
    const [value, setValue] = useState<CascaderValueType>(['selected', 'selected-1']);
    return (
      <div style={{ width: '400px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Cascader</h4>
        <Cascader
          options={defaultOptions}
          value={value}
          onChange={(val) => setValue(val)}
          placeholder="Select an option"
        />
        <p style={{ margin: '12px 0 0', color: '#666' }}>
          Selected: {value.join(' / ') || 'None'}
        </p>
      </div>
    );
  },
};

// ============================================
// Region Selection (三级联动)
// ============================================
export const RegionSelection: Story = {
  render: () => {
    const [value, setValue] = useState<CascaderValueType>([]);
    return (
      <div style={{ width: '400px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Region Selection</h4>
        <Cascader
          options={regionOptions}
          value={value}
          onChange={(val, options) => {
            setValue(val);
            console.log('Selected options:', options);
          }}
          placeholder="请选择地区"
          separator=" / "
        />
        <p style={{ margin: '12px 0 0', color: '#666' }}>
          Selected: {value.join(' / ') || 'None'}
        </p>
      </div>
    );
  },
};

// ============================================
// Inflow Mode
// ============================================
export const InflowMode: Story = {
  render: () => {
    const [value, setValue] = useState<CascaderValueType>([]);
    return (
      <div style={{ width: '400px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Inflow Mode</h4>
        <div style={{ border: '1px solid #e4e4e7', borderRadius: '12px', padding: '16px' }}>
          <p style={{ margin: '0 0 12px', color: '#666' }}>
            Container will expand when dropdown opens
          </p>
          <Cascader
            options={defaultOptions}
            value={value}
            onChange={(val) => setValue(val)}
            placeholder="Select an option"
            inflow
          />
          <p style={{ margin: '12px 0 0', color: '#666' }}>
            Selected: {value.join(' / ') || 'None'}
          </p>
        </div>
      </div>
    );
  },
};

// ============================================
// Change On Select
// ============================================
export const ChangeOnSelect: Story = {
  render: () => {
    const [value, setValue] = useState<CascaderValueType>([]);
    return (
      <div style={{ width: '400px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Change On Select</h4>
        <p style={{ margin: '0 0 12px', color: '#666', fontSize: '14px' }}>
          值在选择过程中就会更新，而非只在选择叶子节点时
        </p>
        <Cascader
          options={regionOptions}
          value={value}
          onChange={(val) => setValue(val)}
          placeholder="请选择地区"
          changeOnSelect
        />
        <p style={{ margin: '12px 0 0', color: '#666' }}>
          Selected: {value.join(' / ') || 'None'}
        </p>
      </div>
    );
  },
};

// ============================================
// With Disabled Options
// ============================================
export const WithDisabledOptions: Story = {
  render: () => {
    const optionsWithDisabled: CascaderOption[] = [
      {
        label: 'Available',
        value: 'available',
        children: [
          { label: 'Sub 1', value: 'sub1' },
          { label: 'Sub 2 (disabled)', value: 'sub2', disabled: true },
        ],
      },
      {
        label: 'Disabled Option',
        value: 'disabled',
        disabled: true,
      },
      {
        label: 'Another Available',
        value: 'another',
        children: [
          { label: 'Child 1', value: 'child1' },
          { label: 'Child 2', value: 'child2' },
        ],
      },
    ];

    return (
      <div style={{ width: '400px' }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>With Disabled Options</h4>
        <Cascader
          options={optionsWithDisabled}
          placeholder="Select an option"
        />
      </div>
    );
  },
};

// ============================================
// Custom Separator
// ============================================
export const CustomSeparator: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Default Separator ( / )</h4>
        <Cascader
          options={regionOptions}
          defaultValue={['zhejiang', 'hangzhou', 'xihu']}
        />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Arrow Separator ( → )</h4>
        <Cascader
          options={regionOptions}
          defaultValue={['zhejiang', 'hangzhou', 'xihu']}
          separator=" → "
        />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Dash Separator ( - )</h4>
        <Cascader
          options={regionOptions}
          defaultValue={['zhejiang', 'hangzhou', 'xihu']}
          separator=" - "
        />
      </div>
    </div>
  ),
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
          <Cascader options={defaultOptions} placeholder="Placeholder goes here" />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Selected/Focused</h4>
          <Cascader options={defaultOptions} defaultValue={['option1', 'option1-2']} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '48px' }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Loading</h4>
          <Cascader options={defaultOptions} placeholder="Placeholder goes here" loading />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Loading (with value)</h4>
          <Cascader options={defaultOptions} defaultValue={['option1', 'option1-1']} loading />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Disabled</h4>
        <div style={{ width: '50%' }}>
          <Cascader options={defaultOptions} defaultValue={['option1', 'option1-1']} disabled />
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
        <Cascader options={defaultOptions} placeholder="Placeholder goes here" />
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Selected</h4>
        <Cascader options={defaultOptions} defaultValue={['option1', 'option1-1']} />
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Loading</h4>
        <Cascader options={defaultOptions} placeholder="Placeholder goes here" loading />
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Disabled</h4>
        <Cascader options={defaultOptions} defaultValue={['option1', 'option1-1']} disabled />
      </div>
    </div>
  ),
};

