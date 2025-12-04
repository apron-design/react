import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Cascader } from './Cascader';
import type { CascaderOption } from './Cascader';

const defaultOptions: CascaderOption[] = [
  {
    label: 'Option 1',
    value: 'option1',
    children: [
      { label: 'Sub Option 1', value: 'sub1' },
      { label: 'Sub Option 2', value: 'sub2' },
    ],
  },
  {
    label: 'Option 2',
    value: 'option2',
  },
  {
    label: 'Option 3',
    value: 'option3',
    disabled: true,
  },
];

describe('Cascader', () => {
  it('renders correctly', () => {
    const { container } = render(<Cascader options={defaultOptions} />);
    expect(container.querySelector('.apron-cascader')).toBeInTheDocument();
  });

  it('renders placeholder when no value', () => {
    render(<Cascader options={defaultOptions} placeholder="Select an option" />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('renders selected value with separator', () => {
    render(<Cascader options={defaultOptions} defaultValue={['option1', 'sub1']} />);
    expect(screen.getByText('Option 1 / Sub Option 1')).toBeInTheDocument();
  });

  it('renders with custom separator', () => {
    render(
      <Cascader
        options={defaultOptions}
        defaultValue={['option1', 'sub1']}
        separator=" → "
      />
    );
    expect(screen.getByText('Option 1 → Sub Option 1')).toBeInTheDocument();
  });

  it('opens dropdown on click', () => {
    const { container } = render(<Cascader options={defaultOptions} />);
    const trigger = container.querySelector('.apron-cascader__trigger');
    fireEvent.click(trigger!);
    expect(container.querySelector('.apron-cascader--open')).toBeInTheDocument();
    expect(container.querySelector('.apron-cascader__dropdown')).toBeInTheDocument();
  });

  it('shows first level options when dropdown is open', () => {
    const { container } = render(<Cascader options={defaultOptions} />);
    const trigger = container.querySelector('.apron-cascader__trigger');
    fireEvent.click(trigger!);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('shows child options when parent is clicked', () => {
    const { container } = render(<Cascader options={defaultOptions} />);
    const trigger = container.querySelector('.apron-cascader__trigger');
    fireEvent.click(trigger!);

    fireEvent.click(screen.getByText('Option 1'));

    expect(screen.getByText('Sub Option 1')).toBeInTheDocument();
    expect(screen.getByText('Sub Option 2')).toBeInTheDocument();
  });

  it('calls onChange when leaf option is selected', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Cascader options={defaultOptions} onChange={handleChange} />
    );

    const trigger = container.querySelector('.apron-cascader__trigger');
    fireEvent.click(trigger!);
    fireEvent.click(screen.getByText('Option 1'));
    fireEvent.click(screen.getByText('Sub Option 1'));

    expect(handleChange).toHaveBeenCalledWith(
      ['option1', 'sub1'],
      expect.any(Array)
    );
  });

  it('closes dropdown after selecting leaf option', () => {
    const { container } = render(<Cascader options={defaultOptions} />);

    const trigger = container.querySelector('.apron-cascader__trigger');
    fireEvent.click(trigger!);
    fireEvent.click(screen.getByText('Option 2')); // leaf node

    expect(container.querySelector('.apron-cascader--open')).not.toBeInTheDocument();
  });

  it('does not open dropdown when disabled', () => {
    const { container } = render(<Cascader options={defaultOptions} disabled />);

    const trigger = container.querySelector('.apron-cascader__trigger');
    fireEvent.click(trigger!);

    expect(container.querySelector('.apron-cascader--open')).not.toBeInTheDocument();
  });

  it('applies disabled class when disabled', () => {
    const { container } = render(<Cascader options={defaultOptions} disabled />);
    expect(container.querySelector('.apron-cascader--disabled')).toBeInTheDocument();
  });

  it('does not open dropdown when loading', () => {
    const { container } = render(<Cascader options={defaultOptions} loading />);

    const trigger = container.querySelector('.apron-cascader__trigger');
    fireEvent.click(trigger!);

    expect(container.querySelector('.apron-cascader--open')).not.toBeInTheDocument();
  });

  it('applies loading class when loading', () => {
    const { container } = render(<Cascader options={defaultOptions} loading />);
    expect(container.querySelector('.apron-cascader--loading')).toBeInTheDocument();
  });

  it('shows loading icon when loading', () => {
    const { container } = render(<Cascader options={defaultOptions} loading />);
    expect(container.querySelector('.apron-cascader__loading-icon')).toBeInTheDocument();
  });

  it('does not select disabled option', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Cascader options={defaultOptions} onChange={handleChange} />
    );

    const trigger = container.querySelector('.apron-cascader__trigger');
    fireEvent.click(trigger!);

    fireEvent.click(screen.getByText('Option 3'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies inflow class when inflow is true', () => {
    const { container } = render(<Cascader options={defaultOptions} inflow />);
    expect(container.querySelector('.apron-cascader--inflow')).toBeInTheDocument();
  });

  it('applies active class when has value', () => {
    const { container } = render(
      <Cascader options={defaultOptions} defaultValue={['option1', 'sub1']} />
    );
    expect(container.querySelector('.apron-cascader--active')).toBeInTheDocument();
  });

  it('supports controlled mode', () => {
    const { rerender } = render(
      <Cascader options={defaultOptions} value={['option1', 'sub1']} onChange={() => {}} />
    );
    expect(screen.getByText('Option 1 / Sub Option 1')).toBeInTheDocument();

    rerender(
      <Cascader options={defaultOptions} value={['option1', 'sub2']} onChange={() => {}} />
    );
    expect(screen.getByText('Option 1 / Sub Option 2')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Cascader options={defaultOptions} className="custom-cascader" />
    );
    expect(container.querySelector('.apron-cascader')).toHaveClass('custom-cascader');
  });

  it('calls onOpenChange when dropdown state changes', () => {
    const handleOpenChange = vi.fn();
    const { container } = render(
      <Cascader options={defaultOptions} onOpenChange={handleOpenChange} />
    );

    const trigger = container.querySelector('.apron-cascader__trigger');
    fireEvent.click(trigger!);
    expect(handleOpenChange).toHaveBeenCalledWith(true);

    fireEvent.click(trigger!);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('triggers onChange during selection when changeOnSelect is true', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Cascader options={defaultOptions} onChange={handleChange} changeOnSelect />
    );

    const trigger = container.querySelector('.apron-cascader__trigger');
    fireEvent.click(trigger!);
    fireEvent.click(screen.getByText('Option 1'));

    // Should be called even though Option 1 has children
    expect(handleChange).toHaveBeenCalledWith(['option1'], expect.any(Array));
  });

  it('renders multiple columns for nested options', () => {
    const { container } = render(<Cascader options={defaultOptions} />);

    const trigger = container.querySelector('.apron-cascader__trigger');
    fireEvent.click(trigger!);
    fireEvent.click(screen.getByText('Option 1'));

    const columns = container.querySelectorAll('.apron-cascader__column');
    expect(columns.length).toBe(2);
  });
});

