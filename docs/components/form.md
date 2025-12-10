---
title: Form 表单
group: 数据录入
order: 1
---

# Form 表单

高性能、易扩展的表单解决方案，支持数据录入、校验和提交功能。

## 何时使用

- 需要进行数据录入和校验的场景
- 构建登录、注册、设置等表单页面
- 需要复杂表单交互和状态管理的应用

## 示例

### 基础表单

最简单的表单使用方式，包含基本的字段和提交功能。

```jsx
import { Form, FormItem, Input, Button } from '@apron-design/react';

export default () => (
  <div style={{ width: '400px' }}>
    <Form
      onFinish={(values) => {
        console.log('Form submitted:', values);
        alert('表单提交成功！\n' + JSON.stringify(values, null, 2));
      }}
      onFinishFailed={(errors) => {
        console.log('Form errors:', errors);
      }}
    >
      <FormItem name="username" label="用户名" required>
        <Input placeholder="请输入用户名" />
      </FormItem>
      <FormItem name="email" label="邮箱" rules={[{ type: 'email', message: '请输入有效的邮箱' }]}>
        <Input placeholder="请输入邮箱" />
      </FormItem>
      <FormItem name="password" label="密码" required rules={[{ min: 6, message: '密码至少6位' }]}>
        <Input type="password" placeholder="请输入密码" />
      </FormItem>
      <FormItem>
        <Button type="submit" variant="primary">提交</Button>
      </FormItem>
    </Form>
  </div>
);
```

### 表单布局

支持三种不同的表单布局：垂直（默认）、水平和内联。

```jsx
import { Form, FormItem, Input, Select, Button } from '@apron-design/react';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    {/* 垂直布局（默认） */}
    <div style={{ width: '400px' }}>
      <h4>Vertical Layout (Default)</h4>
      <Form layout="vertical">
        <FormItem name="name" label="姓名">
          <Input placeholder="请输入姓名" />
        </FormItem>
        <FormItem name="phone" label="电话">
          <Input placeholder="请输入电话" />
        </FormItem>
      </Form>
    </div>

    {/* 水平布局 */}
    <div style={{ width: '500px' }}>
      <h4>Horizontal Layout</h4>
      <Form layout="horizontal" labelWidth={80} labelAlign="right">
        <FormItem name="name" label="姓名">
          <Input placeholder="请输入姓名" />
        </FormItem>
        <FormItem name="phone" label="电话">
          <Input placeholder="请输入电话" />
        </FormItem>
        <FormItem name="address" label="地址">
          <Input placeholder="请输入地址" />
        </FormItem>
      </Form>
    </div>

    {/* 内联布局 */}
    <div style={{ width: '600px' }}>
      <h4>Inline Layout</h4>
      <Form layout="inline">
        <FormItem name="keyword" label="关键词">
          <Input placeholder="搜索..." />
        </FormItem>
        <FormItem name="category" label="分类">
          <Select
            options={[
              { label: '全部', value: 'all' },
              { label: '文章', value: 'article' },
              { label: '产品', value: 'product' },
            ]}
            placeholder="选择分类"
          />
        </FormItem>
        <FormItem>
          <Button variant="primary">搜索</Button>
        </FormItem>
      </Form>
    </div>
  </div>
);
```

### 浮动标签

使用浮动标签模式，节省空间并提升用户体验。

```jsx
import { Form, FormItem, Input, Button } from '@apron-design/react';

export default () => (
  <div style={{ width: '400px' }}>
    <h4>Floating Label Mode</h4>
    <Form floatingLabel>
      <FormItem name="username" label="用户名" required>
        <Input />
      </FormItem>
      <FormItem name="email" label="邮箱">
        <Input />
      </FormItem>
      <FormItem name="password" label="密码" required>
        <Input type="password" />
      </FormItem>
      <FormItem>
        <Button type="submit" variant="primary" style={{ width: '100%' }}>登录</Button>
      </FormItem>
    </Form>
  </div>
);
```

### 表单验证

支持多种验证规则，包括必填、长度、正则表达式、邮箱、URL等。

```jsx
import { Form, FormItem, Input, Checkbox, Button } from '@apron-design/react';

export default () => (
  <div style={{ width: '400px' }}>
    <h4>Form Validation</h4>
    <Form
      onFinish={(values) => {
        alert('验证通过！\n' + JSON.stringify(values, null, 2));
      }}
      onFinishFailed={(errors) => {
        console.log('验证失败:', errors);
      }}
    >
      <FormItem
        name="username"
        label="用户名"
        required
        rules={[
          { min: 3, message: '用户名至少3个字符' },
          { max: 20, message: '用户名最多20个字符' },
        ]}
      >
        <Input placeholder="3-20个字符" />
      </FormItem>
      <FormItem
        name="email"
        label="邮箱"
        required
        rules={[{ type: 'email', message: '请输入有效的邮箱地址' }]}
      >
        <Input placeholder="example@email.com" />
      </FormItem>
      <FormItem
        name="password"
        label="密码"
        required
        rules={[
          { min: 8, message: '密码至少8个字符' },
          { pattern: /[A-Z]/, message: '密码需包含大写字母' },
          { pattern: /[0-9]/, message: '密码需包含数字' },
        ]}
        help="密码至少8位，需包含大写字母和数字"
      >
        <Input type="password" placeholder="输入密码" />
      </FormItem>
      <FormItem
        name="website"
        label="个人网站"
        rules={[{ type: 'url', message: '请输入有效的URL' }]}
      >
        <Input placeholder="https://example.com" />
      </FormItem>
      <FormItem name="agree" required rules={[{ required: true, message: '请同意服务条款' }]}>
        <Checkbox>我同意服务条款</Checkbox>
      </FormItem>
      <FormItem>
        <Button type="submit" variant="primary">注册</Button>
      </FormItem>
    </Form>
  </div>
);
```

