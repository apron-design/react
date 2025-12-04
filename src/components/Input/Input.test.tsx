import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';
import { Textarea } from './Textarea';

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies active class when focused', () => {
    const { container } = render(<Input />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    expect(container.querySelector('.apron-input')).toHaveClass('apron-input--active');
  });

  it('applies active class when has value', () => {
    const { container } = render(<Input defaultValue="test" />);
    expect(container.querySelector('.apron-input')).toHaveClass('apron-input--active');
  });

  it('applies disabled class when disabled', () => {
    const { container } = render(<Input disabled />);
    expect(container.querySelector('.apron-input')).toHaveClass('apron-input--disabled');
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('shows clear button when clearable and has value', () => {
    const { container } = render(<Input clearable defaultValue="test" />);
    expect(container.querySelector('.apron-input__clear-btn')).toBeInTheDocument();
  });

  it('does not show clear button when clearable but empty', () => {
    const { container } = render(<Input clearable />);
    expect(container.querySelector('.apron-input__clear-btn')).not.toBeInTheDocument();
  });

  it('clears value when clear button is clicked', () => {
    const handleClear = vi.fn();
    const { container } = render(<Input clearable defaultValue="test" onClear={handleClear} />);
    const clearBtn = container.querySelector('.apron-input__clear-btn');
    fireEvent.click(clearBtn!);
    expect(handleClear).toHaveBeenCalled();
  });

  it('toggles password visibility', () => {
    const { container } = render(<Input type="password" defaultValue="secret" />);
    const input = screen.getByDisplayValue('secret');
    expect(input).toHaveAttribute('type', 'password');
    
    const toggleBtn = container.querySelector('.apron-input__icon-btn');
    fireEvent.click(toggleBtn!);
    expect(input).toHaveAttribute('type', 'text');
    
    fireEvent.click(toggleBtn!);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('renders prepend as string', () => {
    render(<Input prepend="$" />);
    expect(screen.getByText('$')).toBeInTheDocument();
  });

  it('renders prepend as ReactNode', () => {
    render(<Input prepend={<span data-testid="icon">Icon</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders append as string', () => {
    render(<Input append="USD" />);
    expect(screen.getByText('USD')).toBeInTheDocument();
  });

  it('renders append as ReactNode', () => {
    render(<Input append={<span data-testid="suffix">Suffix</span>} />);
    expect(screen.getByTestId('suffix')).toBeInTheDocument();
  });

  it('applies has-prepend class when prepend is provided', () => {
    const { container } = render(<Input prepend="$" />);
    expect(container.querySelector('.apron-input')).toHaveClass('apron-input--has-prepend');
  });

  it('applies has-append class when append is provided', () => {
    const { container } = render(<Input append="USD" />);
    expect(container.querySelector('.apron-input')).toHaveClass('apron-input--has-append');
  });

  it('supports controlled value', () => {
    const { rerender } = render(<Input value="initial" onChange={() => {}} />);
    expect(screen.getByDisplayValue('initial')).toBeInTheDocument();
    
    rerender(<Input value="updated" onChange={() => {}} />);
    expect(screen.getByDisplayValue('updated')).toBeInTheDocument();
  });
});

describe('Textarea', () => {
  it('renders correctly', () => {
    render(<Textarea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders with default 3 rows', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '3');
  });

  it('renders with custom rows', () => {
    render(<Textarea rows={5} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5');
  });

  it('handles value changes', () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies active class when focused', () => {
    const { container } = render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    fireEvent.focus(textarea);
    expect(container.querySelector('.apron-textarea')).toHaveClass('apron-textarea--active');
  });

  it('applies active class when has value', () => {
    const { container } = render(<Textarea defaultValue="test" />);
    expect(container.querySelector('.apron-textarea')).toHaveClass('apron-textarea--active');
  });

  it('applies disabled class when disabled', () => {
    const { container } = render(<Textarea disabled />);
    expect(container.querySelector('.apron-textarea')).toHaveClass('apron-textarea--disabled');
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('shows clear button when clearable and has value', () => {
    const { container } = render(<Textarea clearable defaultValue="test" />);
    expect(container.querySelector('.apron-textarea__clear-btn')).toBeInTheDocument();
  });

  it('clears value when clear button is clicked', () => {
    const handleClear = vi.fn();
    const { container } = render(<Textarea clearable defaultValue="test" onClear={handleClear} />);
    const clearBtn = container.querySelector('.apron-textarea__clear-btn');
    fireEvent.click(clearBtn!);
    expect(handleClear).toHaveBeenCalled();
  });

  it('supports controlled value', () => {
    const { rerender } = render(<Textarea value="initial" onChange={() => {}} />);
    expect(screen.getByDisplayValue('initial')).toBeInTheDocument();
    
    rerender(<Textarea value="updated" onChange={() => {}} />);
    expect(screen.getByDisplayValue('updated')).toBeInTheDocument();
  });

  it('shows character count when max is set', () => {
    render(<Textarea max={200} defaultValue="Hello" />);
    expect(screen.getByText('5/200')).toBeInTheDocument();
  });

  it('updates character count on input', () => {
    render(<Textarea max={100} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'test input' } });
    expect(screen.getByText('10/100')).toBeInTheDocument();
  });

  it('sets maxLength attribute when max is provided', () => {
    render(<Textarea max={50} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '50');
  });
});

