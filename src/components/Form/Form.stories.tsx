import type { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form';
import { FormItem } from './FormItem';
import { useForm } from './useForm';
import { Input } from '../Input';
import { Select } from '../Select';
import { Checkbox } from '../Checkbox';
import { Button } from '../Button';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal', 'inline'],
      description: '表单布局',
    },
    floatingLabel: {
      control: 'boolean',
      description: '是否使用浮动标签',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

// Default story
export const Default: Story = {
  render: () => (
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
  ),
};

// ============================================
// Layouts
// ============================================
export const VerticalLayout: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 16px 0', color: '#393939' }}>Vertical Layout (Default)</h4>
      <Form layout="vertical">
        <FormItem name="name" label="姓名">
          <Input placeholder="请输入姓名" />
        </FormItem>
        <FormItem name="phone" label="电话">
          <Input placeholder="请输入电话" />
        </FormItem>
      </Form>
    </div>
  ),
};

export const HorizontalLayout: Story = {
  render: () => (
    <div style={{ width: '500px' }}>
      <h4 style={{ margin: '0 0 16px 0', color: '#393939' }}>Horizontal Layout</h4>
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
  ),
};

export const InlineLayout: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <h4 style={{ margin: '0 0 16px 0', color: '#393939' }}>Inline Layout</h4>
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
  ),
};

// ============================================
// Floating Label
// ============================================
export const FloatingLabel: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 16px 0', color: '#393939' }}>Floating Label Mode</h4>
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
  ),
};

export const MixedLabelMode: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 16px 0', color: '#393939' }}>Mixed Label Mode</h4>
      <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
        表单默认不使用浮动标签，但个别字段可以单独设置
      </p>
      <Form>
        <FormItem name="normalField" label="普通字段">
          <Input placeholder="普通标签模式" />
        </FormItem>
        <FormItem name="floatingField" label="浮动标签字段" floatingLabel>
          <Input />
        </FormItem>
        <FormItem name="anotherNormal" label="另一个普通字段">
          <Input placeholder="普通标签模式" />
        </FormItem>
      </Form>
    </div>
  ),
};

// ============================================
// Validation
// ============================================
export const Validation: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 16px 0', color: '#393939' }}>Form Validation</h4>
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
  ),
};

// ============================================
// With useForm Hook
// ============================================
export const WithUseForm: Story = {
  render: () => {
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
        <h4 style={{ margin: '0 0 16px 0', color: '#393939' }}>Using useForm Hook</h4>
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
  },
};

// ============================================
// With Initial Values
// ============================================
export const WithInitialValues: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 16px 0', color: '#393939' }}>With Initial Values</h4>
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
  ),
};

// ============================================
// Disabled Form
// ============================================
export const DisabledForm: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h4 style={{ margin: '0 0 16px 0', color: '#393939' }}>Disabled Form</h4>
      <Form
        disabled
        initialValues={{
          username: 'readonly_user',
          email: 'readonly@example.com',
        }}
      >
        <FormItem name="username" label="用户名">
          <Input />
        </FormItem>
        <FormItem name="email" label="邮箱">
          <Input />
        </FormItem>
        <FormItem>
          <Button variant="primary">提交（禁用）</Button>
        </FormItem>
      </Form>
    </div>
  ),
};

// ============================================
// Complex Form
// ============================================
export const ComplexForm: Story = {
  render: () => (
    <div style={{ width: '500px' }}>
      <h4 style={{ margin: '0 0 16px 0', color: '#393939' }}>Complete Registration Form</h4>
      <Form
        layout="vertical"
        onFinish={(values) => {
          console.log('Submit:', values);
          alert('注册成功！');
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <FormItem name="firstName" label="名" required>
            <Input placeholder="名" />
          </FormItem>
          <FormItem name="lastName" label="姓" required>
            <Input placeholder="姓" />
          </FormItem>
        </div>
        <FormItem name="email" label="邮箱" required rules={[{ type: 'email' }]}>
          <Input placeholder="your@email.com" />
        </FormItem>
        <FormItem name="phone" label="电话" help="用于接收验证码">
          <Input placeholder="138xxxxxxxx" />
        </FormItem>
        <FormItem
          name="password"
          label="密码"
          required
          rules={[{ min: 8, message: '密码至少8位' }]}
        >
          <Input type="password" placeholder="至少8位字符" />
        </FormItem>
        <FormItem name="country" label="国家/地区">
          <Select
            options={[
              { label: '中国', value: 'cn' },
              { label: '美国', value: 'us' },
              { label: '日本', value: 'jp' },
              { label: '韩国', value: 'kr' },
            ]}
            placeholder="选择国家"
          />
        </FormItem>
        <FormItem
          name="terms"
          rules={[{ required: true, message: '请阅读并同意条款' }]}
        >
          <Checkbox labelClickable>
            我已阅读并同意<a href="#" style={{ color: '#4C9EEA' }}>服务条款</a>和<a href="#" style={{ color: '#4C9EEA' }}>隐私政策</a>
          </Checkbox>
        </FormItem>
        <FormItem>
          <Button type="submit" variant="primary" style={{ width: '100%' }}>
            创建账号
          </Button>
        </FormItem>
      </Form>
    </div>
  ),
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
        width: '400px',
      }}
    >
      <h4 style={{ margin: '0 0 16px 0', color: '#a1a1aa' }}>Dark Mode Form</h4>
      <Form floatingLabel>
        <FormItem name="username" label="用户名" required>
          <Input />
        </FormItem>
        <FormItem name="password" label="密码" required>
          <Input type="password" />
        </FormItem>
        <FormItem>
          <Button type="submit" variant="primary" style={{ width: '100%' }}>
            登录
          </Button>
        </FormItem>
      </Form>
    </div>
  ),
};

