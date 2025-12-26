/**
 * 主题工具函数
 * 支持手动设置深色模式和跟随系统主题自动切换
 */

/**
 * 设置为深色模式
 */
export function setDarkMode(): void {
  if (typeof document !== 'undefined') {
    document.body.setAttribute('apron-theme', 'dark');
  }
}

/**
 * 恢复浅色模式（移除深色模式）
 */
export function removeDarkMode(): void {
  if (typeof document !== 'undefined') {
    document.body.removeAttribute('apron-theme');
  }
}

/**
 * 切换深色模式
 */
export function toggleDarkMode(): void {
  if (typeof document !== 'undefined') {
    if (document.body.getAttribute('apron-theme') === 'dark') {
      removeDarkMode();
    } else {
      setDarkMode();
    }
  }
}

/**
 * 检查当前是否为深色模式
 */
export function isDarkMode(): boolean {
  if (typeof document === 'undefined') {
    return false;
  }
  return document.body.getAttribute('apron-theme') === 'dark';
}

/**
 * 跟随系统主题自动切换
 * 当系统主题改变时，自动更新 apron-theme 属性
 * 
 * @returns 返回清理函数，用于移除事件监听器
 */
export function followSystemTheme(): () => void {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return () => {};
  }

  const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');

  const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
    if (e.matches) {
      document.body.setAttribute('apron-theme', 'dark');
    } else {
      document.body.removeAttribute('apron-theme');
    }
  };

  // 初始设置
  handleChange(darkThemeMq);

  // 监听变化
  if (darkThemeMq.addEventListener) {
    darkThemeMq.addEventListener('change', handleChange);
    return () => {
      darkThemeMq.removeEventListener('change', handleChange);
    };
  } else {
    // 兼容旧版浏览器
    darkThemeMq.addListener(handleChange);
    return () => {
      darkThemeMq.removeListener(handleChange);
    };
  }
}

