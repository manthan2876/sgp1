/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FFFFEA",
          dark: "#808000",
        },
        background: {
          light: "#fff",
          dark: "#272719",
        },
        text: {
          light: "#525f7f",
          dark: "#fff",
        },
        accent: {
          light: "#686800",
          dark: "#FCFCD2",
        },
        border: {
          light: "#FCFCD2",
          dark: "#686800",
        },
        shadow: {
          light: "rgba(0, 0, 0, 0.1)",
          dark: 'rgba(255, 255, 255, 0.15)',
        },
        input: {
          light: {
            default: "#888807",
            focus: "#888807",
            border: "#888807",
          },
          dark: {
            default: "#808000",
            focus: "#808000",
            border: "#808000",
          },
        },
      },
    },
    container: {
      center: true,
      padding: "1rem",
    },
  },
  plugins: [],
};
