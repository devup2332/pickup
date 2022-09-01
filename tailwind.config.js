/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,tsx}'],
	theme: {
		extend: {
			colors: {
				'bg-black-rgba-0.5': 'rgba(0,0,0,0.5)',
			},
		},
	},
	plugins: [],
};
