<script>
	import {Input,Button,Label} from 'flowbite-svelte'
	import {onMount} from 'svelte';
  import {page} from '$app/stores';
	import {goto} from '$app/navigation';
	export let data;
	export let form;
  export const {productosId,productos}=data;

let ProductosId=productosId.datos

let action = '';
let producto_id = $page.params.producto_id;
  
onMount(() => {
    if (producto_id === "-1") {
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
        goto('/productos');
      }});}});
</script>

 {#if action === 'editar'}
 {#each ProductosId as producto }
 <main class="flex items-center justify-center pt-36 ">
  <div class="bg-white mx-auto p-2 py-4 my-0 rounded-3xl border border-gray-200 shadow-md sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/5 2xl:w-1/5">
    <form class="flex flex-col space-y-4 px-4" method="POST" action="?/editar" >   
        <h3 class="text-3xl font-bold text-center py-2 bg-gradient-to-r
        from-secundary-400 from-10% via-primary-500 via-40% to-primary-500 to-70% text-transparent bg-clip-text">Editar el producto!!</h3>	
		<Input type="hidden" name="producto_id" value={producto.producto_id} required />
	  <Label class="space">
		<span>Nombre</span>
		<Input type="text" name="nombre" value={producto.nombre} maxlength="30" on:change={(e)=> {
      let nombre=e.target.value
      let existe = productos.datos.some(producto => producto.nombre === nombre);
      console.log(existe)
      if (existe) {
        window.Swal.fire({
            icon: 'error',
            title: 'Producto existente',
            text: `Nombre: ${nombre}.`,
            backdrop: true,
            confirmButtonText: 'Volver',
            confirmButtonColor: 'rgb(69, 166, 175)'
            });
            e.target.value = '';
            }}} placeholder="Agregar producto" 
            class="bg-white h-8 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" required/>
	  </Label> 
	  <Label class="space">
		<span>Precio</span> 
		<Input type="number" name="precio" value={producto.precio} min="0" max="1000000" step="0.01" 
    class="bg-white h-8 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" required/>
    </Label>
    <footer class="text-center my-2"> 
    <Button type="submit" class="bg-primary-500 h-8 ml-1 px-4 rounded-3xl">Confirmar</Button>
    <Button on:click={() => goto('/productos')}  class="bg-primary-500 h-8 ml-1 px-4 rounded-3xl">Cancelar</Button>
  </footer>  
  </form>
 </div>
</main>
{/each}
{:else if action === 'eliminar'}
{#each ProductosId as producto }
<main class="flex items-center justify-center pt-36 ">
  <div class="bg-white mx-auto p-1 py-4 my-0 rounded-3xl border border-gray-200 shadow-md sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/5 2xl:w-1/5 ">
    <h3 class="text-3xl font-bold text-center py-2 bg-gradient-to-r
        from-secundary-400 from-10% via-primary-500 via-40% to-primary-500 to-70% text-transparent bg-clip-text">Confirmar la eliminación!!</h3>		
     <h5 class="text-lg font-bold text-center mb-4">Producto: {producto.nombre}</h5>
    <form class="flex flex-col space-y-4" method="POST" action="?/eliminar" >
      <Input type="hidden" name="producto_id" value={producto.producto_id}/>
      <footer class="text-center">  
        <Button type="submit" class="bg-primary-500 h-8 ml-1 px-4 rounded-3xl">Confirmar</Button>
        <Button on:click={() => goto('/productos')} class="bg-primary-500 h-8 ml-1 px-4 rounded-3xl">Cancelar</Button>
      </footer>
    </form>
  </div>
</main>
{/each}

{:else if action === 'agregar'}
<main class="flex items-center justify-center pt-36 ">
  <div class="bg-white mx-auto p-2 py-4 my-0 rounded-3xl border border-gray-200 shadow-md sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5"> 
     <form class="flex flex-col space-y-4 px-4" method="POST" action="?/agregar" >	
         <h3 class="text-3xl font-bold text-center py-2 bg-gradient-to-r
         from-secundary-400 from-10% via-primary-500 via-40% to-primary-500 to-70% text-transparent bg-clip-text">Agregar producto</h3>	
         <Label class="space">
           <span>Producto</span>
           <Input type="text" name="nombre"  maxlength="30" on:change={(e)=> {
            let nombre = e.target.value;
            let existe = productos.datos.some(producto => producto.nombre === nombre);
            if (existe) {
              window.Swal.fire( 
                {
                  icon: 'error',
                  title: 'Producto existente',
                  text: `Nombre: ${nombre}.`,
                  backdrop: true,
                  confirmButtonText: 'Volver',
                  confirmButtonColor: 'rgb(69, 166, 175)'
                  });
                   e.target.value = '';
                   }
                  }}      
                placeholder="Agregar producto" 
                class="bg-white h-8 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required/>
      </Label>
      <Label class="space">
        <span>Precio</span>
        <Input type="number" name="precio"  min="0" max="1000000" step="0.01" placeholder="Agregar precio" 
        class="bg-white h-8 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
        required/>
      </Label> 
         <footer class="text-center my-2">
         <Button type="submit" class="bg-primary-500 h-8 ml-1 px-4 rounded-3xl">Confirmar</Button>
         <Button on:click={() => goto('/productos')} class="bg-primary-500 h-8 ml-1 px-4 rounded-3xl">Cancelar</Button>
        </footer>  
     </form>   
   </div> 
 </main>
{/if}