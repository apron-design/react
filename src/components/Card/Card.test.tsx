import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

describe('Card', () => {
  it('renders correctly', () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('has apron-card class', () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toHaveClass('apron-card');
  });

  it('applies custom className', () => {
    render(<Card className="custom-class" data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toHaveClass('custom-class');
  });

  it('passes additional props', () => {
    render(<Card data-testid="card" aria-label="Card">Content</Card>);
    expect(screen.getByTestId('card')).toHaveAttribute('aria-label', 'Card');
  });
});

describe('CardHeader', () => {
  it('renders correctly', () => {
    render(<CardHeader data-testid="header" />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<CardHeader title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders extra content', () => {
    render(<CardHeader extra={<button>Action</button>} />);
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('renders both title and extra', () => {
    render(<CardHeader title="Title" extra={<span>Extra</span>} />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Extra')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<CardHeader>Header Children</CardHeader>);
    expect(screen.getByText('Header Children')).toBeInTheDocument();
  });

  it('has apron-card__header class', () => {
    render(<CardHeader data-testid="header" />);
    expect(screen.getByTestId('header')).toHaveClass('apron-card__header');
  });

  it('applies custom className', () => {
    render(<CardHeader className="custom-class" data-testid="header" />);
    expect(screen.getByTestId('header')).toHaveClass('custom-class');
  });

  it('title has correct class', () => {
    const { container } = render(<CardHeader title="Title" />);
    expect(container.querySelector('.apron-card__header-title')).toHaveTextContent('Title');
  });

  it('extra has correct class', () => {
    const { container } = render(<CardHeader extra={<span>Extra</span>} />);
    expect(container.querySelector('.apron-card__header-extra')).toBeInTheDocument();
  });
});

describe('CardBody', () => {
  it('renders correctly', () => {
    render(<CardBody data-testid="body">Content</CardBody>);
    expect(screen.getByTestId('body')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<CardBody>Body Content</CardBody>);
    expect(screen.getByText('Body Content')).toBeInTheDocument();
  });

  it('has apron-card__body class', () => {
    render(<CardBody data-testid="body">Content</CardBody>);
    expect(screen.getByTestId('body')).toHaveClass('apron-card__body');
  });

  it('applies custom className', () => {
    render(<CardBody className="custom-class" data-testid="body">Content</CardBody>);
    expect(screen.getByTestId('body')).toHaveClass('custom-class');
  });

  it('passes additional props', () => {
    render(<CardBody data-testid="body" aria-label="Body">Content</CardBody>);
    expect(screen.getByTestId('body')).toHaveAttribute('aria-label', 'Body');
  });
});

describe('CardFooter', () => {
  it('renders correctly', () => {
    render(<CardFooter data-testid="footer">Content</CardFooter>);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<CardFooter>Footer Content</CardFooter>);
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('has apron-card__footer class', () => {
    render(<CardFooter data-testid="footer">Content</CardFooter>);
    expect(screen.getByTestId('footer')).toHaveClass('apron-card__footer');
  });

  it('applies custom className', () => {
    render(<CardFooter className="custom-class" data-testid="footer">Content</CardFooter>);
    expect(screen.getByTestId('footer')).toHaveClass('custom-class');
  });

  it('passes additional props', () => {
    render(<CardFooter data-testid="footer" aria-label="Footer">Content</CardFooter>);
    expect(screen.getByTestId('footer')).toHaveAttribute('aria-label', 'Footer');
  });
});

describe('Card composition', () => {
  it('renders complete card with all parts', () => {
    render(
      <Card data-testid="card">
        <CardHeader title="Title" extra={<span>Extra</span>} />
        <CardBody>Body Content</CardBody>
        <CardFooter>Footer Content</CardFooter>
      </Card>
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Extra')).toBeInTheDocument();
    expect(screen.getByText('Body Content')).toBeInTheDocument();
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('renders card with only header and body', () => {
    render(
      <Card>
        <CardHeader title="Title" />
        <CardBody>Body Content</CardBody>
      </Card>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Body Content')).toBeInTheDocument();
  });

  it('renders card with only body', () => {
    render(
      <Card>
        <CardBody>Body Only</CardBody>
      </Card>
    );

    expect(screen.getByText('Body Only')).toBeInTheDocument();
  });
});

