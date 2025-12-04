import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Empty } from './Empty';

describe('Empty', () => {
  // ============================================
  // Basic Rendering
  // ============================================
  it('renders correctly', () => {
    render(<Empty data-testid="empty" />);
    expect(screen.getByTestId('empty')).toBeInTheDocument();
  });

  it('has apron-empty class', () => {
    render(<Empty data-testid="empty" />);
    expect(screen.getByTestId('empty')).toHaveClass('apron-empty');
  });

  // ============================================
  // Default Content
  // ============================================
  it('renders default text when no children', () => {
    render(<Empty />);
    expect(screen.getByText('暂无数据')).toBeInTheDocument();
  });

  it('renders default icon when no icon prop', () => {
    const { container } = render(<Empty />);
    expect(container.querySelector('.apron-empty__icon svg')).toBeInTheDocument();
  });

  // ============================================
  // Custom Content
  // ============================================
  it('renders custom text from children', () => {
    render(<Empty>自定义空状态文字</Empty>);
    expect(screen.getByText('自定义空状态文字')).toBeInTheDocument();
  });

  it('renders custom icon', () => {
    render(<Empty icon={<span data-testid="custom-icon">图标</span>} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders both custom icon and text', () => {
    render(
      <Empty icon={<span data-testid="custom-icon">图标</span>}>
        自定义文字
      </Empty>
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    expect(screen.getByText('自定义文字')).toBeInTheDocument();
  });

  // ============================================
  // Complex Children
  // ============================================
  it('renders complex children content', () => {
    render(
      <Empty>
        <div>
          <span data-testid="text">没有数据</span>
          <button data-testid="button">创建</button>
        </div>
      </Empty>
    );
    expect(screen.getByTestId('text')).toBeInTheDocument();
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  // ============================================
  // Structure
  // ============================================
  it('has icon container', () => {
    const { container } = render(<Empty />);
    expect(container.querySelector('.apron-empty__icon')).toBeInTheDocument();
  });

  it('has text container', () => {
    const { container } = render(<Empty />);
    expect(container.querySelector('.apron-empty__text')).toBeInTheDocument();
  });

  // ============================================
  // Custom Props
  // ============================================
  it('applies custom className', () => {
    render(<Empty className="custom-class" data-testid="empty" />);
    expect(screen.getByTestId('empty')).toHaveClass('custom-class');
  });

  it('applies custom style', () => {
    render(<Empty style={{ minHeight: '300px' }} data-testid="empty" />);
    expect(screen.getByTestId('empty')).toHaveStyle('min-height: 300px');
  });

  it('passes additional props to the element', () => {
    render(<Empty data-testid="empty" aria-label="Empty state" />);
    expect(screen.getByTestId('empty')).toHaveAttribute('aria-label', 'Empty state');
  });
});

