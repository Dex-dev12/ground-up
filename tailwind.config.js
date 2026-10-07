/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#2C4A3B',
        'primary-dark': '#1E332A',
        'primary-light': '#4F7161',
        accent: '#A7ACB2',
        'accent-dark': '#6D6E71',
        background: '#E0E2E4',
        surface: '#FFFFFF',
        ink: '#1A1F1C',
        muted: '#6B6F68',
        divider: '#C9CDD1',
        deep: '#10140F',
        earth: '#838D83',
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        serif: ['Montserrat', 'sans-serif'],
        body: ['"Exo 2"', 'system-ui', 'sans-serif'],
        mono: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '4rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
