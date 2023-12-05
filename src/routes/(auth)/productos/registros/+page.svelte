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
		  backdrop: true,
		  confirmButtonText: 'Volver',
		  confirmButtonColor: 'rgb(69, 166, 175)'
		}).then((result) => {
		  if (result.isConfirmed) {
			goto('/productos?search=');
		  }
		});
	  }
	});
	
	const ModalClose =()=>{
		goto('/productos')
	}
		
	</script>
	
	<div> <!----------------------------modal add productos-->  
			<Modal bind:open={$formModal} size="xs" autoclose={false} on:close="{ModalClose}" class="w-full">  <!--dejar en false el autoclose-->
				<form class="flex flex-col space-y-6"  method="POST" action="?/addProd">	
					<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Agregar un producto nuevo</h3>
					<Label class="space-y-2">
					  <span>Producto</span>
					  <Input type="text" name="nombre" placeholder="escribe aqui el producto" class="bg-white h-8 rounded" required/>
					</Label>
					<Label class="space-y-2">
					  <span>Precio</span>
					  <Input type="text" name="precio" placeholder="escribe aqui el precio" class="bg-white h-8 rounded" required/>
					</Label> 
					<footer>
					<Button type="submit" class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded">Confirmar</Button>
					<Button on:click={() => goto('/productos?search=')} class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded">Cancela</Button>
				   </footer>  
				</form>
				</Modal>
			 
		   
	</div> <!----------------------fin de modal add productos-->
		
		<div><!--editar-->
			<form class="flex flex-col space-y-6" method="POST" action="?/editar" >	 <!-----------modal editar-->
			<Modal bind:open={$formModalEdit} size="xs" autoclose={false} on:close="{ModalClose}" class="w-full"  >
				
				  <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Porfavor edite el producto!!</h3>
					<Input type="hidden" name="producto_id" value={$selectedProducto} class="bg-white h-8 rounded" required />
				  <Label class="space-y-2">
					<span>Nombre</span>
					<Input type="text" name="nombre" value={$selectedNombre} class="bg-white h-8 rounded" required/>
				  </Label> 
				  <Label class="space-y-2">
					<span>Precio</span>
					<Input type="text" name="precio" value={$selectedPrecio} class="bg-white h-8 rounded" required/>
				  </Label>
				  <footer> 
				  <Button type="submit" class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded">Confirmar</Button>
				  <Button on:click={() => goto('/productos?search=')} class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded">Cancelar</Button>
				</footer>
				</Modal>
			</form>
			</div><!--editar-->
			<div> <!--eliminar-->
			<form class="flex flex-col space-y-6" method="POST" action="?/delete" on:submit={$selectedProducto}>
				<Modal bind:open={$formModalDelete} size="xs" autoclose={false} class="w-full" on:close="{ModalClose}" > 		
					  <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white"> Confirmar la eliminación  !!</h3>
					  <P value={$selectedNombre}>Producto: {$selectedNombre}</P>   
					  <Input type="hidden" name="producto_id" value={$selectedProducto}  class="bg-white h-8 rounded"/>	   
					  <Button type="submit" class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded">Confirmar</Button>
					  <Button on:click={() => goto('/productos?search=')} class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded">Cancelar</Button>
					</Modal>
				</form>
			</div><!--eliminar-->
	
		<style>
			
		</style>