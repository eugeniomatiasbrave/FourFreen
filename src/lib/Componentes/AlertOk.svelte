<script>
import { fly } from 'svelte/transition';
import { sineIn } from 'svelte/easing';
import {Alert} from 'flowbite-svelte'
import {goto} from '$app/navigation';
	
export let message;
export let ruta;

const closeAlert = () => {
	goto(`/${ruta}`)
  };

</script>

<div class="absolute inset-0 flex items-center justify-center mt-10 bg-gray-900 bg-opacity-60 ">
	<Alert 
	  class="border border-gray-300 " 
	  dismissable transition={fly} 
	  params={{ x: -200, duration: 300, easing: sineIn}} 
	  on:close={closeAlert}>
	  <p class="py-2">{message}</p>
   </Alert>
</div>