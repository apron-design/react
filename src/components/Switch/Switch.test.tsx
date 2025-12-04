import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders correctly', () => {
    const { container } = render(<Switch />);
    expect(container.querySelector('.apron-switch')).toBeInTheDocument();
  });

  it('renders switch input with role', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('handles checked state correctly', () => {
    render(<Switch checked onChange={() => {}} />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('handles unchecked state correctly', () => {
    render(<Switch checked={false} onChange={() => {}} />);
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('calls onChange when clicked', () => {
    const handleChange = vi.fn();
    render(<Switch onChange={handleChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(<Switch disabled onChange={handleChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies disabled class when disabled', () => {
    const { container } = render(<Switch disabled />);
    expect(container.querySelector('.apron-switch')).toHaveClass('apron-switch--disabled');
  });

  it('applies checked class when checked', () => {
    const { container } = render(<Switch checked onChange={() => {}} />);
    expect(container.querySelector('.apron-switch')).toHaveClass('apron-switch--checked');
  });

  it('applies default size class by default', () => {
    const { container } = render(<Switch />);
    expect(container.querySelector('.apron-switch')).toHaveClass('apron-switch--default');
  });

  it('applies small size class', () => {
    const { container } = render(<Switch size="small" />);
    expect(container.querySelector('.apron-switch')).toHaveClass('apron-switch--small');
  });

  it('applies mini size class', () => {
    const { container } = render(<Switch size="mini" />);
    expect(container.querySelector('.apron-switch')).toHaveClass('apron-switch--mini');
  });

  it('applies default variant class by default', () => {
    const { container } = render(<Switch />);
    expect(container.querySelector('.apron-switch')).toHaveClass('apron-switch--default');
  });

  it('applies primary variant class', () => {
    const { container } = render(<Switch variant="primary" />);
    expect(container.querySelector('.apron-switch')).toHaveClass('apron-switch--primary');
  });

  it('applies secondary variant class', () => {
    const { container } = render(<Switch variant="secondary" />);
    expect(container.querySelector('.apron-switch')).toHaveClass('apron-switch--secondary');
  });

  it('renders with custom className', () => {
    const { container } = render(<Switch className="custom-class" />);
    expect(container.querySelector('.apron-switch')).toHaveClass('custom-class');
  });

  it('supports defaultChecked for uncontrolled mode', () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('supports controlled mode', () => {
    const { rerender } = render(<Switch checked={false} onChange={() => {}} />);
    expect(screen.getByRole('switch')).not.toBeChecked();

    rerender(<Switch checked={true} onChange={() => {}} />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('updates value in uncontrolled mode', () => {
    const handleChange = vi.fn();
    render(<Switch defaultChecked={false} onChange={handleChange} />);
    
    fireEvent.click(screen.getByRole('switch'));
    
    expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('has correct aria-checked attribute', () => {
    const { rerender } = render(<Switch checked={false} onChange={() => {}} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

    rerender(<Switch checked={true} onChange={() => {}} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('renders track and thumb elements', () => {
    const { container } = render(<Switch />);
    expect(container.querySelector('.apron-switch__track')).toBeInTheDocument();
    expect(container.querySelector('.apron-switch__thumb')).toBeInTheDocument();
  });

  it('applies custom checked color via style', () => {
    const { container } = render(<Switch checked checkedColor="#ff0000" onChange={() => {}} />);
    const label = container.querySelector('.apron-switch');
    expect(label).toHaveStyle({ '--apron-switch-checked-bg': '#ff0000' });
  });

  it('applies custom unchecked color via style', () => {
    const { container } = render(<Switch uncheckedColor="#00ff00" />);
    const label = container.querySelector('.apron-switch');
    expect(label).toHaveStyle({ '--apron-switch-unchecked-bg': '#00ff00' });
  });
});

