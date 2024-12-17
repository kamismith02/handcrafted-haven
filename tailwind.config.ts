import type { Config } from 'tailwindcss'

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx, mdx}"
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    borderRadius: {
      'none': '0',
      'sm': '.125rem',
      DEFAULT: '.25rem',
      'lg': '.5rem',
      'xl': '1.25rem',
      'full': '9999px',
    },
    extend: {
      colors: {
        "*-slate-gray" : { //blue-green
          light: "#4E757E",
          DEFAULT: "#395860",
          dark: "#1F2F33" },
        "*-blue-gray" : "#617e8b",
        "*-pearl" : { // white-ish colors
          extralight: "#F9F7F1",
          light: "#f3f0e2",
          DEFAULT: "#EDE4CF",
        },
        "*-brown-sugar" : "C76C4A",
        "*-chestnut" : "#8C3E36",
        "*-rose-ebony" : "#553739", // brown-ish red
        "*-cordovan" : "#933948", // really pretty dusky-red
        "*-gray-khaki" : { // other white-ish colors, slightly less yellow than the pearls; 
          light: "#",
          medium: "#D4CCC4",
          DEFAULT: "#BAAEA0"
        }
      },
      fontFamily: {
        NunitoSans : ['Nunito\\Sans', 'Tahoma', 'sans-serif'],
        Lora : ['Lora', 'Georgia', 'serif'],
        DancingScript : ['Dancing\\Script', 'Times\\New\\Roman', 'serif']
      }
    },
  },
  plugins: [],
}
