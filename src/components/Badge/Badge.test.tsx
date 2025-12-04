import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  // ============================================
  // Basic Rendering
  // ============================================
  it('renders correctly', () => {
    render(<Badge data-testid="badge">Content</Badge>);
    expect(screen.getByTestId('badge')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Badge>Child Content</Badge>);
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('renders without badge when no props provided', () => {
    const { container } = render(<Badge data-testid="badge">Content</Badge>);
    expect(container.querySelector('.apron-badge__dot')).not.toBeInTheDocument();
    expect(container.querySelector('.apron-badge__count')).not.toBeInTheDocument();
    expect(container.querySelector('.apron-badge__content')).not.toBeInTheDocument();
  });

  // ============================================
  // Dot
  // ============================================
  it('renders dot when dot prop is true', () => {
    const { container } = render(<Badge dot>Content</Badge>);
    expect(container.querySelector('.apron-badge__dot')).toBeInTheDocument();
  });

  it('does not render dot when dot prop is false', () => {
    const { container } = render(<Badge dot={false}>Content</Badge>);
    expect(container.querySelector('.apron-badge__dot')).not.toBeInTheDocument();
  });

  it('dot takes priority over count', () => {
    const { container } = render(<Badge dot count={5}>Content</Badge>);
    expect(container.querySelector('.apron-badge__dot')).toBeInTheDocument();
    expect(container.querySelector('.apron-badge__count')).not.toBeInTheDocument();
  });

  it('dot takes priority over content', () => {
    const { container } = render(<Badge dot content="New">Content</Badge>);
    expect(container.querySelector('.apron-badge__dot')).toBeInTheDocument();
    expect(container.querySelector('.apron-badge__content')).not.toBeInTheDocument();
  });

  // ============================================
  // Count
  // ============================================
  it('renders count when count prop is provided', () => {
    const { container } = render(<Badge count={5}>Content</Badge>);
    expect(container.querySelector('.apron-badge__count')).toBeInTheDocument();
    expect(container.querySelector('.apron-badge__count')).toHaveTextContent('5');
  });

  it('does not render count when count is 0', () => {
    const { container } = render(<Badge count={0}>Content</Badge>);
    expect(container.querySelector('.apron-badge__count')).not.toBeInTheDocument();
  });

  it('does not render count when count is negative', () => {
    const { container } = render(<Badge count={-1}>Content</Badge>);
    expect(container.querySelector('.apron-badge__count')).not.toBeInTheDocument();
  });

  it('renders single digit count without multi class', () => {
    const { container } = render(<Badge count={5}>Content</Badge>);
    expect(container.querySelector('.apron-badge__count')).not.toHaveClass('apron-badge__count--multi');
  });

  it('renders multi digit count with multi class', () => {
    const { container } = render(<Badge count={25}>Content</Badge>);
    expect(container.querySelector('.apron-badge__count')).toHaveClass('apron-badge__count--multi');
  });

  it('renders overflow count with default overflowCount', () => {
    const { container } = render(<Badge count={100}>Content</Badge>);
    expect(container.querySelector('.apron-badge__count')).toHaveTextContent('99+');
  });

  it('renders overflow count with custom overflowCount', () => {
    const { container } = render(<Badge count={1000} overflowCount={999}>Content</Badge>);
    expect(container.querySelector('.apron-badge__count')).toHaveTextContent('999+');
  });

  it('renders exact count when equal to overflowCount', () => {
    const { container } = render(<Badge count={99} overflowCount={99}>Content</Badge>);
    expect(container.querySelector('.apron-badge__count')).toHaveTextContent('99');
  });

  it('count takes priority over content', () => {
    const { container } = render(<Badge count={5} content="New">Content</Badge>);
    expect(container.querySelector('.apron-badge__count')).toBeInTheDocument();
    expect(container.querySelector('.apron-badge__content')).not.toBeInTheDocument();
  });

  // ============================================
  // Content
  // ============================================
  it('renders content when content prop is provided', () => {
    const { container } = render(<Badge content="New">Content</Badge>);
    expect(container.querySelector('.apron-badge__content')).toBeInTheDocument();
    expect(container.querySelector('.apron-badge__content')).toHaveTextContent('New');
  });

  it('renders empty content', () => {
    const { container } = render(<Badge content="">Content</Badge>);
    expect(container.querySelector('.apron-badge__content')).toBeInTheDocument();
  });

  // ============================================
  // Custom Props
  // ============================================
  it('applies custom className', () => {
    render(<Badge className="custom-class" data-testid="badge">Content</Badge>);
    expect(screen.getByTestId('badge')).toHaveClass('custom-class');
  });

  it('applies custom style', () => {
    render(
      <Badge style={{ backgroundColor: 'red' }} data-testid="badge">
        Content
      </Badge>
    );
    expect(screen.getByTestId('badge')).toHaveStyle('background-color: red');
  });

  it('passes additional props to the element', () => {
    render(<Badge data-testid="badge" aria-label="Badge">Content</Badge>);
    expect(screen.getByTestId('badge')).toHaveAttribute('aria-label', 'Badge');
  });
});

