import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Apron Design',
  favicons: ['/react/images/logo-light.svg'],
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