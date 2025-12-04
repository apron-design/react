import type { Meta, StoryObj } from '@storybook/react';
import { Row } from './Row';
import { Col } from './Col';

const meta: Meta<typeof Row> = {
  title: 'Layout/Grid',
  component: Row,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Row>;

// 演示用的样式
const DemoBox: React.FC<{ children: React.ReactNode; height?: number; light?: boolean }> = ({
  children,
  height = 40,
  light = false,
}) => (
  <div
    style={{
      height,
      lineHeight: `${height}px`,
      textAlign: 'center',
      color: '#fff',
      backgroundColor: light ? 'rgba(0, 146, 255, 0.75)' : 'rgba(0, 146, 255, 1)',
      borderRadius: 4,
    }}
  >
    {children}
  </div>
);

export const Basic: Story = {
  name: '基础栅格',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Row>
        <Col span={24}>
          <DemoBox>col-24</DemoBox>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DemoBox>col-12</DemoBox>
        </Col>
        <Col span={12}>
          <DemoBox light>col-12</DemoBox>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <DemoBox>col-8</DemoBox>
        </Col>
        <Col span={8}>
          <DemoBox light>col-8</DemoBox>
        </Col>
        <Col span={8}>
          <DemoBox>col-8</DemoBox>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <DemoBox>col-6</DemoBox>
        </Col>
        <Col span={6}>
          <DemoBox light>col-6</DemoBox>
        </Col>
        <Col span={6}>
          <DemoBox>col-6</DemoBox>
        </Col>
        <Col span={6}>
          <DemoBox light>col-6</DemoBox>
        </Col>
      </Row>
    </div>
  ),
};

export const Gutter: Story = {
  name: '区块间隔',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ margin: 0, color: '#666' }}>水平间隔 16px</p>
      <Row gutter={16}>
        <Col span={6}>
          <DemoBox>col-6</DemoBox>
        </Col>
        <Col span={6}>
          <DemoBox>col-6</DemoBox>
        </Col>
        <Col span={6}>
          <DemoBox>col-6</DemoBox>
        </Col>
        <Col span={6}>
          <DemoBox>col-6</DemoBox>
        </Col>
      </Row>
      
      <p style={{ margin: 0, color: '#666' }}>水平间隔 16px，垂直间隔 24px</p>
      <Row gutter={[16, 24]}>
        <Col span={6}>
          <DemoBox>col-6</DemoBox>
        </Col>
        <Col span={6}>
          <DemoBox>col-6</DemoBox>
        </Col>
        <Col span={6}>
          <DemoBox>col-6</DemoBox>
        </Col>
        <Col span={6}>
          <DemoBox>col-6</DemoBox>
        </Col>
        <Col span={6}>
          <DemoBox>col-6</DemoBox>
        </Col>
        <Col span={6}>
          <DemoBox>col-6</DemoBox>
        </Col>
        <Col span={6}>
          <DemoBox>col-6</DemoBox>
        </Col>
        <Col span={6}>
          <DemoBox>col-6</DemoBox>
        </Col>
      </Row>
    </div>
  ),
};

export const Offset: Story = {
  name: '左右偏移',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Row>
        <Col span={8}>
          <DemoBox>col-8</DemoBox>
        </Col>
        <Col span={8} offset={8}>
          <DemoBox>col-8 offset-8</DemoBox>
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={6}>
          <DemoBox>col-6 offset-6</DemoBox>
        </Col>
        <Col span={6} offset={6}>
          <DemoBox>col-6 offset-6</DemoBox>
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <DemoBox>col-12 offset-6</DemoBox>
        </Col>
      </Row>
    </div>
  ),
};

export const PushPull: Story = {
  name: '栅格排序',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Row>
        <Col span={18} push={6}>
          <DemoBox>col-18 push-6</DemoBox>
        </Col>
        <Col span={6} pull={18}>
          <DemoBox light>col-6 pull-18</DemoBox>
        </Col>
      </Row>
    </div>
  ),
};

