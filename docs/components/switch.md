---
title: Switch 开关
group: 数据录入
order: 1
---

# Switch 开关

Switch 组件用于在两个状态之间进行切换，常用于设置选项的开启或关闭。

## 何时使用

- 需要在两个互斥状态之间切换时
- 表单中需要用户进行布尔值选择时
- 快速开关某个功能或设置时

## 示例

### 基础用法

最简单的 Switch 组件使用方式。

```jsx
import { Switch } from '@apron-design/react';

export default function BasicSwitch() {
  return <Switch />;
}
```

### 尺寸

Switch 组件支持三种尺寸。

```jsx
import { Switch } from '@apron-design/react';

export default function SizesSwitch() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Default (84 × 40)</h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Switch size="default" />
          <Switch size="default" defaultChecked />
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Small (62 × 30)</h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Switch size="small" />
          <Switch size="small" defaultChecked />
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Mini (42 × 20)</h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Switch size="mini" />
          <Switch size="mini" defaultChecked />
        </div>
      </div>
    </div>
  );
}
```

### 变种

Switch 组件支持多种变种样式。

```jsx
import { Switch } from '@apron-design/react';

export default function VariantsSwitch() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Default / Primary</h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Switch variant="default" />
          <Switch variant="default" defaultChecked />
          <Switch variant="primary" defaultChecked />
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Secondary</h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Switch variant="secondary" />
          <Switch variant="secondary" defaultChecked />
        </div>
      </div>
    </div>
  );
}
```

### 状态

Switch 组件支持多种状态。

```jsx
import { Switch } from '@apron-design/react';

export default function StatesSwitch() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Off</h4>
        <Switch />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>On</h4>
        <Switch defaultChecked />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Disabled Off</h4>
        <Switch disabled />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Disabled On</h4>
        <Switch disabled defaultChecked />
      </div>
    </div>
  );
}
```

### 自定义颜色

可以自定义开关的背景颜色。

```jsx
import { Switch } from '@apron-design/react';

export default function CustomColorsSwitch() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Custom Checked Color (Green)</h4>
        <Switch defaultChecked checkedColor="#22c55e" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Custom Unchecked Color (Pink)</h4>
        <Switch uncheckedColor="#fce7f3" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#393939' }}>Both Custom Colors</h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Switch uncheckedColor="#fce7f3" checkedColor="#ec4899" />
          <Switch uncheckedColor="#fce7f3" checkedColor="#ec4899" defaultChecked />
        </div>
      </div>
    </div>
  );
}
```

### 交互式示例

Switch 组件支持受控模式。

```jsx
import { useState } from 'react';
import { Switch } from '@apron-design/react';

export default function InteractiveSwitch() {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <Switch checked={checked} onChange={setChecked} />
      <p style={{ margin: 0, color: '#666' }}>
        Status: {checked ? 'ON' : 'OFF'}
      </p>
    </div>
  );
}
```

### 所有尺寸和变种

展示所有尺寸和变种的组合。

```jsx
import { Switch } from '@apron-design/react';

export default function AllSizesAndVariantsSwitch() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {(['default', 'primary', 'secondary']).map((variant) => (
        <div key={variant}>
          <h4 style={{ margin: '0 0 16px 0', color: '#393939', textTransform: 'capitalize' }}>
            {variant}
          </h4>
          <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
            {(['default', 'small', 'mini']).map((size) => (
              <div key={size} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Switch size={size} variant={variant} />
                <Switch size={size} variant={variant} defaultChecked />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 非受控模式

使用 defaultChecked 属性的非受控模式。

```jsx
import { Switch } from '@apron-design/react';

export default function UncontrolledModeSwitch() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <h4 style={{ margin: 0, color: '#393939' }}>非受控模式（使用 defaultChecked）</h4>
      <Switch
        defaultChecked
        onChange={(checked) => console.log('Switch changed:', checked)}
      />
    </div>
  );
}
```

### 暗色模式

Switch 组件在暗色模式下会自动适配主题颜色。

```jsx
import { Switch } from '@apron-design/react';

export default function DarkModeSwitch() {
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
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Default / Primary</h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Switch />
          <Switch defaultChecked />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Secondary</h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Switch variant="secondary" />
          <Switch variant="secondary" defaultChecked />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>Disabled</h4>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Switch disabled />
          <Switch disabled defaultChecked />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', color: '#a1a1aa' }}>All Sizes</h4>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Switch size="default" defaultChecked />
          <Switch size="small" defaultChecked />
          <Switch size="mini" defaultChecked />
        </div>
      </div>
    </div>
  );
}
```

## API

### Switch Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 是否开启（受控模式） | boolean | - |
| defaultChecked | 默认是否开启（非受控模式） | boolean | - |
| disabled | 是否禁用 | boolean | `false` |
| size | 尺寸 | `'default'` \| `'small'` \| `'mini'` | `'default'` |
| variant | 变种 | `'default'` \| `'primary'` \| `'secondary'` | `'default'` |
| checkedColor | 自定义开启时的颜色 | string | - |
| uncheckedColor | 自定义关闭时的颜色 | string | - |
| onChange | 状态改变时的回调 | `(checked: boolean, e: ChangeEvent<HTMLInputElement>) => void` | - |
| className | 自定义类名 | string | - |
| id | 自定义 ID | string | - |

## 注意事项

1. Switch 组件用于在两个状态之间进行切换
2. 通过 `checked` 属性控制开关状态（受控模式）
3. 通过 `defaultChecked` 属性设置默认状态（非受控模式）
4. 通过 `size` 属性设置尺寸：
   - `'default'`：默认尺寸（84 × 40）
   - `'small'`：小尺寸（62 × 30）
   - `'mini'`：迷你尺寸（42 × 20）
5. 通过 `variant` 属性设置变种：
   - `'default'`：默认变种
   - `'primary'`：主色调变种
   - `'secondary'`：次色调变种
6. 通过 `checkedColor` 和 `uncheckedColor` 属性可以自定义开关的颜色
7. 在受控模式下，需要同时提供 `checked` 和 `onChange` 属性
8. 在非受控模式下，可以使用 `defaultChecked` 属性设置初始状态
9. Switch 组件支持键盘操作（Tab 键聚焦，空格键切换）
10. 在暗色模式下，Switch 组件会自动适配主题颜色