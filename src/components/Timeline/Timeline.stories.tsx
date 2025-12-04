import type { Meta, StoryObj } from '@storybook/react';
import { Timeline, TimelineItem } from './Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['left', 'right', 'both'],
      description: '内容显示位置',
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
type Story = StoryObj<typeof Timeline>;

// ============================================
// Default (Right Side)
// ============================================
export const Default: Story = {
  render: () => (
    <Timeline>
      <TimelineItem title="The first milestone" date="2017-03-10" />
      <TimelineItem title="The second milestone" date="2018-05-10" />
      <TimelineItem title="The third milestone" date="2019-01-31" />
    </Timeline>
  ),
};

// ============================================
// Side: Right
// ============================================
export const SideRight: Story = {
  render: () => (
    <Timeline side="right">
      <TimelineItem title="The first milestone" date="2017-03-10" />
      <TimelineItem title="The second milestone" date="2018-05-10" />
      <TimelineItem title="The third milestone" date="2019-01-31" />
    </Timeline>
  ),
  name: '内容在右边',
};

// ============================================
// Side: Left
// ============================================
export const SideLeft: Story = {
  render: () => (
    <Timeline side="left">
      <TimelineItem title="The first milestone" date="2017-03-10" />
      <TimelineItem title="The second milestone" date="2018-05-10" />
    </Timeline>
  ),
  name: '内容在左边',
};

// ============================================
// Side: Both
// ============================================
export const SideBoth: Story = {
  render: () => (
    <Timeline side="both">
      <TimelineItem title="The first milestone" date="2017-03-10" />
      <TimelineItem title="The second milestone" date="2018-05-10" />
      <TimelineItem title="The third milestone" date="2018-05-10" />
    </Timeline>
  ),
  name: '内容交替左右',
};

// ============================================
// Dot Colors
// ============================================
export const DotColors: Story = {
  render: () => (
    <Timeline>
      <TimelineItem title="A Primary Dot" date="2017-03-10" dotColor="primary" />
      <TimelineItem title="A Main Dot" date="2018-05-10" dotColor="main" />
      <TimelineItem title="A Success Dot" date="2019-01-31" dotColor="success" />
      <TimelineItem title="A Warning Dot" date="2019-01-31" dotColor="warning" />
      <TimelineItem title="A Danger Dot" date="2019-01-31" dotColor="danger" />
    </Timeline>
  ),
  name: '不同颜色的点',
};

// ============================================
// With Content
// ============================================
export const WithContent: Story = {
  render: () => (
    <Timeline>
      <TimelineItem
        title="项目启动"
        content="完成项目立项和团队组建"
        date="2023-01-15"
        dotColor="success"
      />
      <TimelineItem
        title="需求评审"
        content="完成产品需求文档评审"
        date="2023-02-20"
        dotColor="success"
      />
      <TimelineItem
        title="开发中"
        content="功能开发进行中"
        date="2023-03-10"
        dotColor="main"
      />
      <TimelineItem
        title="待测试"
        content="等待QA测试"
        date="2023-04-01"
      />
    </Timeline>
  ),
  name: '带内容描述',
};

// ============================================
// Use Case: Order Tracking
// ============================================
export const OrderTracking: Story = {
  render: () => (
    <Timeline>
      <TimelineItem
        title="订单已签收"
        content="您的订单已由本人签收，感谢您的购买"
        date="2023-12-05 14:30"
        dotColor="success"
      />
      <TimelineItem
        title="派送中"
        content="快递员正在派送，请保持电话畅通"
        date="2023-12-05 09:15"
        dotColor="success"
      />
      <TimelineItem
        title="已到达"
        content="快件已到达【北京朝阳区营业点】"
        date="2023-12-04 18:20"
        dotColor="success"
      />
      <TimelineItem
        title="运输中"
        content="快件正在运往【北京转运中心】"
        date="2023-12-03 22:00"
        dotColor="success"
      />
      <TimelineItem
        title="已发货"
        content="商家已发货，快递公司：顺丰速运"
        date="2023-12-02 16:00"
        dotColor="success"
      />
    </Timeline>
  ),
  name: '订单跟踪',
};

// ============================================
// Use Case: Version History
// ============================================
export const VersionHistory: Story = {
  render: () => (
    <Timeline side="left">
      <TimelineItem
        title="v2.0.0"
        content="全新设计系统，支持暗色模式"
        date="2023-12-01"
        dotColor="primary"
      />
      <TimelineItem
        title="v1.5.0"
        content="新增 Timeline 组件"
        date="2023-11-15"
        dotColor="main"
      />
      <TimelineItem
        title="v1.0.0"
        content="首个正式版本发布"
        date="2023-10-01"
      />
    </Timeline>
  ),
  name: '版本历史',
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
        gap: '48px',
      }}
    >
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#a1a1aa' }}>右侧内容</h4>
        <Timeline>
          <TimelineItem title="The first milestone" date="2017-03-10" dotColor="primary" />
          <TimelineItem title="The second milestone" date="2018-05-10" dotColor="main" />
          <TimelineItem title="The third milestone" date="2019-01-31" dotColor="success" />
        </Timeline>
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#a1a1aa' }}>左侧内容</h4>
        <Timeline side="left">
          <TimelineItem title="The first milestone" date="2017-03-10" />
          <TimelineItem title="The second milestone" date="2018-05-10" />
        </Timeline>
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
    <div style={{ display: 'flex', gap: '48px' }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>side="right"</h3>
        <Timeline side="right">
          <TimelineItem title="The first milestone" date="2017-03-10" />
          <TimelineItem title="The second milestone" date="2018-05-10" />
          <TimelineItem title="The third milestone" date="2019-01-31" />
        </Timeline>
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>Dot Colors</h3>
        <Timeline side="right">
          <TimelineItem title="A Primary Dot" date="2017-03-10" dotColor="primary" />
          <TimelineItem title="A Main Dot" date="2018-05-10" dotColor="main" />
          <TimelineItem title="A Success Dot" date="2019-01-31" dotColor="success" />
          <TimelineItem title="A Warning Dot" date="2019-01-31" dotColor="warning" />
          <TimelineItem title="A Danger Dot" date="2019-01-31" dotColor="danger" />
        </Timeline>
      </div>
    </div>
  ),
  name: '完整概览',
};

