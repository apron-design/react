import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Collapse, CollapseItem } from './Collapse';

describe('Collapse', () => {
  it('renders correctly', () => {
    render(
      <Collapse data-testid="collapse">
        <CollapseItem itemKey="1" title="Title 1">Content 1</CollapseItem>
      </Collapse>
    );
    expect(screen.getByTestId('collapse')).toBeInTheDocument();
  });

  it('renders multiple items', () => {
    render(
      <Collapse>
        <CollapseItem itemKey="1" title="Title 1">Content 1</CollapseItem>
        <CollapseItem itemKey="2" title="Title 2">Content 2</CollapseItem>
        <CollapseItem itemKey="3" title="Title 3">Content 3</CollapseItem>
      </Collapse>
    );
    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Title 2')).toBeInTheDocument();
    expect(screen.getByText('Title 3')).toBeInTheDocument();
  });

  it('has apron-collapse class', () => {
    render(
      <Collapse data-testid="collapse">
        <CollapseItem itemKey="1" title="Title">Content</CollapseItem>
      </Collapse>
    );
    expect(screen.getByTestId('collapse')).toHaveClass('apron-collapse');
  });

  it('applies custom className', () => {
    render(
      <Collapse className="custom-class" data-testid="collapse">
        <CollapseItem itemKey="1" title="Title">Content</CollapseItem>
      </Collapse>
    );
    expect(screen.getByTestId('collapse')).toHaveClass('custom-class');
  });
});

