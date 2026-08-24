/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#083b78',
        ink: '#102a43',
        saffron: '#e67e22',
        mist: '#f5f8fc',
      },
      boxShadow: {
        soft: '0 12px 34px rgba(16, 42, 67, 0.08)',
      },
    },
  },
  plugins: [],
}
