<script>
	import { Input, Button, Label } from 'flowbite-svelte'
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import {  selectedProductoId, selectedNombre, selectedPrecio } from '../../storeProd';
	export let form;
	console.log(form)

	onMount(() => {
	  if (form?.success) {
		Swal.fire({
		  icon: 'success',
		  title: form.message,
		  backdrop: true,
		  confirmButtonText: 'Volver',
		  confirmButtonColor: 'rgb(69, 166, 175)'
		}).then((result) => {
		  if (result.isConfirmed) {
			goto('/productos');
		  }
		});
	  }
	});
	</script>
	<main class="flex items-start justify-center min-h-screen pt-16">
	<div class="bg-white mx-auto p-4 pt-2 my-2 rounded border border-gray-200 shadow-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
		<form class="flex flex-col space-y-6" method="POST" on:submit={$selectedProductoId}>
		   <h3 class="mt-4 text-xl text-center font-medium text-gray-900 dark:text-white"> Confirmar la eliminación !!</h3> 
		   <h4 class=" text-l text-center font-medium text-gray-900 dark:text-white">Producto: Id {$selectedProductoId} , {$selectedNombre} , $ {$selectedPrecio}</h4> 
		   <Input type="hidden"  name="producto_id" value={$selectedProductoId} class="bg-white h-8 rounded"/>
		   <footer class="text-center">  
			   <Button type="submit" class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded">Confirmar</Button>
			   <Button on:click={() => goto('/productos')} class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded">Cancelar</Button>
		   </footer>
		</form>
	</div>
</main>









