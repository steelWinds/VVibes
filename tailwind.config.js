import flowbitePlugin from 'flowbite/plugin';

/** @type {import('tailwindcss').Config}*/
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

  plugins: [flowbitePlugin],

  darkMode: 'class',

  theme: {
		fontFamily: {
			inter: ['Inter', 'Arial Narrow']
		},

		screens: {
			mobile: '375px',
			tablet: '768px',
			ultrabook: '1024px',
			laptop: '1440px',
			desktop: '1920px'
		},

		fontSize: {
			8: '8px',
			10: '10px',
			12: '12px',
			14: '14px',
			16: '16px',
			18: '18px',
			20: '20px',
			20: '20px',
			22: '22px',
			24: '24px',
		},

    extend: {
			borderRadius: {
				10: '10px',
				20: '20px',
				30: '30px'
			},

      colors: {
				// backdrop
				backdrop: {
					dark: 'rgba(0 0 0 / .4)',
					light: 'rgba(255 255 255 / .4)'
				},

        // flowbite-svelte
        primary: {
          50: '#FFF5F2',
          100: '#FFF1EE',
          200: '#FFE4DE',
          300: '#FFD5CC',
          400: '#FFBCAD',
          500: '#FE795D',
          600: '#EF562F',
          700: '#EB4F27',
          800: '#CC4522',
          900: '#A5371B'
        }
      }
    }
  }
};
