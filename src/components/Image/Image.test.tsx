import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Image } from './Image';

describe('Image', () => {
  // ============================================
  // Basic Rendering
  // ============================================
  it('renders without src', () => {
    const { container } = render(<Image />);
    expect(container.querySelector('.apron-image')).toBeInTheDocument();
  });

  it('renders placeholder icon when no src', () => {
    const { container } = render(<Image />);
    expect(container.querySelector('.apron-image__icon svg')).toBeInTheDocument();
  });

  it('does not show text when no src', () => {
    const { container } = render(<Image />);
    expect(container.querySelector('.apron-image__text')).not.toBeInTheDocument();
  });

  it('has placeholder class when no src', () => {
    const { container } = render(<Image />);
    expect(container.querySelector('.apron-image')).toHaveClass('apron-image--placeholder');
  });

  // ============================================
  // With Src
  // ============================================
  it('renders img element when src is provided', () => {
    render(<Image src="test.jpg" alt="Test" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('shows loading text initially when src is provided', () => {
    render(<Image src="test.jpg" alt="Test" />);
    expect(screen.getByText('图片加载中')).toBeInTheDocument();
  });

  it('passes alt attribute to img element', () => {
    render(<Image src="test.jpg" alt="Test Image" />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test Image');
  });

  it('passes src attribute to img element', () => {
    render(<Image src="test.jpg" alt="Test" />);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test.jpg');
  });

  // ============================================
  // Loading States
  // ============================================
  it('removes placeholder after successful load', async () => {
    const { container } = render(<Image src="test.jpg" alt="Test" />);
    
    const img = screen.getByRole('img');
    fireEvent.load(img);
    
    await waitFor(() => {
      expect(container.querySelector('.apron-image__text')).not.toBeInTheDocument();
    });
  });

  it('shows error state after load failure', async () => {
    render(<Image src="invalid.jpg" alt="Test" />);
    
    const img = screen.getByRole('img');
    fireEvent.error(img);
    
    await waitFor(() => {
      expect(screen.getByText('图片加载失败')).toBeInTheDocument();
    });
  });

  it('calls onLoad callback when image loads', () => {
    const handleLoad = vi.fn();
    render(<Image src="test.jpg" alt="Test" onLoad={handleLoad} />);
    
    const img = screen.getByRole('img');
    fireEvent.load(img);
    
    expect(handleLoad).toHaveBeenCalledTimes(1);
  });

  it('calls onError callback when image fails', () => {
    const handleError = vi.fn();
    render(<Image src="invalid.jpg" alt="Test" onError={handleError} />);
    
    const img = screen.getByRole('img');
    fireEvent.error(img);
    
    expect(handleError).toHaveBeenCalledTimes(1);
  });

  // ============================================
  // objectFit
  // ============================================
  it('applies default objectFit cover', () => {
    render(<Image src="test.jpg" alt="Test" />);
    expect(screen.getByRole('img')).toHaveStyle('object-fit: cover');
  });

  it('applies objectFit contain', () => {
    render(<Image src="test.jpg" alt="Test" objectFit="contain" />);
    expect(screen.getByRole('img')).toHaveStyle('object-fit: contain');
  });

  it('applies objectFit fill', () => {
    render(<Image src="test.jpg" alt="Test" objectFit="fill" />);
    expect(screen.getByRole('img')).toHaveStyle('object-fit: fill');
  });

  it('applies objectFit none', () => {
    render(<Image src="test.jpg" alt="Test" objectFit="none" />);
    expect(screen.getByRole('img')).toHaveStyle('object-fit: none');
  });

  it('applies objectFit scale-down', () => {
    render(<Image src="test.jpg" alt="Test" objectFit="scale-down" />);
    expect(screen.getByRole('img')).toHaveStyle('object-fit: scale-down');
  });

  // ============================================
  // Custom Props
  // ============================================
  it('applies custom className', () => {
    const { container } = render(<Image className="custom-class" />);
    expect(container.querySelector('.apron-image')).toHaveClass('custom-class');
  });

  it('applies custom style', () => {
    const { container } = render(<Image style={{ width: '200px' }} />);
    expect(container.querySelector('.apron-image')).toHaveStyle('width: 200px');
  });

  it('passes additional img attributes', () => {
    render(<Image src="test.jpg" alt="Test" data-testid="custom-img" loading="lazy" />);
    expect(screen.getByRole('img')).toHaveAttribute('loading', 'lazy');
  });

  // ============================================
  // Src Change
  // ============================================
  it('resets to loading state when src changes', async () => {
    const { rerender } = render(<Image src="test1.jpg" alt="Test" />);
    
    const img = screen.getByRole('img');
    fireEvent.load(img);
    
    rerender(<Image src="test2.jpg" alt="Test" />);
    
    await waitFor(() => {
      expect(screen.getByText('图片加载中')).toBeInTheDocument();
    });
  });
});

