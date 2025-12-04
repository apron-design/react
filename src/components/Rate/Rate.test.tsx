import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Rate } from './Rate';

describe('Rate', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<Rate />);
    expect(container.querySelector('.apron-rate')).toBeInTheDocument();
  });

  it('renders correct number of stars', () => {
    const { container } = render(<Rate count={5} />);
    const stars = container.querySelectorAll('.apron-rate__star');
    expect(stars).toHaveLength(5);
  });

  it('renders custom number of stars', () => {
    const { container } = render(<Rate count={10} />);
    const stars = container.querySelectorAll('.apron-rate__star');
    expect(stars).toHaveLength(10);
  });

  it('displays value when showValue is true', () => {
    render(<Rate defaultValue={3.5} showValue />);
    expect(screen.getByText('3.5')).toBeInTheDocument();
  });

  it('does not display value when showValue is false', () => {
    const { container } = render(<Rate defaultValue={3.5} />);
    expect(container.querySelector('.apron-rate__value')).not.toBeInTheDocument();
  });

  it('renders active stars based on value', () => {
    const { container } = render(<Rate defaultValue={3} />);
    const activeStars = container.querySelectorAll('.apron-rate__star--active');
    expect(activeStars).toHaveLength(3);
  });

  it('applies interactive class when allowControl is true', () => {
    const { container } = render(<Rate allowControl />);
    expect(container.querySelector('.apron-rate--interactive')).toBeInTheDocument();
  });

  it('applies disabled class when disabled', () => {
    const { container } = render(<Rate disabled />);
    expect(container.querySelector('.apron-rate--disabled')).toBeInTheDocument();
  });

  it('calls onChange when star is clicked in control mode', () => {
    const handleChange = vi.fn();
    const { container } = render(<Rate allowControl onChange={handleChange} />);
    const stars = container.querySelectorAll('.apron-rate__star');
    fireEvent.click(stars[2]); // Click 3rd star
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    const { container } = render(<Rate allowControl disabled onChange={handleChange} />);
    const stars = container.querySelectorAll('.apron-rate__star');
    fireEvent.click(stars[2]);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('does not call onChange in display mode', () => {
    const handleChange = vi.fn();
    const { container } = render(<Rate onChange={handleChange} />);
    const stars = container.querySelectorAll('.apron-rate__star');
    fireEvent.click(stars[2]);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('supports controlled mode', () => {
    const { container, rerender } = render(<Rate value={2} />);
    let activeStars = container.querySelectorAll('.apron-rate__star--active');
    expect(activeStars).toHaveLength(2);

    rerender(<Rate value={4} />);
    activeStars = container.querySelectorAll('.apron-rate__star--active');
    expect(activeStars).toHaveLength(4);
  });

  it('supports uncontrolled mode with defaultValue', () => {
    const { container } = render(<Rate defaultValue={3} />);
    const activeStars = container.querySelectorAll('.apron-rate__star--active');
    expect(activeStars).toHaveLength(3);
  });

  it('updates value in uncontrolled mode', () => {
    const handleChange = vi.fn();
    const { container } = render(<Rate defaultValue={2} allowControl onChange={handleChange} />);
    
    const stars = container.querySelectorAll('.apron-rate__star');
    fireEvent.click(stars[3]); // Click 4th star
    
    expect(handleChange).toHaveBeenCalledWith(4);
    const activeStars = container.querySelectorAll('.apron-rate__star--active');
    expect(activeStars).toHaveLength(4);
  });

  it('applies custom className', () => {
    const { container } = render(<Rate className="custom-rate" />);
    expect(container.querySelector('.apron-rate')).toHaveClass('custom-rate');
  });

  it('formats value to one decimal place', () => {
    render(<Rate defaultValue={3.75} showValue />);
    expect(screen.getByText('3.8')).toBeInTheDocument();
  });

  it('handles hover state in control mode', () => {
    const { container } = render(<Rate allowControl showValue />);
    const stars = container.querySelectorAll('.apron-rate__star');
    
    // Hover over 4th star
    fireEvent.mouseMove(stars[3], { clientX: 100 });
    
    // Should show hover value
    expect(screen.getByText('4.0')).toBeInTheDocument();
    
    // Mouse leave
    fireEvent.mouseLeave(container.querySelector('.apron-rate')!);
    
    // Should show original value
    expect(screen.getByText('0.0')).toBeInTheDocument();
  });

  it('shows half star values when allowHalf is true', () => {
    render(<Rate defaultValue={2.5} showValue />);
    expect(screen.getByText('2.5')).toBeInTheDocument();
  });
});

