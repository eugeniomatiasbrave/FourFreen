<script>
	//import { Input, Button, Label } from 'flowbite-svelte'
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { selectedProductoId, selectedNombre, selectedPrecio } from '../../storeProd';
	
	export let form;



 
	//console.log(form)
	
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
			goto('/productos?search=');
		  }
		});
	  }
	});
	</script>
<div class=" bg-white mx-auto p-1 pt-2 my-2 rounded border border-gray-200 shadow-md w-1/5"><!--editar-->  
  <form class="flex flex-col space-y-6" method="POST" action="?/editar"  >  <!-----------modal editar-->  
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Por favor edite el producto!!</h3>	
		<input type="hidden" name="producto_id" value={$selectedProductoId} class="bg-white h-8 rounded" required />
	  <label class="space-y-2">
		<span>Nombre</span>
		<input type="text" name="nombre" value={$selectedNombre} class="bg-white h-8 rounded" required/>
	  </label> 
	  <label class="space-y-2">
		<span>Precio</span>
		<input type="text" name="precio" value={$selectedPrecio} class="bg-white h-8 rounded" required/>
    </label>
    <footer> 
    <button type="submit" class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded">Confirmar</button>
    <button on:click={() => goto('/productos?search=')} class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded">Cancelar</button>
  </footer>  
  </form>
</div><!--editar-->
















