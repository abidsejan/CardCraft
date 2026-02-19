/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'ui-sans-serif', 'system-ui'],
        body: ['Manrope', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        soft: '0 24px 64px -28px rgba(4, 32, 34, 0.45)',
        panel: '0 20px 55px -26px rgba(16, 24, 40, 0.45)',
        glow: '0 0 0 1px rgba(255,255,255,0.25), 0 18px 45px -22px rgba(14, 116, 144, 0.45)'
      },
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          900: '#042f2e'
        }
      }
    }
  },
  plugins: []
};
