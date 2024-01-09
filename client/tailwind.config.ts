import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        'festive': {
          'primary' : '#e33333',
          'primary-content' : '#ffffff',

          'base-100' : '#ffffff',

          '--rounded-box': '0.6rem',          
          '--rounded-btn': '.6rem',        
          '--rounded-badge': '1.8rem',      

          '--animation-btn': '.27s',       
          '--animation-input': '.18s',       

          '--btn-text-case': 'none',   
          '--navbar-padding': '.3rem',      
          '--border-btn': '0.3rem',            
       },
      },
    ]
  },
  plugins: [require("daisyui")],
};
export default config;
