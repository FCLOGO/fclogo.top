/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
    `./src/templates/**/*.{js,jsx,ts,tsx}`
  ],
  darkMode: 'class',
  theme: {
    screens: {
      map: { max: '680px' },
      tablet: { max: '992px' },
      desktop: { min: '992px' }
    },
    fontFamily: {
      sans: [
        'metropolis',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      mono: [
        'JetBrainsMono',
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace'
      ]
    },
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      blue: '#2D2CDD',
      gray: '#F6F8FA',
      'gray-1': '#E5E7EB',
      'dark-gray': '#24292F',
      'light-gray': '#6E7781',
      'gray-2': '#D1D5D9',
      green: '#4AD295',
      'light-green': '#2EE895',
      modal: 'rgba(14, 42, 71, 0.8)'
    },
    spacing: {
      zero: '0px',
      mini: '2px',
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
      header: '60px',
      aside: '480px'
    },
    extend: {
      boxShadow: {
        card: '2px 4px 12px rgba(0,0,0,.06)',
        'card-h': '2px 4px 16px rgba(0,0,0,.12)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
