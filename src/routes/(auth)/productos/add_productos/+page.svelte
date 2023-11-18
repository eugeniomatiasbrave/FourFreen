<script>

import { Input, Button,P, Modal, Label } from 'flowbite-svelte';
export let form;

console.log(form)

let formModal = true;
    
</script>

<P size="2xl" align="center">Add Productos</P>

<Button href="#ref" onclick="location.reload();" class=" bg-primary-500 rounded">+ Add</Button>

<div> <!----------------------------modal add productos-->  
        <Modal bind:open={formModal}  size="xs" autoclose={false}  class="w-full">  <!--dejar en false el autoclose-->
          <div><!----------------------------Alert de la Accion -->
            {#if form?.success}
             <span style="background-color: greenyellow;">{form.message}</span>
            {/if}
            </div>
          <form class="flex flex-col space-y-6"  method="POST" action="?/addProd">	
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Agregar un producto nuevo</h3>
            <Label class="space-y-2">
              <span>Producto</span>
              <Input type="text" name="nombre" placeholder="escribe aqui el producto" required/>
            </Label>
            <Label class="space-y-2">
              <span>precio</span>
              <Input type="text" name="precio" placeholder="escribe aqui el precio" required/>
            </Label> 
            <Button type="submit" class=" bg-primary-500 rounded w-full1">Confirmar</Button>
            <Button  href="/productos" class=" bg-primary-500 rounded w-full1">Volver</Button>
           
          </form>
        </Modal>
</div> <!----------------------fin de modal add productos-->