### 使用 useForm Hook

通过 useForm Hook 获取表单实例，实现更复杂的表单操作。

```jsx
import { useState } from 'react';
import { Form, FormItem, Input, Button, useForm } from '@apron-design/react';

export default () => {
  const [form] = useForm();

  const handleFill = () => {
    form.setFieldsValue({
      name: '张三',
      email: 'zhangsan@example.com',
      age: '25',
    });
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleValidate = async () => {
    try {
      const values = await form.validateFields();
      alert('验证通过！\n' + JSON.stringify(values, null, 2));
    } catch (errors) {
      console.log('验证失败:', errors);
    }
  };

  return (
    <div style={{ width: '400px' }}>
      <h4>Using useForm Hook</h4>
      <Form form={form}>
        <FormItem name="name" label="姓名" required>
          <Input placeholder="请输入姓名" />
        </FormItem>
        <FormItem name="email" label="邮箱" rules={[{ type: 'email' }]}>
          <Input placeholder="请输入邮箱" />
        </FormItem>
        <FormItem name="age" label="年龄">
          <Input placeholder="请输入年龄" />
        </FormItem>
        <FormItem>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button onClick={handleFill}>填充数据</Button>
            <Button onClick={handleReset}>重置</Button>
            <Button variant="primary" onClick={handleValidate}>验证</Button>
          </div>
        </FormItem>
      </Form>
    </div>
  );
};
```

### 初始值

为表单设置初始值，并监听值的变化。

```jsx
import { Form, FormItem, Input, Select } from '@apron-design/react';

export default () => (
  <div style={{ width: '400px' }}>
    <h4>With Initial Values</h4>
    <Form
      initialValues={{
        username: 'admin',
        email: 'admin@example.com',
        role: 'admin',
      }}
      onValuesChange={(changed, all) => {
        console.log('Changed:', changed, 'All:', all);
      }}
    >
      <FormItem name="username" label="用户名">
        <Input />
      </FormItem>
      <FormItem name="email" label="邮箱">
        <Input />
      </FormItem>
      <FormItem name="role" label="角色">
        <Select
          options={[
            { label: '管理员', value: 'admin' },
            { label: '用户', value: 'user' },
            { label: '访客', value: 'guest' },
          ]}
        />
      </FormItem>
    </Form>
  </div>
);
```

## API

### Form

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| form | 表单实例 | `FormInstance` | - |
| initialValues | 初始值 | `Partial<T>` | - |
| layout | 表单布局 | `'horizontal' \| 'vertical' \| 'inline'` | `'vertical'` |
| floatingLabel | 是否使用浮动标签 | `boolean` | `false` |
| labelWidth | 标签宽度（horizontal 布局时有效） | `number \| string` | - |
| labelAlign | 标签对齐方式 | `'left' \| 'right'` | `'right'` |
| disabled | 是否禁用整个表单 | `boolean` | `false` |
| onFinish | 表单提交回调 | `(values: T) => void` | - |
| onFinishFailed | 表单提交失败回调 | `(errors: Record<string, string>) => void` | - |
| onValuesChange | 字段值改变回调 | `(changedValues: Partial<T>, allValues: T) => void` | - |
| children | 子元素 | `ReactNode` | - |

### FormItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 字段名 | `string` | - |
| label | 标签文本 | `ReactNode` | - |
| required | 是否必填（显示红色星号） | `boolean` | `false` |
| rules | 验证规则 | `ValidationRule[]` | `[]` |
| floatingLabel | 是否使用浮动标签（覆盖 Form 级别设置） | `boolean` | - |
| help | 帮助文本 | `ReactNode` | - |
| extra | 额外提示 | `ReactNode` | - |
| noLabel | 是否隐藏标签 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| children | 子元素 | `ReactNode` | - |
| labelWidth | 标签宽度（覆盖 Form 级别设置） | `number \| string` | - |
| valuePropName | 值属性名 | `string` | `'value'` |
| trigger | 触发方式 | `string` | `'onChange'` |
| validateTrigger | 值收集触发方式 | `string \| string[]` | `'onBlur'` |

### useForm

获取表单实例的 Hook。

```typescript
const [form] = useForm();
```

### FormInstance

| 方法 | 说明 | 类型 |
| --- | --- | --- |
| getFieldValue | 获取字段值 | `(name: keyof T) => unknown` |
| getFieldsValue | 获取所有字段值 | `() => T` |
| setFieldValue | 设置字段值 | `(name: keyof T, value: unknown) => void` |
| setFieldsValue | 设置多个字段值 | `(values: Partial<T>) => void` |
| resetFields | 重置字段 | `() => void` |
| validateFields | 验证所有字段 | `() => Promise<T>` |
| validateField | 验证单个字段 | `(name: keyof T) => Promise<unknown>` |
| getFieldError | 获取字段错误 | `(name: keyof T) => string \| undefined` |
| getFieldsError | 获取所有字段错误 | `() => Record<keyof T, string \| undefined>` |
| isFieldTouched | 字段是否被触摸过 | `(name: keyof T) => boolean` |
| isFieldValidating | 字段是否正在验证 | `(name: keyof T) => boolean` |
| submit | 提交表单 | `() => void` |

### ValidationRule

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| required | 是否必填 | `boolean` |
| message | 错误信息 | `string` |
| min | 最小长度 | `number` |
| max | 最大长度 | `number` |
| pattern | 正则表达式 | `RegExp` |
| validator | 自定义验证器 | `(value: unknown) => Promise<void> \| void` |
| type | 类型验证 | `'string' \| 'number' \| 'email' \| 'url'` |