/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0071eb', // Professional Travel Blue
          dark: '#005bb5',
          light: '#e6f0fd',
        },
        secondary: {
          DEFAULT: '#ff5533', // Action/CTA Orange
          dark: '#d64d2e',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f5f7fa',
        },
        text: {
          main: '#1a2b49', // Deep blue-black for headings
          body: '#5d6b82', // Muted slate for text
          light: '#8fa0b5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(26, 43, 73, 0.08)',
        'card-hover': '0 8px 16px rgba(26, 43, 73, 0.12)',
        'sticky': '0 -4px 12px rgba(0,0,0,0.05)',
      }
    },
  },
  plugins: [],
}
