import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Spin } from './Spin';
import { Button } from '../Button';

const meta: Meta<typeof Spin> = {
  title: 'Components/Spin',
  component: Spin,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: '是否显示加载中',
    },
    text: {
      control: 'text',
      description: '提示文字',
    },
    placement: {
      control: 'select',
      options: ['center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: '位置',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spin>;

// ============================================
// Basic Spin
// ============================================
export const Basic: Story = {
  render: () => <Spin loading={true} />,
};

// ============================================
// With Custom Text
// ============================================
export const WithCustomText: Story = {
  render: () => <Spin loading={true} text="请稍候..." />,
};

// ============================================
// Without Text
// ============================================
export const WithoutText: Story = {
  render: () => <Spin loading={true} text="" />,
};

// ============================================
// Wrapper Mode
// ============================================
export const WrapperMode: Story = {
  render: () => {
    const [loading, setLoading] = useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
        <Button onClick={() => setLoading(!loading)}>
          {loading ? '关闭 Loading' : '开启 Loading'}
        </Button>
        <Spin loading={loading}>
          <div
            style={{
              padding: '40px',
              background: '#f5f5f5',
              borderRadius: '8px',
            }}
          >
            <h3 style={{ margin: '0 0 16px 0' }}>卡片内容</h3>
            <p style={{ margin: 0 }}>
              这是被 Spin 包裹的内容，当 loading 为 true 时，会显示加载蒙层。
            </p>
          </div>
        </Spin>
      </div>
    );
  },
};

// ============================================
// All Placements
// ============================================
export const AllPlacements: Story = {
  render: () => {
    const placements = [
      'top-left',
      'top',
      'top-right',
      'left',
      'center',
      'right',
      'bottom-left',
      'bottom',
      'bottom-right',
    ] as const;

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {placements.map((placement) => (
          <Spin key={placement} loading={true} placement={placement}>
            <div
              style={{
                width: '200px',
                height: '150px',
                background: '#f5f5f5',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
              }}
            >
              {placement}
            </div>
          </Spin>
        ))}
      </div>
    );
  },
};

// ============================================
// Placement Demo
// ============================================
export const PlacementDemo: Story = {
  render: () => {
    const [placement, setPlacement] = useState<typeof Spin.prototype.props.placement>('center');

    const placements = [
      'center',
      'top',
      'bottom',
      'left',
      'right',
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
    ] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '500px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {placements.map((p) => (
            <Button
              key={p}
              variant={placement === p ? 'primary' : 'default'}
              size="sm"
              onClick={() => setPlacement(p)}
            >
              {p}
            </Button>
          ))}
        </div>
        <Spin loading={true} placement={placement}>
          <div
            style={{
              width: '100%',
              height: '300px',
              background: '#f5f5f5',
              borderRadius: '8px',
            }}
          />
        </Spin>
      </div>
    );
  },
};

// ============================================
// Custom Icon
// ============================================
export const CustomIcon: Story = {
  render: () => {
    const CustomLoadingIcon = () => (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        style={{ animation: 'spin 1s linear infinite' }}
      >
        <circle cx="16" cy="4" r="3" fill="currentColor" opacity="1" />
        <circle cx="24.5" cy="7.5" r="3" fill="currentColor" opacity="0.875" />
        <circle cx="28" cy="16" r="3" fill="currentColor" opacity="0.75" />
        <circle cx="24.5" cy="24.5" r="3" fill="currentColor" opacity="0.625" />
        <circle cx="16" cy="28" r="3" fill="currentColor" opacity="0.5" />
        <circle cx="7.5" cy="24.5" r="3" fill="currentColor" opacity="0.375" />
        <circle cx="4" cy="16" r="3" fill="currentColor" opacity="0.25" />
        <circle cx="7.5" cy="7.5" r="3" fill="currentColor" opacity="0.125" />
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </svg>
    );

    return (
      <Spin loading={true} icon={<CustomLoadingIcon />} text="自定义图标" />
    );
  },
};

// ============================================
// Fullscreen Mode
// ============================================
export const FullscreenMode: Story = {
  render: () => {
    const handleShow = () => {
      Spin.show({ text: '全屏加载中...' });
      setTimeout(() => {
        Spin.close();
      }, 3000);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          点击按钮显示全屏 Spin，3秒后自动关闭
        </p>
        <Button onClick={handleShow}>显示全屏 Spin</Button>
      </div>
    );
  },
};

// ============================================
// Fullscreen with Different Placements
// ============================================
export const FullscreenPlacements: Story = {
  render: () => {
    const placements = [
      'center',
      'top',
      'bottom',
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
    ] as const;

    const handleShow = (placement: typeof placements[number]) => {
      Spin.show({ text: `位置: ${placement}`, placement });
      setTimeout(() => {
        Spin.close();
      }, 2000);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          点击按钮显示不同位置的全屏 Spin
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {placements.map((p) => (
            <Button key={p} onClick={() => handleShow(p)}>
              {p}
            </Button>
          ))}
        </div>
      </div>
    );
  },
};

// ============================================
// In Card
// ============================================
export const InCard: Story = {
  render: () => {
    const [loading, setLoading] = useState(true);

    return (
      <div style={{ width: '400px' }}>
        <Spin loading={loading}>
          <div
            style={{
              background: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <h3 style={{ margin: '0 0 16px 0' }}>数据统计</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 600 }}>1,234</div>
                <div style={{ color: '#666', fontSize: '14px' }}>总用户</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 600 }}>5,678</div>
                <div style={{ color: '#666', fontSize: '14px' }}>总订单</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 600 }}>¥12,345</div>
                <div style={{ color: '#666', fontSize: '14px' }}>总收入</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 600 }}>98%</div>
                <div style={{ color: '#666', fontSize: '14px' }}>满意度</div>
              </div>
            </div>
          </div>
        </Spin>
        <div style={{ marginTop: '16px' }}>
          <Button onClick={() => setLoading(!loading)}>
            {loading ? '加载完成' : '重新加载'}
          </Button>
        </div>
      </div>
    );
  },
};

// ============================================
// Table Loading
// ============================================
export const TableLoading: Story = {
  render: () => {
    const [loading, setLoading] = useState(true);

    return (
      <div style={{ width: '600px' }}>
        <Spin loading={loading} text="数据加载中...">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>名称</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>状态</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>{i}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>项目 {i}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>进行中</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>编辑</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Spin>
        <div style={{ marginTop: '16px' }}>
          <Button onClick={() => setLoading(!loading)}>
            {loading ? '加载完成' : '重新加载'}
          </Button>
        </div>
      </div>
    );
  },
};

