<script >
import {Input,Label} from 'flowbite-svelte'
import {onMount} from 'svelte';
import {page} from '$app/stores';
import {goto} from '$app/navigation';
import EliminarCli from './EliminarCli.svelte';
import FooterForm from '$lib/Componentes/FooterForm.svelte';
import InputField from '$lib/Componentes/InputField.svelte';
export let data;
export let form;
export const {clienteId,clientes}=data;

let ruta= "clientes";
  
let ClienteId=clienteId;
let Clientes=clientes;

let action = '';
let cliente_id = $page.params.cliente_id;
  
onMount(() => {
    if (cliente_id === "-1") {
        action = 'agregar';
    } else {
        action = $page.url.searchParams.get('action') || 'otraAccion';
    }
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
    });}});

const validarRazonSocial =(e)=> {
  let razon_social = e.target.value;
  let existe = Clientes.some(cli => cli.razon_social === razon_social);
  console.log(existe);
  if (existe) {
    window.Swal.fire({
      icon: 'error',
      title: 'Cliente existente',
      text: `Nombre: ${razon_social}.`,
      backdrop: true,
      confirmButtonText: 'Volver',
      confirmButtonColor: 'rgb(69, 166, 175)'
    });
    e.target.value = '';
  }
}

const validarCuit =(e)=> {
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
  }
}


</script>
 {#if action === 'editar'}
  {#each ClienteId as cliente }
  <main class="flex items-start justify-center min-h-screen pb-36">
  <div class="bg-white mx-auto p-1 pt-1 my-2 rounded-3xl border border-gray-300 shadow-2xl sm:w-3/4 md:w-1/2 
              lg:w-1/3 xl:w-1/4 2xl:w-1/4 transform transition duration-500 hover:scale-105">
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold text-center py-4 bg-gradient-to-r
      from-secundary-400 from-10% via-primary-500 via-40% to-primary-500 to-70% text-transparent bg-clip-text">
        Editar Cliente !!
      </h1>
      <form method="POST" action="?/editar">
        <InputField type="hidden" name="cliente_id" value={cliente.cliente_id}/>
          <div class="grid grid-cols-2 gap-4">
           <InputField name="razon_social" value={cliente.razon_social} maxlength="30" placeholder="Razon social" required onValidate={validarRazonSocial}/>
           <InputField type="number" name="cuit" value={cliente.cuit} placeholder="Cuit" required onValidate={validarCuit}/>
           <InputField type="text" name="domicilio_calle" value={cliente.domicilio_calle} placeholder="Calle" required/>
           <InputField type="text" name="domicilio_altura" value={cliente.domicilio_altura} placeholder="Altura" required/>
           <InputField type="text" name="localidad" value={cliente.localidad} placeholder="Localidad" required/>
           <InputField type="text" name="codigo_postal" value={cliente.codigo_postal} placeholder="Codigo.Postal" required/>
           <InputField type="text" name="telefono" value={cliente.telefono} placeholder="Telefono" required/>
           <InputField type="text" name="email" value={cliente.email} placeholder="E-mail" required/>
          </div>
        <FooterForm {ruta}/>
      </form>
    </div>
  </div>
</main>
 {/each}

 {:else if action === 'agregar'}
 <main class="flex items-start justify-center min-h-screen pb-16">
	<div class="bg-white mx-auto p-4 pt-2 my-2 rounded-3xl border border-gray-300 shadow-xl sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/4 
              transform transition duration-500 hover:scale-105">
	  <form method="POST" action="?/agregar">
      <h3 class="text-3xl font-bold text-center py-4 bg-gradient-to-r from-secundary-400 from-10% via-primary-500 via-40%
            to-primary-500 to-70% text-transparent bg-clip-text">Por favor agregar nuevo cliente!!</h3>
		 <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField name="razon_social" maxlength="50" placeholder="Razon social" required onValidate={validarRazonSocial}/>
      <InputField type="number" name="cuit" placeholder="Cuit" required onValidate={validarCuit}/>
      <InputField type="text" name="domicilio_calle" placeholder="Calle" required/>
      <InputField type="text" name="domicilio_altura" placeholder="Altura" required/>
      <InputField type="text" name="localidad" placeholder="Localidad" required/>
      <InputField type="text" name="codigo_postal" placeholder="Codigo.Postal" required/>
      <InputField type="text" name="telefono" placeholder="Telefono" required/>
      <InputField type="text" name="email" placeholder="E-mail" required/>
		 </div>
     <FooterForm {ruta}/>
	  </form>
	 </div>
  </main>   
{:else if action === 'eliminar'}
   <EliminarCli {data} {form} {action} {cliente_id} {ClienteId} {Clientes}/>
{/if}
