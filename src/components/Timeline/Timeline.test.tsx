import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Timeline, TimelineItem } from './Timeline';

describe('Timeline', () => {
  // ============================================
  // Basic Rendering
  // ============================================
  it('renders correctly', () => {
    render(
      <Timeline data-testid="timeline">
        <TimelineItem title="Item 1" />
      </Timeline>
    );
    expect(screen.getByTestId('timeline')).toBeInTheDocument();
  });

  it('renders multiple items', () => {
    render(
      <Timeline>
        <TimelineItem title="Item 1" />
        <TimelineItem title="Item 2" />
        <TimelineItem title="Item 3" />
      </Timeline>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  // ============================================
  // Side
  // ============================================
  it('applies default side class (right)', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="Item" />
      </Timeline>
    );
    expect(container.firstChild).toHaveClass('apron-timeline--right');
  });

  it('applies left side class', () => {
    const { container } = render(
      <Timeline side="left">
        <TimelineItem title="Item" />
      </Timeline>
    );
    expect(container.firstChild).toHaveClass('apron-timeline--left');
  });

  it('applies both side class', () => {
    const { container } = render(
      <Timeline side="both">
        <TimelineItem title="Item" />
      </Timeline>
    );
    expect(container.firstChild).toHaveClass('apron-timeline--both');
  });

  // ============================================
  // TimelineItem Content
  // ============================================
  it('renders title', () => {
    render(
      <Timeline>
        <TimelineItem title="Test Title" />
      </Timeline>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders content', () => {
    render(
      <Timeline>
        <TimelineItem title="Title" content="Test Content" />
      </Timeline>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders date', () => {
    render(
      <Timeline>
        <TimelineItem title="Title" date="2023-01-01" />
      </Timeline>
    );
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
  });

  it('renders children as content', () => {
    render(
      <Timeline>
        <TimelineItem title="Title">
          <span data-testid="child">Child Content</span>
        </TimelineItem>
      </Timeline>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  // ============================================
  // Dot Colors
  // ============================================
  it('applies default dot color', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="Item" />
      </Timeline>
    );
    expect(container.querySelector('.apron-timeline-item')).toHaveClass(
      'apron-timeline-item--dot-default'
    );
  });

  it('applies primary dot color', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="Item" dotColor="primary" />
      </Timeline>
    );
    expect(container.querySelector('.apron-timeline-item')).toHaveClass(
      'apron-timeline-item--dot-primary'
    );
  });

  it('applies main dot color', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="Item" dotColor="main" />
      </Timeline>
    );
    expect(container.querySelector('.apron-timeline-item')).toHaveClass(
      'apron-timeline-item--dot-main'
    );
  });

  it('applies success dot color', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="Item" dotColor="success" />
      </Timeline>
    );
    expect(container.querySelector('.apron-timeline-item')).toHaveClass(
      'apron-timeline-item--dot-success'
    );
  });

  it('applies warning dot color', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="Item" dotColor="warning" />
      </Timeline>
    );
    expect(container.querySelector('.apron-timeline-item')).toHaveClass(
      'apron-timeline-item--dot-warning'
    );
  });

  it('applies danger dot color', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="Item" dotColor="danger" />
      </Timeline>
    );
    expect(container.querySelector('.apron-timeline-item')).toHaveClass(
      'apron-timeline-item--dot-danger'
    );
  });

  // ============================================
  // Custom Props
  // ============================================
  it('applies custom className to Timeline', () => {
    const { container } = render(
      <Timeline className="custom-timeline">
        <TimelineItem title="Item" />
      </Timeline>
    );
    expect(container.firstChild).toHaveClass('custom-timeline');
  });

  it('applies custom className to TimelineItem', () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="Item" className="custom-item" />
      </Timeline>
    );
    expect(container.querySelector('.apron-timeline-item')).toHaveClass('custom-item');
  });

  it('passes additional props to Timeline', () => {
    render(
      <Timeline data-testid="test-timeline">
        <TimelineItem title="Item" />
      </Timeline>
    );
    expect(screen.getByTestId('test-timeline')).toBeInTheDocument();
  });

  it('passes additional props to TimelineItem', () => {
    render(
      <Timeline>
        <TimelineItem title="Item" data-testid="test-item" />
      </Timeline>
    );
    expect(screen.getByTestId('test-item')).toBeInTheDocument();
  });

  // ============================================
  // Both Mode Structure
  // ============================================
  it('renders left and right content areas in both mode', () => {
    const { container } = render(
      <Timeline side="both">
        <TimelineItem title="Item" />
      </Timeline>
    );
    expect(container.querySelector('.apron-timeline-item__left')).toBeInTheDocument();
    expect(container.querySelector('.apron-timeline-item__right')).toBeInTheDocument();
  });
});

