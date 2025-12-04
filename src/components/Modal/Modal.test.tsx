import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders when open is true', () => {
    render(
      <Modal open={true} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    render(
      <Modal open={false} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('renders title', () => {
    render(
      <Modal open={true} title="My Title">
        Content
      </Modal>
    );
    expect(screen.getByText('My Title')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <Modal open={true} title="Test">
        <div data-testid="modal-content">Custom content</div>
      </Modal>
    );
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(
      <Modal open={true} title="Test" footer={<button>OK</button>}>
        Content
      </Modal>
    );
    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
  });

  it('hides footer when showFooter is false', () => {
    render(
      <Modal open={true} title="Test" showFooter={false} footer={<button>OK</button>}>
        Content
      </Modal>
    );
    expect(screen.queryByRole('button', { name: 'OK' })).not.toBeInTheDocument();
  });

  it('shows close button by default', () => {
    render(
      <Modal open={true} title="Test">
        Content
      </Modal>
    );
    expect(screen.getByRole('button', { name: '关闭' })).toBeInTheDocument();
  });

  it('hides close button when closable is false', () => {
    render(
      <Modal open={true} title="Test" closable={false}>
        Content
      </Modal>
    );
    expect(screen.queryByRole('button', { name: '关闭' })).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal open={true} title="Test" onClose={onClose}>
        Content
      </Modal>
    );

    fireEvent.click(screen.getByRole('button', { name: '关闭' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked and closeByOverlay is true', () => {
    const onClose = vi.fn();
    const { container } = render(
      <Modal open={true} title="Test" onClose={onClose} closeByOverlay={true}>
        Content
      </Modal>
    );

    const wrapper = container.querySelector('.apron-modal__wrapper');
    if (wrapper) {
      fireEvent.click(wrapper);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  it('does not call onClose when overlay is clicked and closeByOverlay is false', () => {
    const onClose = vi.fn();
    const { container } = render(
      <Modal open={true} title="Test" onClose={onClose} closeByOverlay={false}>
        Content
      </Modal>
    );

    const wrapper = container.querySelector('.apron-modal__wrapper');
    if (wrapper) {
      fireEvent.click(wrapper);
      expect(onClose).not.toHaveBeenCalled();
    }
  });

  it('calls onClose when ESC key is pressed', () => {
    const onClose = vi.fn();
    render(
      <Modal open={true} title="Test" onClose={onClose}>
        Content
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on ESC when closable is false', () => {
    const onClose = vi.fn();
    render(
      <Modal open={true} title="Test" onClose={onClose} closable={false}>
        Content
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('applies custom width', () => {
    const { container } = render(
      <Modal open={true} title="Test" width={800}>
        Content
      </Modal>
    );

    const modal = container.querySelector('.apron-modal');
    expect(modal).toHaveStyle({ width: '800px' });
  });

  it('applies custom width as string', () => {
    const { container } = render(
      <Modal open={true} title="Test" width="50%">
        Content
      </Modal>
    );

    const modal = container.querySelector('.apron-modal');
    expect(modal).toHaveStyle({ width: '50%' });
  });

  it('applies centered class by default', () => {
    const { container } = render(
      <Modal open={true} title="Test">
        Content
      </Modal>
    );

    const modal = container.querySelector('.apron-modal');
    expect(modal).toHaveClass('apron-modal--centered');
  });

  it('has role dialog', () => {
    render(
      <Modal open={true} title="Test">
        Content
      </Modal>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('sets aria-modal to true', () => {
    render(
      <Modal open={true} title="Test">
        Content
      </Modal>
    );

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('disables body scroll when open', async () => {
    render(
      <Modal open={true} title="Test">
        Content
      </Modal>
    );

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  it('restores body scroll when closed', async () => {
    const { rerender } = render(
      <Modal open={true} title="Test">
        Content
      </Modal>
    );

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });

    rerender(
      <Modal open={false} title="Test">
        Content
      </Modal>
    );

    await waitFor(
      () => {
        expect(document.body.style.overflow).toBe('');
      },
      { timeout: 500 }
    );
  });

  it('applies custom className', () => {
    const { container } = render(
      <Modal open={true} title="Test" className="custom-modal">
        Content
      </Modal>
    );

    expect(container.querySelector('.apron-modal-root')).toHaveClass('custom-modal');
  });
});