describe('CollapseItem', () => {
  it('renders title', () => {
    render(
      <Collapse>
        <CollapseItem itemKey="1" title="Test Title">Content</CollapseItem>
      </Collapse>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders content', () => {
    render(
      <Collapse>
        <CollapseItem itemKey="1" title="Title">Test Content</CollapseItem>
      </Collapse>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('toggles active state on click', () => {
    const { container } = render(
      <Collapse>
        <CollapseItem itemKey="1" title="Title">Content</CollapseItem>
      </Collapse>
    );
    
    const header = screen.getByText('Title').closest('.apron-collapse-item__header');
    const item = container.querySelector('.apron-collapse-item');
    
    expect(item).not.toHaveClass('apron-collapse-item--active');
    
    fireEvent.click(header!);
    expect(item).toHaveClass('apron-collapse-item--active');
    
    fireEvent.click(header!);
    expect(item).not.toHaveClass('apron-collapse-item--active');
  });

  it('toggles on Enter key', () => {
    const { container } = render(
      <Collapse>
        <CollapseItem itemKey="1" title="Title">Content</CollapseItem>
      </Collapse>
    );
    
    const header = screen.getByText('Title').closest('.apron-collapse-item__header');
    const item = container.querySelector('.apron-collapse-item');
    
    fireEvent.keyDown(header!, { key: 'Enter' });
    expect(item).toHaveClass('apron-collapse-item--active');
  });

  it('toggles on Space key', () => {
    const { container } = render(
      <Collapse>
        <CollapseItem itemKey="1" title="Title">Content</CollapseItem>
      </Collapse>
    );
    
    const header = screen.getByText('Title').closest('.apron-collapse-item__header');
    const item = container.querySelector('.apron-collapse-item');
    
    fireEvent.keyDown(header!, { key: ' ' });
    expect(item).toHaveClass('apron-collapse-item--active');
  });
});

describe('Collapse defaultActiveKeys', () => {
  it('opens items specified in defaultActiveKeys', () => {
    const { container } = render(
      <Collapse defaultActiveKeys={['1']}>
        <CollapseItem itemKey="1" title="Title 1">Content 1</CollapseItem>
        <CollapseItem itemKey="2" title="Title 2">Content 2</CollapseItem>
      </Collapse>
    );
    
    const items = container.querySelectorAll('.apron-collapse-item');
    expect(items[0]).toHaveClass('apron-collapse-item--active');
    expect(items[1]).not.toHaveClass('apron-collapse-item--active');
  });

  it('opens multiple items in defaultActiveKeys', () => {
    const { container } = render(
      <Collapse defaultActiveKeys={['1', '3']}>
        <CollapseItem itemKey="1" title="Title 1">Content 1</CollapseItem>
        <CollapseItem itemKey="2" title="Title 2">Content 2</CollapseItem>
        <CollapseItem itemKey="3" title="Title 3">Content 3</CollapseItem>
      </Collapse>
    );
    
    const items = container.querySelectorAll('.apron-collapse-item');
    expect(items[0]).toHaveClass('apron-collapse-item--active');
    expect(items[1]).not.toHaveClass('apron-collapse-item--active');
    expect(items[2]).toHaveClass('apron-collapse-item--active');
  });
});

describe('Collapse accordion mode', () => {
  it('only allows one item to be open in accordion mode', () => {
    const { container } = render(
      <Collapse accordion defaultActiveKeys={['1']}>
        <CollapseItem itemKey="1" title="Title 1">Content 1</CollapseItem>
        <CollapseItem itemKey="2" title="Title 2">Content 2</CollapseItem>
      </Collapse>
    );
    
    const items = container.querySelectorAll('.apron-collapse-item');
    const header2 = screen.getByText('Title 2').closest('.apron-collapse-item__header');
    
    // Initially item 1 is open
    expect(items[0]).toHaveClass('apron-collapse-item--active');
    expect(items[1]).not.toHaveClass('apron-collapse-item--active');
    
    // Click item 2
    fireEvent.click(header2!);
    
    // Now item 1 should be closed and item 2 open
    expect(items[0]).not.toHaveClass('apron-collapse-item--active');
    expect(items[1]).toHaveClass('apron-collapse-item--active');
  });

  it('closes item when clicking active item in accordion mode', () => {
    const { container } = render(
      <Collapse accordion defaultActiveKeys={['1']}>
        <CollapseItem itemKey="1" title="Title 1">Content 1</CollapseItem>
        <CollapseItem itemKey="2" title="Title 2">Content 2</CollapseItem>
      </Collapse>
    );
    
    const items = container.querySelectorAll('.apron-collapse-item');
    const header1 = screen.getByText('Title 1').closest('.apron-collapse-item__header');
    
    // Click active item
    fireEvent.click(header1!);
    
    // Both should be closed
    expect(items[0]).not.toHaveClass('apron-collapse-item--active');
    expect(items[1]).not.toHaveClass('apron-collapse-item--active');
  });

  it('allows multiple items open in non-accordion mode', () => {
    const { container } = render(
      <Collapse>
        <CollapseItem itemKey="1" title="Title 1">Content 1</CollapseItem>
        <CollapseItem itemKey="2" title="Title 2">Content 2</CollapseItem>
      </Collapse>
    );
    
    const items = container.querySelectorAll('.apron-collapse-item');
    const header1 = screen.getByText('Title 1').closest('.apron-collapse-item__header');
    const header2 = screen.getByText('Title 2').closest('.apron-collapse-item__header');
    
    fireEvent.click(header1!);
    fireEvent.click(header2!);
    
    // Both should be open
    expect(items[0]).toHaveClass('apron-collapse-item--active');
    expect(items[1]).toHaveClass('apron-collapse-item--active');
  });
});

describe('CollapseItem disabled', () => {
  it('applies disabled class', () => {
    const { container } = render(
      <Collapse>
        <CollapseItem itemKey="1" title="Title" disabled>Content</CollapseItem>
      </Collapse>
    );
    
    expect(container.querySelector('.apron-collapse-item')).toHaveClass('apron-collapse-item--disabled');
  });

  it('does not toggle when disabled', () => {
    const { container } = render(
      <Collapse>
        <CollapseItem itemKey="1" title="Title" disabled>Content</CollapseItem>
      </Collapse>
    );
    
    const header = screen.getByText('Title').closest('.apron-collapse-item__header');
    const item = container.querySelector('.apron-collapse-item');
    
    fireEvent.click(header!);
    expect(item).not.toHaveClass('apron-collapse-item--active');
  });

  it('has aria-disabled attribute', () => {
    render(
      <Collapse>
        <CollapseItem itemKey="1" title="Title" disabled>Content</CollapseItem>
      </Collapse>
    );
    
    const header = screen.getByText('Title').closest('.apron-collapse-item__header');
    expect(header).toHaveAttribute('aria-disabled', 'true');
  });

  it('has tabIndex -1 when disabled', () => {
    render(
      <Collapse>
        <CollapseItem itemKey="1" title="Title" disabled>Content</CollapseItem>
      </Collapse>
    );
    
    const header = screen.getByText('Title').closest('.apron-collapse-item__header');
    expect(header).toHaveAttribute('tabIndex', '-1');
  });
});

describe('CollapseItem accessibility', () => {
  it('has role button', () => {
    render(
      <Collapse>
        <CollapseItem itemKey="1" title="Title">Content</CollapseItem>
      </Collapse>
    );
    
    const header = screen.getByText('Title').closest('.apron-collapse-item__header');
    expect(header).toHaveAttribute('role', 'button');
  });

  it('has aria-expanded attribute', () => {
    const { container } = render(
      <Collapse>
        <CollapseItem itemKey="1" title="Title">Content</CollapseItem>
      </Collapse>
    );
    
    const header = screen.getByText('Title').closest('.apron-collapse-item__header');
    expect(header).toHaveAttribute('aria-expanded', 'false');
    
    fireEvent.click(header!);
    expect(header).toHaveAttribute('aria-expanded', 'true');
  });

  it('has tabIndex 0 when not disabled', () => {
    render(
      <Collapse>
        <CollapseItem itemKey="1" title="Title">Content</CollapseItem>
      </Collapse>
    );
    
    const header = screen.getByText('Title').closest('.apron-collapse-item__header');
    expect(header).toHaveAttribute('tabIndex', '0');
  });
});

