/**
 * 主题工具函数
 * 支持手动设置深色模式和跟随系统主题自动切换
 */

// 存储跟随系统主题的清理函数
let systemThemeCleanup: (() => void) | undefined;

/**
 * 停止跟随系统主题
 */
function stopFollowingSystemTheme(): void {
  if (systemThemeCleanup) {
    systemThemeCleanup();
    systemThemeCleanup = undefined;
  }
}

/**
 * 设置为深色模式
 * 调用此函数会自动停止跟随系统主题
 */
export function setDarkMode(): void {
  if (typeof document !== 'undefined') {
    // 停止跟随系统主题，因为用户手动设置了
    stopFollowingSystemTheme();
    document.body.setAttribute('apron-theme', 'dark');
  }
}

/**
 * 恢复浅色模式（移除深色模式）
 * 调用此函数会自动停止跟随系统主题
 */
export function removeDarkMode(): void {
  if (typeof document !== 'undefined') {
    // 停止跟随系统主题，因为用户手动设置了
    stopFollowingSystemTheme();
    document.body.removeAttribute('apron-theme');
  }
}

/**
 * 切换深色模式
 * 调用此函数会自动停止跟随系统主题
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
 * 注意：如果之后调用了 setDarkMode() 或 removeDarkMode()，会自动停止跟随系统主题
 * 
 * @returns 返回清理函数，用于移除事件监听器
 */
export function followSystemTheme(): () => void {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return () => {};
  }

  // 如果已经有监听器在运行，先清理
  stopFollowingSystemTheme();

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
    systemThemeCleanup = () => {
      darkThemeMq.removeEventListener('change', handleChange);
    };
  } else {
    // 兼容旧版浏览器
    darkThemeMq.addListener(handleChange);
    systemThemeCleanup = () => {
      darkThemeMq.removeListener(handleChange);
    };
  }

  return () => {
    stopFollowingSystemTheme();
  };
}

