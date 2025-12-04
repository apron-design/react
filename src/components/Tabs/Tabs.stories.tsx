import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';
import { Button } from '../Button';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    capsule: {
      control: 'boolean',
      description: '是否为胶囊形',
    },
    defaultActiveKey: {
      control: 'text',
      description: '默认选中的 Tab key',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// ============================================
// Default
// ============================================
export const Default: Story = {
  render: () => (
    <Tabs defaultActiveKey="1">
      <TabList>
        <Tab tabKey="1">标签一</Tab>
        <Tab tabKey="2">标签二</Tab>
        <Tab tabKey="3">标签三</Tab>
      </TabList>
      <TabPanel tabKey="1">
        这是标签一的内容区域。Tab 组件可以用于组织和展示不同类别的信息。
      </TabPanel>
      <TabPanel tabKey="2">
        这是标签二的内容区域。点击不同的标签可以切换显示不同的内容。
      </TabPanel>
      <TabPanel tabKey="3">
        这是标签三的内容区域。每个 TabPanel 对应一个 Tab。
      </TabPanel>
    </Tabs>
  ),
};

// ============================================
// Capsule 模式
// ============================================
export const Capsule: Story = {
  render: () => (
    <Tabs defaultActiveKey="1" capsule>
      <TabList>
        <Tab tabKey="1">标签一</Tab>
        <Tab tabKey="2">标签二</Tab>
        <Tab tabKey="3">标签三</Tab>
      </TabList>
      <TabPanel tabKey="1">
        胶囊模式的标签一内容。选中的标签有圆角背景。
      </TabPanel>
      <TabPanel tabKey="2">
        胶囊模式的标签二内容。
      </TabPanel>
      <TabPanel tabKey="3">
        胶囊模式的标签三内容。
      </TabPanel>
    </Tabs>
  ),
  name: '胶囊模式',
};

// ============================================
// 带 Extra
// ============================================
export const WithExtra: Story = {
  render: () => (
    <Tabs defaultActiveKey="1" extra={<Button size="sm">操作按钮</Button>}>
      <TabList>
        <Tab tabKey="1">标签一</Tab>
        <Tab tabKey="2">标签二</Tab>
        <Tab tabKey="3">标签三</Tab>
      </TabList>
      <TabPanel tabKey="1">
        右侧有额外操作按钮的 Tab 组件。
      </TabPanel>
      <TabPanel tabKey="2">
        标签二内容。
      </TabPanel>
      <TabPanel tabKey="3">
        标签三内容。
      </TabPanel>
    </Tabs>
  ),
  name: '带额外操作',
};

export const CapsuleWithExtra: Story = {
  render: () => (
    <Tabs defaultActiveKey="1" capsule extra={<Button size="sm" variant="secondary">添加</Button>}>
      <TabList>
        <Tab tabKey="1">全部</Tab>
        <Tab tabKey="2">待处理</Tab>
        <Tab tabKey="3">已完成</Tab>
      </TabList>
      <TabPanel tabKey="1">
        全部任务列表。
      </TabPanel>
      <TabPanel tabKey="2">
        待处理的任务。
      </TabPanel>
      <TabPanel tabKey="3">
        已完成的任务。
      </TabPanel>
    </Tabs>
  ),
  name: '胶囊模式 + 额外操作',
};

// ============================================
// 禁用状态
// ============================================
export const Disabled: Story = {
  render: () => (
    <Tabs defaultActiveKey="1">
      <TabList>
        <Tab tabKey="1">可用</Tab>
        <Tab tabKey="2" disabled>禁用</Tab>
        <Tab tabKey="3">可用</Tab>
      </TabList>
      <TabPanel tabKey="1">
        标签一内容。标签二被禁用，无法点击。
      </TabPanel>
      <TabPanel tabKey="2">
        标签二内容（无法访问）。
      </TabPanel>
      <TabPanel tabKey="3">
        标签三内容。
      </TabPanel>
    </Tabs>
  ),
  name: '禁用状态',
};

export const CapsuleDisabled: Story = {
  render: () => (
    <Tabs defaultActiveKey="1" capsule>
      <TabList>
        <Tab tabKey="1">可用</Tab>
        <Tab tabKey="2" disabled>禁用</Tab>
        <Tab tabKey="3">可用</Tab>
      </TabList>
      <TabPanel tabKey="1">
        胶囊模式下的禁用状态。
      </TabPanel>
      <TabPanel tabKey="2">
        标签二内容。
      </TabPanel>
      <TabPanel tabKey="3">
        标签三内容。
      </TabPanel>
    </Tabs>
  ),
  name: '胶囊模式禁用状态',
};

// ============================================
// 使用场景
// ============================================
export const UserProfile: Story = {
  render: () => (
    <Tabs defaultActiveKey="info">
      <TabList>
        <Tab tabKey="info">基本信息</Tab>
        <Tab tabKey="security">安全设置</Tab>
        <Tab tabKey="notification">通知设置</Tab>
      </TabList>
      <TabPanel tabKey="info">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div><strong>用户名：</strong>admin</div>
          <div><strong>邮箱：</strong>admin@example.com</div>
          <div><strong>注册时间：</strong>2024-01-01</div>
        </div>
      </TabPanel>
      <TabPanel tabKey="security">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div><strong>密码：</strong>******** <Button variant="link" size="sm">修改</Button></div>
          <div><strong>两步验证：</strong>已开启</div>
        </div>
      </TabPanel>
      <TabPanel tabKey="notification">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div><strong>邮件通知：</strong>开启</div>
          <div><strong>短信通知：</strong>关闭</div>
        </div>
      </TabPanel>
    </Tabs>
  ),
  name: '用户资料页',
};

export const FilterTabs: Story = {
  render: () => (
    <Tabs defaultActiveKey="all" capsule extra={<span style={{ color: '#71717a', fontSize: '14px' }}>共 128 条</span>}>
      <TabList>
        <Tab tabKey="all">全部</Tab>
        <Tab tabKey="pending">待审核 (12)</Tab>
        <Tab tabKey="approved">已通过</Tab>
        <Tab tabKey="rejected">已拒绝</Tab>
      </TabList>
      <TabPanel tabKey="all">
        显示所有数据...
      </TabPanel>
      <TabPanel tabKey="pending">
        显示待审核数据...
      </TabPanel>
      <TabPanel tabKey="approved">
        显示已通过数据...
      </TabPanel>
      <TabPanel tabKey="rejected">
        显示已拒绝数据...
      </TabPanel>
    </Tabs>
  ),
  name: '筛选标签',
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
        gap: '32px',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 16px 0', color: '#a1a1aa' }}>默认模式</h4>
        <Tabs defaultActiveKey="1">
          <TabList>
            <Tab tabKey="1">标签一</Tab>
            <Tab tabKey="2">标签二</Tab>
            <Tab tabKey="3" disabled>禁用</Tab>
          </TabList>
          <TabPanel tabKey="1">
            <span style={{ color: '#e4e4e7' }}>暗色模式下的标签一内容。</span>
          </TabPanel>
          <TabPanel tabKey="2">
            <span style={{ color: '#e4e4e7' }}>暗色模式下的标签二内容。</span>
          </TabPanel>
        </Tabs>
      </div>

      <div>
        <h4 style={{ margin: '0 0 16px 0', color: '#a1a1aa' }}>胶囊模式</h4>
        <Tabs defaultActiveKey="1" capsule>
          <TabList>
            <Tab tabKey="1">全部</Tab>
            <Tab tabKey="2">待处理</Tab>
            <Tab tabKey="3">已完成</Tab>
          </TabList>
          <TabPanel tabKey="1">
            <span style={{ color: '#e4e4e7' }}>暗色模式胶囊标签内容。</span>
          </TabPanel>
          <TabPanel tabKey="2">
            <span style={{ color: '#e4e4e7' }}>待处理内容。</span>
          </TabPanel>
          <TabPanel tabKey="3">
            <span style={{ color: '#e4e4e7' }}>已完成内容。</span>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  ),
  name: '暗色模式',
};

