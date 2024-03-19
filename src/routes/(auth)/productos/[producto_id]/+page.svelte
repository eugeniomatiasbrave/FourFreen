<script>
	import {Input} from 'flowbite-svelte'
  import {page} from '$app/stores';
  import {enhance} from '$app/forms';
	import AlertOk from '$lib/Componentes/AlertOk.svelte';
  import AlertError from '$lib/Componentes/AlertError.svelte';
  import FooterForm from '$lib/Componentes/FooterForm.svelte';
import InputField from '$lib/Componentes/InputField.svelte';
  

	export let data;
	export let form;
  export const {productosId,productos}=data;

let ProductosId=productosId.datos

let action = '';
let producto_id = $page.params.producto_id;

let ruta= "productos";
let textoboton1="Confirmar";
let textoboton2="Cancelar";

let errorMessage="";
let showError = false;

if (producto_id === "-1") {
     action = 'agregar';
  } else {
    action = $page.url.searchParams.get('action') || 'otraAccion';
}


    const validarExiste = (e)=> {
      let nombre=e.target.value
      let existe = productos.datos.some(producto => producto.nombre === nombre);
  
  if (existe) {
      showError = true;
      errorMessage="Nombre de producto existente!!" 
      
    } else {
    showError = false;
  }
}

</script>

 {#if action === 'editar'}
 {#each ProductosId as producto }
 <main class="flex items-center justify-center pt-36 ">
  <div class="bg-white mx-auto p-4 my-0 rounded-3xl border border-gray-200 shadow-md sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/5 2xl:w-1/5">
    <form class="flex flex-col space-y-3 px-3" method="POST" action="?/editar" use:enhance >   
        <h3 class="text-3xl font-bold text-center bg-gradient-to-r
        from-secundary-400 from-10% via-primary-500 via-40% to-primary-500 to-70% text-transparent bg-clip-text">Editar el producto!!</h3>	
		<InputField type="hidden" name="producto_id" value={producto.producto_id}/>
    <InputField type="text" name="nombre" value={producto.nombre} maxlength="30" placeholder="Editar producto" onValidate={validarExiste}/>
	  <InputField type="number" name="precio" value={producto.precio} min="0" max="1000000" step="0.01" placeholder="Agregar precio"/>
    <FooterForm {ruta} {textoboton1} {textoboton2} />
  </form>
 </div>
</main>

 <!--Mensaje de Error-->
 {#if showError} 
 <AlertError {errorMessage} />
{/if} 


{/each}
{:else if action === 'eliminar'}
{#each ProductosId as producto }
<main class="flex items-center justify-center pt-36 ">
  <div class="bg-white mx-auto p-1 py-4 my-0 rounded-3xl border border-gray-200 shadow-md sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/5 2xl:w-1/5 ">
    <h3 class="text-3xl font-bold text-center py-2 bg-gradient-to-r
        from-secundary-400 from-10% via-primary-500 via-40% to-primary-500 to-70% text-transparent bg-clip-text">Confirmar la eliminación!!</h3>		
     <h5 class="text-lg font-bold text-center mb-4">Producto: {producto.nombre}</h5>
    <form class="flex flex-col space-y-1 px-5" method="POST" action="?/eliminar" use:enhance>
      <Input type="hidden" name="producto_id" value={producto.producto_id}/>
      <FooterForm {ruta} {textoboton1} {textoboton2}  />
    </form>
  </div>
</main>
{/each}

{:else if action === 'agregar'}
  <main class="flex items-center justify-center pt-36 ">
    <div class="bg-white mx-auto p-4 my-0 rounded-3xl border border-gray-200 shadow-md sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5"> 
     <form class="flex flex-col space-y-3 px-2" method="POST" action="?/agregar" use:enhance>	

         <h3 class="text-3xl font-bold text-center bg-gradient-to-r
         from-secundary-400 from-10% via-primary-500 via-40% to-primary-500 to-70% text-transparent bg-clip-text">Agregar producto</h3>	 
      <InputField type="text" name="nombre" maxlength="30" placeholder="Agregar producto" onValidate={validarExiste}/>
      <InputField type="number" name="precio"  min="0" max="1000000" step="0.01" placeholder="Agregar precio"/>
      <FooterForm {ruta} {textoboton1} {textoboton2} />
    
      </form>   
     </div> 
    </main>
    <!--Mensaje de Error-->
    {#if showError} 
     <AlertError {errorMessage} />
    {/if} 
{/if} 

<!--Mensaje de ok-->
{#if form?.success }
<AlertOk message={form?.message} {ruta}/>
{/if}