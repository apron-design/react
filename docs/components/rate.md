---
title: Rate 评分
group: 数据录入
order: 1
---

# Rate 评分

评分组件用于对事物进行评级操作，或展示事物的评级。

## 何时使用

- 需要对事物进行评级时
- 展示事物的平均评分时
- 收集用户反馈时

## 示例

### 基础用法

最简单的评分组件使用方式。

```jsx
import { Rate } from '@apron-design/react';

export default function BasicRate() {
  return <Rate defaultValue={0} />;
}
```

### 展示模式

在展示模式下，评分组件仅用于显示评分，不支持用户交互。

```jsx
import { Rate } from '@apron-design/react';

export default function DisplayModeRate() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Empty (0 stars)</h4>
        <Rate defaultValue={0} />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Full (5 stars)</h4>
        <Rate defaultValue={5} />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Partial (3.7 stars)</h4>
        <Rate defaultValue={3.7} showValue />
      </div>
    </div>
  );
}
```

### 展示模式示例

展示不同评分值的效果。

```jsx
import { Rate } from '@apron-design/react';

export default function DisplayModeExamples() {
  return (
    <div style={{ display: 'flex', gap: '48px' }}>
      <Rate defaultValue={0} />
      <Rate defaultValue={5} />
      <Rate defaultValue={3.7} />
    </div>
  );
}
```

### 带小数的展示模式

展示带有小数的评分值。

```jsx
import { Rate } from '@apron-design/react';

export default function DisplayModeWithDecimals() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Rate defaultValue={2.3} showValue />
      <Rate defaultValue={3.5} showValue />
      <Rate defaultValue={4.2} showValue />
      <Rate defaultValue={3.7} showValue />
    </div>
  );
}
```

### 设置模式

在设置模式下，用户可以点击星星来设置评分。

```jsx
import { useState } from 'react';
import { Rate } from '@apron-design/react';

export default function ControlModeRate() {
  const [value, setValue] = useState(2.5);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>
          Step: 1 (整星)
        </h4>
        <Rate
          value={Math.round(value)}
          allowControl
          onChange={setValue}
          showValue
        />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>
          Step: 0.5 (半星)
        </h4>
        <Rate
          value={value}
          allowControl
          allowHalf
          onChange={setValue}
          showValue
        />
      </div>
      <p style={{ margin: 0, color: '#666' }}>
        Current Value: {value}
      </p>
    </div>
  );
}
```

### 整星设置模式

只允许选择整星的评分组件。

```jsx
import { useState } from 'react';
import { Rate } from '@apron-design/react';

export default function ControlModeWholeStars() {
  const [value, setValue] = useState(3);
  return (
    <div>
      <Rate
        value={value}
        allowControl
        onChange={setValue}
        showValue
      />
      <p style={{ margin: '12px 0 0 0', color: '#666' }}>
        Selected: {value} stars
      </p>
    </div>
  );
}
```

### 半星设置模式

允许选择半星的评分组件。

```jsx
import { useState } from 'react';
import { Rate } from '@apron-design/react';

export default function ControlModeHalfStars() {
  const [value, setValue] = useState(3.5);
  return (
    <div>
      <Rate
        value={value}
        allowControl
        allowHalf
        onChange={setValue}
        showValue
      />
      <p style={{ margin: '12px 0 0 0', color: '#666' }}>
        Selected: {value} stars
      </p>
    </div>
  );
}
```

### 非受控模式

使用 `defaultValue` 属性设置默认值的非受控模式。

```jsx
import { Rate } from '@apron-design/react';

export default function UncontrolledMode() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>
          非受控模式（使用 defaultValue）
        </h4>
        <Rate
          defaultValue={3}
          allowControl
          onChange={(val) => console.log('Selected:', val)}
          showValue
        />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>
          非受控模式（半星）
        </h4>
        <Rate
          defaultValue={2.5}
          allowControl
          allowHalf
          onChange={(val) => console.log('Selected:', val)}
          showValue
        />
      </div>
    </div>
  );
}
```

### 禁用状态

通过 `disabled` 属性禁用评分组件。

