// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//       fontFamily: {
//         gilroy: ['var(--font-gilroy)'],
//         playfair: ['var(--font-playfair)'],
//         lato: ['var(--font-lato)'],
//       },
//     },
//   },
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//       fontFamily: {
//         gilroy: ['var(--font-gilroy)'],
//         playfair: ['var(--font-playfair)'],
//         lato: ['var(--font-lato)'],
//       },
//       maxWidth: {
//         'container': '1616.82px', // ✅ custom container width
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
     screens: {
      sm: '640px',
      md: '768px',
      lg: '1279px',  // 👈 your custom lg breakpoint
      // xl: '1280px',
      // '2xl': '1536px',
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        gilroy: ["var(--font-gilroy)"],
        playfair: ["var(--font-playfair)"],
        lato: ["var(--font-lato)"],
       british: ["var(--font-britishCastilla)"],
       BrittanySign: ["var(--font-BrittanySign)"],

      },
      maxWidth: {
        container: "1616.82px", // ✅ custom container width
      },

      // 🎨 Gradient animation support
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(30px, -20px)" },
        },
      },
      animation: {
        gradient: "gradient 15s ease infinite", // smooth gradient movement
        float: "float 8s ease-in-out infinite", // floating blob effect
      },
    },
  },
  plugins: [],
};
