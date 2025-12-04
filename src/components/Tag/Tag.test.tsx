import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tag } from './Tag';

describe('Tag', () => {
  // ============================================
  // Basic Rendering
  // ============================================
  it('renders correctly', () => {
    render(<Tag>标签</Tag>);
    expect(screen.getByText('标签')).toBeInTheDocument();
  });

  it('applies default class', () => {
    const { container } = render(<Tag>标签</Tag>);
    expect(container.firstChild).toHaveClass('apron-tag');
    expect(container.firstChild).toHaveClass('apron-tag--default');
  });

  // ============================================
  // Variants
  // ============================================
  it('applies primary variant class', () => {
    const { container } = render(<Tag variant="primary">标签</Tag>);
    expect(container.firstChild).toHaveClass('apron-tag--primary');
  });

  it('applies default variant class', () => {
    const { container } = render(<Tag variant="default">标签</Tag>);
    expect(container.firstChild).toHaveClass('apron-tag--default');
  });

  // ============================================
  // Closable
  // ============================================
  it('renders close button when closable', () => {
    render(<Tag closable>标签</Tag>);
    expect(screen.getByRole('button', { name: '关闭' })).toBeInTheDocument();
  });

  it('does not render close button when not closable', () => {
    render(<Tag>标签</Tag>);
    expect(screen.queryByRole('button', { name: '关闭' })).not.toBeInTheDocument();
  });

  it('applies closable class', () => {
    const { container } = render(<Tag closable>标签</Tag>);
    expect(container.firstChild).toHaveClass('apron-tag--closable');
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(
      <Tag closable onClose={onClose}>
        标签
      </Tag>
    );
    fireEvent.click(screen.getByRole('button', { name: '关闭' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('stops propagation when close button clicked', () => {
    const onClick = vi.fn();
    const onClose = vi.fn();
    render(
      <div onClick={onClick}>
        <Tag closable onClose={onClose}>
          标签
        </Tag>
      </div>
    );
    fireEvent.click(screen.getByRole('button', { name: '关闭' }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  // ============================================
  // Custom Props
  // ============================================
  it('applies custom className', () => {
    const { container } = render(<Tag className="custom-tag">标签</Tag>);
    expect(container.firstChild).toHaveClass('custom-tag');
    expect(container.firstChild).toHaveClass('apron-tag');
  });

  it('passes additional props', () => {
    render(<Tag data-testid="test-tag">标签</Tag>);
    expect(screen.getByTestId('test-tag')).toBeInTheDocument();
  });

  // ============================================
  // Children
  // ============================================
  it('renders string children', () => {
    render(<Tag>Hello World</Tag>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders complex children', () => {
    render(
      <Tag>
        <span data-testid="icon">🏷️</span>
        标签
      </Tag>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('标签')).toBeInTheDocument();
  });

  // ============================================
  // Accessibility
  // ============================================
  it('close button has aria-label', () => {
    render(<Tag closable>标签</Tag>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', '关闭');
  });

  // ============================================
  // Ref Forwarding
  // ============================================
  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLSpanElement>;
    render(<Tag ref={ref}>标签</Tag>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});

