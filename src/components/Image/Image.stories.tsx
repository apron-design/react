import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './Image';

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: '图片地址',
    },
    alt: {
      control: 'text',
      description: '图片替代文本',
    },
    objectFit: {
      control: 'select',
      options: ['contain', 'cover', 'fill', 'none', 'scale-down'],
      description: '图片填充方式',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

// ============================================
// Default (无 src)
// ============================================
export const Default: Story = {
  render: () => (
    <Image style={{ width: '200px', height: '150px' }} />
  ),
  name: '默认（无图片）',
};

// ============================================
// 正常加载
// ============================================
export const WithSrc: Story = {
  render: () => (
    <Image
      src="https://picsum.photos/400/300"
      alt="示例图片"
      style={{ width: '400px', height: '300px' }}
    />
  ),
  name: '正常图片',
};

export const SmallImage: Story = {
  render: () => (
    <Image
      src="https://picsum.photos/200/150"
      alt="小图片"
      style={{ width: '200px', height: '150px' }}
    />
  ),
  name: '小尺寸图片',
};

export const LargeImage: Story = {
  render: () => (
    <Image
      src="https://picsum.photos/800/400"
      alt="大图片"
      style={{ width: '100%', maxWidth: '800px', height: '400px' }}
    />
  ),
  name: '大尺寸图片',
};

// ============================================
// 加载失败
// ============================================
export const LoadError: Story = {
  render: () => (
    <Image
      src="https://invalid-url-that-will-fail.com/image.jpg"
      alt="加载失败"
      style={{ width: '200px', height: '150px' }}
    />
  ),
  name: '加载失败',
};

// ============================================
// objectFit
// ============================================
export const ObjectFitCover: Story = {
  render: () => (
    <Image
      src="https://picsum.photos/400/600"
      alt="Cover"
      objectFit="cover"
      style={{ width: '200px', height: '150px' }}
    />
  ),
  name: 'objectFit: cover',
};

export const ObjectFitContain: Story = {
  render: () => (
    <Image
      src="https://picsum.photos/400/600"
      alt="Contain"
      objectFit="contain"
      style={{ width: '200px', height: '150px' }}
    />
  ),
  name: 'objectFit: contain',
};

export const ObjectFitFill: Story = {
  render: () => (
    <Image
      src="https://picsum.photos/400/600"
      alt="Fill"
      objectFit="fill"
      style={{ width: '200px', height: '150px' }}
    />
  ),
  name: 'objectFit: fill',
};

export const ObjectFitNone: Story = {
  render: () => (
    <div style={{ overflow: 'hidden' }}>
      <Image
        src="https://picsum.photos/400/600"
        alt="None"
        objectFit="none"
        style={{ width: '200px', height: '150px' }}
      />
    </div>
  ),
  name: 'objectFit: none',
};

export const ObjectFitScaleDown: Story = {
  render: () => (
    <Image
      src="https://picsum.photos/400/600"
      alt="Scale Down"
      objectFit="scale-down"
      style={{ width: '200px', height: '150px' }}
    />
  ),
  name: 'objectFit: scale-down',
};

export const AllObjectFit: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>cover（默认）</p>
        <Image
          src="https://picsum.photos/400/600"
          alt="Cover"
          objectFit="cover"
          style={{ width: '150px', height: '100px' }}
        />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>contain</p>
        <Image
          src="https://picsum.photos/400/600"
          alt="Contain"
          objectFit="contain"
          style={{ width: '150px', height: '100px' }}
        />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>fill</p>
        <Image
          src="https://picsum.photos/400/600"
          alt="Fill"
          objectFit="fill"
          style={{ width: '150px', height: '100px' }}
        />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>scale-down</p>
        <Image
          src="https://picsum.photos/400/600"
          alt="Scale Down"
          objectFit="scale-down"
          style={{ width: '150px', height: '100px' }}
        />
      </div>
    </div>
  ),
  name: 'objectFit 对比',
};

// ============================================
// 多个图片
// ============================================
export const Gallery: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Image
        src="https://picsum.photos/200/150?random=1"
        alt="图片1"
        style={{ width: '200px', height: '150px' }}
      />
      <Image
        src="https://picsum.photos/200/150?random=2"
        alt="图片2"
        style={{ width: '200px', height: '150px' }}
      />
      <Image
        src="https://picsum.photos/200/150?random=3"
        alt="图片3"
        style={{ width: '200px', height: '150px' }}
      />
      <Image
        style={{ width: '200px', height: '150px' }}
      />
    </div>
  ),
  name: '图片画廊',
};

// ============================================
// Dark Mode
// ============================================
export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      style={{
        padding: '32px',
        backgroundColor: '#18181b',
        borderRadius: '12px',
        display: 'flex',
        gap: '24px',
        flexWrap: 'wrap',
      }}
    >
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#a1a1aa', fontSize: '14px' }}>无图片</p>
        <Image style={{ width: '150px', height: '100px' }} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#a1a1aa', fontSize: '14px' }}>正常图片</p>
        <Image
          src="https://picsum.photos/150/100?random=dark"
          alt="暗色模式图片"
          style={{ width: '150px', height: '100px' }}
        />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', color: '#a1a1aa', fontSize: '14px' }}>加载失败</p>
        <Image
          src="https://invalid-url.com/fail.jpg"
          alt="失败"
          style={{ width: '150px', height: '100px' }}
        />
      </div>
    </div>
  ),
  name: '暗色模式',
};

// ============================================
// Overview
// ============================================
export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>状态</h3>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>无图片</p>
            <Image style={{ width: '150px', height: '100px' }} />
          </div>
          <div>
            <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>正常加载</p>
            <Image
              src="https://picsum.photos/150/100?random=overview"
              alt="正常"
              style={{ width: '150px', height: '100px' }}
            />
          </div>
          <div>
            <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>加载失败</p>
            <Image
              src="https://invalid.com/fail.jpg"
              alt="失败"
              style={{ width: '150px', height: '100px' }}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#393939' }}>objectFit</h3>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>cover</p>
            <Image
              src="https://picsum.photos/300/500?random=fit1"
              alt="Cover"
              objectFit="cover"
              style={{ width: '120px', height: '80px' }}
            />
          </div>
          <div>
            <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>contain</p>
            <Image
              src="https://picsum.photos/300/500?random=fit2"
              alt="Contain"
              objectFit="contain"
              style={{ width: '120px', height: '80px' }}
            />
          </div>
          <div>
            <p style={{ margin: '0 0 8px 0', color: '#71717a', fontSize: '14px' }}>fill</p>
            <Image
              src="https://picsum.photos/300/500?random=fit3"
              alt="Fill"
              objectFit="fill"
              style={{ width: '120px', height: '80px' }}
            />
          </div>
        </div>
      </div>
    </div>
  ),
  name: '完整概览',
};