```jsx
import { Rate } from '@apron-design/react';

export default function DisabledRate() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Rate defaultValue={3} allowControl disabled showValue />
      <Rate defaultValue={4.5} allowControl allowHalf disabled showValue />
    </div>
  );
}
```

### 不同星星数量

通过 `count` 属性设置星星的总数。

```jsx
import { Rate } from '@apron-design/react';

export default function DifferentCounts() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <span style={{ color: '#666', marginRight: '12px' }}>3 stars:</span>
        <Rate defaultValue={2} count={3} showValue />
      </div>
      <div>
        <span style={{ color: '#666', marginRight: '12px' }}>5 stars:</span>
        <Rate defaultValue={3.5} count={5} showValue />
      </div>
      <div>
        <span style={{ color: '#666', marginRight: '12px' }}>10 stars:</span>
        <Rate defaultValue={7} count={10} showValue />
      </div>
    </div>
  );
}
```

### 交互式示例

完整的交互式评分组件示例。

```jsx
import { useState } from 'react';
import { Rate } from '@apron-design/react';

export default function InteractiveRate() {
  const [value, setValue] = useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h4 style={{ margin: 0, color: '#393939' }}>Click to rate:</h4>
      <Rate
        value={value}
        allowControl
        allowHalf
        onChange={setValue}
        showValue
      />
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => setValue(0)}>Reset</button>
        <button onClick={() => setValue(5)}>Max</button>
      </div>
    </div>
  );
}
```

### 所有状态概览

展示评分组件的所有可能状态。

```jsx
import { Rate } from '@apron-design/react';

export default function AllStatesRate() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>展示模式</h4>
        <div style={{ display: 'flex', gap: '48px' }}>
          <Rate defaultValue={0} />
          <Rate defaultValue={5} />
          <Rate defaultValue={3.7} showValue />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>设置模式（整星）</h4>
        <Rate defaultValue={2} allowControl showValue />
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>设置模式（半星）</h4>
        <Rate defaultValue={3.5} allowControl allowHalf showValue />
      </div>
    </div>
  );
}
```

### 暗色模式

评分组件在暗色模式下会自动适配主题颜色。

```jsx
import { Rate } from '@apron-design/react';

export default function DarkModeRate() {
  return (
    <div
      data-theme="dark"
      style={{
        padding: '32px',
        backgroundColor: '#18181b',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Display Mode</h4>
        <div style={{ display: 'flex', gap: '32px' }}>
          <Rate defaultValue={0} />
          <Rate defaultValue={5} />
          <Rate defaultValue={3.7} showValue />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Control Mode</h4>
        <Rate defaultValue={3} allowControl showValue />
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Disabled</h4>
        <Rate defaultValue={4} allowControl disabled showValue />
      </div>
    </div>
  );
}
```

## API

### Rate Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值（受控模式） | number | - |
| defaultValue | 默认值（非受控模式） | number | `0` |
| count | 星星总数 | number | `5` |
| allowControl | 是否允许交互（设置模式） | boolean | `false` |
| allowHalf | 是否允许半星（仅设置模式有效） | boolean | `false` |
| disabled | 是否禁用 | boolean | `false` |
| showValue | 是否显示数值 | boolean | `false` |
| onChange | 值改变时的回调 | `(value: number) => void` | - |
| className | 自定义类名 | string | - |

## 注意事项

1. 在展示模式下（`allowControl=false`），评分组件仅用于显示评分，不支持用户交互
2. 在设置模式下（`allowControl=true`），用户可以点击星星来设置评分
3. 通过 `allowHalf` 属性可以控制是否允许选择半星
4. 通过 `count` 属性可以设置星星的总数
5. 在受控模式下，需要同时提供 `value` 和 `onChange` 属性
6. 在非受控模式下，可以使用 `defaultValue` 设置默认值
7. 通过 `showValue` 属性可以显示当前评分值
8. 评分组件会根据主题自动适配颜色，在暗色模式下会有不同的视觉效果
9. 当鼠标悬停在星星上时，会预览即将设置的评分值