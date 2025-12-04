import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Popover, PopoverConfirm } from './Popover';

describe('Popover', () => {
  beforeEach(() => {
    // 清理 body 中的 popover
    document.body.innerHTML = '';
  });

  afterEach(() => {
    // 清理 body 中的 popover
    const popovers = document.querySelectorAll('.apron-popover');
    popovers.forEach((p) => p.remove());
  });

  // ============================================
  // Basic Rendering
  // ============================================
  it('renders trigger element', () => {
    render(
      <Popover title="Title" content="Content">
        <button>Trigger</button>
      </Popover>
    );
    expect(screen.getByText('Trigger')).toBeInTheDocument();
  });

  it('does not show popover initially', () => {
    render(
      <Popover title="Title" content="Content">
        <button>Trigger</button>
      </Popover>
    );
    expect(screen.queryByText('Title')).not.toBeInTheDocument();
  });

  // ============================================
  // Click Mode
  // ============================================
  it('shows popover on click', async () => {
    render(
      <Popover mode="click" title="Title" content="Content">
        <button>Trigger</button>
      </Popover>
    );

    fireEvent.click(screen.getByText('Trigger'));

    await waitFor(() => {
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  it('closes popover on second click', async () => {
    render(
      <Popover mode="click" title="Title" content="Content">
        <button>Trigger</button>
      </Popover>
    );

    fireEvent.click(screen.getByText('Trigger'));
    await waitFor(() => {
      expect(screen.getByText('Title')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Trigger'));
    await waitFor(() => {
      expect(screen.queryByText('Title')).not.toBeInTheDocument();
    });
  });

  it('closes popover on outside click', async () => {
    render(
      <div>
        <Popover mode="click" title="Title" content="Content">
          <button>Trigger</button>
        </Popover>
        <button>Outside</button>
      </div>
    );

    fireEvent.click(screen.getByText('Trigger'));
    await waitFor(() => {
      expect(screen.getByText('Title')).toBeInTheDocument();
    });

    fireEvent.mouseDown(screen.getByText('Outside'));
    await waitFor(() => {
      expect(screen.queryByText('Title')).not.toBeInTheDocument();
    });
  });

  // ============================================
  // Hover Mode
  // ============================================
  it('shows popover on hover', async () => {
    render(
      <Popover mode="hover" title="Title" content="Content">
        <button>Trigger</button>
      </Popover>
    );

    fireEvent.mouseEnter(screen.getByText('Trigger'));

    await waitFor(() => {
      expect(screen.getByText('Title')).toBeInTheDocument();
    });
  });

  it('hides popover on mouse leave', async () => {
    vi.useFakeTimers();

    render(
      <Popover mode="hover" title="Title" content="Content">
        <button>Trigger</button>
      </Popover>
    );

    fireEvent.mouseEnter(screen.getByText('Trigger'));
    await waitFor(() => {
      expect(screen.getByText('Title')).toBeInTheDocument();
    });

    fireEvent.mouseLeave(screen.getByText('Trigger'));

    // 等待延迟关闭
    vi.advanceTimersByTime(200);

    await waitFor(() => {
      expect(screen.queryByText('Title')).not.toBeInTheDocument();
    });

    vi.useRealTimers();
  });

  // ============================================
  // Content
  // ============================================
  it('renders title only', async () => {
    render(
      <Popover title="Only Title">
        <button>Trigger</button>
      </Popover>
    );

    fireEvent.click(screen.getByText('Trigger'));

    await waitFor(() => {
      expect(screen.getByText('Only Title')).toBeInTheDocument();
    });
  });

  it('renders content only', async () => {
    render(
      <Popover content="Only Content">
        <button>Trigger</button>
      </Popover>
    );

    fireEvent.click(screen.getByText('Trigger'));

    await waitFor(() => {
      expect(screen.getByText('Only Content')).toBeInTheDocument();
    });
  });
});

describe('PopoverConfirm', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    const popovers = document.querySelectorAll('.apron-popover');
    popovers.forEach((p) => p.remove());
  });

  // ============================================
  // Basic Rendering
  // ============================================
  it('renders trigger element', () => {
    render(
      <PopoverConfirm title="Confirm" content="Are you sure?">
        <button>Trigger</button>
      </PopoverConfirm>
    );
    expect(screen.getByText('Trigger')).toBeInTheDocument();
  });

  it('shows popover on click', async () => {
    render(
      <PopoverConfirm title="Confirm" content="Are you sure?">
        <button>Trigger</button>
      </PopoverConfirm>
    );

    fireEvent.click(screen.getByText('Trigger'));

    await waitFor(() => {
      expect(screen.getByText('Confirm')).toBeInTheDocument();
      expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    });
  });

  // ============================================
  // Buttons
  // ============================================
  it('renders default button texts', async () => {
    render(
      <PopoverConfirm title="Confirm" content="Are you sure?">
        <button>Trigger</button>
      </PopoverConfirm>
    );

    fireEvent.click(screen.getByText('Trigger'));

    await waitFor(() => {
      expect(screen.getByText('取消')).toBeInTheDocument();
      expect(screen.getByText('确定')).toBeInTheDocument();
    });
  });

  it('renders custom button texts', async () => {
    render(
      <PopoverConfirm
        title="Confirm"
        content="Are you sure?"
        cancelText="No"
        confirmText="Yes"
      >
        <button>Trigger</button>
      </PopoverConfirm>
    );

    fireEvent.click(screen.getByText('Trigger'));

    await waitFor(() => {
      expect(screen.getByText('No')).toBeInTheDocument();
      expect(screen.getByText('Yes')).toBeInTheDocument();
    });
  });

  // ============================================
  // Callbacks
  // ============================================
  it('calls onCancel and closes on cancel click', async () => {
    const handleCancel = vi.fn();

    render(
      <PopoverConfirm title="Confirm" content="Are you sure?" onCancel={handleCancel}>
        <button>Trigger</button>
      </PopoverConfirm>
    );

    fireEvent.click(screen.getByText('Trigger'));
    await waitFor(() => {
      expect(screen.getByText('取消')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('取消'));

    await waitFor(() => {
      expect(handleCancel).toHaveBeenCalledTimes(1);
      expect(screen.queryByText('Confirm')).not.toBeInTheDocument();
    });
  });

  it('calls onConfirm and closes on confirm click', async () => {
    const handleConfirm = vi.fn();

    render(
      <PopoverConfirm title="Confirm" content="Are you sure?" onConfirm={handleConfirm}>
        <button>Trigger</button>
      </PopoverConfirm>
    );

    fireEvent.click(screen.getByText('Trigger'));
    await waitFor(() => {
      expect(screen.getByText('确定')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('确定'));

    await waitFor(() => {
      expect(handleConfirm).toHaveBeenCalledTimes(1);
      expect(screen.queryByText('Confirm')).not.toBeInTheDocument();
    });
  });

  // ============================================
  // Outside Click
  // ============================================
  it('closes on outside click', async () => {
    render(
      <div>
        <PopoverConfirm title="Confirm" content="Are you sure?">
          <button>Trigger</button>
        </PopoverConfirm>
        <button>Outside</button>
      </div>
    );

    fireEvent.click(screen.getByText('Trigger'));
    await waitFor(() => {
      expect(screen.getByText('Confirm')).toBeInTheDocument();
    });

    fireEvent.mouseDown(screen.getByText('Outside'));

    await waitFor(() => {
      expect(screen.queryByText('Confirm')).not.toBeInTheDocument();
    });
  });
});

describe('Popover Mutual Exclusion', () => {
  afterEach(() => {
    const popovers = document.querySelectorAll('.apron-popover');
    popovers.forEach((p) => p.remove());
  });

  it('closes other popovers when opening a new one', async () => {
    render(
      <div>
        <Popover title="Popover 1" content="Content 1">
          <button>Trigger 1</button>
        </Popover>
        <Popover title="Popover 2" content="Content 2">
          <button>Trigger 2</button>
        </Popover>
      </div>
    );

    // Open first popover
    fireEvent.click(screen.getByText('Trigger 1'));
    await waitFor(() => {
      expect(screen.getByText('Popover 1')).toBeInTheDocument();
    });

    // Open second popover
    fireEvent.click(screen.getByText('Trigger 2'));
    await waitFor(() => {
      expect(screen.getByText('Popover 2')).toBeInTheDocument();
      expect(screen.queryByText('Popover 1')).not.toBeInTheDocument();
    });
  });
});

