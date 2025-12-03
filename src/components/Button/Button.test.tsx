import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="primary">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('apron-button--primary');

    rerender(<Button variant="secondary">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('apron-button--secondary');

    rerender(<Button variant="default">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('apron-button--default');

    rerender(<Button variant="text">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('apron-button--text');

    rerender(<Button variant="link">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('apron-button--link');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Button size="sm">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('apron-button--sm');

    rerender(<Button size="md">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('apron-button--md');
  });

  it('applies dashed class when dashed prop is true', () => {
    render(<Button dashed>Dashed Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('apron-button--dashed');
  });

  it('applies danger class when danger prop is true', () => {
    render(<Button danger>Danger Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('apron-button--danger');
  });

  it('applies both dashed and danger classes', () => {
    render(<Button dashed danger>Dashed Danger</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('apron-button--dashed');
    expect(button).toHaveClass('apron-button--danger');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when loading is true', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows spinner when loading', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button').querySelector('.apron-button__spinner')).toBeInTheDocument();
  });

  it('applies block class when block prop is true', () => {
    render(<Button block>Block Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('apron-button--block');
  });

  it('renders with left icon', () => {
    render(<Button iconLeft={<span data-testid="left-icon">←</span>}>With Icon</Button>);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders with right icon', () => {
    render(<Button iconRight={<span data-testid="right-icon">→</span>}>With Icon</Button>);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('hides icons when loading', () => {
    render(
      <Button
        loading
        iconLeft={<span data-testid="left-icon">←</span>}
        iconRight={<span data-testid="right-icon">→</span>}
      >
        Loading
      </Button>
    );
    expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
  });

  it('applies default variant when no variant is specified', () => {
    render(<Button>Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('apron-button--primary');
  });

  it('applies default size when no size is specified', () => {
    render(<Button>Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('apron-button--md');
  });
});
