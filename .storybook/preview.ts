import type { Preview } from '@storybook/react';
import '../src/styles/index.scss';

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
};

export default preview;

