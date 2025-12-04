import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Space } from './Space';

describe('Space', () => {
  it('renders correctly', () => {
    render(<Space data-testid="space">Content</Space>);
    expect(screen.getByTestId('space')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <Space>
        <span>Item 1</span>
        <span>Item 2</span>
      </Space>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  // ============================================
  // Orientation
  // ============================================
  it('applies horizontal orientation by default', () => {
    render(<Space data-testid="space">Content</Space>);
    expect(screen.getByTestId('space')).toHaveClass('apron-space--horizontal');
  });

  it('applies vertical orientation when specified', () => {
    render(<Space orientation="vertical" data-testid="space">Content</Space>);
    expect(screen.getByTestId('space')).toHaveClass('apron-space--vertical');
  });

  // ============================================
  // Align
  // ============================================
  it('applies start alignment class', () => {
    render(<Space align="start" data-testid="space">Content</Space>);
    expect(screen.getByTestId('space')).toHaveClass('apron-space--align-start');
  });

  it('applies end alignment class', () => {
    render(<Space align="end" data-testid="space">Content</Space>);
    expect(screen.getByTestId('space')).toHaveClass('apron-space--align-end');
  });

  it('applies center alignment class', () => {
    render(<Space align="center" data-testid="space">Content</Space>);
    expect(screen.getByTestId('space')).toHaveClass('apron-space--align-center');
  });

  it('applies baseline alignment class', () => {
    render(<Space align="baseline" data-testid="space">Content</Space>);
    expect(screen.getByTestId('space')).toHaveClass('apron-space--align-baseline');
  });

  it('does not apply alignment class when not specified', () => {
    render(<Space data-testid="space">Content</Space>);
    const space = screen.getByTestId('space');
    expect(space).not.toHaveClass('apron-space--align-start');
    expect(space).not.toHaveClass('apron-space--align-end');
    expect(space).not.toHaveClass('apron-space--align-center');
    expect(space).not.toHaveClass('apron-space--align-baseline');
  });

  // ============================================
  // Size
  // ============================================
  it('applies small size as CSS variable', () => {
    render(<Space size="small" data-testid="space">Content</Space>);
    expect(screen.getByTestId('space')).toHaveStyle('--apron-space-gap: 8px');
  });

  it('applies middle size as CSS variable', () => {
    render(<Space size="middle" data-testid="space">Content</Space>);
    expect(screen.getByTestId('space')).toHaveStyle('--apron-space-gap: 16px');
  });

  it('applies large size as CSS variable', () => {
    render(<Space size="large" data-testid="space">Content</Space>);
    expect(screen.getByTestId('space')).toHaveStyle('--apron-space-gap: 24px');
  });

  it('applies custom numeric size as CSS variable', () => {
    render(<Space size={32} data-testid="space">Content</Space>);
    expect(screen.getByTestId('space')).toHaveStyle('--apron-space-gap: 32px');
  });

  it('applies middle size by default', () => {
    render(<Space data-testid="space">Content</Space>);
    expect(screen.getByTestId('space')).toHaveStyle('--apron-space-gap: 16px');
  });

  // ============================================
  // Wrap
  // ============================================
  it('applies wrap class when wrap is true and orientation is horizontal', () => {
    render(<Space wrap orientation="horizontal" data-testid="space">Content</Space>);
    expect(screen.getByTestId('space')).toHaveClass('apron-space--wrap');
  });

  it('does not apply wrap class when wrap is true but orientation is vertical', () => {
    render(<Space wrap orientation="vertical" data-testid="space">Content</Space>);
    expect(screen.getByTestId('space')).not.toHaveClass('apron-space--wrap');
  });

  it('does not apply wrap class when wrap is false', () => {
    render(<Space wrap={false} data-testid="space">Content</Space>);
    expect(screen.getByTestId('space')).not.toHaveClass('apron-space--wrap');
  });

  // ============================================
  // Custom props
  // ============================================
  it('applies custom className', () => {
    render(<Space className="custom-class" data-testid="space">Content</Space>);
    expect(screen.getByTestId('space')).toHaveClass('custom-class');
  });

  it('applies custom style', () => {
    render(<Space style={{ backgroundColor: 'red' }} data-testid="space">Content</Space>);
    expect(screen.getByTestId('space')).toHaveStyle('background-color: red');
  });

  it('passes additional props to the element', () => {
    render(<Space data-testid="custom-space" aria-label="Space container">Content</Space>);
    expect(screen.getByTestId('custom-space')).toHaveAttribute('aria-label', 'Space container');
  });

  // ============================================
  // Combined props
  // ============================================
  it('combines multiple props correctly', () => {
    render(
      <Space
        orientation="vertical"
        align="center"
        size="large"
        className="custom"
        data-testid="space"
      >
        Content
      </Space>
    );
    const space = screen.getByTestId('space');
    expect(space).toHaveClass('apron-space');
    expect(space).toHaveClass('apron-space--vertical');
    expect(space).toHaveClass('apron-space--align-center');
    expect(space).toHaveClass('custom');
    expect(space).toHaveStyle('--apron-space-gap: 24px');
  });
});

