import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Skeleton } from './Skeleton';
import { Button } from '../Button';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: '是否显示骨架屏',
    },
    animated: {
      control: 'boolean',
      description: '是否显示动画',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

// ============================================
// Default Skeleton
// ============================================
export const Default: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Skeleton loading={true} />
    </div>
  ),
};

// ============================================
// With Content
// ============================================
export const WithContent: Story = {
  render: () => {
    const [loading, setLoading] = useState(true);

    return (
      <div style={{ width: '400px' }}>
        <Button onClick={() => setLoading(!loading)} style={{ marginBottom: '16px' }}>
          {loading ? '显示内容' : '显示骨架屏'}
        </Button>
        <Skeleton loading={loading}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="avatar"
              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            />
            <div>
              <h4 style={{ margin: '0 0 8px 0' }}>用户名称</h4>
              <p style={{ margin: 0, color: '#666' }}>
                这是用户的个人简介，可以包含多行文本内容。
              </p>
            </div>
          </div>
        </Skeleton>
      </div>
    );
  },
};

// ============================================
// Without Animation
// ============================================
export const WithoutAnimation: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Skeleton loading={true} animated={false} />
    </div>
  ),
};

// ============================================
// Element Variants
// ============================================
export const ElementVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Text</p>
        <Skeleton.Element variant="text" width="100%" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Circular</p>
        <Skeleton.Element variant="circular" width={40} height={40} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Rectangular</p>
        <Skeleton.Element variant="rectangular" width="100%" height={100} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Rounded</p>
        <Skeleton.Element variant="rounded" width="100%" height={100} />
      </div>
    </div>
  ),
};

// ============================================
// Avatar
// ============================================
export const Avatar: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Skeleton.Avatar size="sm" />
      <Skeleton.Avatar size="md" />
      <Skeleton.Avatar size="lg" />
      <Skeleton.Avatar size={64} />
      <Skeleton.Avatar size="md" shape="square" />
    </div>
  ),
};

// ============================================
// Title and Paragraph
// ============================================
export const TitleAndParagraph: Story = {
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Skeleton.Title />
      <Skeleton.Paragraph rows={3} />
    </div>
  ),
};

// ============================================
// Paragraph Widths
// ============================================
export const ParagraphWidths: Story = {
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>默认宽度</p>
        <Skeleton.Paragraph rows={4} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>自定义每行宽度</p>
        <Skeleton.Paragraph rows={4} width={['100%', '80%', '90%', '50%']} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>统一宽度</p>
        <Skeleton.Paragraph rows={4} width="80%" />
      </div>
    </div>
  ),
};

// ============================================
// Button
// ============================================
export const ButtonSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Skeleton.Button size="sm" />
        <Skeleton.Button size="md" />
        <Skeleton.Button size="lg" />
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Skeleton.Button shape="default" />
        <Skeleton.Button shape="circle" />
        <Skeleton.Button shape="round" />
      </div>
      <div style={{ width: '300px' }}>
        <Skeleton.Button block />
      </div>
    </div>
  ),
};

// ============================================
// Image
// ============================================
export const ImageSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Skeleton.Image width={100} height={100} />
      <Skeleton.Image width={150} height={100} />
      <Skeleton.Image width={200} height={150} />
    </div>
  ),
};

// ============================================
// Card Skeleton
// ============================================
export const CardSkeleton: Story = {
  render: () => (
    <div
      style={{
        width: '300px',
        padding: '16px',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
      }}
    >
      <Skeleton.Image width="100%" height={150} />
      <div style={{ marginTop: '16px' }}>
        <Skeleton.Title width="60%" />
        <div style={{ marginTop: '12px' }}>
          <Skeleton.Paragraph rows={2} />
        </div>
      </div>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <Skeleton.Button size="sm" />
        <Skeleton.Button size="sm" />
      </div>
    </div>
  ),
};

// ============================================
// List Skeleton
// ============================================
export const ListSkeleton: Story = {
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ display: 'flex', gap: '12px' }}>
          <Skeleton.Avatar />
          <div style={{ flex: 1 }}>
            <Skeleton.Title width="40%" />
            <div style={{ marginTop: '8px' }}>
              <Skeleton.Paragraph rows={2} />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

// ============================================
// Table Skeleton
// ============================================
export const TableSkeleton: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['ID', '名称', '状态', '操作'].map((header) => (
              <th
                key={header}
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #e0e0e0',
                  background: '#f5f5f5',
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                <Skeleton.Element variant="text" width={30} />
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                <Skeleton.Element variant="text" width={100} />
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                <Skeleton.Element variant="text" width={60} />
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                <Skeleton.Button size="sm" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

// ============================================
// Profile Card Skeleton
// ============================================
export const ProfileCardSkeleton: Story = {
  render: () => (
    <div
      style={{
        width: '300px',
        padding: '24px',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Skeleton.Avatar size={80} />
      </div>
      <div style={{ marginTop: '16px' }}>
        <Skeleton.Title width="50%" />
      </div>
      <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center' }}>
        <Skeleton.Element variant="text" width={120} />
      </div>
      <div style={{ marginTop: '16px' }}>
        <Skeleton.Paragraph rows={2} width={['80%', '60%']} />
      </div>
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
        <Skeleton.Button shape="round" />
        <Skeleton.Button shape="round" />
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
        padding: '24px',
        backgroundColor: '#18181b',
        borderRadius: '12px',
        width: '400px',
      }}
    >
      <Skeleton loading={true} />
    </div>
  ),
};

