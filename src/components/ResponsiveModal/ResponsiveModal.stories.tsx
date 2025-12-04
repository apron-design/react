import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ResponsiveModal } from './ResponsiveModal';
import { Button } from '../Button';

const meta: Meta<typeof ResponsiveModal> = {
  title: 'Components/ResponsiveModal',
  component: ResponsiveModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: '是否显示',
    },
    title: {
      control: 'text',
      description: '标题',
    },
    breakpoint: {
      control: 'number',
      description: '响应式断点',
    },
    drawerPlacement: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: '移动端 Drawer 弹出方向',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResponsiveModal>;

// ============================================
// Basic ResponsiveModal
// ============================================
export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <div style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          调整浏览器窗口宽度查看效果（断点：1024px）
        </div>
        <Button onClick={() => setOpen(true)}>打开响应式弹窗</Button>
        <ResponsiveModal
          open={open}
          title="响应式弹窗"
          onClose={() => setOpen(false)}
          onOk={() => {
            console.log('确认');
            setOpen(false);
          }}
        >
          <p>在宽屏（≥1024px）下显示为 Modal。</p>
          <p>在窄屏（&lt;1024px）下显示为 Drawer。</p>
        </ResponsiveModal>
      </>
    );
  },
};

// ============================================
// Custom Breakpoint
// ============================================
export const CustomBreakpoint: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <div style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          断点设置为 768px
        </div>
        <Button onClick={() => setOpen(true)}>打开（768px 断点）</Button>
        <ResponsiveModal
          open={open}
          title="自定义断点"
          breakpoint={768}
          onClose={() => setOpen(false)}
          onOk={() => setOpen(false)}
        >
          <p>断点设置为 768px。</p>
          <p>在宽屏（≥768px）下显示为 Modal。</p>
          <p>在窄屏（&lt;768px）下显示为 Drawer。</p>
        </ResponsiveModal>
      </>
    );
  },
};

// ============================================
// Different Drawer Placements
// ============================================
export const DrawerFromBottom: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <div style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          移动端从底部弹出（默认）
        </div>
        <Button onClick={() => setOpen(true)}>底部弹出</Button>
        <ResponsiveModal
          open={open}
          title="底部弹出"
          drawerPlacement="bottom"
          height={300}
          onClose={() => setOpen(false)}
          onOk={() => setOpen(false)}
        >
          <p>移动端时从底部弹出。</p>
        </ResponsiveModal>
      </>
    );
  },
};

export const DrawerFromRight: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <div style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          移动端从右侧弹出
        </div>
        <Button onClick={() => setOpen(true)}>右侧弹出</Button>
        <ResponsiveModal
          open={open}
          title="右侧弹出"
          drawerPlacement="right"
          onClose={() => setOpen(false)}
          onOk={() => setOpen(false)}
        >
          <p>移动端时从右侧弹出。</p>
        </ResponsiveModal>
      </>
    );
  },
};

// ============================================
// Form Example
// ============================================
export const FormExample: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>新建用户</Button>
        <ResponsiveModal
          open={open}
          title="新建用户"
          width={500}
          height={400}
          drawerPlacement="bottom"
          onClose={() => setOpen(false)}
          onOk={() => {
            console.log('提交表单');
            setOpen(false);
          }}
          okText="创建"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                用户名
              </label>
              <input
                type="text"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                }}
                placeholder="请输入用户名"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                邮箱
              </label>
              <input
                type="email"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                }}
                placeholder="请输入邮箱"
              />
            </div>
          </div>
        </ResponsiveModal>
      </>
    );
  },
};

// ============================================
// Confirm Dialog
// ============================================
export const ConfirmDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>确认删除</Button>
        <ResponsiveModal
          open={open}
          title="确认删除"
          width={400}
          height={200}
          drawerPlacement="bottom"
          onClose={() => setOpen(false)}
          onOk={() => {
            console.log('已删除');
            setOpen(false);
          }}
          okText="确认删除"
          okButtonProps={{ danger: true }}
        >
          <p>确定要删除这条记录吗？此操作不可撤销。</p>
        </ResponsiveModal>
      </>
    );
  },
};

// ============================================
// Without Footer
// ============================================
export const WithoutFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>无底部弹窗</Button>
        <ResponsiveModal
          open={open}
          title="提示信息"
          showFooter={false}
          onClose={() => setOpen(false)}
        >
          <p>这是一个没有底部的弹窗。</p>
          <p>点击蒙层或关闭按钮可以关闭。</p>
        </ResponsiveModal>
      </>
    );
  },
};

// ============================================
// Custom Footer
// ============================================
export const CustomFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>自定义底部</Button>
        <ResponsiveModal
          open={open}
          title="自定义底部"
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Button onClick={() => console.log('帮助')}>帮助</Button>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button onClick={() => setOpen(false)}>取消</Button>
                <Button onClick={() => setOpen(false)}>确定</Button>
              </div>
            </div>
          }
          onClose={() => setOpen(false)}
        >
          <p>这个弹窗有自定义的底部布局。</p>
        </ResponsiveModal>
      </>
    );
  },
};

