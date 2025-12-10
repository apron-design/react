---
title: Grid 栅格
group: 布局组件
order: 5
---

# Grid 栅格

24 栅格系统，帮助开发者快速创建响应式布局。

## 设计理念

在多数业务情况下，Ant Design 需要在设计区域内解决大量信息收纳的问题，因此在 12 栅格系统的基础上，我们将整个设计建议区域按照 24 等分的原则进行划分。

划分之后的信息区块我们称之为『盒子』。建议横向排列的盒子数量最多四个，最少一个。『盒子』在整个屏幕上占比见上图。设计部分基于盒子的单位定制盒子内部的排版布局，以保证整体设计的一致性。

## 示例

### 基础栅格

从堆叠到水平排列。使用单一的一组 Row 和 Col 栅格组件，就可以创建一个基本的栅格系统。所有 Col 必须放在 Row 内。

```jsx
import { Row, Col } from '@apron-design/react';

const DemoBox = ({ children, height = 40, light = false }) => (
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

export default () => (
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
);
```

### 区块间隔

栅格常常需要和间隔进行配合，你可以使用 Row 的 gutter 属性来指定每一栏之间的间隔，推荐使用 (16+8n)px 作为栅格间隔（n 是自然数）。

```jsx
import { Row, Col } from '@apron-design/react';

const DemoBox = ({ children, height = 40, light = false }) => (
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

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <p>水平间隔 16px</p>
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
    
    <p>水平间隔 16px，垂直间隔 24px</p>
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
);
```

### 左右偏移

使用 offset 可以将列向右侧偏移。

```jsx
import { Row, Col } from '@apron-design/react';

const DemoBox = ({ children, height = 40, light = false }) => (
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

export default () => (
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
);
```

### 栅格排序

通过使用 push 和 pull 类就可以很容易的改变列的顺序。

```jsx
import { Row, Col } from '@apron-design/react';

const DemoBox = ({ children, height = 40, light = false }) => (
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

export default () => (
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
);
```

### 水平排列

通过 Row 的 justify 属性可以设置列在水平方向上的对齐方式。

```jsx
import { Row, Col } from '@apron-design/react';

const DemoBox = ({ children, height = 40, light = false }) => (
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

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <p>justify: start</p>
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

    <p>justify: center</p>
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

    <p>justify: end</p>
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

    <p>justify: space-between</p>
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

    <p>justify: space-around</p>
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

    <p>justify: space-evenly</p>
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
);
```

### 垂直对齐

通过 Row 的 align 属性可以设置列在垂直方向上的对齐方式。

```jsx
import { Row, Col } from '@apron-design/react';

const DemoBox = ({ children, height = 40, light = false }) => (
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

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <p>align: top</p>
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

    <p>align: middle</p>
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

    <p>align: bottom</p>
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
);
```

### Flex 布局

通过 Col 的 flex 属性可以设置弹性布局。

```jsx
import { Row, Col } from '@apron-design/react';

const DemoBox = ({ children, height = 40, light = false }) => (
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

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <p>百分比</p>
    <Row>
      <Col flex={2}>
        <DemoBox>2 / 5</DemoBox>
      </Col>
      <Col flex={3}>
        <DemoBox light>3 / 5</DemoBox>
      </Col>
    </Row>

    <p>固定宽度</p>
    <Row>
      <Col flex="100px">
        <DemoBox>100px</DemoBox>
      </Col>
      <Col flex="auto">
        <DemoBox light>auto</DemoBox>
      </Col>
    </Row>

    <p>flex 属性</p>
    <Row>
      <Col flex="1 1 200px">
        <DemoBox>1 1 200px</DemoBox>
      </Col>
      <Col flex="0 1 300px">
        <DemoBox light>0 1 300px</DemoBox>
      </Col>
    </Row>
  </div>
);
```

### 响应式布局

预设六个响应尺寸：xs、sm、md、lg、xl、xxl。

```jsx
import { Row, Col } from '@apron-design/react';

const DemoBox = ({ children, height = 40, light = false }) => (
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

export default () => (
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
);
```

## API

### Row

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gutter | 栅格间隔，可以是数字或数组 [水平间距, 垂直间距] | `number \| [number, number] \| { xs?: Gutter; sm?: Gutter; md?: Gutter; lg?: Gutter; xl?: Gutter; xxl?: Gutter }` | `0` |
| justify | 水平排列方式 | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'` |
| align | 垂直对齐方式 | `'top' \| 'middle' \| 'bottom' \| 'stretch'` | `'top'` |
| wrap | 是否自动换行 | `boolean` | `true` |
| children | 子元素 | `ReactNode` | - |

### Col

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | 栅格占位格数，为 0 时相当于 display: none | `number \| string` | - |
| offset | 栅格左侧的间隔格数 | `number` | `0` |
| order | 栅格顺序 | `number` | `0` |
| push | 栅格向右移动格数 | `number` | `0` |
| pull | 栅格向左移动格数 | `number` | `0` |
| flex | flex 布局属性 | `string \| number` | - |
| xs | <576px 响应式栅格 | `number \| string \| { span?: number \| string; offset?: number; order?: number; push?: number; pull?: number }` | - |
| sm | ≥576px 响应式栅格 | `number \| string \| { span?: number \| string; offset?: number; order?: number; push?: number; pull?: number }` | - |
| md | ≥768px 响应式栅格 | `number \| string \| { span?: number \| string; offset?: number; order?: number; push?: number; pull?: number }` | - |
| lg | ≥992px 响应式栅格 | `number \| string \| { span?: number \| string; offset?: number; order?: number; push?: number; pull?: number }` | - |
| xl | ≥1200px 响应式栅格 | `number \| string \| { span?: number \| string; offset?: number; order?: number; push?: number; pull?: number }` | - |
| xxl | ≥1600px 响应式栅格 | `number \| string \| { span?: number \| string; offset?: number; order?: number; push?: number; pull?: number }` | - |
| children | 子元素 | `ReactNode` | - |