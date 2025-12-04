import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputOtp } from './InputOtp';

describe('InputOtp', () => {
  it('renders correctly with default format', () => {
    const { container } = render(<InputOtp />);
    // 默认 format 是 "******"，应该有 6 个 slot
    const slots = container.querySelectorAll('.apron-input-otp__slot');
    expect(slots.length).toBe(6);
  });

  it('renders with custom format', () => {
    const { container } = render(<InputOtp format="****" />);
    const slots = container.querySelectorAll('.apron-input-otp__slot');
    expect(slots.length).toBe(4);
  });

  it('renders separators in format', () => {
    const { container } = render(<InputOtp format="***-***" />);
    const slots = container.querySelectorAll('.apron-input-otp__slot');
    const separators = container.querySelectorAll('.apron-input-otp__separator');
    expect(slots.length).toBe(6);
    expect(separators.length).toBe(1);
    expect(separators[0].textContent).toBe('-');
  });

  it('handles value input', () => {
    const handleChange = vi.fn();
    const { container } = render(<InputOtp format="****" onChange={handleChange} />);
    const hiddenInput = container.querySelector('.apron-input-otp__hidden-input');
    
    fireEvent.change(hiddenInput!, { target: { value: '1234' } });
    expect(handleChange).toHaveBeenCalledWith('1234');
  });

  it('filters non-numeric input when type is number', () => {
    const handleChange = vi.fn();
    const { container } = render(<InputOtp format="****" type="number" onChange={handleChange} />);
    const hiddenInput = container.querySelector('.apron-input-otp__hidden-input');
    
    fireEvent.change(hiddenInput!, { target: { value: '12ab34' } });
    expect(handleChange).toHaveBeenCalledWith('1234');
  });

  it('allows text input when type is text', () => {
    const handleChange = vi.fn();
    const { container } = render(<InputOtp format="****" type="text" onChange={handleChange} />);
    const hiddenInput = container.querySelector('.apron-input-otp__hidden-input');
    
    fireEvent.change(hiddenInput!, { target: { value: 'abcd' } });
    expect(handleChange).toHaveBeenCalledWith('abcd');
  });

  it('limits input to format length', () => {
    const handleChange = vi.fn();
    const { container } = render(<InputOtp format="****" onChange={handleChange} />);
    const hiddenInput = container.querySelector('.apron-input-otp__hidden-input');
    
    fireEvent.change(hiddenInput!, { target: { value: '123456' } });
    expect(handleChange).toHaveBeenCalledWith('1234');
  });

  it('calls onComplete when all slots are filled', () => {
    const handleComplete = vi.fn();
    const { container } = render(<InputOtp format="****" onComplete={handleComplete} />);
    const hiddenInput = container.querySelector('.apron-input-otp__hidden-input');
    
    fireEvent.change(hiddenInput!, { target: { value: '1234' } });
    expect(handleComplete).toHaveBeenCalledWith('1234');
  });

  it('does not call onComplete when not all slots are filled', () => {
    const handleComplete = vi.fn();
    const { container } = render(<InputOtp format="****" onComplete={handleComplete} />);
    const hiddenInput = container.querySelector('.apron-input-otp__hidden-input');
    
    fireEvent.change(hiddenInput!, { target: { value: '123' } });
    expect(handleComplete).not.toHaveBeenCalled();
  });

  it('applies default size class', () => {
    const { container } = render(<InputOtp />);
    expect(container.querySelector('.apron-input-otp')).toHaveClass('apron-input-otp--default');
  });

  it('applies small size class', () => {
    const { container } = render(<InputOtp size="small" />);
    expect(container.querySelector('.apron-input-otp')).toHaveClass('apron-input-otp--small');
  });

  it('applies square class', () => {
    const { container } = render(<InputOtp square />);
    expect(container.querySelector('.apron-input-otp')).toHaveClass('apron-input-otp--square');
  });

  it('applies disabled class and disables input', () => {
    const { container } = render(<InputOtp disabled />);
    expect(container.querySelector('.apron-input-otp')).toHaveClass('apron-input-otp--disabled');
    expect(container.querySelector('.apron-input-otp__hidden-input')).toBeDisabled();
  });

  it('focuses input when container is clicked', () => {
    const { container } = render(<InputOtp />);
    const otpContainer = container.querySelector('.apron-input-otp');
    const hiddenInput = container.querySelector('.apron-input-otp__hidden-input');
    
    fireEvent.click(otpContainer!);
    expect(document.activeElement).toBe(hiddenInput);
  });

  it('does not focus when disabled and clicked', () => {
    const { container } = render(<InputOtp disabled />);
    const otpContainer = container.querySelector('.apron-input-otp');
    const hiddenInput = container.querySelector('.apron-input-otp__hidden-input');
    
    fireEvent.click(otpContainer!);
    expect(document.activeElement).not.toBe(hiddenInput);
  });

  it('applies focused class when input is focused', () => {
    const { container } = render(<InputOtp />);
    const hiddenInput = container.querySelector('.apron-input-otp__hidden-input');
    
    fireEvent.focus(hiddenInput!);
    expect(container.querySelector('.apron-input-otp')).toHaveClass('apron-input-otp--focused');
  });

  it('supports controlled value', () => {
    const { container, rerender } = render(<InputOtp format="****" value="12" />);
    let slots = container.querySelectorAll('.apron-input-otp__slot');
    expect(slots[0].textContent).toContain('1');
    expect(slots[1].textContent).toContain('2');

    rerender(<InputOtp format="****" value="1234" />);
    slots = container.querySelectorAll('.apron-input-otp__slot');
    expect(slots[2].textContent).toContain('3');
    expect(slots[3].textContent).toContain('4');
  });

  it('displays filled slots correctly', () => {
    const { container } = render(<InputOtp format="****" defaultValue="12" />);
    const slots = container.querySelectorAll('.apron-input-otp__slot');
    
    expect(slots[0]).toHaveClass('apron-input-otp__slot--filled');
    expect(slots[1]).toHaveClass('apron-input-otp__slot--filled');
    expect(slots[2]).not.toHaveClass('apron-input-otp__slot--filled');
    expect(slots[3]).not.toHaveClass('apron-input-otp__slot--filled');
  });

  it('calls onFinish when all slots are filled', () => {
    const handleFinish = vi.fn();
    const { container } = render(<InputOtp format="****" onFinish={handleFinish} />);
    const hiddenInput = container.querySelector('.apron-input-otp__hidden-input');
    
    fireEvent.change(hiddenInput!, { target: { value: '1234' } });
    expect(handleFinish).toHaveBeenCalledWith('1234');
  });

  it('applies success status class', () => {
    const { container } = render(<InputOtp status="success" defaultValue="1234" />);
    expect(container.querySelector('.apron-input-otp')).toHaveClass('apron-input-otp--success');
  });

  it('applies error status class', () => {
    const { container } = render(<InputOtp status="error" defaultValue="1234" />);
    expect(container.querySelector('.apron-input-otp')).toHaveClass('apron-input-otp--error');
  });

  it('clears all content and calls onStatusReset on backspace in error state', () => {
    const handleChange = vi.fn();
    const handleStatusReset = vi.fn();
    const { container } = render(
      <InputOtp 
        format="****" 
        status="error" 
        defaultValue="1234" 
        onChange={handleChange}
        onStatusReset={handleStatusReset}
      />
    );
    const hiddenInput = container.querySelector('.apron-input-otp__hidden-input');
    
    fireEvent.keyDown(hiddenInput!, { key: 'Backspace' });
    
    expect(handleChange).toHaveBeenCalledWith('');
    expect(handleStatusReset).toHaveBeenCalled();
  });

  it('does not clear all on backspace when not in error state', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <InputOtp format="****" defaultValue="1234" onChange={handleChange} />
    );
    const hiddenInput = container.querySelector('.apron-input-otp__hidden-input');
    
    fireEvent.keyDown(hiddenInput!, { key: 'Backspace' });
    
    // onChange should not be called with empty string by keyDown handler
    expect(handleChange).not.toHaveBeenCalledWith('');
  });
});

