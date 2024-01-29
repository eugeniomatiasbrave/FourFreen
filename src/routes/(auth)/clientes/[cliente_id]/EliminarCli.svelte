<script >
	import {Input,Button} from 'flowbite-svelte'
	import {goto} from '$app/navigation';
	export let data;
	export let form;
	export const {clienteId}=data;
	  
	let ClienteId=clienteId;
	console.log(form) 

</script>

{#each ClienteId as cliente }
<main class="flex items-center justify-center min-h-screen pb-36">
	<div class="bg-white mx-auto p-2 pt-2 my-2 rounded-3xl shadow-2xl border border-gray-300 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/4">
	 <div class="container mx-auto p-3">
	  <form class="flex flex-col space-y-2" method="POST" action="?/eliminar" >
		 <h3 class="text-3xl font-bold text-center  bg-gradient-to-r from-secundary-400 from-10% via-primary-500 via-40%
              to-primary-500 to-70% text-transparent bg-clip-text">
			Confirmar la eliminación!!
		  </h3>
		  <h5 class="text-lg font-bold text-center mb-4">{cliente.razon_social}</h5>
		 <Input type="hidden" name="cliente_id" value={cliente.cliente_id} class="bg-white h-8 rounded"/>
		 <footer class="text-center">  
		  <Button type="submit" class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded-3xl shadow-2xl hover:shadow-3xl">Confirmar</Button>
		  <Button on:click={() => goto('/clientes')} class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded-3xl shadow-2xl hover:shadow-3xl">Cancelar</Button>
		 </footer>
	  </form>
	 </div>
  </div>
</main>
{/each}