import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Drawer } from './Drawer';
import { Button } from '../Button';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: '是否显示抽屉',
    },
    title: {
      control: 'text',
      description: '标题',
    },
    placement: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: '抽屉方向',
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
      description: '抽屉宽度（左右方向时有效）',
    },
    height: {
      control: 'number',
      description: '抽屉高度（上下方向时有效）',
    },
    isMobile: {
      control: 'boolean',
      description: '是否为移动端模式',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// ============================================
// Basic Drawer (Right)
// ============================================
export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>打开抽屉</Button>
        <Drawer
          open={open}
          title="基础抽屉"
          onClose={() => setOpen(false)}
          onOk={() => {
            console.log('确认');
            setOpen(false);
          }}
        >
          <p>这是抽屉的内容。</p>
          <p>默认从右侧展开。</p>
          <p>点击蒙层或按 ESC 键可以关闭抽屉。</p>
        </Drawer>
      </>
    );
  },
};

// ============================================
// Left Drawer
// ============================================
export const LeftDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>从左侧打开</Button>
        <Drawer
          open={open}
          title="左侧抽屉"
          placement="left"
          onClose={() => setOpen(false)}
          onOk={() => setOpen(false)}
        >
          <p>这是从左侧展开的抽屉。</p>
        </Drawer>
      </>
    );
  },
};

// ============================================
// Top Drawer
// ============================================
export const TopDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>从顶部打开</Button>
        <Drawer
          open={open}
          title="顶部抽屉"
          placement="top"
          height={300}
          onClose={() => setOpen(false)}
          onOk={() => setOpen(false)}
        >
          <p>这是从顶部展开的抽屉。</p>
        </Drawer>
      </>
    );
  },
};

// ============================================
// Bottom Drawer
// ============================================
export const BottomDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>从底部打开</Button>
        <Drawer
          open={open}
          title="底部抽屉"
          placement="bottom"
          height={300}
          onClose={() => setOpen(false)}
          onOk={() => setOpen(false)}
        >
          <p>这是从底部展开的抽屉。</p>
        </Drawer>
      </>
    );
  },
};

// ============================================
// All Directions
// ============================================
export const AllDirections: Story = {
  render: () => {
    const [openRight, setOpenRight] = useState(false);
    const [openLeft, setOpenLeft] = useState(false);
    const [openTop, setOpenTop] = useState(false);
    const [openBottom, setOpenBottom] = useState(false);

    return (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button onClick={() => setOpenTop(true)}>上</Button>
        <Button onClick={() => setOpenRight(true)}>右</Button>
        <Button onClick={() => setOpenBottom(true)}>下</Button>
        <Button onClick={() => setOpenLeft(true)}>左</Button>

        <Drawer
          open={openRight}
          title="右侧抽屉"
          placement="right"
          onClose={() => setOpenRight(false)}
          onOk={() => setOpenRight(false)}
        >
          <p>从右侧展开</p>
        </Drawer>

        <Drawer
          open={openLeft}
          title="左侧抽屉"
          placement="left"
          onClose={() => setOpenLeft(false)}
          onOk={() => setOpenLeft(false)}
        >
          <p>从左侧展开</p>
        </Drawer>

        <Drawer
          open={openTop}
          title="顶部抽屉"
          placement="top"
          height={250}
          onClose={() => setOpenTop(false)}
          onOk={() => setOpenTop(false)}
        >
          <p>从顶部展开</p>
        </Drawer>

        <Drawer
          open={openBottom}
          title="底部抽屉"
          placement="bottom"
          height={250}
          onClose={() => setOpenBottom(false)}
          onOk={() => setOpenBottom(false)}
        >
          <p>从底部展开</p>
        </Drawer>
      </div>
    );
  },
};

// ============================================
// Mobile Mode
// ============================================
export const MobileMode: Story = {
  render: () => {
    const [openRight, setOpenRight] = useState(false);
    const [openBottom, setOpenBottom] = useState(false);

    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button onClick={() => setOpenRight(true)}>移动端右侧抽屉</Button>
        <Button onClick={() => setOpenBottom(true)}>移动端底部抽屉</Button>

        <Drawer
          open={openRight}
          title="移动端抽屉"
          placement="right"
          isMobile={true}
          onClose={() => setOpenRight(false)}
          onOk={() => setOpenRight(false)}
        >
          <p>移动端模式会给非靠边的角落加上 20px 的圆角。</p>
        </Drawer>

        <Drawer
          open={openBottom}
          title="移动端底部抽屉"
          placement="bottom"
          height={300}
          isMobile={true}
          onClose={() => setOpenBottom(false)}
          onOk={() => setOpenBottom(false)}
        >
          <p>这是移动端底部抽屉，常用于操作菜单。</p>
        </Drawer>
      </div>
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
        <Button onClick={() => setOpen(true)}>宽抽屉（600px）</Button>
        <Drawer
          open={open}
          title="自定义宽度"
          width={600}
          onClose={() => setOpen(false)}
          onOk={() => setOpen(false)}
        >
          <p>这是一个宽度为 600px 的抽屉。</p>
        </Drawer>
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
        <Button onClick={() => setOpen(true)}>无底部抽屉</Button>
        <Drawer
          open={open}
          title="无底部抽屉"
          showFooter={false}
          onClose={() => setOpen(false)}
        >
          <p>这是一个没有底部的抽屉。</p>
          <p>你可以通过关闭按钮或点击蒙层来关闭它。</p>
        </Drawer>
      </>
    );
  },
};

// ============================================
// Custom Buttons
// ============================================
export const CustomButtons: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>自定义按钮</Button>
        <Drawer
          open={open}
          title="自定义按钮"
          onClose={() => setOpen(false)}
          onOk={() => {
            console.log('提交');
            setOpen(false);
          }}
          okText="提交"
          cancelText="返回"
          okButtonProps={{ variant: 'secondary' }}
        >
          <p>确认按钮使用 secondary 变种。</p>
        </Drawer>
      </>
    );
  },
};

// ============================================
// Form in Drawer
// ============================================
export const FormInDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>新建用户</Button>
        <Drawer
          open={open}
          title="新建用户"
          width={450}
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
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                角色
              </label>
              <select
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                }}
              >
                <option>管理员</option>
                <option>编辑</option>
                <option>访客</option>
              </select>
            </div>
          </div>
        </Drawer>
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
        <Button onClick={() => setOpen(true)}>长内容抽屉</Button>
        <Drawer
          open={open}
          title="长内容抽屉"
          onClose={() => setOpen(false)}
          onOk={() => setOpen(false)}
        >
          {Array.from({ length: 30 }, (_, i) => (
            <p key={i}>这是第 {i + 1} 段内容。Lorem ipsum dolor sit amet.</p>
          ))}
        </Drawer>
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
        <Drawer
          open={open}
          title="禁止点击蒙层关闭"
          closeByOverlay={false}
          onClose={() => setOpen(false)}
          onOk={() => setOpen(false)}
          showCancel={false}
          okText="知道了"
        >
          <p>这个抽屉不能通过点击蒙层来关闭。</p>
          <p>请点击按钮或关闭图标来关闭。</p>
        </Drawer>
      </>
    );
  },
};

