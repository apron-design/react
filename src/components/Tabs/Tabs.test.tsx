import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';

describe('Tabs', () => {
  // ============================================
  // Basic Rendering
  // ============================================
  it('renders correctly', () => {
    render(
      <Tabs defaultActiveKey="1" data-testid="tabs">
        <TabList>
          <Tab tabKey="1">Tab 1</Tab>
          <Tab tabKey="2">Tab 2</Tab>
        </TabList>
        <TabPanel tabKey="1">Panel 1</TabPanel>
        <TabPanel tabKey="2">Panel 2</TabPanel>
      </Tabs>
    );
    expect(screen.getByTestId('tabs')).toBeInTheDocument();
  });

  it('renders all tabs', () => {
    render(
      <Tabs defaultActiveKey="1">
        <TabList>
          <Tab tabKey="1">Tab 1</Tab>
          <Tab tabKey="2">Tab 2</Tab>
          <Tab tabKey="3">Tab 3</Tab>
        </TabList>
        <TabPanel tabKey="1">Panel 1</TabPanel>
        <TabPanel tabKey="2">Panel 2</TabPanel>
        <TabPanel tabKey="3">Panel 3</TabPanel>
      </Tabs>
    );
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  it('shows default active panel', () => {
    render(
      <Tabs defaultActiveKey="2">
        <TabList>
          <Tab tabKey="1">Tab 1</Tab>
          <Tab tabKey="2">Tab 2</Tab>
        </TabList>
        <TabPanel tabKey="1">Panel 1</TabPanel>
        <TabPanel tabKey="2">Panel 2</TabPanel>
      </Tabs>
    );
    expect(screen.queryByText('Panel 1')).not.toBeInTheDocument();
    expect(screen.getByText('Panel 2')).toBeInTheDocument();
  });

  // ============================================
  // Tab Switching
  // ============================================
  it('switches panel on tab click', () => {
    render(
      <Tabs defaultActiveKey="1">
        <TabList>
          <Tab tabKey="1">Tab 1</Tab>
          <Tab tabKey="2">Tab 2</Tab>
        </TabList>
        <TabPanel tabKey="1">Panel 1</TabPanel>
        <TabPanel tabKey="2">Panel 2</TabPanel>
      </Tabs>
    );

    expect(screen.getByText('Panel 1')).toBeInTheDocument();
    expect(screen.queryByText('Panel 2')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Tab 2'));

    expect(screen.queryByText('Panel 1')).not.toBeInTheDocument();
    expect(screen.getByText('Panel 2')).toBeInTheDocument();
  });

  it('applies active class to selected tab', () => {
    render(
      <Tabs defaultActiveKey="1">
        <TabList>
          <Tab tabKey="1">Tab 1</Tab>
          <Tab tabKey="2">Tab 2</Tab>
        </TabList>
        <TabPanel tabKey="1">Panel 1</TabPanel>
        <TabPanel tabKey="2">Panel 2</TabPanel>
      </Tabs>
    );

    expect(screen.getByText('Tab 1')).toHaveClass('apron-tabs__tab--active');
    expect(screen.getByText('Tab 2')).not.toHaveClass('apron-tabs__tab--active');

    fireEvent.click(screen.getByText('Tab 2'));

    expect(screen.getByText('Tab 1')).not.toHaveClass('apron-tabs__tab--active');
    expect(screen.getByText('Tab 2')).toHaveClass('apron-tabs__tab--active');
  });

  // ============================================
  // Capsule Mode
  // ============================================
  it('applies capsule class', () => {
    render(
      <Tabs defaultActiveKey="1" capsule data-testid="tabs">
        <TabList>
          <Tab tabKey="1">Tab 1</Tab>
        </TabList>
        <TabPanel tabKey="1">Panel 1</TabPanel>
      </Tabs>
    );
    expect(screen.getByTestId('tabs')).toHaveClass('apron-tabs--capsule');
  });

  // ============================================
  // Extra
  // ============================================
  it('renders extra content', () => {
    render(
      <Tabs defaultActiveKey="1" extra={<button>Extra Button</button>}>
        <TabList>
          <Tab tabKey="1">Tab 1</Tab>
        </TabList>
        <TabPanel tabKey="1">Panel 1</TabPanel>
      </Tabs>
    );
    expect(screen.getByText('Extra Button')).toBeInTheDocument();
  });

  // ============================================
  // Disabled
  // ============================================
  it('applies disabled class', () => {
    render(
      <Tabs defaultActiveKey="1">
        <TabList>
          <Tab tabKey="1">Tab 1</Tab>
          <Tab tabKey="2" disabled>Tab 2</Tab>
        </TabList>
        <TabPanel tabKey="1">Panel 1</TabPanel>
        <TabPanel tabKey="2">Panel 2</TabPanel>
      </Tabs>
    );
    expect(screen.getByText('Tab 2')).toHaveClass('apron-tabs__tab--disabled');
  });

  it('does not switch when clicking disabled tab', () => {
    render(
      <Tabs defaultActiveKey="1">
        <TabList>
          <Tab tabKey="1">Tab 1</Tab>
          <Tab tabKey="2" disabled>Tab 2</Tab>
        </TabList>
        <TabPanel tabKey="1">Panel 1</TabPanel>
        <TabPanel tabKey="2">Panel 2</TabPanel>
      </Tabs>
    );

    fireEvent.click(screen.getByText('Tab 2'));

    expect(screen.getByText('Panel 1')).toBeInTheDocument();
    expect(screen.queryByText('Panel 2')).not.toBeInTheDocument();
  });

  it('has aria-disabled on disabled tab', () => {
    render(
      <Tabs defaultActiveKey="1">
        <TabList>
          <Tab tabKey="1">Tab 1</Tab>
          <Tab tabKey="2" disabled>Tab 2</Tab>
        </TabList>
        <TabPanel tabKey="1">Panel 1</TabPanel>
        <TabPanel tabKey="2">Panel 2</TabPanel>
      </Tabs>
    );
    expect(screen.getByText('Tab 2')).toHaveAttribute('aria-disabled', 'true');
  });

  // ============================================
  // Accessibility
  // ============================================
  it('has role tablist on TabList', () => {
    render(
      <Tabs defaultActiveKey="1">
        <TabList data-testid="tablist">
          <Tab tabKey="1">Tab 1</Tab>
        </TabList>
        <TabPanel tabKey="1">Panel 1</TabPanel>
      </Tabs>
    );
    expect(screen.getByTestId('tablist')).toHaveAttribute('role', 'tablist');
  });

  it('has role tab on Tab', () => {
    render(
      <Tabs defaultActiveKey="1">
        <TabList>
          <Tab tabKey="1">Tab 1</Tab>
        </TabList>
        <TabPanel tabKey="1">Panel 1</TabPanel>
      </Tabs>
    );
    expect(screen.getByText('Tab 1')).toHaveAttribute('role', 'tab');
  });

  it('has role tabpanel on TabPanel', () => {
    const { container } = render(
      <Tabs defaultActiveKey="1">
        <TabList>
          <Tab tabKey="1">Tab 1</Tab>
        </TabList>
        <TabPanel tabKey="1">Panel 1</TabPanel>
      </Tabs>
    );
    expect(container.querySelector('.apron-tabs__panel')).toHaveAttribute('role', 'tabpanel');
  });

  it('has aria-selected on active tab', () => {
    render(
      <Tabs defaultActiveKey="1">
        <TabList>
          <Tab tabKey="1">Tab 1</Tab>
          <Tab tabKey="2">Tab 2</Tab>
        </TabList>
        <TabPanel tabKey="1">Panel 1</TabPanel>
        <TabPanel tabKey="2">Panel 2</TabPanel>
      </Tabs>
    );
    expect(screen.getByText('Tab 1')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Tab 2')).toHaveAttribute('aria-selected', 'false');
  });

  // ============================================
  // Custom Props
  // ============================================
  it('applies custom className to Tabs', () => {
    render(
      <Tabs defaultActiveKey="1" className="custom-tabs" data-testid="tabs">
        <TabList>
          <Tab tabKey="1">Tab 1</Tab>
        </TabList>
        <TabPanel tabKey="1">Panel 1</TabPanel>
      </Tabs>
    );
    expect(screen.getByTestId('tabs')).toHaveClass('custom-tabs');
  });

  it('applies custom className to Tab', () => {
    render(
      <Tabs defaultActiveKey="1">
        <TabList>
          <Tab tabKey="1" className="custom-tab">Tab 1</Tab>
        </TabList>
        <TabPanel tabKey="1">Panel 1</TabPanel>
      </Tabs>
    );
    expect(screen.getByText('Tab 1')).toHaveClass('custom-tab');
  });

  it('applies custom className to TabPanel', () => {
    const { container } = render(
      <Tabs defaultActiveKey="1">
        <TabList>
          <Tab tabKey="1">Tab 1</Tab>
        </TabList>
        <TabPanel tabKey="1" className="custom-panel">Panel 1</TabPanel>
      </Tabs>
    );
    expect(container.querySelector('.apron-tabs__panel')).toHaveClass('custom-panel');
  });
});

