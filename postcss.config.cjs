const config = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
    'postcss-preset-env': {
      features: { 'nesting-rules': false },
    },
    autoprefixer: {},
    'postcss-pxtorem': {
      propList: [
        '*',
        '!border-left',
        '!border-right',
        '!border-top',
        '!border-bottom',
        '!border-*',
        '!border',
        '!--border-*',
        '!outline',
				'!box-shadow',
				'!--tw-ring-*'
      ],
    },
  },
};

module.exports = config;
