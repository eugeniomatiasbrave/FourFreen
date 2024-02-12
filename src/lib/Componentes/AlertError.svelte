<script>
	import { fly } from 'svelte/transition';
	import { sineIn } from 'svelte/easing';
	import {Alert} from 'flowbite-svelte'
	import {CloseCircleSolid} from 'flowbite-svelte-icons'
		
	export let errorMessage;

	
	const closeAlert = () => {
		
	};
	
	</script>
	
	<div class="relative flex items-center justify-center mt-3">

	<Alert 
		class="border border-gray-300 bg-white text-gray-700 " style="width:400px;"
		dismissable transition={fly} 
		params={{ x: -500, duration: 300, easing: sineIn}} 
		on:close={closeAlert}> 
		<div class="flex items-center justify-center ">
			
			<CloseCircleSolid class="w-8 h-8 me-2 text-red-600" />
			<p class="">{errorMessage}</p>
		</div>
	</Alert>
</div>
	
	