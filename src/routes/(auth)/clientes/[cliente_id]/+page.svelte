<script >
import {Input,Button,Label} from 'flowbite-svelte'
import {onMount} from 'svelte';
import {page} from '$app/stores';
import {goto} from '$app/navigation';
export let data;
export let form;
export const {clienteId,clientes}=data;
  
let action = '';
let ClienteId=clienteId;
let Clientes=clientes;

onMount(() => {
   action = $page.url.searchParams.get('action') || 'view';
});
 
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
        goto('/clientes');
      }
    });
  } else if (form?.error) {
    Swal.fire({
      icon: 'error',
       title: 'Error',
       text: form.error,
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

function validateCuit(event) {
    const cuit = event.target.value;
    if (cuit < 20000000000 || cuit > 30000000000) {
      alert('El CUIT debe estar entre 20000000000 y 30000000000.');
    }
  }

</script>

 {#if action === 'editar'}
  {#each ClienteId as cliente }
    <main class="flex items-start justify-center min-h-screen pb-36">
	 <div class="bg-white mx-auto p-4 pt-2 my-2 rounded border border-gray-200 shadow-md sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6">
	  <form method="POST" action="?/editar">
		<h3 class="mt-4 text-xl text-center font-medium text-gray-900 dark:text-white">Editar Cliente !!</h3> 			
		<Input type="hidden" name="cliente_id" value={cliente.cliente_id}/>
		<Label class="space">
			<span>Nombre</span>
			<Input type="text" name="razon_social" value={cliente.razon_social} maxlength="30" on:change={(e)=> {
		   let razon_social = e.target.value
		   let existe = Clientes.some(cli => cli.razon_social === razon_social);
		   console.log(existe)
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
			   placeholder="Razon social" class="bg-white h-7 w-full rounded" required/>
		 </Label> 
		<Label class="space mt-2">
		 <span>Cuit</span>	
		<Input type="number" name="cuit" value={cliente.cuit} on:blur={(e)=> {
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
               }}} placeholder={cliente.cuit} class="bg-white h-8 rounded" required/>
		</Label>
		<Label class="space mt-2">
		  <span>Calle</span>
		<Input type="text" name="domicilio_calle" value={cliente.domicilio_calle} class="bg-white h-8 rounded" required/>
		</Label>
		<Label class="space mt-2">
		<span>Altura</span>
		<Input type="text" name="domicilio_altura" value={cliente.domicilio_altura} class="bg-white h-8 rounded" required/>
		</Label>
		<Label class="space mt-2">
			<span>Localidad</span>
		<Input type="text" name="localidad" value={cliente.localidad} class="bg-white h-8 rounded" required/>
		</Label>
		<Label class="space mt-2">
			<span>Codigo.Postal</span>
		<Input type="text" name="codigo_postal" value={cliente.codigo_postal} class="bg-white h-8 rounded" required/>
		</Label>
		<Label class="space mt-2">
			<span>Telefono</span>
		<Input type="text" name="telefono" value={cliente.telefono} class="bg-white h-8 rounded" required/>
		</Label>
		<Label class="space mt-2">
			<span>Email</span>
		<Input type="email" name="email" value={cliente.email} class="bg-white h-8 rounded" required/>
		</Label>	
	   <footer class="text-center mt-4"> 
		 <Button type="submit" class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded">Confirmar</Button>
		 <Button on:click={() => goto('/clientes')} class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded">Cancelar</Button>
	   </footer>  
     </form>
    </div> 
  </main>
 {/each}

{:else if action === 'eliminar'}
 {#each ClienteId as cliente }
   <main class="flex items-center justify-center min-h-screen pb-36">
	<div class="bg-white mx-auto p-4 pt-2 my-2 rounded border border-gray-200 shadow-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
	  <form class="flex flex-col space-y-6" method="POST" action="?/eliminar">
		 <h3 class="mt-4 text-xl text-center font-medium text-gray-900 dark:text-white">Confirmar la eliminación {cliente.razon_social} !!</h3> 
		 <Input type="hidden" name="cliente_id" value={cliente.cliente_id} class="bg-white h-8 rounded"/>
		 <footer class="text-center">  
		 <Button type="submit" class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded">Confirmar</Button>
		 <Button on:click={() => goto('/clientes')} class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded">Cancelar</Button>
		 </footer>
	  </form>
    </div>
   </main>
 {/each}	
{/if}