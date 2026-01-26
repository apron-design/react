import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: false, // 不清理，保留 CSS 文件
  external: ['react', 'react-dom'],
  injectStyle: false,
  treeshake: true,
  minify: false,
  // 使用 empty loader 来忽略 SCSS 文件，避免 esbuild 处理它们
  loader: {
    '.scss': 'empty',
  },
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
    // 忽略 SCSS 相关的警告
    options.logOverride = {
      'js-comment-in-css': 'silent',
      'css-syntax-error': 'silent',
      'ignored-bare-import': 'silent',
    };
  },
});
