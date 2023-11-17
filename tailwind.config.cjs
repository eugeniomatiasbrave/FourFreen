const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  
	plugins: [require('flowbite/plugin')],
  
	darkMode: 'class',
  
	theme: {
	  extend: {
		colors: {
			'hover-gray-light': '#F5F5F5',
			'hover-gray-dark': '#E0E0E0',
		  primary: {
				50: '#e0f5f6',
				100: '#b3e6e8',
				200: '#80d6d9',
				300: '#4dc7cb',
				400: '#1ab7bc',
				500: '#45a6af',
				600: '#378a91',
				700: '#296e73',
				800: '#1b5355',
				900: '#0d3737',
			   
               
		   }
		 }
		}
	  }
	}
  
  
  module.exports = config;







