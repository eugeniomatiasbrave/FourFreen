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
 <main class="flex items-center justify-center min-h-screen pb-25 ">
  <div class="bg-white mx-auto p-4 pt-2 my-0 rounded border border-gray-200 shadow-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/6 2xl:w-1/6"><!--editar-->  
    <form class="flex flex-col space-y-4" method="POST">  <!-----------modal editar-->  
        <h3 class="mt-4 text-xl text-center font-medium text-gray-900 dark:text-white">Editar el producto!!</h3>	
		<Input type="hidden" name="producto_id" value={producto.producto_id} required />
	  <Label class="space">
		<span>Nombre</span>
		<Input type="text" name="nombre" value={producto.nombre} class="bg-white h-7 w-full rounded" required/>
	  </Label> 
	  <Label class="space">
		<span>Precio</span> 
		<Input type="number" name="precio" value={producto.precio} class="bg-white h-7 w-full rounded" required/>
    </Label>
    <footer class="text-center"> 
    <Button type="submit"  class="bg-primary-500 h-7 ml-1 px-2 rounded">Confirmar</Button>
    <Button on:click={() => goto('/productos')}  class="bg-primary-500 h-7 ml-1 px-2 rounded">Cancelar</Button>
  </footer>  
  </form>
 </div><!--editar-->
</main>
{/each}
{/if}





