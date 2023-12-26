<script>
	import {Input,Button,Label} from 'flowbite-svelte'
	import {onMount} from 'svelte';
	import {goto} from '$app/navigation';
	export let form;
  export let data;
	export const {productos}=data;

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
        goto('/productos');
      }
    });
  } 
});
	</script>

{#if showForm}
 <main class="flex items-center justify-center min-h-screen pb-36 ">
   <div class="bg-white mx-auto p-4 pt-1 my-0 rounded border border-gray-200 shadow-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6"> <!----------------------------modal add productos-->  
      <form class="flex flex-col space-y-4" method="POST" >	
          <h3 class="mt-4 text-xl text-center font-medium text-gray-900 dark:text-white">Agregar nuevo producto </h3>
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
                    placeholder="Agregar producto" class="bg-white h-7 w-full rounded" required/>
          </Label>
          <Label class="space">
            <span>Precio</span>
            <Input type="number" name="precio"  min="0" max="1000000" step="0.01" placeholder="Agregar precio" class="bg-white h-7 w-full rounded" required/>
			
          </Label> 
          <footer class="text-center">
          <Button type="submit"  class="bg-primary-500 h-7 px-2 rounded">Confirmar</Button>
          <Button on:click={() => goto('/productos')} class="bg-primary-500 h-7  px-2 rounded">Cancelar</Button>
         </footer>  
      </form>   
    </div> 
  </main>
{/if}