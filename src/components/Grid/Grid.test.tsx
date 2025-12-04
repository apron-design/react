import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Row } from './Row';
import { Col } from './Col';

describe('Grid', () => {
  describe('Row', () => {
    it('renders children correctly', () => {
      render(
        <Row>
          <Col span={12}>Content</Col>
        </Row>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies justify class', () => {
      const { container } = render(
        <Row justify="center">
          <Col span={12}>Content</Col>
        </Row>
      );
      expect(container.firstChild).toHaveClass('apron-row--justify-center');
    });

    it('applies align class', () => {
      const { container } = render(
        <Row align="middle">
          <Col span={12}>Content</Col>
        </Row>
      );
      expect(container.firstChild).toHaveClass('apron-row--align-middle');
    });

    it('applies no-wrap class', () => {
      const { container } = render(
        <Row wrap={false}>
          <Col span={12}>Content</Col>
        </Row>
      );
      expect(container.firstChild).toHaveClass('apron-row--no-wrap');
    });

    it('applies gutter styles', () => {
      const { container } = render(
        <Row gutter={16}>
          <Col span={12}>Content</Col>
        </Row>
      );
      const row = container.firstChild as HTMLElement;
      expect(row.style.marginLeft).toBe('-8px');
      expect(row.style.marginRight).toBe('-8px');
    });

    it('applies vertical gutter', () => {
      const { container } = render(
        <Row gutter={[16, 24]}>
          <Col span={12}>Content</Col>
        </Row>
      );
      const row = container.firstChild as HTMLElement;
      expect(row.style.rowGap).toBe('24px');
    });
  });

  describe('Col', () => {
    it('renders children correctly', () => {
      render(
        <Row>
          <Col span={12}>Content</Col>
        </Row>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies span class', () => {
      const { container } = render(
        <Row>
          <Col span={12}>Content</Col>
        </Row>
      );
      const col = container.querySelector('.apron-col');
      expect(col).toHaveClass('apron-col-12');
    });

    it('applies offset class', () => {
      const { container } = render(
        <Row>
          <Col span={12} offset={6}>Content</Col>
        </Row>
      );
      const col = container.querySelector('.apron-col');
      expect(col).toHaveClass('apron-col-offset-6');
    });

    it('applies push and pull classes', () => {
      const { container } = render(
        <Row>
          <Col span={12} push={6} pull={6}>Content</Col>
        </Row>
      );
      const col = container.querySelector('.apron-col');
      expect(col).toHaveClass('apron-col-push-6');
      expect(col).toHaveClass('apron-col-pull-6');
    });

    it('applies order class', () => {
      const { container } = render(
        <Row>
          <Col span={12} order={2}>Content</Col>
        </Row>
      );
      const col = container.querySelector('.apron-col');
      expect(col).toHaveClass('apron-col-order-2');
    });

    it('applies responsive classes', () => {
      const { container } = render(
        <Row>
          <Col xs={24} sm={12} md={8} lg={6}>Content</Col>
        </Row>
      );
      const col = container.querySelector('.apron-col');
      expect(col).toHaveClass('apron-col-xs-24');
      expect(col).toHaveClass('apron-col-sm-12');
      expect(col).toHaveClass('apron-col-md-8');
      expect(col).toHaveClass('apron-col-lg-6');
    });

    it('applies responsive object classes', () => {
      const { container } = render(
        <Row>
          <Col xs={{ span: 24, offset: 0 }} md={{ span: 12, offset: 6 }}>Content</Col>
        </Row>
      );
      const col = container.querySelector('.apron-col');
      expect(col).toHaveClass('apron-col-xs-24');
      expect(col).toHaveClass('apron-col-xs-offset-0');
      expect(col).toHaveClass('apron-col-md-12');
      expect(col).toHaveClass('apron-col-md-offset-6');
    });

    it('applies flex style', () => {
      const { container } = render(
        <Row>
          <Col flex="auto">Content</Col>
        </Row>
      );
      const col = container.querySelector('.apron-col') as HTMLElement;
      expect(col.style.flex).toBe('auto');
    });

    it('applies gutter padding from Row context', () => {
      const { container } = render(
        <Row gutter={16}>
          <Col span={12}>Content</Col>
        </Row>
      );
      const col = container.querySelector('.apron-col') as HTMLElement;
      expect(col.style.paddingLeft).toBe('8px');
      expect(col.style.paddingRight).toBe('8px');
    });
  });
});

