<script>
import {goto} from '$app/navigation';
import {Input,Button,P,Table,Label,Select,TableBody,TableBodyCell,TableBodyRow,TableHead,TableHeadCell} from 'flowbite-svelte';
import {onMount} from 'svelte';
export let data;
export let form;	
export const { productos, clientes} = data;

let items=[];

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

let cliente_id;
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
     cliente_id,
     fecha,
     items
  };
  console.log(pedido);
}

const formClose=()=>{
	goto(`/pedidos`);
}

</script>

<div class="my-4"> 
 <P size="2xl" align="center" class="mb-8">Nuevo Pedido</P> 
</div> 
<main class="flex items-start justify-center min-h-screen pb-36">
	<div class="bg-white mx-auto p-4 pt-2 my-2 rounded border border-gray-200 shadow-md sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/4">
	  <form method="POST" >       	 		
		<div> <!--cabecera ( nombre cliente y fecha)--->
			<div>
				<select id="select-sm" size="sm"  class="mt-6 mb-4" name="cliente_id"  bind:value={cliente_id}  required>
					<option selected>cliente_id</option>
					{#each clientes as cli}
					<option  value={cli.cliente_id}>{cli.cliente_id} - {cli.razon_social}</option>
					{/each}
				</select>
			</div>
			<div>
				<label >Fecha
				<input type="text" name="fecha" bind:value={fecha} class="bg-white h-8 rounded"/>
				</label>
			</div>
		</div><!---------------------fin cabecera-------------->    
		<div><!----------- detalles items-------------->   
			<input type="hidden" name="items" 
			   value={JSON.stringify( items = items.map(item =>({...item,precio: Number(item.precio)
																		  })) )}/>
			<select bind:value={producto_id} on:change={handleProductoChange} required>
				<option selected>Productos</option>
				{#each productos.datos as prod}
				<option value={prod.producto_id} data-precio={prod.precio}>{prod.producto_id} - {prod.nombre}</option>
				{/each}
			</select>	
			<label>Unidades
			<input type="number" bind:value={unidades} class="bg-white h-8 rounded" required />
			</label>   
			<label class="mt-4">Precio		
			<input type="text" bind:value={precio} class="bg-white h-8 rounded" readonly required/>	
			</label>
		</div><!-----------fin detalles items-------------->				 
		<div>	  
			<Button  on:click={handleAdd} size="xs" class="bg-primary-500 h-8 ml-1 px-2 my-4 rounded">Agregar item</Button>	
		</div>		
		<div><!-------Area items-------------->
		  <div class="Area-pedido"> 
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
			<Button on:click={formClose} size="xs" class="bg-primary-500 h-8 ml-2 rounded">Cancelar</Button>				  
			<Button size="xs" class="bg-primary-500 h-8 ml-2 mt-2 rounded">Actualizar</Button>
			<Button type="submit" on:submit={handleSubmit} size="xs" class="bg-primary-500 h-8 ml-2  rounded">Nuevo Pedido</Button>		
		</div>				  
	</form>	
  </div>
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