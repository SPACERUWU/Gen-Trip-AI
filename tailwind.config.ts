import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        blob: 'blob 7s infinite',
        'pulse-glow': 'pulse-glow 4s infinite ease-in-out',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px 5px rgba(168, 85, 247, 0.4)' },
          '50%': { boxShadow: '0 0 40px 15px rgba(99, 102, 241, 0.4)' },
        },
        float: {
          '0%': { transform: 'translatey(0px)' },
          '50%': { transform: 'translatey(-20px)' },
          '100%': { transform: 'translatey(0px)' },
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
