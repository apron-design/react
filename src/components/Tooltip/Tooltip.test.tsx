import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('renders trigger element', () => {
    render(
      <Tooltip content="提示内容">
        <button>触发按钮</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: '触发按钮' })).toBeInTheDocument();
  });

  it('shows tooltip on mouse enter', async () => {
    render(
      <Tooltip content="提示内容">
        <button>触发按钮</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(screen.getByText('提示内容')).toBeInTheDocument();
    });
  });

  it('hides tooltip on mouse leave', async () => {
    vi.useFakeTimers();

    render(
      <Tooltip content="提示内容">
        <button>触发按钮</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    fireEvent.mouseLeave(screen.getByRole('button'));

    // 等待延迟关闭
    vi.advanceTimersByTime(150);

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    vi.useRealTimers();
  });

  it('keeps tooltip visible when hovering over tooltip', async () => {
    vi.useFakeTimers();

    render(
      <Tooltip content="提示内容">
        <button>触发按钮</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    // 移到 tooltip 上
    fireEvent.mouseLeave(screen.getByRole('button'));
    fireEvent.mouseEnter(screen.getByRole('tooltip'));

    vi.advanceTimersByTime(150);

    // tooltip 应该仍然可见
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('applies custom className', async () => {
    render(
      <Tooltip content="提示内容" className="custom-tooltip">
        <button>触发按钮</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toHaveClass('custom-tooltip');
    });
  });

  it('renders rich content', async () => {
    render(
      <Tooltip
        content={
          <div>
            <strong>标题</strong>
            <p>描述内容</p>
          </div>
        }
      >
        <button>触发按钮</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('标题')).toBeInTheDocument();
      expect(screen.getByText('描述内容')).toBeInTheDocument();
    });
  });

  it('preserves original onMouseEnter and onMouseLeave handlers', async () => {
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();

    render(
      <Tooltip content="提示内容">
        <button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          触发按钮
        </button>
      </Tooltip>
    );

    fireEvent.mouseEnter(screen.getByRole('button'));
    expect(onMouseEnter).toHaveBeenCalled();

    fireEvent.mouseLeave(screen.getByRole('button'));
    expect(onMouseLeave).toHaveBeenCalled();
  });
});

