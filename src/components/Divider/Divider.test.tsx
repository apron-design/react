import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders correctly without children', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('renders with children text', () => {
    render(<Divider>分割文字</Divider>);
    expect(screen.getByText('分割文字')).toBeInTheDocument();
  });

  it('applies dashed class when dashed prop is true', () => {
    render(<Divider dashed />);
    expect(screen.getByRole('separator')).toHaveClass('apron-divider--dashed');
  });

  it('does not apply dashed class when dashed prop is false', () => {
    render(<Divider dashed={false} />);
    expect(screen.getByRole('separator')).not.toHaveClass('apron-divider--dashed');
  });

  it('applies with-text class when children is provided', () => {
    render(<Divider>文字</Divider>);
    expect(screen.getByRole('separator')).toHaveClass('apron-divider--with-text');
  });

  it('does not apply with-text class when no children', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).not.toHaveClass('apron-divider--with-text');
  });

  it('applies left alignment class by default when children is provided', () => {
    render(<Divider>文字</Divider>);
    expect(screen.getByRole('separator')).toHaveClass('apron-divider--left');
  });

  it('applies center alignment class when align is center', () => {
    render(<Divider align="center">文字</Divider>);
    expect(screen.getByRole('separator')).toHaveClass('apron-divider--center');
  });

  it('applies right alignment class when align is right', () => {
    render(<Divider align="right">文字</Divider>);
    expect(screen.getByRole('separator')).toHaveClass('apron-divider--right');
  });

  it('does not apply alignment class when no children', () => {
    render(<Divider align="center" />);
    const divider = screen.getByRole('separator');
    expect(divider).not.toHaveClass('apron-divider--left');
    expect(divider).not.toHaveClass('apron-divider--center');
    expect(divider).not.toHaveClass('apron-divider--right');
  });

  it('combines dashed and alignment classes', () => {
    render(<Divider dashed align="center">文字</Divider>);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('apron-divider--dashed');
    expect(divider).toHaveClass('apron-divider--center');
  });

  it('renders three line elements when children is provided', () => {
    const { container } = render(<Divider>文字</Divider>);
    const lines = container.querySelectorAll('.apron-divider__line');
    expect(lines).toHaveLength(2);
    expect(container.querySelector('.apron-divider__line--left')).toBeInTheDocument();
    expect(container.querySelector('.apron-divider__line--right')).toBeInTheDocument();
  });

  it('renders single line element when no children', () => {
    const { container } = render(<Divider />);
    const lines = container.querySelectorAll('.apron-divider__line');
    expect(lines).toHaveLength(1);
  });

  it('applies custom className', () => {
    render(<Divider className="custom-class" />);
    expect(screen.getByRole('separator')).toHaveClass('custom-class');
  });

  it('passes additional props to the element', () => {
    render(<Divider data-testid="custom-divider" />);
    expect(screen.getByTestId('custom-divider')).toBeInTheDocument();
  });

  it('has role="separator"', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('renders text in text element', () => {
    const { container } = render(<Divider>测试文字</Divider>);
    const textElement = container.querySelector('.apron-divider__text');
    expect(textElement).toHaveTextContent('测试文字');
  });
});

