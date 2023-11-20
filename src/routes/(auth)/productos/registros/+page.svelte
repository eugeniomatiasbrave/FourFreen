<script>
import { Input, Button,P, Modal, Label } from 'flowbite-svelte';	
import { selectedProducto, selectedNombre, selectedPrecio, formModal, formModalEdit, formModalDelete } from '../store';
import { onMount } from 'svelte';
import { goto } from '$app/navigation';
export let form;

console.log(form)

onMount(() => {
  if (form?.success) {
    Swal.fire({
      icon: 'success',
      title: form.message,
      text: 'Producto: ',
      backdrop: true,
      confirmButtonText: 'Volver',
      confirmButtonColor: 'bg-primary-500'
    }).then((result) => {
      if (result.isConfirmed) {
        goto('/productos');
      }
    });
  }
});
    
</script>

<div> <!----------------------------modal add productos-->  
		<Modal bind:open={$formModal} size="xs" autoclose={false}  class="w-full">  <!--dejar en false el autoclose-->
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
				<Button   on:click={() => goto('/productos')} class=" bg-primary-500 rounded w-full1">Volver</Button>	   
			</form>
			</Modal>
         
       
</div> <!----------------------fin de modal add productos-->
	
	<div><!--editar-->
	 <form class="flex flex-col space-y-6" method="POST" action="?/editar" >	 <!-----------modal editar-->
		<Modal bind:open={$formModalEdit} size="xs" autoclose={false} class="w-full">
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
			  <Button   on:click={() => goto('/productos')} class=" bg-primary-500 rounded w-full1">Volver</Button>
			</Modal>
		  </form>
		</div><!--editar-->
		<div> <!--eliminar-->
		<form class="flex flex-col space-y-6" method="POST" action="?/delete" on:submit={$selectedProducto}>
			<Modal bind:open={$formModalDelete} size="xs"  autoclose={false} class="w-full" > 		
				  <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white"> Confirmar la eliminación  !!</h3>
				  <P value={$selectedNombre}>Producto: {$selectedNombre}</P>   
				  <Input type="hidden" name="producto_id" value={$selectedProducto}/>	   
				  <Button type="submit" class="bg-primary-500 w-full1 rounded">Confirmar</Button>
				  <Button   on:click={() => goto('/productos')} class=" bg-primary-500 rounded w-full1">Volver</Button>
				</Modal>
			</form>
		</div><!--eliminar-->

	