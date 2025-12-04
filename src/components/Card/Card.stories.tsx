import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { Button } from '../Button';
import { Space } from '../Space';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

// ============================================
// Default
// ============================================
export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader title="卡片标题" />
      <CardBody>
        这是卡片的正文内容。Card 组件可以用来展示各种信息，
        如文章摘要、用户信息、商品详情等。
      </CardBody>
    </Card>
  ),
};

// ============================================
// 基础用法
// ============================================
export const Basic: Story = {
  render: () => (
    <Card>
      <CardBody>
        这是一个只有 CardBody 的简单卡片。
      </CardBody>
    </Card>
  ),
  name: '基础卡片',
};

export const WithHeader: Story = {
  render: () => (
    <Card>
      <CardHeader title="卡片标题" />
      <CardBody>
        带有头部的卡片，头部显示标题。
      </CardBody>
    </Card>
  ),
  name: '带标题',
};

export const WithHeaderExtra: Story = {
  render: () => (
    <Card>
      <CardHeader 
        title="卡片标题" 
        extra={<Button variant="link" size="sm">更多</Button>}
      />
      <CardBody>
        头部右侧可以放置额外的操作按钮或链接。
      </CardBody>
    </Card>
  ),
  name: '带标题和额外操作',
};

export const WithFooter: Story = {
  render: () => (
    <Card>
      <CardHeader title="卡片标题" />
      <CardBody>
        带有底部的卡片，底部通常用于放置操作按钮。
      </CardBody>
      <CardFooter>
        <Space>
          <Button variant="primary" size="sm">确认</Button>
          <Button variant="secondary" size="sm">取消</Button>
        </Space>
      </CardFooter>
    </Card>
  ),
  name: '带底部',
};

export const Complete: Story = {
  render: () => (
    <Card>
      <CardHeader 
        title="完整卡片" 
        extra={<Button variant="text" size="sm">编辑</Button>}
      />
      <CardBody>
        <p style={{ margin: '0 0 12px 0' }}>
          这是一个完整的卡片示例，包含头部、正文和底部三个部分。
        </p>
        <p style={{ margin: 0, color: '#71717a', fontSize: '14px' }}>
          卡片可以用于展示结构化的内容，如用户资料、文章预览、设置面板等。
        </p>
      </CardBody>
      <CardFooter>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Space>
            <Button variant="secondary" size="sm">取消</Button>
            <Button variant="primary" size="sm">保存</Button>
          </Space>
        </div>
      </CardFooter>
    </Card>
  ),
  name: '完整卡片',
};

// ============================================
// 使用场景
// ============================================
export const UserProfile: Story = {
  render: () => (
    <Card>
      <CardHeader 
        title="用户信息" 
        extra={<Button variant="link" size="sm">编辑资料</Button>}
      />
      <CardBody>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#4C9EEA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '24px',
              fontWeight: 600,
            }}
          >
            U
          </div>
          <div>
            <h4 style={{ margin: '0 0 4px 0', color: '#393939' }}>用户名称</h4>
            <p style={{ margin: 0, color: '#71717a', fontSize: '14px' }}>
              user@example.com
            </p>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#71717a' }}>
          <span>注册时间：2024-01-01</span>
          <span>最后登录：2024-12-04</span>
        </div>
      </CardFooter>
    </Card>
  ),
  name: '用户资料卡片',
};

export const ArticlePreview: Story = {
  render: () => (
    <Card>
      <CardHeader title="文章标题" />
      <CardBody>
        <p style={{ margin: '0 0 12px 0', lineHeight: 1.6 }}>
          这是文章的摘要内容，通常显示文章的前几行文字，
          让用户可以快速了解文章的主要内容...
        </p>
        <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#a1a1aa' }}>
          <span>作者：张三</span>
          <span>2024-12-04</span>
          <span>阅读 1.2k</span>
        </div>
      </CardBody>
      <CardFooter>
        <Button variant="primary" size="sm">阅读全文</Button>
      </CardFooter>
    </Card>
  ),
  name: '文章预览卡片',
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
      <Card>
        <CardHeader 
          title="暗色模式卡片" 
          extra={<Button variant="link" size="sm">更多</Button>}
        />
        <CardBody>
          <p style={{ margin: 0, color: '#a1a1aa' }}>
            Card 组件支持暗色模式，自动适配主题颜色。
          </p>
        </CardBody>
        <CardFooter>
          <Space>
            <Button variant="primary" size="sm">确认</Button>
            <Button variant="secondary" size="sm">取消</Button>
          </Space>
        </CardFooter>
      </Card>
    </div>
  ),
  name: '暗色模式',
};

// ============================================
// Overview
// ============================================
export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '500px' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>基础卡片</h3>
        <Card>
          <CardBody>只有正文的简单卡片</CardBody>
        </Card>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>带头部</h3>
        <Card>
          <CardHeader title="卡片标题" />
          <CardBody>带头部的卡片</CardBody>
        </Card>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>带头部和额外操作</h3>
        <Card>
          <CardHeader 
            title="卡片标题" 
            extra={<Button variant="link" size="sm">操作</Button>}
          />
          <CardBody>头部右侧有额外操作</CardBody>
        </Card>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>完整结构</h3>
        <Card>
          <CardHeader 
            title="完整卡片" 
            extra={<Button variant="text" size="sm">更多</Button>}
          />
          <CardBody>包含头部、正文、底部的完整卡片</CardBody>
          <CardFooter>
            <Space>
              <Button variant="primary" size="sm">确认</Button>
              <Button variant="secondary" size="sm">取消</Button>
            </Space>
          </CardFooter>
        </Card>
      </div>
    </div>
  ),
  name: '完整概览',
};

