<script>
import {goto} from '$app/navigation';
import {Input,Button,P,Table,Label,Modal,Select,TableBody,TableBodyCell,TableBodyRow,TableHead,TableHeadCell} from 'flowbite-svelte';
import {onMount} from 'svelte';
export let data;
export let form;	
export const { pedidos, productos, clientes} = data;

let items=[];
let formModalAdd = true;
	
onMount(()=>{
	if (form?.success){	
	Swal.fire({
	  icon:'success',
	  title:form.message,
	  backdrop:true,
	  confirmButtonText:'Volver',
	  confirmButtonColor:'rgb(69, 166, 175)',
	}).then((result)=>{
	  if (result.isConfirmed){
		goto('/pedidos');
	  }});
  }});

const handleProductoChange=(event)=> {
const selectedIndex = event.target.selectedIndex;
const selectedOption = event.target.options[selectedIndex];
precio = selectedOption.getAttribute('data-precio');
}

let selectedCliente_id;
let fecha = new Date().toISOString();
let unidades;
let producto_id;
let precio;	
  
const handleAdd=(event)=> {
    event.preventDefault();
    const newItem = {
       producto_id,
       unidades,
       precio,
     };
       items= [...items, newItem];
  }

  const handleSubmit=(event)=> {
    event.preventDefault();
    const pedido = {
     selectedCliente_id,
     fecha,
     items
  };
  console.log(pedido);
}

const ModalClose =()=>{
	formModalAdd = false;
	goto(`/pedidos`);
}

</script>

<div class="my-4"> 
 <P size="2xl" align="center" class="mb-8">Soy Agregar pedidos</P> 
</div> 
<main>
	<form  method="POST" >       	 
		<Modal bind:open={formModalAdd} size="xs" autoclose={false} class="w-full">			
			 <div> <!--cabecera ( nombre cliente y fecha)--->
					 <div>
						<Select id="select-sm" size="sm"  class="mt-6 mb-4" name="selectedCliente_id"  bind:value={selectedCliente_id}  required>
						  <option selected>cliente_id</option>
						   {#each clientes as cli}
						   <option  value={cli.cliente_id}>{cli.cliente_id} - {cli.razon_social}</option>
						   {/each}
						  </Select>
					  </div>
					  <div>
						  <Label >Fecha
						   <Input type="text" name="fecha" bind:value={fecha} class="bg-white h-8 rounded"/>
						  </Label>
					  </div>
				  </div><!---------------------fin cabecera-------------->    
					  <div><!----------- detalles items-------------->   
						  <Input type="hidden" name="items" value={JSON.stringify( items = items.map(item => ({
																		 ...item,
																	   precio: Number(item.precio)
																		  })) )} />
							  <Select bind:value={producto_id} on:change={handleProductoChange} required>
								<option selected>Productos</option>
								{#each productos.datos as prod}
								<option value={prod.producto_id} data-precio={prod.precio}>{prod.producto_id} - {prod.nombre}</option>
								 {/each}
							  </Select>	
							  <Label>Unidades
							  <Input type="number"  bind:value={unidades} class="bg-white h-8 rounded" required />
							  </Label>   
							  <Label class="mt-4">Precio		
							  <Input type="text" bind:value={precio} class="bg-white h-8 rounded" readonly required/>	
							  </Label>
							</div>					 
							<div>	  
							   <Button  on:click={handleAdd} size="xs" class="bg-primary-500 h-8 ml-1 px-2 my-4 rounded">Agregar item</Button>	
							</div>		
						 <div>	
						  <div class="Area-pedido"> <!-------Area items-------------->
						   <Table hoverable={true} class="border" ><!-------Table-------------->
							  <TableHead class="bg-primary-500 text-white"> 
								  <TableHeadCell>Producto_id</TableHeadCell>
								  <TableHeadCell>Unidades</TableHeadCell>
								  <TableHeadCell>Precio</TableHeadCell>	 	
							  </TableHead>
							   <TableBody class="divide-y">	
								  {#each items as item (item.producto_id)}
								  <TableBodyRow class="hover:bg-hover-gray-light">
								   <TableBodyCell>{item.producto_id}</TableBodyCell>
								   <TableBodyCell>{item.unidades}</TableBodyCell>
								   <TableBodyCell>{item.precio}</TableBodyCell>
								  </TableBodyRow>
								  {/each}
							  </TableBody>
						   </Table>
						  </div>
						 </div> <!-------fin Area items-------------->					
						 <div class="mt-2">
						  <Button on:click={ModalClose} size="xs" class="bg-primary-500 h-8 ml-2 rounded">Cancelar</Button>				  
						  <Button size="xs" class="bg-primary-500 h-8 ml-2 mt-2 rounded">Actualizar</Button>
						  <Button type="submit" on:submit={handleSubmit} size="xs" class="bg-primary-500 h-8 ml-2  rounded">Nuevo Pedido</Button>		
						</div>
					  </Modal>
				  </form>	
</main>

<style>
	.Area-pedido{
		background-color: rgb(253, 251, 251);
		min-height: 300px;
		border: 1px solid #b8b6b6;
		border-radius: 4px;
		overflow: scroll;		
	}		
</style>