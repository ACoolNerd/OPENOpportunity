/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // OPENOpportunity brand tokens
        brand: {
          black: '#000000',
          orange: '#FF6600',
          white: '#FFFFFF',
          // Chrome / metallic shades
          chrome: {
            50:  '#F8F8F8',
            100: '#E8E8E8',
            200: '#C8C8C8',
            300: '#A8A8A8',
            400: '#888888',
            500: '#686868',
            600: '#484848',
            700: '#282828',
            800: '#181818',
            900: '#0A0A0A',
          },
        },
      },
      backgroundImage: {
        'chrome-gradient':
          'linear-gradient(135deg, #1a1a1a 0%, #2e2e2e 25%, #0d0d0d 50%, #2e2e2e 75%, #1a1a1a 100%)',
        'orange-glow':
          'radial-gradient(circle, rgba(255,102,0,0.3) 0%, transparent 70%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          from: { boxShadow: '0 0 10px #FF6600, 0 0 20px #FF6600' },
          to:   { boxShadow: '0 0 20px #FF6600, 0 0 40px #FF6600' },
        },
      },
    },
  },
  plugins: [],
};
