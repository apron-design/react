import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Link } from './Link';

describe('Link', () => {
  it('renders correctly', () => {
    render(<Link href="#">测试链接</Link>);
    expect(screen.getByText('测试链接')).toBeInTheDocument();
  });

  it('renders as an anchor element', () => {
    render(<Link href="#">测试链接</Link>);
    const link = screen.getByText('测试链接');
    expect(link.tagName).toBe('A');
  });

  it('applies href attribute correctly', () => {
    render(<Link href="https://example.com">测试链接</Link>);
    const link = screen.getByText('测试链接');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  // Variant tests
  it('applies secondary variant class by default', () => {
    render(<Link href="#">默认链接</Link>);
    const link = screen.getByText('默认链接');
    expect(link).toHaveClass('apron-link--secondary');
  });

  it('applies primary variant class when variant is primary', () => {
    render(
      <Link href="#" variant="primary">
        Primary 链接
      </Link>
    );
    const link = screen.getByText('Primary 链接');
    expect(link).toHaveClass('apron-link--primary');
  });

  it('applies secondary variant class when variant is secondary', () => {
    render(
      <Link href="#" variant="secondary">
        Secondary 链接
      </Link>
    );
    const link = screen.getByText('Secondary 链接');
    expect(link).toHaveClass('apron-link--secondary');
  });

  // Underline tests
  it('applies underline-never class by default', () => {
    render(<Link href="#">默认链接</Link>);
    const link = screen.getByText('默认链接');
    expect(link).toHaveClass('apron-link--underline-never');
  });

  it('applies underline-always class when underline is always', () => {
    render(
      <Link href="#" underline="always">
        Always 链接
      </Link>
    );
    const link = screen.getByText('Always 链接');
    expect(link).toHaveClass('apron-link--underline-always');
  });

  it('applies underline-hover class when underline is hover', () => {
    render(
      <Link href="#" underline="hover">
        Hover 链接
      </Link>
    );
    const link = screen.getByText('Hover 链接');
    expect(link).toHaveClass('apron-link--underline-hover');
  });

  it('applies underline-never class when underline is never', () => {
    render(
      <Link href="#" underline="never">
        Never 链接
      </Link>
    );
    const link = screen.getByText('Never 链接');
    expect(link).toHaveClass('apron-link--underline-never');
  });

  // Danger tests
  it('applies danger class when danger prop is true', () => {
    render(
      <Link href="#" danger>
        危险链接
      </Link>
    );
    const link = screen.getByText('危险链接');
    expect(link).toHaveClass('apron-link--danger');
  });

  it('does not apply danger class when danger prop is false', () => {
    render(<Link href="#">普通链接</Link>);
    const link = screen.getByText('普通链接');
    expect(link).not.toHaveClass('apron-link--danger');
  });

  // Additional attributes tests
  it('passes through additional attributes', () => {
    render(
      <Link href="#" target="_blank" rel="noopener noreferrer">
        新窗口链接
      </Link>
    );
    const link = screen.getByText('新窗口链接');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('applies custom className', () => {
    render(
      <Link href="#" className="custom-class">
        自定义类名
      </Link>
    );
    const link = screen.getByText('自定义类名');
    expect(link).toHaveClass('apron-link', 'custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLAnchorElement>;
    render(
      <Link href="#" ref={ref}>
        Ref 测试
      </Link>
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  // Combined props tests
  it('combines variant, underline, and danger correctly', () => {
    render(
      <Link href="#" variant="primary" underline="always" danger>
        组合测试
      </Link>
    );
    const link = screen.getByText('组合测试');
    expect(link).toHaveClass('apron-link--primary');
    expect(link).toHaveClass('apron-link--underline-always');
    expect(link).toHaveClass('apron-link--danger');
  });
});
