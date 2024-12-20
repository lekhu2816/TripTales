/** @type {import('tailwindcss').Config} */
// import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        // 'primary':"#5f6fff",
        'primary':"#FF8000",
        'secondary':"#FF7F3E",
        
      }
    },
    screens:{
      'mobile':{'max':"400px"},
      'tablet': {'min': '401px', 'max': '700px'},
    },
    
  },
  plugins: [require('daisyui')],
}