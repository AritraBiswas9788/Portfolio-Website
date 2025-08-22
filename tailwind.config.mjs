/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	container: {
		center: true,
		padding: "15px",
	},
	screens: {
		"xl": "1000px",
		"lg": "960px",
		"md": "768px",
		"sm": "640px",
	},
	fontFamily: {
		primary: "var(--font-jetbrains-mono)",
	},
  	extend: {
  		// colors: {
  		// 	background: 'var(--background)',
  		// 	foreground: 'var(--foreground)'
  		// },
		colors: {
			primary: "#1c1c22",
			//primary: "#ffffff",
			accent: {
				DEFAULT: "#00ff99",
				hover: "#00e187",
			}
		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
