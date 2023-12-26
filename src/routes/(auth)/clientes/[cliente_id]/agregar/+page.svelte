<script>
import {Input,Button,Label} from 'flowbite-svelte'
import {onMount} from 'svelte';
import {goto} from '$app/navigation';
export let data;
export let form;
export const {clientes}=data;
	
let showForm = true;
let Clientes = clientes;

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
	  <Label class="space">
		<span>Razon Social</span>
		<Input type="text" name="razon_social"  maxlength="50" on:change={(e)=> {
			let razon_social = e.target.value;
			let existe = Clientes.some(cli => cli.razon_social === razon_social);
			if (existe) {
			  window.Swal.fire( 
				{
				  icon: 'error',
				  title: 'Cliente existente',
				  text: `Nombre: ${razon_social}.`,
				  backdrop: true,
				  confirmButtonText: 'Volver',
				  confirmButtonColor: 'rgb(69, 166, 175)'
				  });
				   e.target.value = '';
				   }
				  }}      
				placeholder="Agregar cliente" class="bg-white h-7 w-full rounded" required/>
	  </Label>
	  <Label class="space mt-2"><span>Cuit</span>
		<Input type="number" name="cuit"  on:blur={(e)=> {
			let cuit = e.target.value;
			 if (cuit < 20000000000 || cuit > 30000000000) {
			   window.Swal.fire({
				  icon: 'error',
				  title: 'El cantidad de caracteres incorrectos.',
				  backdrop: true,
				  confirmButtonText: 'Volver',
				  confirmButtonColor: 'rgb(69, 166, 175)'
				  });
				  e.target.value = '';
				  }}} placeholder="escribe aqui el cuit" class="bg-white h-8 rounded" required/>		
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
		  <Input type="text" name="telefono" placeholder="telefono" maxlength="10" class="bg-white h-8 rounded" required/>
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
