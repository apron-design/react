import type { Meta, StoryObj } from '@storybook/react';
import { Collapse, CollapseItem } from './Collapse';

const meta: Meta<typeof Collapse> = {
  title: 'Components/Collapse',
  component: Collapse,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    accordion: {
      control: 'boolean',
      description: '是否为手风琴模式',
    },
    defaultActiveKeys: {
      control: 'object',
      description: '默认展开的项目 key 数组',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Collapse>;

// ============================================
// Default
// ============================================
export const Default: Story = {
  render: () => (
    <Collapse>
      <CollapseItem itemKey="1" title="折叠面板标题 1">
        这是折叠面板的内容区域。可以放置任何内容，
        包括文字、图片、表格等各种元素。
      </CollapseItem>
      <CollapseItem itemKey="2" title="折叠面板标题 2">
        第二个折叠面板的内容。折叠面板可以用于展示 FAQ、
        设置选项、详细信息等场景。
      </CollapseItem>
      <CollapseItem itemKey="3" title="折叠面板标题 3">
        第三个折叠面板的内容。每个面板都可以独立展开或折叠。
      </CollapseItem>
    </Collapse>
  ),
};

// ============================================
// 默认展开
// ============================================
export const DefaultActive: Story = {
  render: () => (
    <Collapse defaultActiveKeys={['1']}>
      <CollapseItem itemKey="1" title="默认展开的面板">
        这个面板默认是展开状态。通过 defaultActiveKeys 属性
        可以指定哪些面板默认展开。
      </CollapseItem>
      <CollapseItem itemKey="2" title="折叠面板标题 2">
        第二个面板默认是折叠状态。
      </CollapseItem>
      <CollapseItem itemKey="3" title="折叠面板标题 3">
        第三个面板默认也是折叠状态。
      </CollapseItem>
    </Collapse>
  ),
  name: '默认展开',
};

export const MultipleDefaultActive: Story = {
  render: () => (
    <Collapse defaultActiveKeys={['1', '3']}>
      <CollapseItem itemKey="1" title="默认展开 1">
        第一个面板默认展开。
      </CollapseItem>
      <CollapseItem itemKey="2" title="折叠面板标题 2">
        第二个面板默认折叠。
      </CollapseItem>
      <CollapseItem itemKey="3" title="默认展开 3">
        第三个面板也默认展开。
      </CollapseItem>
    </Collapse>
  ),
  name: '多个默认展开',
};

// ============================================
// 手风琴模式
// ============================================
export const Accordion: Story = {
  render: () => (
    <Collapse accordion defaultActiveKeys={['1']}>
      <CollapseItem itemKey="1" title="手风琴面板 1">
        手风琴模式下，每次只能展开一个面板。
        展开新面板时，其他面板会自动折叠。
      </CollapseItem>
      <CollapseItem itemKey="2" title="手风琴面板 2">
        点击这个面板，上面的面板会自动折叠。
      </CollapseItem>
      <CollapseItem itemKey="3" title="手风琴面板 3">
        这种模式适合在有限空间内展示大量内容。
      </CollapseItem>
    </Collapse>
  ),
  name: '手风琴模式',
};

// ============================================
// 禁用状态
// ============================================
export const Disabled: Story = {
  render: () => (
    <Collapse defaultActiveKeys={['1']}>
      <CollapseItem itemKey="1" title="正常面板">
        这是一个正常可以操作的面板。
      </CollapseItem>
      <CollapseItem itemKey="2" title="禁用的面板" disabled>
        这个面板被禁用了，无法展开或折叠。
      </CollapseItem>
      <CollapseItem itemKey="3" title="另一个正常面板">
        这也是一个正常的面板。
      </CollapseItem>
    </Collapse>
  ),
  name: '禁用状态',
};

// ============================================
// 使用场景
// ============================================
export const FAQ: Story = {
  render: () => (
    <Collapse>
      <CollapseItem itemKey="1" title="如何创建账号？">
        点击页面右上角的「注册」按钮，填写您的邮箱和密码，
        然后点击「创建账号」即可完成注册。我们会向您的邮箱
        发送一封验证邮件，请点击邮件中的链接完成验证。
      </CollapseItem>
      <CollapseItem itemKey="2" title="忘记密码怎么办？">
        点击登录页面的「忘记密码」链接，输入您注册时使用的
        邮箱地址，我们会向您发送密码重置链接。请在 24 小时内
        完成密码重置操作。
      </CollapseItem>
      <CollapseItem itemKey="3" title="如何联系客服？">
        您可以通过以下方式联系我们的客服团队：
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li>在线客服：工作日 9:00-18:00</li>
          <li>邮箱：support@example.com</li>
          <li>电话：400-XXX-XXXX</li>
        </ul>
      </CollapseItem>
      <CollapseItem itemKey="4" title="支持哪些支付方式？">
        我们支持以下支付方式：微信支付、支付宝、银行卡支付、
        Apple Pay 等。企业用户还可以选择对公转账方式。
      </CollapseItem>
    </Collapse>
  ),
  name: 'FAQ 常见问题',
};

export const Settings: Story = {
  render: () => (
    <Collapse accordion>
      <CollapseItem itemKey="account" title="账号设置">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>用户名</span>
            <span style={{ color: '#71717a' }}>user_123</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>邮箱</span>
            <span style={{ color: '#71717a' }}>user@example.com</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>手机号</span>
            <span style={{ color: '#71717a' }}>138****8888</span>
          </div>
        </div>
      </CollapseItem>
      <CollapseItem itemKey="notification" title="通知设置">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>邮件通知</span>
            <span style={{ color: '#22c55e' }}>已开启</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>短信通知</span>
            <span style={{ color: '#ef4444' }}>已关闭</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>推送通知</span>
            <span style={{ color: '#22c55e' }}>已开启</span>
          </div>
        </div>
      </CollapseItem>
      <CollapseItem itemKey="privacy" title="隐私设置">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>个人主页可见性</span>
            <span style={{ color: '#71717a' }}>公开</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>在线状态</span>
            <span style={{ color: '#71717a' }}>仅好友可见</span>
          </div>
        </div>
      </CollapseItem>
      <CollapseItem itemKey="danger" title="危险操作" disabled>
        此区域包含危险操作，暂时禁用。
      </CollapseItem>
    </Collapse>
  ),
  name: '设置面板',
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
      }}
    >
      <Collapse defaultActiveKeys={['1']}>
        <CollapseItem itemKey="1" title="暗色模式面板 1">
          折叠面板支持暗色模式，自动适配主题颜色。
        </CollapseItem>
        <CollapseItem itemKey="2" title="暗色模式面板 2">
          第二个折叠面板的内容。
        </CollapseItem>
        <CollapseItem itemKey="3" title="禁用的面板" disabled>
          禁用状态在暗色模式下也有正确的样式。
        </CollapseItem>
      </Collapse>
    </div>
  ),
  name: '暗色模式',
};

// ============================================
// Overview
// ============================================
export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '500px' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>基础折叠面板</h3>
        <Collapse>
          <CollapseItem itemKey="1" title="面板标题 1">
            面板内容 1
          </CollapseItem>
          <CollapseItem itemKey="2" title="面板标题 2">
            面板内容 2
          </CollapseItem>
        </Collapse>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>手风琴模式</h3>
        <Collapse accordion defaultActiveKeys={['a1']}>
          <CollapseItem itemKey="a1" title="手风琴 1">
            每次只能展开一个
          </CollapseItem>
          <CollapseItem itemKey="a2" title="手风琴 2">
            点击展开会折叠其他
          </CollapseItem>
        </Collapse>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>包含禁用项</h3>
        <Collapse>
          <CollapseItem itemKey="d1" title="正常面板">
            可以正常操作
          </CollapseItem>
          <CollapseItem itemKey="d2" title="禁用面板" disabled>
            无法操作
          </CollapseItem>
        </Collapse>
      </div>
    </div>
  ),
  name: '完整概览',
};

