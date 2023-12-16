<script>
	import { Input, Button, Label } from 'flowbite-svelte'
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	export let data;
	//import { page } from '$app/stores';
	export const {productosId}=data;
	export let form;
	
let ProductosId=productosId.datos
let showForm=true;

	onMount(() => {
	  if (form?.success) {
		showForm = false

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

{#if showForm}
{#each ProductosId as producto }
 <main class="flex items-center justify-center min-h-screen pb-25 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/4">
  <div class="bg-white mx-auto p-4 pt-2 my-2 rounded border border-gray-200 shadow-md "><!--editar-->  
    <form class="flex flex-col space-y-6" method="POST">  <!-----------modal editar-->  
        <h3 class="mt-4 text-xl text-center font-medium text-gray-900 dark:text-white">Por favor edite el producto!!</h3>	
		<Input type="hidden" name="producto_id" value={producto.producto_id} class="bg-white h-8 rounded" required />
	  <Label class="space-y-2">
		<span>Nombre</span>
		<Input type="text" name="nombre" value={producto.nombre} class="bg-white h-8 rounded" required/>
	  </Label> 
	  <Label class="space-y-2">
		<span>Precio</span> 
		<Input type="text"  name="precio" value={producto.precio} class="bg-white h-8 rounded" required/>
    </Label>
    <footer class="text-center"> 
    <Button type="submit" class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded">Confirmar</Button>
    <Button on:click={() => goto('/productos')} class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded">Cancelar</Button>
  </footer>  
  </form>
 </div><!--editar-->
</main>
{/each}
{/if}