// ============================================
// Overview
// ============================================
export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>默认模式</h3>
        <Tabs defaultActiveKey="1">
          <TabList>
            <Tab tabKey="1">标签一</Tab>
            <Tab tabKey="2">标签二</Tab>
            <Tab tabKey="3">标签三</Tab>
          </TabList>
          <TabPanel tabKey="1">默认模式内容，有分割线，TabPanel 有 padding。</TabPanel>
          <TabPanel tabKey="2">标签二内容。</TabPanel>
          <TabPanel tabKey="3">标签三内容。</TabPanel>
        </Tabs>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>胶囊模式</h3>
        <Tabs defaultActiveKey="1" capsule>
          <TabList>
            <Tab tabKey="1">标签一</Tab>
            <Tab tabKey="2">标签二</Tab>
            <Tab tabKey="3">标签三</Tab>
          </TabList>
          <TabPanel tabKey="1">胶囊模式内容，无分割线，TabPanel 无 padding。</TabPanel>
          <TabPanel tabKey="2">标签二内容。</TabPanel>
          <TabPanel tabKey="3">标签三内容。</TabPanel>
        </Tabs>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>带额外操作</h3>
        <Tabs defaultActiveKey="1" extra={<Button size="sm">操作</Button>}>
          <TabList>
            <Tab tabKey="1">标签一</Tab>
            <Tab tabKey="2">标签二</Tab>
          </TabList>
          <TabPanel tabKey="1">右侧有额外操作的 Tab。</TabPanel>
          <TabPanel tabKey="2">标签二内容。</TabPanel>
        </Tabs>
      </div>
    </div>
  ),
  name: '完整概览',
};

