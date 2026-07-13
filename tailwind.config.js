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
        // OPENOpportunity design system tokens
        open: {
          ink: '#090b09',
          surface: '#11150e',
          olive: '#6b8735',
          lime: '#b7df38',
          cream: '#f6f1e7',
          orange: '#d97757',
          sky: '#6a9bcc',
          gray: '#b0aea5',
        },
        // OPENOpportunity brand tokens
        brand: {
          black: '#090b09',
          orange: '#d97757',
          white: '#f6f1e7',
          // Chrome / metallic shades mapped to organic values
          chrome: {
            50:  '#f6f1e7',
            100: '#e1dbcf',
            200: '#c5beb1',
            300: '#a7a195',
            400: '#8c867a',
            500: '#716c62',
            600: '#565249',
            700: '#3a3832',
            800: '#1d1c19',
            900: '#11150e',
          },
        },
      },
      backgroundImage: {
        'chrome-gradient':
          'linear-gradient(135deg, #11150e 0%, #1a2214 25%, #090b09 50%, #1a2214 75%, #11150e 100%)',
        'orange-glow':
          'radial-gradient(circle, rgba(217,119,87,0.25) 0%, transparent 70%)',
        'lime-glow':
          'radial-gradient(circle, rgba(183,223,56,0.15) 0%, transparent 70%)',
      },
      fontFamily: {
        display: ['Poppins', 'Arial Black', 'sans-serif'],
        editorial: ['Lora', 'Georgia', 'serif'],
        utility: ['Inter', 'system-ui', 'sans-serif'],
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
