<script>
import { Input, Button,P, Modal,  Label } from 'flowbite-svelte';
import { selectedProducto, selectedNombre, selectedPrecio } from '../store';
export let form;

console.log(form)
let formModalEdit = true;

</script>
    
<P size="2xl" align="center">Editar Producto</P>  
 <!------------------------------------------------------------------modal editar-->
    <Modal bind:open={formModalEdit} size="xs" autoclose={false} class="w-full">
      <div><!----------------------------Alert de la Accion -->
        {#if form?.success}
         <span style="background-color: greenyellow;">{form.message}</span>
        {/if}
        </div>
        <form class="flex flex-col space-y-6" method="POST" action="?/editar" >	
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Porfavor edite el producto!!</h3>
            <Input type="hidden" name="producto_id" value={$selectedProducto} required />
          <Label class="space-y-2">
            <span>Nombre</span>
            <Input type="text" name="nombre" value={$selectedNombre} class="rounded" required/>
          </Label> 
          <Label class="space-y-2">
            <span>Precio</span>
            <Input type="text" name="precio" value={$selectedPrecio} class="rounded" required/>
          </Label>
          <Button type="submit" class="bg-primary-500 w-full1 rounded">Confirmar</Button>
          <Button  href="/productos" class=" bg-primary-500 rounded w-full1">Volver</Button>
        </form>
      </Modal>