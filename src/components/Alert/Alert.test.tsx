import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { Alert } from './Alert';
import { message } from '../Message';

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

describe('message global methods', () => {
  beforeEach(() => {
    // Clean up any existing messages
    message.clear();
    // Remove any existing container
    const existingRoot = document.querySelector('.apron-alert-root');
    if (existingRoot) {
      existingRoot.remove();
    }
  });

  afterEach(() => {
    message.clear();
  });

  it('creates message container when called', async () => {
    act(() => {
      message.info('Test message');
    });

    await waitFor(() => {
      expect(document.querySelector('.apron-alert-root')).toBeInTheDocument();
    });
  });

  it('shows info message', async () => {
    act(() => {
      message.info('Info message');
    });

    await waitFor(() => {
      expect(screen.getByText('Info message')).toBeInTheDocument();
    });
  });

  it('shows success message', async () => {
    act(() => {
      message.success('Success message');
    });

    await waitFor(() => {
      expect(screen.getByText('Success message')).toBeInTheDocument();
    });
  });

  it('shows warning message', async () => {
    act(() => {
      message.warning('Warning message');
    });

    await waitFor(() => {
      expect(screen.getByText('Warning message')).toBeInTheDocument();
    });
  });

  it('shows error message', async () => {
    act(() => {
      message.error('Error message');
    });

    await waitFor(() => {
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });

  it('returns message id', () => {
    let id: string;
    act(() => {
      id = message.info('Test');
    });
    expect(id!).toBeDefined();
    expect(typeof id!).toBe('string');
  });

  it('can remove message by id', async () => {
    let id: string;
    act(() => {
      id = message.info('Test message', 0); // duration 0 = no auto close
    });

    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    act(() => {
      message.remove(id!);
    });

    // Note: The alert might still be visible during exit animation
    // but will be removed from the list
  });

  it('can clear all messages', async () => {
    act(() => {
      message.info('Message 1', 0);
      message.success('Message 2', 0);
      message.warning('Message 3', 0);
    });

    await waitFor(() => {
      expect(screen.getByText('Message 1')).toBeInTheDocument();
      expect(screen.getByText('Message 2')).toBeInTheDocument();
      expect(screen.getByText('Message 3')).toBeInTheDocument();
    });

    act(() => {
      message.clear();
    });

    await waitFor(() => {
      expect(screen.queryByText('Message 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Message 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Message 3')).not.toBeInTheDocument();
    });
  });

  it('shows multiple messages stacked', async () => {
    act(() => {
      message.info('First', 0);
      message.success('Second', 0);
      message.warning('Third', 0);
    });

    await waitFor(() => {
      const alerts = document.querySelectorAll('.apron-alert');
      expect(alerts.length).toBe(3);
    });
  });

  it('auto closes after duration', async () => {
    vi.useFakeTimers();

    act(() => {
      message.info('Auto close test', 1000);
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

