import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

describe('Checkbox', () => {
  it('renders correctly', () => {
    render(<Checkbox>Test Checkbox</Checkbox>);
    expect(screen.getByText('Test Checkbox')).toBeInTheDocument();
  });

  it('renders checkbox input', () => {
    render(<Checkbox>Test</Checkbox>);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('handles checked state correctly', () => {
    render(<Checkbox checked onChange={() => {}}>Checked</Checkbox>);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('handles unchecked state correctly', () => {
    render(<Checkbox checked={false} onChange={() => {}}>Unchecked</Checkbox>);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('calls onChange when clicked', () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange}>Test</Checkbox>);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(<Checkbox disabled onChange={handleChange}>Test</Checkbox>);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies disabled class when disabled', () => {
    render(<Checkbox disabled>Disabled</Checkbox>);
    const label = screen.getByText('Disabled').closest('label');
    expect(label).toHaveClass('apron-checkbox--disabled');
  });

  it('applies checked class when checked', () => {
    render(<Checkbox checked onChange={() => {}}>Checked</Checkbox>);
    const label = screen.getByText('Checked').closest('label');
    expect(label).toHaveClass('apron-checkbox--checked');
  });

  it('applies indeterminate class when indeterminate', () => {
    render(<Checkbox indeterminate onChange={() => {}}>Indeterminate</Checkbox>);
    const label = screen.getByText('Indeterminate').closest('label');
    expect(label).toHaveClass('apron-checkbox--indeterminate');
  });

  it('renders with custom className', () => {
    render(<Checkbox className="custom-class">Test</Checkbox>);
    const label = screen.getByText('Test').closest('label');
    expect(label).toHaveClass('custom-class');
  });

  it('renders without label', () => {
    const { container } = render(<Checkbox />);
    expect(container.querySelector('.apron-checkbox__label')).not.toBeInTheDocument();
  });

  it('supports defaultChecked for uncontrolled mode', () => {
    render(<Checkbox defaultChecked>Test</Checkbox>);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('passes value prop to input', () => {
    render(<Checkbox value="test-value">Test</Checkbox>);
    expect(screen.getByRole('checkbox')).toHaveAttribute('value', 'test-value');
  });

  it('does not toggle when clicking label with labelClickable=false (default)', () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange}>Test Label</Checkbox>);
    // 点击文字部分
    fireEvent.click(screen.getByText('Test Label'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('toggles when clicking label with labelClickable=true', () => {
    const handleChange = vi.fn();
    render(<Checkbox labelClickable onChange={handleChange}>Test Label</Checkbox>);
    // 点击文字部分
    fireEvent.click(screen.getByText('Test Label'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies label-not-clickable class when labelClickable=false', () => {
    render(<Checkbox>Test</Checkbox>);
    const label = screen.getByText('Test').closest('label');
    expect(label).toHaveClass('apron-checkbox--label-not-clickable');
  });

  it('does not apply label-not-clickable class when labelClickable=true', () => {
    render(<Checkbox labelClickable>Test</Checkbox>);
    const label = screen.getByText('Test').closest('label');
    expect(label).not.toHaveClass('apron-checkbox--label-not-clickable');
  });
});

describe('CheckboxGroup', () => {
  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
  ];

  it('renders all options', () => {
    render(<CheckboxGroup options={options} />);
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('Orange')).toBeInTheDocument();
  });

  it('renders with string/number options', () => {
    render(<CheckboxGroup options={['A', 'B', 'C']} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('handles controlled value', () => {
    render(<CheckboxGroup options={options} value={['apple', 'banana']} />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });

  it('handles defaultValue for uncontrolled mode', () => {
    render(<CheckboxGroup options={options} defaultValue={['orange']} />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).toBeChecked();
  });

  it('calls onChange when option is clicked', () => {
    const handleChange = vi.fn();
    render(<CheckboxGroup options={options} value={[]} onChange={handleChange} />);
    fireEvent.click(screen.getByText('Apple'));
    expect(handleChange).toHaveBeenCalledWith(['apple']);
  });

  it('removes value when checked option is clicked', () => {
    const handleChange = vi.fn();
    render(<CheckboxGroup options={options} value={['apple']} onChange={handleChange} />);
    fireEvent.click(screen.getByText('Apple'));
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('disables all options when group is disabled', () => {
    render(<CheckboxGroup options={options} disabled />);
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeDisabled();
    });
  });

  it('disables specific options', () => {
    const optionsWithDisabled = [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana', disabled: true },
    ];
    render(<CheckboxGroup options={optionsWithDisabled} />);
    expect(screen.getByRole('checkbox', { name: 'Apple' })).not.toBeDisabled();
    expect(screen.getByRole('checkbox', { name: 'Banana' })).toBeDisabled();
  });

  it('applies horizontal direction by default', () => {
    const { container } = render(<CheckboxGroup options={options} />);
    expect(container.querySelector('.apron-checkbox-group')).toHaveClass(
      'apron-checkbox-group--horizontal'
    );
  });

  it('applies vertical direction', () => {
    const { container } = render(<CheckboxGroup options={options} direction="vertical" />);
    expect(container.querySelector('.apron-checkbox-group')).toHaveClass(
      'apron-checkbox-group--vertical'
    );
  });

  it('renders children with CheckboxGroup.Item', () => {
    render(
      <CheckboxGroup value={['a']}>
        <CheckboxGroup.Item value="a">Item A</CheckboxGroup.Item>
        <CheckboxGroup.Item value="b">Item B</CheckboxGroup.Item>
      </CheckboxGroup>
    );
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Item B')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Item A' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Item B' })).not.toBeChecked();
  });

  it('applies custom className', () => {
    const { container } = render(
      <CheckboxGroup options={options} className="custom-group" />
    );
    expect(container.querySelector('.apron-checkbox-group')).toHaveClass('custom-group');
  });
});

