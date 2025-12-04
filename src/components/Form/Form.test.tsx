import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Form } from './Form';
import { FormItem } from './FormItem';
import { useForm } from './useForm';

// Mock Input component
const MockInput = ({
  value,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  disabled,
  ...props
}: {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}) => (
  <input
    value={value || ''}
    onChange={onChange}
    onBlur={onBlur}
    onFocus={onFocus}
    placeholder={placeholder}
    disabled={disabled}
    {...props}
  />
);

describe('Form', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Form>
        <FormItem name="test" label="Test">
          <MockInput />
        </FormItem>
      </Form>
    );
    expect(container.querySelector('.apron-form')).toBeInTheDocument();
  });

  it('renders with vertical layout by default', () => {
    const { container } = render(
      <Form>
        <FormItem name="test" label="Test">
          <MockInput />
        </FormItem>
      </Form>
    );
    expect(container.querySelector('.apron-form--vertical')).toBeInTheDocument();
  });

  it('renders with horizontal layout', () => {
    const { container } = render(
      <Form layout="horizontal">
        <FormItem name="test" label="Test">
          <MockInput />
        </FormItem>
      </Form>
    );
    expect(container.querySelector('.apron-form--horizontal')).toBeInTheDocument();
  });

  it('renders with inline layout', () => {
    const { container } = render(
      <Form layout="inline">
        <FormItem name="test" label="Test">
          <MockInput />
        </FormItem>
      </Form>
    );
    expect(container.querySelector('.apron-form--inline')).toBeInTheDocument();
  });

  it('renders label correctly', () => {
    render(
      <Form>
        <FormItem name="test" label="Test Label">
          <MockInput />
        </FormItem>
      </Form>
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('shows required asterisk when required', () => {
    const { container } = render(
      <Form>
        <FormItem name="test" label="Test" required>
          <MockInput />
        </FormItem>
      </Form>
    );
    expect(container.querySelector('.apron-form-item__required')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleValuesChange = vi.fn();
    render(
      <Form onValuesChange={handleValuesChange}>
        <FormItem name="test" label="Test">
          <MockInput />
        </FormItem>
      </Form>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(handleValuesChange).toHaveBeenCalledWith(
      { test: 'test value' },
      expect.any(Object)
    );
  });

  it('validates required field on blur', async () => {
    const { container } = render(
      <Form>
        <FormItem name="test" label="Test" required>
          <MockInput />
        </FormItem>
      </Form>
    );

    const input = screen.getByRole('textbox');
    fireEvent.blur(input);

    await waitFor(() => {
      expect(container.querySelector('.apron-form-item__error')).toBeInTheDocument();
    });
  });

  it('calls onFinish with values on successful submit', async () => {
    const handleFinish = vi.fn();
    render(
      <Form onFinish={handleFinish}>
        <FormItem name="username" label="Username">
          <MockInput />
        </FormItem>
        <button type="submit">Submit</button>
      </Form>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(handleFinish).toHaveBeenCalledWith({ username: 'testuser' });
    });
  });

  it('calls onFinishFailed when validation fails', async () => {
    const handleFinishFailed = vi.fn();
    render(
      <Form onFinishFailed={handleFinishFailed}>
        <FormItem name="username" label="Username" required>
          <MockInput />
        </FormItem>
        <button type="submit">Submit</button>
      </Form>
    );

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(handleFinishFailed).toHaveBeenCalled();
    });
  });

  it('applies floating label class when floatingLabel is true', () => {
    const { container } = render(
      <Form floatingLabel>
        <FormItem name="test" label="Test">
          <MockInput />
        </FormItem>
      </Form>
    );
    expect(container.querySelector('.apron-form-item--floating-label')).toBeInTheDocument();
  });

  it('applies floating label to individual FormItem', () => {
    const { container } = render(
      <Form>
        <FormItem name="normal" label="Normal">
          <MockInput />
        </FormItem>
        <FormItem name="floating" label="Floating" floatingLabel>
          <MockInput />
        </FormItem>
      </Form>
    );

    const items = container.querySelectorAll('.apron-form-item');
    expect(items[0]).not.toHaveClass('apron-form-item--floating-label');
    expect(items[1]).toHaveClass('apron-form-item--floating-label');
  });

  it('applies disabled state to form', () => {
    const { container } = render(
      <Form disabled>
        <FormItem name="test" label="Test">
          <MockInput />
        </FormItem>
      </Form>
    );
    expect(container.querySelector('.apron-form--disabled')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('renders with initial values', () => {
    render(
      <Form initialValues={{ test: 'initial value' }}>
        <FormItem name="test" label="Test">
          <MockInput />
        </FormItem>
      </Form>
    );

    expect(screen.getByRole('textbox')).toHaveValue('initial value');
  });

  it('shows help text', () => {
    render(
      <Form>
        <FormItem name="test" label="Test" help="This is help text">
          <MockInput />
        </FormItem>
      </Form>
    );
    expect(screen.getByText('This is help text')).toBeInTheDocument();
  });

  it('shows extra text', () => {
    render(
      <Form>
        <FormItem name="test" label="Test" extra="Extra information">
          <MockInput />
        </FormItem>
      </Form>
    );
    expect(screen.getByText('Extra information')).toBeInTheDocument();
  });

  it('validates min length', async () => {
    const { container } = render(
      <Form>
        <FormItem name="test" label="Test" rules={[{ min: 5, message: 'Min 5 chars' }]}>
          <MockInput />
        </FormItem>
      </Form>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.getByText('Min 5 chars')).toBeInTheDocument();
    });
  });

  it('validates max length', async () => {
    const { container } = render(
      <Form>
        <FormItem name="test" label="Test" rules={[{ max: 5, message: 'Max 5 chars' }]}>
          <MockInput />
        </FormItem>
      </Form>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'abcdefgh' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.getByText('Max 5 chars')).toBeInTheDocument();
    });
  });

  it('validates email type', async () => {
    render(
      <Form>
        <FormItem name="email" label="Email" rules={[{ type: 'email', message: 'Invalid email' }]}>
          <MockInput />
        </FormItem>
      </Form>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });
  });

  it('validates pattern', async () => {
    render(
      <Form>
        <FormItem name="test" label="Test" rules={[{ pattern: /^\d+$/, message: 'Numbers only' }]}>
          <MockInput />
        </FormItem>
      </Form>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.getByText('Numbers only')).toBeInTheDocument();
    });
  });
});

describe('useForm', () => {
  it('returns form instance', () => {
    let formInstance: ReturnType<typeof useForm>[0];

    const TestComponent = () => {
      const [form] = useForm();
      formInstance = form;
      return (
        <Form form={form}>
          <FormItem name="test" label="Test">
            <MockInput />
          </FormItem>
        </Form>
      );
    };

    render(<TestComponent />);

    expect(formInstance!).toBeDefined();
    expect(typeof formInstance!.getFieldValue).toBe('function');
    expect(typeof formInstance!.setFieldValue).toBe('function');
    expect(typeof formInstance!.resetFields).toBe('function');
    expect(typeof formInstance!.validateFields).toBe('function');
  });
});

