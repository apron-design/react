import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';

const defaultOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

describe('Select', () => {
  it('renders correctly', () => {
    const { container } = render(<Select options={defaultOptions} />);
    expect(container.querySelector('.apron-select')).toBeInTheDocument();
  });

  it('renders placeholder when no value', () => {
    render(<Select options={defaultOptions} placeholder="Select an option" />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('renders selected value', () => {
    render(<Select options={defaultOptions} defaultValue="option1" />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('opens dropdown on click', () => {
    const { container } = render(<Select options={defaultOptions} />);
    const trigger = container.querySelector('.apron-select__trigger');
    fireEvent.click(trigger!);
    expect(container.querySelector('.apron-select--open')).toBeInTheDocument();
    expect(container.querySelector('.apron-select__dropdown')).toBeInTheDocument();
  });

  it('shows all options when dropdown is open', () => {
    const { container } = render(<Select options={defaultOptions} />);
    const trigger = container.querySelector('.apron-select__trigger');
    fireEvent.click(trigger!);
    
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('calls onChange when option is selected', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Select options={defaultOptions} onChange={handleChange} />
    );
    
    const trigger = container.querySelector('.apron-select__trigger');
    fireEvent.click(trigger!);
    
    fireEvent.click(screen.getByText('Option 2'));
    expect(handleChange).toHaveBeenCalledWith('option2', defaultOptions[1]);
  });

  it('closes dropdown after selection', () => {
    const { container } = render(<Select options={defaultOptions} />);
    
    const trigger = container.querySelector('.apron-select__trigger');
    fireEvent.click(trigger!);
    fireEvent.click(screen.getByText('Option 1'));
    
    expect(container.querySelector('.apron-select--open')).not.toBeInTheDocument();
  });

  it('does not open dropdown when disabled', () => {
    const { container } = render(<Select options={defaultOptions} disabled />);
    
    const trigger = container.querySelector('.apron-select__trigger');
    fireEvent.click(trigger!);
    
    expect(container.querySelector('.apron-select--open')).not.toBeInTheDocument();
  });

  it('applies disabled class when disabled', () => {
    const { container } = render(<Select options={defaultOptions} disabled />);
    expect(container.querySelector('.apron-select--disabled')).toBeInTheDocument();
  });

  it('does not open dropdown when loading', () => {
    const { container } = render(<Select options={defaultOptions} loading />);
    
    const trigger = container.querySelector('.apron-select__trigger');
    fireEvent.click(trigger!);
    
    expect(container.querySelector('.apron-select--open')).not.toBeInTheDocument();
  });

  it('applies loading class when loading', () => {
    const { container } = render(<Select options={defaultOptions} loading />);
    expect(container.querySelector('.apron-select--loading')).toBeInTheDocument();
  });

  it('shows loading icon when loading', () => {
    const { container } = render(<Select options={defaultOptions} loading />);
    expect(container.querySelector('.apron-select__loading-icon')).toBeInTheDocument();
  });

  it('does not select disabled option', () => {
    const handleChange = vi.fn();
    const optionsWithDisabled = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Disabled', value: 'disabled', disabled: true },
    ];
    
    const { container } = render(
      <Select options={optionsWithDisabled} onChange={handleChange} />
    );
    
    const trigger = container.querySelector('.apron-select__trigger');
    fireEvent.click(trigger!);
    
    fireEvent.click(screen.getByText('Disabled'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies inflow class when inflow is true', () => {
    const { container } = render(<Select options={defaultOptions} inflow />);
    expect(container.querySelector('.apron-select--inflow')).toBeInTheDocument();
  });

  it('applies active class when has value', () => {
    const { container } = render(
      <Select options={defaultOptions} defaultValue="option1" />
    );
    expect(container.querySelector('.apron-select--active')).toBeInTheDocument();
  });

  it('supports controlled mode', () => {
    const { rerender } = render(
      <Select options={defaultOptions} value="option1" onChange={() => {}} />
    );
    expect(screen.getByText('Option 1')).toBeInTheDocument();

    rerender(
      <Select options={defaultOptions} value="option2" onChange={() => {}} />
    );
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Select options={defaultOptions} className="custom-select" />
    );
    expect(container.querySelector('.apron-select')).toHaveClass('custom-select');
  });

  it('calls onOpenChange when dropdown state changes', () => {
    const handleOpenChange = vi.fn();
    const { container } = render(
      <Select options={defaultOptions} onOpenChange={handleOpenChange} />
    );
    
    const trigger = container.querySelector('.apron-select__trigger');
    fireEvent.click(trigger!);
    expect(handleOpenChange).toHaveBeenCalledWith(true);
    
    fireEvent.click(trigger!);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('highlights selected option in dropdown', () => {
    const { container } = render(
      <Select options={defaultOptions} defaultValue="option2" />
    );
    
    const trigger = container.querySelector('.apron-select__trigger');
    fireEvent.click(trigger!);
    
    const selectedOption = container.querySelector('.apron-select__option--selected');
    expect(selectedOption).toHaveTextContent('Option 2');
  });
});