export const Justify: Story = {
  name: '水平排列',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ margin: 0, color: '#666' }}>justify: start</p>
      <Row justify="start" style={{ background: 'rgba(0, 0, 0, 0.05)' }}>
        <Col span={4}>
          <DemoBox>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox light>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox light>col-4</DemoBox>
        </Col>
      </Row>

      <p style={{ margin: 0, color: '#666' }}>justify: center</p>
      <Row justify="center" style={{ background: 'rgba(0, 0, 0, 0.05)' }}>
        <Col span={4}>
          <DemoBox>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox light>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox light>col-4</DemoBox>
        </Col>
      </Row>

      <p style={{ margin: 0, color: '#666' }}>justify: end</p>
      <Row justify="end" style={{ background: 'rgba(0, 0, 0, 0.05)' }}>
        <Col span={4}>
          <DemoBox>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox light>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox light>col-4</DemoBox>
        </Col>
      </Row>

      <p style={{ margin: 0, color: '#666' }}>justify: space-between</p>
      <Row justify="space-between" style={{ background: 'rgba(0, 0, 0, 0.05)' }}>
        <Col span={4}>
          <DemoBox>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox light>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox light>col-4</DemoBox>
        </Col>
      </Row>

      <p style={{ margin: 0, color: '#666' }}>justify: space-around</p>
      <Row justify="space-around" style={{ background: 'rgba(0, 0, 0, 0.05)' }}>
        <Col span={4}>
          <DemoBox>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox light>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox light>col-4</DemoBox>
        </Col>
      </Row>

      <p style={{ margin: 0, color: '#666' }}>justify: space-evenly</p>
      <Row justify="space-evenly" style={{ background: 'rgba(0, 0, 0, 0.05)' }}>
        <Col span={4}>
          <DemoBox>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox light>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox light>col-4</DemoBox>
        </Col>
      </Row>
    </div>
  ),
};

export const Align: Story = {
  name: '垂直对齐',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ margin: 0, color: '#666' }}>align: top</p>
      <Row align="top" justify="center" style={{ background: 'rgba(0, 0, 0, 0.05)' }}>
        <Col span={4}>
          <DemoBox height={100}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox height={50} light>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox height={120}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox height={80} light>col-4</DemoBox>
        </Col>
      </Row>

      <p style={{ margin: 0, color: '#666' }}>align: middle</p>
      <Row align="middle" justify="center" style={{ background: 'rgba(0, 0, 0, 0.05)' }}>
        <Col span={4}>
          <DemoBox height={100}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox height={50} light>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox height={120}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox height={80} light>col-4</DemoBox>
        </Col>
      </Row>

      <p style={{ margin: 0, color: '#666' }}>align: bottom</p>
      <Row align="bottom" justify="center" style={{ background: 'rgba(0, 0, 0, 0.05)' }}>
        <Col span={4}>
          <DemoBox height={100}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox height={50} light>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox height={120}>col-4</DemoBox>
        </Col>
        <Col span={4}>
          <DemoBox height={80} light>col-4</DemoBox>
        </Col>
      </Row>
    </div>
  ),
};

export const Flex: Story = {
  name: 'Flex 布局',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ margin: 0, color: '#666' }}>百分比</p>
      <Row>
        <Col flex={2}>
          <DemoBox>2 / 5</DemoBox>
        </Col>
        <Col flex={3}>
          <DemoBox light>3 / 5</DemoBox>
        </Col>
      </Row>

      <p style={{ margin: 0, color: '#666' }}>固定宽度</p>
      <Row>
        <Col flex="100px">
          <DemoBox>100px</DemoBox>
        </Col>
        <Col flex="auto">
          <DemoBox light>auto</DemoBox>
        </Col>
      </Row>

      <p style={{ margin: 0, color: '#666' }}>flex 属性</p>
      <Row>
        <Col flex="1 1 200px">
          <DemoBox>1 1 200px</DemoBox>
        </Col>
        <Col flex="0 1 300px">
          <DemoBox light>0 1 300px</DemoBox>
        </Col>
      </Row>
    </div>
  ),
};

export const Responsive: Story = {
  name: '响应式布局',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <DemoBox>Col</DemoBox>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <DemoBox>Col</DemoBox>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <DemoBox>Col</DemoBox>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <DemoBox>Col</DemoBox>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <DemoBox>Col</DemoBox>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <DemoBox>Col</DemoBox>
        </Col>
      </Row>
    </div>
  ),
};

export const ResponsiveMore: Story = {
  name: '其他响应式属性',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Row>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <DemoBox>Col</DemoBox>
        </Col>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <DemoBox>Col</DemoBox>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <DemoBox>Col</DemoBox>
        </Col>
      </Row>
    </div>
  ),
};

export const Order: Story = {
  name: '排序',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Row>
        <Col span={6} order={4}>
          <DemoBox>1 col-order-4</DemoBox>
        </Col>
        <Col span={6} order={3}>
          <DemoBox light>2 col-order-3</DemoBox>
        </Col>
        <Col span={6} order={2}>
          <DemoBox>3 col-order-2</DemoBox>
        </Col>
        <Col span={6} order={1}>
          <DemoBox light>4 col-order-1</DemoBox>
        </Col>
      </Row>
    </div>
  ),
};

