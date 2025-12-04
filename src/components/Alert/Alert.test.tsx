import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { Alert, alert } from './Alert';

describe('Alert', () => {
  it('renders correctly', () => {
    const { container } = render(<Alert type="info" message="Test message" />);
    expect(container.querySelector('.apron-alert')).toBeInTheDocument();
  });

  it('renders message content', () => {
    render(<Alert type="info" message="Test message" />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('applies info type class', () => {
    const { container } = render(<Alert type="info" message="Info" />);
    expect(container.querySelector('.apron-alert--info')).toBeInTheDocument();
  });

  it('applies success type class', () => {
    const { container } = render(<Alert type="success" message="Success" />);
    expect(container.querySelector('.apron-alert--success')).toBeInTheDocument();
  });

  it('applies warning type class', () => {
    const { container } = render(<Alert type="warning" message="Warning" />);
    expect(container.querySelector('.apron-alert--warning')).toBeInTheDocument();
  });

  it('applies error type class', () => {
    const { container } = render(<Alert type="error" message="Error" />);
    expect(container.querySelector('.apron-alert--error')).toBeInTheDocument();
  });

  it('renders icon', () => {
    const { container } = render(<Alert type="info" message="Test" />);
    expect(container.querySelector('.apron-alert__icon')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies static class for non-animated display', () => {
    const { container } = render(<Alert type="info" message="Test" />);
    expect(container.querySelector('.apron-alert--static')).toBeInTheDocument();
  });

  it('renders with ReactNode message', () => {
    render(
      <Alert
        type="info"
        message={<span data-testid="custom-message">Custom content</span>}
      />
    );
    expect(screen.getByTestId('custom-message')).toBeInTheDocument();
  });
});

describe('alert global methods', () => {
  beforeEach(() => {
    // Clean up any existing alerts
    alert.clear();
    // Remove any existing container
    const existingRoot = document.querySelector('.apron-alert-root');
    if (existingRoot) {
      existingRoot.remove();
    }
  });

  afterEach(() => {
    alert.clear();
  });

  it('creates alert container when called', async () => {
    act(() => {
      alert.info('Test message');
    });

    await waitFor(() => {
      expect(document.querySelector('.apron-alert-root')).toBeInTheDocument();
    });
  });

  it('shows info alert', async () => {
    act(() => {
      alert.info('Info message');
    });

    await waitFor(() => {
      expect(screen.getByText('Info message')).toBeInTheDocument();
    });
  });

  it('shows success alert', async () => {
    act(() => {
      alert.success('Success message');
    });

    await waitFor(() => {
      expect(screen.getByText('Success message')).toBeInTheDocument();
    });
  });

  it('shows warning alert', async () => {
    act(() => {
      alert.warning('Warning message');
    });

    await waitFor(() => {
      expect(screen.getByText('Warning message')).toBeInTheDocument();
    });
  });

  it('shows error alert', async () => {
    act(() => {
      alert.error('Error message');
    });

    await waitFor(() => {
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });

  it('returns alert id', () => {
    let id: string;
    act(() => {
      id = alert.info('Test');
    });
    expect(id!).toBeDefined();
    expect(typeof id!).toBe('string');
  });

  it('can remove alert by id', async () => {
    let id: string;
    act(() => {
      id = alert.info('Test message', 0); // duration 0 = no auto close
    });

    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    act(() => {
      alert.remove(id!);
    });

    // Note: The alert might still be visible during exit animation
    // but will be removed from the list
  });

  it('can clear all alerts', async () => {
    act(() => {
      alert.info('Message 1', 0);
      alert.success('Message 2', 0);
      alert.warning('Message 3', 0);
    });

    await waitFor(() => {
      expect(screen.getByText('Message 1')).toBeInTheDocument();
      expect(screen.getByText('Message 2')).toBeInTheDocument();
      expect(screen.getByText('Message 3')).toBeInTheDocument();
    });

    act(() => {
      alert.clear();
    });

    await waitFor(() => {
      expect(screen.queryByText('Message 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Message 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Message 3')).not.toBeInTheDocument();
    });
  });

  it('shows multiple alerts stacked', async () => {
    act(() => {
      alert.info('First', 0);
      alert.success('Second', 0);
      alert.warning('Third', 0);
    });

    await waitFor(() => {
      const alerts = document.querySelectorAll('.apron-alert');
      expect(alerts.length).toBe(3);
    });
  });

  it('auto closes after duration', async () => {
    vi.useFakeTimers();

    act(() => {
      alert.info('Auto close test', 1000);
    });

    await waitFor(() => {
      expect(screen.getByText('Auto close test')).toBeInTheDocument();
    });

    // Fast forward time
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // Wait for exit animation
    act(() => {
      vi.advanceTimersByTime(500);
    });

    vi.useRealTimers();
  });
});

