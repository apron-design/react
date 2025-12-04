import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: '是否显示对话框',
    },
    title: {
      control: 'text',
      description: '标题',
    },
    closable: {
      control: 'boolean',
      description: '是否显示关闭按钮',
    },
    closeByOverlay: {
      control: 'boolean',
      description: '点击蒙层是否可以关闭',
    },
    width: {
      control: 'number',
      description: '对话框宽度',
    },
    centered: {
      control: 'boolean',
      description: '是否居中显示',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// ============================================
// Basic Modal
// ============================================
export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>打开对话框</Button>
        <Modal
          open={open}
          title="基础对话框"
          onClose={() => setOpen(false)}
          onOk={() => {
            console.log('确认');
            setOpen(false);
          }}
        >
          <p>这是对话框的内容。</p>
          <p>点击蒙层或按 ESC 键可以关闭对话框。</p>
        </Modal>
      </>
    );
  },
};

// ============================================
// Without Title
// ============================================
export const WithoutTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>无标题对话框</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          onOk={() => setOpen(false)}
          showCancel={false}
          okText="关闭"
        >
          <p>这是一个没有标题的对话框。</p>
        </Modal>
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
        <Button onClick={() => setOpen(true)}>无底部对话框</Button>
        <Modal
          open={open}
          title="无底部对话框"
          onClose={() => setOpen(false)}
          showFooter={false}
        >
          <p>这是一个没有底部的对话框。</p>
          <p>你可以通过关闭按钮或点击蒙层来关闭它。</p>
        </Modal>
      </>
    );
  },
};

// ============================================
// Cannot Close by Overlay
// ============================================
export const NoCloseByOverlay: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>禁止点击蒙层关闭</Button>
        <Modal
          open={open}
          title="禁止点击蒙层关闭"
          closeByOverlay={false}
          onClose={() => setOpen(false)}
          onOk={() => setOpen(false)}
          showCancel={false}
          okText="知道了"
        >
          <p>这个对话框不能通过点击蒙层来关闭。</p>
          <p>请点击按钮或关闭图标来关闭。</p>
        </Modal>
      </>
    );
  },
};

// ============================================
// Not Closable
// ============================================
export const NotClosable: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>不可关闭对话框</Button>
        <Modal
          open={open}
          title="重要提示"
          closable={false}
          closeByOverlay={false}
          onClose={() => setOpen(false)}
          footer={
            <Button onClick={() => setOpen(false)}>我已阅读并同意</Button>
          }
        >
          <p>这是一条重要信息，你必须阅读后才能关闭。</p>
          <p>没有关闭按钮，也不能点击蒙层关闭。</p>
        </Modal>
      </>
    );
  },
};

// ============================================
// Custom Width
// ============================================
export const CustomWidth: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>自定义宽度（800px）</Button>
        <Modal
          open={open}
          title="宽对话框"
          width={800}
          onClose={() => setOpen(false)}
          footer={<Button onClick={() => setOpen(false)}>关闭</Button>}
        >
          <p>这是一个宽度为 800px 的对话框。</p>
        </Modal>
      </>
    );
  },
};

// ============================================
// Long Content
// ============================================
export const LongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>长内容对话框</Button>
        <Modal
          open={open}
          title="长内容对话框"
          onClose={() => setOpen(false)}
          footer={<Button onClick={() => setOpen(false)}>关闭</Button>}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i}>这是第 {i + 1} 段内容。Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          ))}
        </Modal>
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
        <Button onClick={() => setOpen(true)}>确认对话框</Button>
        <Modal
          open={open}
          title="确认删除"
          width={400}
          onClose={() => setOpen(false)}
          onOk={() => {
            console.log('Confirmed!');
            setOpen(false);
          }}
          okText="确认删除"
          okButtonProps={{ danger: true }}
        >
          <p>确定要删除这条记录吗？此操作不可撤销。</p>
        </Modal>
      </>
    );
  },
};

// ============================================
// Custom Button Text & Variant
// ============================================
export const CustomButtons: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>自定义按钮</Button>
        <Modal
          open={open}
          title="自定义按钮文字和变种"
          onClose={() => setOpen(false)}
          onOk={() => {
            console.log('提交');
            setOpen(false);
          }}
          okText="提交"
          cancelText="返回"
          okButtonProps={{ variant: 'secondary' }}
          cancelButtonProps={{ variant: 'text' }}
        >
          <p>确认按钮使用 secondary 变种，取消按钮使用 text 变种。</p>
        </Modal>
      </>
    );
  },
};

// ============================================
// Without Cancel Button
// ============================================
export const WithoutCancel: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>只有确认按钮</Button>
        <Modal
          open={open}
          title="提示"
          onClose={() => setOpen(false)}
          onOk={() => setOpen(false)}
          showCancel={false}
          okText="知道了"
        >
          <p>这个对话框只有一个确认按钮。</p>
        </Modal>
      </>
    );
  },
};

// ============================================
// Form in Modal
// ============================================
export const FormInModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>表单对话框</Button>
        <Modal
          open={open}
          title="新建用户"
          onClose={() => setOpen(false)}
          footer={
            <>
              <Button onClick={() => setOpen(false)}>取消</Button>
              <Button onClick={() => setOpen(false)}>提交</Button>
            </>
          }
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
        </Modal>
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
        <Modal
          open={open}
          title="自定义底部"
          onClose={() => setOpen(false)}
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Button onClick={() => console.log('帮助')}>帮助</Button>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button onClick={() => setOpen(false)}>取消</Button>
                <Button onClick={() => setOpen(false)}>确定</Button>
              </div>
            </div>
          }
        >
          <p>这个对话框有自定义的底部布局。</p>
        </Modal>
      </>
    );
  },
};

// ============================================
// Dark Mode
// ============================================
export const DarkMode: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div data-theme="dark" style={{ padding: '32px', backgroundColor: '#18181b', borderRadius: '12px' }}>
        <Button onClick={() => setOpen(true)}>Dark Mode Modal</Button>
        <Modal
          open={open}
          title="深色模式"
          onClose={() => setOpen(false)}
          footer={
            <>
              <Button onClick={() => setOpen(false)}>取消</Button>
              <Button onClick={() => setOpen(false)}>确定</Button>
            </>
          }
        >
          <p>这是深色模式下的对话框。</p>
        </Modal>
      </div>
    );
  },
};

