import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: 'number',
      description: '数据总数',
    },
    pageSize: {
      control: 'number',
      description: '每页条数',
    },
    current: {
      control: 'number',
      description: '当前页码',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// ============================================
// Basic Pagination
// ============================================
export const Basic: Story = {
  args: {
    count: 100,
    pageSize: 10,
  },
};

// ============================================
// Sizes
// ============================================
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Large (40px)</p>
        <Pagination count={100} pageSize={10} size="large" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Default (30px)</p>
        <Pagination count={100} pageSize={10} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Small (20px)</p>
        <Pagination count={100} pageSize={10} size="small" />
      </div>
    </div>
  ),
};

// ============================================
// Few Pages (less than 7)
// ============================================
export const FewPages: Story = {
  args: {
    count: 50,
    pageSize: 10,
  },
};

// ============================================
// Many Pages
// ============================================
export const ManyPages: Story = {
  args: {
    count: 500,
    pageSize: 10,
  },
};

// ============================================
// Controlled
// ============================================
export const Controlled: Story = {
  render: () => {
    const [current, setCurrent] = useState(1);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <Pagination
          count={200}
          pageSize={10}
          current={current}
          onChange={(page) => setCurrent(page)}
        />
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          当前页: {current}
        </p>
      </div>
    );
  },
};

// ============================================
// Different Page Sizes
// ============================================
export const DifferentPageSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>每页 5 条 (100 条数据)</p>
        <Pagination count={100} pageSize={5} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>每页 10 条 (100 条数据)</p>
        <Pagination count={100} pageSize={10} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>每页 20 条 (100 条数据)</p>
        <Pagination count={100} pageSize={20} />
      </div>
    </div>
  ),
};

// ============================================
// Start From Middle
// ============================================
export const StartFromMiddle: Story = {
  args: {
    count: 200,
    pageSize: 10,
    defaultCurrent: 10,
  },
};

// ============================================
// Start From End
// ============================================
export const StartFromEnd: Story = {
  args: {
    count: 200,
    pageSize: 10,
    defaultCurrent: 20,
  },
};

// ============================================
// Single Page
// ============================================
export const SinglePage: Story = {
  args: {
    count: 5,
    pageSize: 10,
  },
};

// ============================================
// Disabled
// ============================================
export const Disabled: Story = {
  args: {
    count: 100,
    pageSize: 10,
    disabled: true,
  },
};

// ============================================
// With Table
// ============================================
export const WithTable: Story = {
  render: () => {
    const [current, setCurrent] = useState(1);
    const pageSize = 5;
    const totalData = 23;

    const data = Array.from({ length: totalData }, (_, i) => ({
      id: i + 1,
      name: `项目 ${i + 1}`,
      status: ['进行中', '已完成', '待审核'][i % 3],
    }));

    const currentData = data.slice((current - 1) * pageSize, current * pageSize);

    return (
      <div style={{ width: '500px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>ID</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>名称</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>状态</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>{item.id}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>{item.name}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination
            count={totalData}
            pageSize={pageSize}
            current={current}
            onChange={(page) => setCurrent(page)}
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
        padding: '24px',
        backgroundColor: '#18181b',
        borderRadius: '12px',
      }}
    >
      <Pagination count={200} pageSize={10} defaultCurrent={5} />
    </div>
  ),
};

