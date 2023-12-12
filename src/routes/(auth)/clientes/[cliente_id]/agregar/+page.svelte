<script>
	import {Input,Button,Label} from 'flowbite-svelte'
	import {onMount} from 'svelte';
	import {goto} from '$app/navigation';
	export let form;
	
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
	  <h3>Porfavor Agregar nuevo cliente!!</h3>
	  <Label class="space mt-2"><span>Cliente</span>
	   <Input type="text" name="razon_social" placeholder="razon_social" class="bg-white h-8 rounded" required/>
	  </Label>
	  <Label class="space mt-2"><span>Cuit</span>
		<Input type="number" name="cuit" placeholder="cuit" class="bg-white h-8 rounded" maxlength="11" required/>			
	  </Label>
	  <Label class="space mt-2">
		  <span>Calle</span>
		  <Input type="text" name="domicilio_calle" placeholder="escribe aqui calle" class="bg-white h-8 rounded" required/>
	  </Label>
	  <Label class="space mt-2">
		  <span>Altura</span>
		  <Input type="text" name="domicilio_altura" placeholder="altura" class="bg-white h-8 rounded" required/>
	  </Label>
	  <Label class="space mt-2">
		  <span>Localidad</span>
		  <Input type="text" name="localidad" placeholder="localidad" class="bg-white h-8 rounded" required/>
	  </Label>
	  <Label class="space mt-2">
		  <span>Codigo Postal</span>
	  <Input type="text" name="codigo_postal" placeholder="codigo postal" class="bg-white h-8 rounded" required/>
	  </Label>
	  <Label class="space mt-2">
		  <span>Telefono</span>
		  <Input type="text" name="telefono" placeholder="telefono" class="bg-white h-8 rounded" required/>
	  </Label>
	  <Label class="space mt-2">
		  <span>Email</span>
		  <Input type="email" name="email" placeholder="email" class="bg-white h-8 rounded" required />
	  </Label>		
	  <footer class="text-center  mt-4"> 
		<Button type="submit" class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded">Confirmar</Button>
		<Button on:click={() => goto('/clientes')} class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded">Cancelar</Button>
	  </footer>  
	 					
  </form>	
</div> 
</main>
{/if}
