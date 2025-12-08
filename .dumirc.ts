import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Apron Design',
  favicons: ['/react/images/icon.svg'],
  logo: '/react/images/logo-light.svg',
  outputPath: 'docs-dist',
  hash: true,
  base: '/react/',
  publicPath: '/react/',
  locales: [
    { id: 'zh-CN', name: '中文' },
  ],
  themeConfig: {
    carrier: 'dumi',
    nav: [
      { title: '组件', link: '/react/components' },
      { title: 'GitHub', link: 'https://github.com/apron-design/react' },
    ],
    footer: `Copyright ©2022~${new Date().getFullYear()} Apron Design React | With offontime.com | Docs built with Dumi`,
  },
  resolve: {
    docDirs: ['docs'],
    atomDirs: [{ type: 'component', dir: 'src/components' }],
  },


  alias: {
    '@apron-design/react': require('path').resolve(__dirname, './src'),
    '@apron-design/react/styles': require('path').resolve(__dirname, './src/styles/index.scss'),
  },
  // 自定义样式配置
  styles: [
    '/assets/style.css',
    '/assets/custom.scss',
    '/theme/layout.less',
    '/theme/notfound.less',
    '/theme/styles/theme.less'
  ],
  // 主题变量配置
  theme: {
    '@c-primary': '#4C9EEA',
    '@c-primary-hover': '#3182CE',
    '@c-primary-active': '#2468AC',
    '@c-heading': '#1d1d1d',
    '@c-text': '#444',
    '@c-text-secondary': '#666',
    '@c-border': '#e5e5e5',
    '@c-border-light': '#f0f0f0',
    '@c-bg': '#ffffff',
    '@c-bg-light': '#f7f8fa',
  },
  // 配置额外的 less 变量
  lessLoader: {
    modifyVars: {
      '@c-primary': '#4C9EEA',
      '@c-primary-hover': '#3182CE',
      '@c-primary-active': '#2468AC',
      '@c-heading': '#1d1d1d',
      '@c-text': '#444',
      '@c-text-secondary': '#666',
      '@c-border': '#e5e5e5',
      '@c-border-light': '#f0f0f0',
      '@c-bg': '#ffffff',
      '@c-bg-light': '#f7f8fa',
    },
    javascriptEnabled: true,
  },
  // 添加自定义脚本
  scripts: [
    `
    document.addEventListener('DOMContentLoaded', function() {
      // 添加平滑滚动效果
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    });
    `,
  ],
});