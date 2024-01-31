import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        grey_one: '#E8E8E8',
        grey_two: '#B4B4B4',
        grey_three: '#F5F5F5',
        grey_for: '#666666',
        grey_five: '#5B6B79',
        grey_six: '#EAEAEA',
        grey_seven: '#AAAAAA',
        grey_eight: '#9FA2AA',
        grey_nine: 'rgb(245, 245, 245)',
        yellow_one: '#FBBB21',
        yellow_two: '#FF9900',
        green_one: '#2CA87F',
        red_one: '#FB1837',
        black_one: '#1E1E1E',
        black_two: '#1D2630',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'login': "url('/login.png')",
        'usa' : "url('/icon/icon-usa-flag.svg')",
        'br' : "url('/icon/icon-br-flag.svg')",
      },
      spacing: {
        '0px' : '0px !important',
        '1px' : '1px',
        '7px' : '7px',
        '8px' : '8px',
        '9px' : '9px',
        '12px' : '12px',
        '15px' : '15px',
        '18px' : '18px',
        '60px': '60px',
        '10px' : '10px',
        '20px' : '20px',
        '25px' : '25px',
        '30px' : '30px',
        '32px' : '32px',
        '35px' : '35px',
        '40px' : '40px',
        '45px' : '45px',
        '50px' : '50px',
        '55px' : '55px',
        '96px' : '96px',
        '200px' : '200px',
        '350px' : '350px',
        '450px' : '450px',
        '420px' : '420px',
        '540px' : '540px',
        '200%n' : '-200%',
        '280px' : '280px',
        '32.3%' : '32.3%',
        '33.3%' : '33.3%',
        '49%' : '49%',
        '50%' : '50%',
        '100%' : '100%',
        'm15px' : '-15px',
      },
      borderWidth: {
        DEFAULT: '1px',
        '1': '1px',
        '0.5' : '.5px'
      },
      fontSize: {
        '12px': '12px',
        '14px': '14px',
        '16px': '16px',
        '20px' : '20px',
      },
      borderRadius: {
        '8px': '8px',
        '12px': '12px',
        '18px' : '18px',
        '60px': '60px',
      },
      boxShadow: {
        'profile': ' 0px 8px 24px 0px rgba(27, 46, 94, 0.12)',
        'card_product' : '0px 1px 0px 0px #F0F0F0 inset',
        'login' : ' 0px 8px 24px 0px rgba(27, 46, 94, 0.12)',
        'submenu' : ' 0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12)',
        'shadow_btn_small' : '0px 2px 0px 0px rgba(0, 0, 0, 0.04)',
        'alert_error' : '0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12)'
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
      },
      transitionDuration: {
        '0-a': '200ms !important',
        '1-a': '300ms !important',
        '3-a': '400ms !important',
        '4-a': '500ms !important',
        '5-a': '600ms !important',
        '6-a': '700ms !important',
        '7-a': '800ms !important',
        '8-a': '900ms !important',
        '9-a': '1000ms !important',
      },
      animation: {
        'show-in': 'show-in 400ms linear normal',
        'opacity-in': 'opacity-in 300ms linear normal',
      },
      keyframes: {
        'opacity-in': {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },
        'show-in': {
          '0%': { transform: '0%' },
          '100%': { transform: '100%' },
        }
      }
    },
  },
  plugins: [],
}
export default config
