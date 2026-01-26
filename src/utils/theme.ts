/**
 * 主题工具函数
 * 支持手动设置深色模式和浅色模式
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
 * 
 * @deprecated 此功能已废弃。组件库不再支持自动跟随系统主题。
 * 请使用 setDarkMode() 和 removeDarkMode() 手动控制主题。
 * 
 * @returns 返回清理函数（空函数，无实际效果）
 */
export function followSystemTheme(): () => void {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      'followSystemTheme() 已废弃。组件库不再支持自动跟随系统主题。' +
      '请使用 setDarkMode() 和 removeDarkMode() 手动控制主题。'
    );
  }
  // 返回空函数，不再实际跟随系统主题
  return () => {};
}
