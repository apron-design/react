---
title: Pagination 分页
group: 导航组件
order: 4
---

# Pagination 分页

分页组件用于将大量数据分割成多个页面，提升用户体验和页面性能。

## 何时使用

- 当数据量较大，需要分批展示时
- 需要提供数据浏览功能时
- 与表格或其他数据展示组件配合使用时

## 示例

### 基础用法

最基本的分页组件，只需要指定数据总数和每页条数。

```jsx
import { Pagination } from '@apron-design/react';

export default function BasicPagination() {
  return <Pagination count={100} pageSize={10} />;
}
```

### 不同尺寸

分页组件支持三种尺寸：大、默认、小。

```jsx
import { Pagination } from '@apron-design/react';

export default function SizePagination() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Large (40px)</p>
        <Pagination count={100} pageSize={10} size="large" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Default (30px)</p>
        <Pagination count={100} pageSize={10} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Small (20px)</p>
        <Pagination count={100} pageSize={10} size="small" />
      </div>
    </div>
  );
}
```

### 少量页码

当总页数少于7页时，会直接显示所有页码。

```jsx
import { Pagination } from '@apron-design/react';

export default function FewPagesPagination() {
  return <Pagination count={50} pageSize={10} />;
}
```

### 大量页码

当总页数较多时，分页器会自动折叠中间的页码，只显示必要的页码和省略号。

```jsx
import { Pagination } from '@apron-design/react';

export default function ManyPagesPagination() {
  return <Pagination count={500} pageSize={10} />;
}
```

### 受控模式

通过 `current` 和 `onChange` 属性来控制当前页码。

```jsx
import { useState } from 'react';
import { Pagination } from '@apron-design/react';

export default function ControlledPagination() {
  const [current, setCurrent] = useState(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <Pagination
        count={200}
        pageSize={10}
        current={current}
        onChange={(page) => setCurrent(page)}
      />
      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
        当前页: {current}
      </p>
    </div>
  );
}
```

### 不同每页条数

可以根据需要设置不同的每页条数。

```jsx
import { Pagination } from '@apron-design/react';

export default function PageSizePagination() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>每页 5 条 (100 条数据)</p>
        <Pagination count={100} pageSize={5} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>每页 10 条 (100 条数据)</p>
        <Pagination count={100} pageSize={10} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>每页 20 条 (100 条数据)</p>
        <Pagination count={100} pageSize={20} />
      </div>
    </div>
  );
}
```

### 从中间页开始

可以通过 `defaultCurrent` 设置默认的起始页码。

```jsx
import { Pagination } from '@apron-design/react';

export default function StartFromMiddlePagination() {
  return <Pagination count={200} pageSize={10} defaultCurrent={10} />;
}
```

### 从末页开始

设置默认页码为最后一页。

```jsx
import { Pagination } from '@apron-design/react';

export default function StartFromEndPagination() {
  return <Pagination count={200} pageSize={10} defaultCurrent={20} />;
}
```

### 单页情况

当数据总量小于等于每页条数时，不会显示分页器。

```jsx
import { Pagination } from '@apron-design/react';

export default function SinglePagePagination() {
  return <Pagination count={5} pageSize={10} />;
}
```

### 禁用状态

通过 `disabled` 属性禁用分页器的所有操作。

```jsx
import { Pagination } from '@apron-design/react';

export default function DisabledPagination() {
  return <Pagination count={100} pageSize={10} disabled />;
}
```

### 与表格配合使用

分页组件常与表格组件一起使用，用于分页展示表格数据。

```jsx
import { useState } from 'react';
import { Pagination } from '@apron-design/react';

export default function TableWithPagination() {
  const [current, setCurrent] = useState(1);
  const pageSize = 5;
  const totalData = 23;

  const data = Array.from({ length: totalData }, (_, i) => ({
    id: i + 1,
    name: `项目 ${i + 1}`,
    status: ['进行中', '已完成', '待审核'][i % 3],
  }));

  const currentData = data.slice((current - 1) * pageSize, current * pageSize);

  return (
    <div style={{ width: '500px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>ID</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>名称</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>状态</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>{item.id}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>{item.name}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination
          count={totalData}
          pageSize={pageSize}
          current={current}
          onChange={(page) => setCurrent(page)}
        />
      </div>
    </div>
  );
}
```

### 深色模式

在深色模式下，分页器会自动适配主题颜色。

```jsx
import { Pagination } from '@apron-design/react';

export default function DarkModePagination() {
  return (
    <div
      data-theme="dark"
      style={{
        padding: '24px',
        backgroundColor: '#18181b',
        borderRadius: '12px',
      }}
    >
      <Pagination count={200} pageSize={10} defaultCurrent={5} />
    </div>
  );
}
```

## API

### Pagination Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| count | 数据总数 | number | - |
| pageSize | 每页条数 | number | `10` |
| current | 当前页码（受控模式） | number | - |
| defaultCurrent | 默认当前页码（非受控模式） | number | `1` |
| onChange | 页码改变时的回调 | `(page: number) => void` | - |
| size | 尺寸 | `'large'` \| `'default'` \| `'small'` | `'default'` |
| disabled | 是否禁用 | boolean | `false` |
| className | 自定义类名 | string | - |

## 注意事项

1. 当数据总量小于等于每页条数时，不会显示分页器
2. 分页器会根据当前页码自动折叠中间的页码，保持最多显示7个页码按钮
3. 在受控模式下，需要同时提供 `current` 和 `onChange` 属性
4. 在非受控模式下，可以通过 `defaultCurrent` 设置初始页码
5. 分页器支持键盘操作，可以通过 Tab 键聚焦，Enter 或空格键选择页码