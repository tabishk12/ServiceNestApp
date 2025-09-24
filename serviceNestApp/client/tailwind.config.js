/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        'new-md': {'min':'0px','max': '1024px'},
        'new-lg': {'min':'1023px'},
        'xm': {'min':'0px','max': '400px'},
      },
    },
  },
  plugins: [],
};

