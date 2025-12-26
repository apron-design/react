import type { Preview } from '@storybook/react';
import React, { useEffect, useRef } from 'react';
import '../src/styles/index.scss';
import { setDarkMode, removeDarkMode, followSystemTheme } from '../src/utils/theme';

const THEME_KEY = 'apron-theme';
const SYSTEM_THEME_KEY = 'apron-follow-system-theme';

// 获取初始主题值
const getInitialTheme = (): 'light' | 'dark' | 'system' => {
  if (typeof window === 'undefined') {
    return 'light';
  }
  const followSystem = localStorage.getItem(SYSTEM_THEME_KEY) === 'true';
  if (followSystem) {
    return 'system';
  }
  const savedTheme = localStorage.getItem(THEME_KEY);
  return savedTheme === 'dark' ? 'dark' : 'light';
};

// 初始化主题（在模块加载时执行）
if (typeof window !== 'undefined') {
  const initialTheme = getInitialTheme();
  if (initialTheme === 'system') {
    followSystemTheme();
  } else if (initialTheme === 'dark') {
    setDarkMode();
  } else {
    removeDarkMode();
  }
}

// 主题装饰器
const ThemeDecorator = (Story: any, context: any) => {
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    const theme = context.globals.theme || getInitialTheme();

    // 清理之前的监听器
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = undefined;
    }

    if (theme === 'system') {
      // 跟随系统主题
      cleanupRef.current = followSystemTheme();
      localStorage.setItem(SYSTEM_THEME_KEY, 'true');
    } else {
      // 手动设置主题
      localStorage.setItem(SYSTEM_THEME_KEY, 'false');
      if (theme === 'dark') {
        setDarkMode();
        localStorage.setItem(THEME_KEY, 'dark');
      } else {
        removeDarkMode();
        localStorage.setItem(THEME_KEY, 'light');
      }
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = undefined;
      }
    };
  }, [context.globals.theme]);

  return React.createElement(Story);
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#18181b' },
        { name: 'gray', value: '#f4f4f5' },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: '主题设置',
      defaultValue: getInitialTheme(),
      toolbar: {
        title: '主题',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: '浅色模式 ☀️', icon: 'sun' },
          { value: 'dark', title: '深色模式 🌙', icon: 'moon' },
          { value: 'system', title: '跟随系统 🖥️', icon: 'computer' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [ThemeDecorator],
};

export default preview;

