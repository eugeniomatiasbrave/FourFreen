<script>
import { Input, Button, P, Modal } from 'flowbite-svelte';
import { selectedProducto, selectedNombre } from '../store';
export let form;
console.log(form)

let formModalDelete = true;




</script>

<P size="2xl" align="center">Eliminar Producto</P>

<Button href="#ref" onclick="location.reload();" class=" bg-primary-500 rounded">Delete</Button>



<form class="flex flex-col space-y-6" method="POST" action="?/delete" on:submit={$selectedProducto}>
<Modal bind:open={formModalDelete} size="xs"  autoclose={false} class="w-full" > 
      <div><!----------------------------Alert de la Accion -->
        {#if form?.success}
         <span style="background-color: greenyellow;">{form.message}</span>
        {/if}
        </div>
      <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white"> Confirmar la eliminación  !!</h3>
       <P value={$selectedNombre}>Producto: {$selectedNombre}</P>
       
        <Input type="hidden" name="producto_id" value={$selectedProducto}/>	
       
      <Button type="submit" class="bg-primary-500 w-full1 rounded">Confirmar</Button>
      <Button  href="/productos" class=" bg-primary-500 rounded w-full1">Volver</Button>
    </Modal>
  </form>
  
   

   
  