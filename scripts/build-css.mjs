import * as sass from 'sass';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

// 编译 SCSS 为 CSS
function compileSCSS() {
  const scssFile = resolve(projectRoot, 'src/styles/index.scss');
  const cssFile = resolve(projectRoot, 'dist/index.css');
  const cssMapFile = resolve(projectRoot, 'dist/index.css.map');

  try {
    console.log('Compiling SCSS...');
    const result = sass.compile(scssFile, {
      style: 'expanded',
      sourceMap: true,
      loadPaths: [resolve(projectRoot, 'src')],
    });

    // 确保 dist 目录存在
    const distDir = resolve(projectRoot, 'dist');
    if (!existsSync(distDir)) {
      mkdirSync(distDir, { recursive: true });
    }

    // 写入 CSS 文件
    writeFileSync(cssFile, result.css);
    
    // 写入 source map
    if (result.sourceMap) {
      writeFileSync(cssMapFile, JSON.stringify(result.sourceMap));
    }

    console.log('✓ SCSS compiled successfully');
  } catch (error) {
    console.error('✗ SCSS compilation failed:', error);
    process.exit(1);
  }
}

compileSCSS();
