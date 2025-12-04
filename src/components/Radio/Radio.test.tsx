import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

describe('Radio', () => {
  it('renders correctly', () => {
    render(<Radio>Test Radio</Radio>);
    expect(screen.getByText('Test Radio')).toBeInTheDocument();
  });

  it('renders radio input', () => {
    render(<Radio>Test</Radio>);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('handles checked state correctly', () => {
    render(<Radio checked onChange={() => {}}>Checked</Radio>);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('handles unchecked state correctly', () => {
    render(<Radio checked={false} onChange={() => {}}>Unchecked</Radio>);
    expect(screen.getByRole('radio')).not.toBeChecked();
  });

  it('calls onChange when clicked', () => {
    const handleChange = vi.fn();
    render(<Radio onChange={handleChange}>Test</Radio>);
    fireEvent.click(screen.getByRole('radio'));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(<Radio disabled onChange={handleChange}>Test</Radio>);
    fireEvent.click(screen.getByRole('radio'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies disabled class when disabled', () => {
    render(<Radio disabled>Disabled</Radio>);
    const label = screen.getByText('Disabled').closest('label');
    expect(label).toHaveClass('apron-radio--disabled');
  });

  it('applies checked class when checked', () => {
    render(<Radio checked onChange={() => {}}>Checked</Radio>);
    const label = screen.getByText('Checked').closest('label');
    expect(label).toHaveClass('apron-radio--checked');
  });

  it('renders with custom className', () => {
    render(<Radio className="custom-class">Test</Radio>);
    const label = screen.getByText('Test').closest('label');
    expect(label).toHaveClass('custom-class');
  });

  it('renders without label', () => {
    const { container } = render(<Radio />);
    expect(container.querySelector('.apron-radio__label')).not.toBeInTheDocument();
  });

  it('supports defaultChecked for uncontrolled mode', () => {
    render(<Radio defaultChecked>Test</Radio>);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('passes value prop to input', () => {
    render(<Radio value="test-value">Test</Radio>);
    expect(screen.getByRole('radio')).toHaveAttribute('value', 'test-value');
  });

  it('passes name prop to input', () => {
    render(<Radio name="test-name">Test</Radio>);
    expect(screen.getByRole('radio')).toHaveAttribute('name', 'test-name');
  });

  it('does not toggle when clicking label with labelClickable=false (default)', () => {
    const handleChange = vi.fn();
    render(<Radio onChange={handleChange}>Test Label</Radio>);
    // 点击文字部分
    fireEvent.click(screen.getByText('Test Label'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('toggles when clicking label with labelClickable=true', () => {
    const handleChange = vi.fn();
    render(<Radio labelClickable onChange={handleChange}>Test Label</Radio>);
    // 点击文字部分
    fireEvent.click(screen.getByText('Test Label'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies label-not-clickable class when labelClickable=false', () => {
    render(<Radio>Test</Radio>);
    const label = screen.getByText('Test').closest('label');
    expect(label).toHaveClass('apron-radio--label-not-clickable');
  });

  it('does not apply label-not-clickable class when labelClickable=true', () => {
    render(<Radio labelClickable>Test</Radio>);
    const label = screen.getByText('Test').closest('label');
    expect(label).not.toHaveClass('apron-radio--label-not-clickable');
  });
});

describe('RadioGroup', () => {
  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
  ];

  it('renders all options', () => {
    render(<RadioGroup options={options} />);
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('Orange')).toBeInTheDocument();
  });

  it('renders with string/number options', () => {
    render(<RadioGroup options={['A', 'B', 'C']} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('handles controlled value', () => {
    render(<RadioGroup options={options} value="banana" />);
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();
    expect(radios[2]).not.toBeChecked();
  });

  it('handles defaultValue for uncontrolled mode', () => {
    render(<RadioGroup options={options} defaultValue="orange" />);
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).not.toBeChecked();
    expect(radios[2]).toBeChecked();
  });

  it('calls onChange when option is clicked', () => {
    const handleChange = vi.fn();
    render(<RadioGroup options={options} onChange={handleChange} />);
    fireEvent.click(screen.getByText('Apple'));
    expect(handleChange).toHaveBeenCalledWith('apple');
  });

  it('changes selection when another option is clicked', () => {
    const handleChange = vi.fn();
    render(<RadioGroup options={options} value="apple" onChange={handleChange} />);
    fireEvent.click(screen.getByText('Banana'));
    expect(handleChange).toHaveBeenCalledWith('banana');
  });

  it('disables all options when group is disabled', () => {
    render(<RadioGroup options={options} disabled />);
    const radios = screen.getAllByRole('radio');
    radios.forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it('disables specific options', () => {
    const optionsWithDisabled = [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana', disabled: true },
    ];
    render(<RadioGroup options={optionsWithDisabled} />);
    expect(screen.getByRole('radio', { name: 'Apple' })).not.toBeDisabled();
    expect(screen.getByRole('radio', { name: 'Banana' })).toBeDisabled();
  });

  it('applies horizontal direction by default', () => {
    const { container } = render(<RadioGroup options={options} />);
    expect(container.querySelector('.apron-radio-group')).toHaveClass(
      'apron-radio-group--horizontal'
    );
  });

  it('applies vertical direction', () => {
    const { container } = render(<RadioGroup options={options} direction="vertical" />);
    expect(container.querySelector('.apron-radio-group')).toHaveClass(
      'apron-radio-group--vertical'
    );
  });

  it('renders children with RadioGroup.Item', () => {
    render(
      <RadioGroup value="a">
        <RadioGroup.Item value="a">Item A</RadioGroup.Item>
        <RadioGroup.Item value="b">Item B</RadioGroup.Item>
      </RadioGroup>
    );
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Item B')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Item A' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Item B' })).not.toBeChecked();
  });

  it('applies custom className', () => {
    const { container } = render(
      <RadioGroup options={options} className="custom-group" />
    );
    expect(container.querySelector('.apron-radio-group')).toHaveClass('custom-group');
  });

  it('applies name to all radio inputs', () => {
    render(<RadioGroup options={options} name="fruit" />);
    const radios = screen.getAllByRole('radio');
    radios.forEach((radio) => {
      expect(radio).toHaveAttribute('name', 'fruit');
    });
  });

  it('only allows one selection in the group', () => {
    const { rerender } = render(<RadioGroup options={options} value="apple" />);
    let radios = screen.getAllByRole('radio');
    expect(radios.filter((r) => (r as HTMLInputElement).checked)).toHaveLength(1);

    rerender(<RadioGroup options={options} value="banana" />);
    radios = screen.getAllByRole('radio');
    expect(radios.filter((r) => (r as HTMLInputElement).checked)).toHaveLength(1);
    expect(radios[1]).toBeChecked();
  });
});

