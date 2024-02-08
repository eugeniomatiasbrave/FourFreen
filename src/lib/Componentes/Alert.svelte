

<script>
	
	import {Button} from 'flowbite-svelte'
	import {goto} from '$app/navigation';
	
	export let message;
	export let ruta;
</script>

  <main class="flex items-start justify-center min-h-screen pt-36">
	<div class="bg-white mx-auto p-4 pt-2 my-0 rounded border border-gray-200 shadow-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
     <div class="my-3">
      <h1>{message}</h1>
	</div>
   <footer>
	<Button on:click={() => goto(`/${ruta}`)} class="bg-primary-500 h-7 px-2 rounded">Volver</Button>
   </footer>
   </div>
  </main>