<script>
	import {Input,Button,Label} from 'flowbite-svelte'
	import {onMount} from 'svelte';
	import {goto} from '$app/navigation';
	import { page } from '$app/stores';
	export let form;
	//import { selectedClienteId,selectedRazon_social,selectedCuit,
	//	selectedLocalidad,selectedDomicilio_calle,selectedDomicilio_altura,
	//	selectedCodigo_postal,selectedTelefono,selectedEmail} from '../../storeCli';
	
	let showForm = true;

	onMount(() => {
	  if (form?.success) {
		showForm = false;

		Swal.fire({
		  icon: 'success',
		  title: form.message,
		  backdrop: true,
		  confirmButtonText: 'Volver',
		  confirmButtonColor: 'rgb(69, 166, 175)'
		}).then((result) => {
		  if (result.isConfirmed) {
			goto('/clientes');
		  }
		});
	  }
	});	
	</script>

{#if showForm}
<main class="flex items-start justify-center min-h-screen pb-36">
	<div class="bg-white mx-auto p-4 pt-2 my-2 rounded border border-gray-200 shadow-md sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6">
	<form method="POST">
		<h3 class="mt-4 text-xl text-center font-medium text-gray-900 dark:text-white">Editar Cliente !!</h3> 			
		<Input type="hidden" name="cliente_id" bind:value={$page.params.cliente_id}/>
		<Label class="space mt-2">
		  <span>Cliente</span>
		<Input name="razon_social" type="text" class="bg-white h-8 rounded" required/>
	   </Label>
		<Label class="space mt-2">
		 <span>Cuit</span>	
		<Input type="text" name="cuit" class="bg-white h-8 rounded"
		  required/>
		</Label>
		<Label class="space mt-2">
		  <span>Calle</span>
		<Input type="text" name="domicilio_calle" class="bg-white h-8 rounded" required/>
		</Label>
		<Label class="space mt-2">
		<span>Altura</span>
		<Input type="text" name="domicilio_altura" class="bg-white h-8 rounded" required/>
		</Label>
		<Label class="space mt-2">
			<span>Localidad</span>
		<Input type="text" name="localidad" class="bg-white h-8 rounded" required/>
		</Label>
		<Label class="space mt-2">
			<span>Codigo.Postal</span>
		<Input type="text" name="codigo_postal" class="bg-white h-8 rounded" required/>
		</Label>
		<Label class="space mt-2">
			<span>Telefono</span>
		<Input type="text" name="telefono" class="bg-white h-8 rounded" required/>
		</Label>
		<Label class="space mt-2">
			<span>Email</span>
		<Input type="email" name="email" class="bg-white h-8 rounded" required/>
		</Label>	
	<footer class="text-center mt-4"> 
		<Button type="submit" class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded">Confirmar</Button>
		<Button on:click={() => goto('/clientes')} class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded">Cancelar</Button>
	  </footer>  
</form>
</div> 
</main>
{/if}
		