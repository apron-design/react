import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant class correctly', () => {
    render(<Button variant="secondary">Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('apron-button--secondary');
  });

  it('applies size class correctly', () => {
    render(<Button size="lg">Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('apron-button--lg');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when loading', () => {
    render(<Button loading>Button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading spinner when loading', () => {
    render(<Button loading>Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('apron-button--loading');
  });

  it('applies block class when block prop is true', () => {
    render(<Button block>Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('apron-button--block');
  });

  it('renders left icon', () => {
    render(<Button iconLeft={<span data-testid="icon-left">←</span>}>Button</Button>);
    expect(screen.getByTestId('icon-left')).toBeInTheDocument();
  });

  it('renders right icon', () => {
    render(<Button iconRight={<span data-testid="icon-right">→</span>}>Button</Button>);
    expect(screen.getByTestId('icon-right')).toBeInTheDocument();
  });
});

