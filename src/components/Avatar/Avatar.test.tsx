import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';
import { AvatarGroup } from './AvatarGroup';

describe('Avatar', () => {
  // ============================================
  // Basic Rendering
  // ============================================
  it('renders correctly', () => {
    render(<Avatar data-testid="avatar">A</Avatar>);
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('renders children text', () => {
    render(<Avatar>U</Avatar>);
    expect(screen.getByText('U')).toBeInTheDocument();
  });

  it('renders children icon', () => {
    render(
      <Avatar>
        <svg data-testid="icon" />
      </Avatar>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders image when src is provided', () => {
    render(<Avatar src="test.jpg" alt="Test Avatar" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'test.jpg');
    expect(img).toHaveAttribute('alt', 'Test Avatar');
  });

  // ============================================
  // Sizes
  // ============================================
  it('applies middle size by default', () => {
    render(<Avatar data-testid="avatar">A</Avatar>);
    expect(screen.getByTestId('avatar')).toHaveClass('apron-avatar--middle');
  });

  it('applies mini size class', () => {
    render(<Avatar size="mini" data-testid="avatar">A</Avatar>);
    expect(screen.getByTestId('avatar')).toHaveClass('apron-avatar--mini');
  });

  it('applies small size class', () => {
    render(<Avatar size="small" data-testid="avatar">A</Avatar>);
    expect(screen.getByTestId('avatar')).toHaveClass('apron-avatar--small');
  });

  it('applies middle size class', () => {
    render(<Avatar size="middle" data-testid="avatar">A</Avatar>);
    expect(screen.getByTestId('avatar')).toHaveClass('apron-avatar--middle');
  });

  it('applies large size class', () => {
    render(<Avatar size="large" data-testid="avatar">A</Avatar>);
    expect(screen.getByTestId('avatar')).toHaveClass('apron-avatar--large');
  });

  // ============================================
  // Shape
  // ============================================
  it('is circle by default (no square class)', () => {
    render(<Avatar data-testid="avatar">A</Avatar>);
    expect(screen.getByTestId('avatar')).not.toHaveClass('apron-avatar--square');
  });

  it('applies square class when square prop is true', () => {
    render(<Avatar square data-testid="avatar">A</Avatar>);
    expect(screen.getByTestId('avatar')).toHaveClass('apron-avatar--square');
  });

  // ============================================
  // Image Props
  // ============================================
  it('passes imgProps to image element', () => {
    render(
      <Avatar
        src="test.jpg"
        imgProps={{ 'data-testid': 'avatar-img', loading: 'lazy' }}
      />
    );
    const img = screen.getByTestId('avatar-img');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  // ============================================
  // Custom Props
  // ============================================
  it('applies custom className', () => {
    render(<Avatar className="custom-class" data-testid="avatar">A</Avatar>);
    expect(screen.getByTestId('avatar')).toHaveClass('custom-class');
  });

  it('applies custom style', () => {
    render(
      <Avatar style={{ backgroundColor: 'red' }} data-testid="avatar">
        A
      </Avatar>
    );
    expect(screen.getByTestId('avatar')).toHaveStyle('background-color: red');
  });

  it('passes additional props to the element', () => {
    render(<Avatar data-testid="avatar" aria-label="User avatar">A</Avatar>);
    expect(screen.getByTestId('avatar')).toHaveAttribute('aria-label', 'User avatar');
  });
});

describe('AvatarGroup', () => {
  it('renders correctly', () => {
    render(<AvatarGroup data-testid="avatar-group" />);
    expect(screen.getByTestId('avatar-group')).toBeInTheDocument();
  });

  it('renders children avatars', () => {
    render(
      <AvatarGroup>
        <Avatar data-testid="avatar-1">A</Avatar>
        <Avatar data-testid="avatar-2">B</Avatar>
        <Avatar data-testid="avatar-3">C</Avatar>
      </AvatarGroup>
    );
    expect(screen.getByTestId('avatar-1')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-2')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-3')).toBeInTheDocument();
  });

  it('has apron-avatar-group class', () => {
    render(<AvatarGroup data-testid="avatar-group" />);
    expect(screen.getByTestId('avatar-group')).toHaveClass('apron-avatar-group');
  });

  it('applies custom className', () => {
    render(<AvatarGroup className="custom-class" data-testid="avatar-group" />);
    expect(screen.getByTestId('avatar-group')).toHaveClass('custom-class');
  });

  it('passes additional props to the element', () => {
    render(
      <AvatarGroup data-testid="avatar-group" aria-label="User avatars">
        <Avatar>A</Avatar>
      </AvatarGroup>
    );
    expect(screen.getByTestId('avatar-group')).toHaveAttribute('aria-label', 'User avatars');
  });
});

