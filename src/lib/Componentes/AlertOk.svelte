<script>
import { fly } from 'svelte/transition';
import { sineIn } from 'svelte/easing';
import {Alert} from 'flowbite-svelte'
import {goto} from '$app/navigation';
import {CheckCircleSolid} from 'flowbite-svelte-icons'
	
export let message;
export let ruta;

const closeAlert = () => {
	goto(`/${ruta}`)
  };

</script>

<div class="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60" style="margin-top:48px;">
	<Alert 
	  class="border border-gray-300 bg-slate-50 text-gray-700 " style="width:400px;"
	  dismissable transition={fly} 
	  params={{ x: -500, duration: 300, easing: sineIn}} 
	  on:close={closeAlert}> 
	  <div class="flex items-center justify-center ">
		  <CheckCircleSolid class="w-9 h-9 me-2 text-secundary-500" />
		  <p class="">{message}</p>
		</div>
   </Alert>
</div>