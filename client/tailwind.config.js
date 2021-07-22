module.exports = {
  purge: [
  './src/components/**/*.{js,ts,jsx,tsx}',
  './src/features/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      // Configure your color palette here
      'lightGrey': '#f3f3f3',
      'mainBlue': '#255EF4',
      'lightBlue': '#f2f9ff',
      'grey': '#828282',
      'darkGrey': '#333333',
      'white': '#ffffff',
      'error': '#FF4D4D'
    },
    extend: {
      backgroundImage: theme => ({
        //'logo': "url('/public/images/headset_boy.png')",
        'hero_image': "url('./images/hero.svg')",
        'hero': "url('./images/hero.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
