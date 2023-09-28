/** @type {import('tailwindcss').Config} */
export default {
  content: ["*"],
  theme: {
    extend: {
      boxShadow: {
        '3xl': 'rgba(0, 0, 0, 0.4) 0px 30px 90px'
      },
      animation: {
        blob: "blob 7s infinite",
        "spin-slower": "spin 35s ease infinite",
      "spin-slow": "spin 25s ease-in-out infinite reverse",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    },
    colors: {
      bkg: 'hsl(var(--color-bkg) / <alpha-value>)',
      content: 'hsl(var(--color-content) / <alpha-value>)',
      accent: {
        1:'hsl(var(--color-accent1) / <alpha-value>)',
        2:'hsl(var(--color-accent2) / <alpha-value>)'
      }
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    
  },
  plugins: [],
}

