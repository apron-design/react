import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  it('renders correctly', () => {
    const { container } = render(<DatePicker />);
    expect(container.querySelector('.apron-datepicker')).toBeInTheDocument();
  });

  it('renders placeholder when no value', () => {
    render(<DatePicker />);
    expect(screen.getByText('---- / -- / --')).toBeInTheDocument();
  });

  it('renders selected year', () => {
    render(<DatePicker defaultValue={{ year: 2024 }} />);
    expect(screen.getByText('2024 / -- / --')).toBeInTheDocument();
  });

  it('renders selected year and month', () => {
    render(<DatePicker defaultValue={{ year: 2024, month: 5 }} />);
    expect(screen.getByText('2024 / 05 / --')).toBeInTheDocument();
  });

  it('renders full date', () => {
    render(<DatePicker defaultValue={{ year: 2024, month: 3, day: 15 }} />);
    expect(screen.getByText('2024 / 03 / 15')).toBeInTheDocument();
  });

  it('opens dropdown on click', () => {
    const { container } = render(<DatePicker />);
    const trigger = container.querySelector('.apron-datepicker__trigger');
    fireEvent.click(trigger!);
    expect(container.querySelector('.apron-datepicker--open')).toBeInTheDocument();
    expect(container.querySelector('.apron-datepicker__dropdown')).toBeInTheDocument();
  });

  it('shows year options by default when dropdown opens', () => {
    const { container } = render(<DatePicker yearStart={2022} yearEnd={2025} />);
    const trigger = container.querySelector('.apron-datepicker__trigger');
    fireEvent.click(trigger!);

    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
  });

  it('shows tab buttons', () => {
    const { container } = render(<DatePicker />);
    const trigger = container.querySelector('.apron-datepicker__trigger');
    fireEvent.click(trigger!);

    expect(screen.getByText('年')).toBeInTheDocument();
    expect(screen.getByText('月')).toBeInTheDocument();
    expect(screen.getByText('日')).toBeInTheDocument();
  });

  it('switches to month view when month tab is clicked', () => {
    const { container } = render(<DatePicker />);
    const trigger = container.querySelector('.apron-datepicker__trigger');
    fireEvent.click(trigger!);

    fireEvent.click(screen.getByText('月'));

    expect(screen.getByText('一月')).toBeInTheDocument();
    expect(screen.getByText('十二月')).toBeInTheDocument();
  });

  it('calls onChange when year is selected', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <DatePicker onChange={handleChange} yearStart={2022} yearEnd={2025} />
    );

    const trigger = container.querySelector('.apron-datepicker__trigger');
    fireEvent.click(trigger!);
    fireEvent.click(screen.getByText('2024'));

    expect(handleChange).toHaveBeenCalledWith({ year: 2024 });
  });

  it('switches to month view after selecting year', () => {
    const { container } = render(<DatePicker yearStart={2022} yearEnd={2025} />);

    const trigger = container.querySelector('.apron-datepicker__trigger');
    fireEvent.click(trigger!);
    fireEvent.click(screen.getByText('2024'));

    // Should now show month options
    expect(screen.getByText('一月')).toBeInTheDocument();
  });

  it('closes dropdown after selecting day', () => {
    const { container } = render(
      <DatePicker defaultValue={{ year: 2024, month: 3 }} />
    );

    const trigger = container.querySelector('.apron-datepicker__trigger');
    fireEvent.click(trigger!);
    
    // Switch to day tab
    fireEvent.click(screen.getByText('日'));
    fireEvent.click(screen.getByText('15'));

    expect(container.querySelector('.apron-datepicker--open')).not.toBeInTheDocument();
  });

  it('does not open dropdown when disabled', () => {
    const { container } = render(<DatePicker disabled />);

    const trigger = container.querySelector('.apron-datepicker__trigger');
    fireEvent.click(trigger!);

    expect(container.querySelector('.apron-datepicker--open')).not.toBeInTheDocument();
  });

  it('applies disabled class when disabled', () => {
    const { container } = render(<DatePicker disabled />);
    expect(container.querySelector('.apron-datepicker--disabled')).toBeInTheDocument();
  });

  it('does not open dropdown when loading', () => {
    const { container } = render(<DatePicker loading />);

    const trigger = container.querySelector('.apron-datepicker__trigger');
    fireEvent.click(trigger!);

    expect(container.querySelector('.apron-datepicker--open')).not.toBeInTheDocument();
  });

  it('applies loading class when loading', () => {
    const { container } = render(<DatePicker loading />);
    expect(container.querySelector('.apron-datepicker--loading')).toBeInTheDocument();
  });

  it('shows loading icon when loading', () => {
    const { container } = render(<DatePicker loading />);
    expect(container.querySelector('.apron-datepicker__loading-icon')).toBeInTheDocument();
  });

  it('applies inflow class when inflow is true', () => {
    const { container } = render(<DatePicker inflow />);
    expect(container.querySelector('.apron-datepicker--inflow')).toBeInTheDocument();
  });

  it('applies active class when has value', () => {
    const { container } = render(
      <DatePicker defaultValue={{ year: 2024 }} />
    );
    expect(container.querySelector('.apron-datepicker--active')).toBeInTheDocument();
  });

  it('supports controlled mode', () => {
    const { rerender } = render(
      <DatePicker value={{ year: 2024, month: 3 }} onChange={() => {}} />
    );
    expect(screen.getByText('2024 / 03 / --')).toBeInTheDocument();

    rerender(
      <DatePicker value={{ year: 2024, month: 5, day: 10 }} onChange={() => {}} />
    );
    expect(screen.getByText('2024 / 05 / 10')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DatePicker className="custom-datepicker" />
    );
    expect(container.querySelector('.apron-datepicker')).toHaveClass('custom-datepicker');
  });

  it('calls onOpenChange when dropdown state changes', () => {
    const handleOpenChange = vi.fn();
    const { container } = render(
      <DatePicker onOpenChange={handleOpenChange} />
    );

    const trigger = container.querySelector('.apron-datepicker__trigger');
    fireEvent.click(trigger!);
    expect(handleOpenChange).toHaveBeenCalledWith(true);

    fireEvent.click(trigger!);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('uses custom month labels', () => {
    const { container } = render(
      <DatePicker
        monthLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
      />
    );

    const trigger = container.querySelector('.apron-datepicker__trigger');
    fireEvent.click(trigger!);
    fireEvent.click(screen.getByText('月'));

    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getByText('Dec')).toBeInTheDocument();
  });

  it('uses custom tab labels', () => {
    const { container } = render(
      <DatePicker yearLabel="Year" monthLabel="Month" dayLabel="Day" />
    );

    const trigger = container.querySelector('.apron-datepicker__trigger');
    fireEvent.click(trigger!);

    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
  });

  it('disables month options when year is not selected', () => {
    const handleChange = vi.fn();
    const { container } = render(<DatePicker onChange={handleChange} />);

    const trigger = container.querySelector('.apron-datepicker__trigger');
    fireEvent.click(trigger!);
    fireEvent.click(screen.getByText('月'));

    const monthOption = screen.getByText('一月');
    expect(monthOption.closest('.apron-datepicker__option')).toHaveClass('apron-datepicker__option--disabled');

    fireEvent.click(monthOption);
    expect(handleChange).not.toHaveBeenCalled();
  });
});

