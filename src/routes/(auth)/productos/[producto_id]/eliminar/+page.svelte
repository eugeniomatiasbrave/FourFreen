<script >
	import {Input,Button} from 'flowbite-svelte'
	import {onMount} from 'svelte';
	import {goto} from '$app/navigation';
	export let data;
    export const {productosId}=data;
	export let form;

let ProductosId=productosId.datos
let showForm = true;

onMount(()=>{
	if (form?.success){
		showForm = false	
		Swal.fire({
		  icon:'success',
		  title:form.message,
		  backdrop:true,
		  confirmButtonText:'Volver',
		  confirmButtonColor:'rgb(69, 166, 175)',
		}).then((result)=>{
		  if (result.isConfirmed){
			goto('/productos');
		  }});
	  }});
</script>

{#if showForm}
{#each ProductosId as producto }
<main class="flex items-center justify-center min-h-screen pb-36 ">
	<div class="bg-white mx-auto p-4 pt-2 my-2 rounded border border-gray-200 shadow-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/5 2xl:w-1/5 ">
		<h3 class="mt-4 text-xl text-center font-medium text-gray-900 dark:text-white">Confirmar la eliminación de {producto.nombre}!!</h3>	
	    <form class="flex flex-col space-y-6" method="POST">
		<Input type="hidden" name="producto_id" value={producto.producto_id}/>
		<footer class="text-center">  
		<Button type="submit" size="xs" class="bg-primary-500 h-7 ml-1 px-2 rounded">Confirmar</Button>
		<Button on:click={() => goto('/productos')} size="xs" class="bg-primary-500 h-7 ml-1 px-2 rounded">Cancelar</Button>
		</footer>
	</form>
</div>
</main>
{/each}
{/if}