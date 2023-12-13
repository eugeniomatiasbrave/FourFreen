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
//let fecha = new Intl.DateTimeFormat('es',{day: 'numeric',month: 'numeric',year: 'numeric'}).format(new Date());
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

const reset =()=>{
	items=[];
	producto_id="Seleccionar Producto";
	unidades="";
	precio="";
}

const formClose=()=>{
	goto(`/pedidos`);
}

</script>

<div class="my-4"> 
 <P size="2xl" align="center" class="mb-4">Nuevo Pedido</P> 
</div> 
<main class="flex items-start justify-center min-h-screen pb-36">
	<div class="bg-white mx-auto p-4 pt-2 my-2 rounded border border-gray-200 shadow-md sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/4">
	  <form method="POST" >       	 		
		<div> <!--cabecera ( nombre cliente y fecha)--->
			<div class="mt-2">
			  <label for="small" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Cliente</label>
               <select id="small" name="cliente_id" bind:value={cliente_id} required class="block w-full h-8 mb-2 text-xs text-gray-900 border
			                 border-gray-300 rounded bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700
				             dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
				             dark:focus:border-primary-500">
                <option selected>Seleccionar cliente</option>
                {#each clientes as cli}
                <option value={cli.cliente_id}>{cli.razon_social}</option>
                {/each}
               </select>
			</div>
			<div>
				<label for="small" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Fecha</label>
				<input id="small" type="text" maxlength="8" name="fecha" bind:value={fecha} class="block w-full h-8 mb-2 text-xs text-gray-900 border 
				 border-gray-300 rounded bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700
				 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
				 dark:focus:border-primary-500"/>			
			</div>
		</div><!---------------------fin cabecera-------------->    
		<div><!----------- detalles items-------------->   
			<input type="hidden" name="items" 
			   value={JSON.stringify( items = items.map(item =>({...item,precio: Number(item.precio)})) )}/>



			   <div class="mt-2">
				<label for="small" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Productos</label>
				 <select id="small" name="Productos" bind:value={producto_id} on:change={handleProductoChange} required 
				               class="block w-full h-8 mb-2 text-xs text-gray-900 border
							   border-gray-300 rounded bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700
							   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
							   dark:focus:border-primary-500">
				  <option selected>Seleccionar Producto</option>
				  {#each productos.datos as prod}
				  <option value={prod.producto_id} data-precio={prod.precio}>{prod.producto_id} - {prod.nombre}</option>
				  {/each} 
				 </select>
			  </div>
			<label for="small" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Unidades</label>
			<input type="number" placeholder="Agregar Unidades" bind:value={unidades} class="block w-full h-8 mb-2 text-xs text-gray-900 border
			border-gray-300 rounded bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700
			dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
			dark:focus:border-primary-500" required/>
			
			<label for="small" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Precio	</label>	
			<input type="text"  placeholder="Precio" bind:value={precio} class="block w-full h-8 mb-1 text-xs text-gray-900 border
			border-gray-300 rounded bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700
			dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
			dark:focus:border-primary-500" readonly required/>			
		</div><!-----------fin detalles items-------------->				 
		<div>	  
			<Button on:click={handleAdd} size="xs" class="bg-primary-500 h-8 ml-1 px-2 my-2 rounded">Agregar Item</Button>	
		</div>		
		<div><!-------Area items-------------->
		  <div class="Area-pedido"> 
			<Table hoverable={true} class="mx-auto border text-xs" ><!-------Table-------------->
				<TableHead class="bg-primary-500 text-white" style="text-align: center;" theadClass='text-xs'> 
					<TableHeadCell class="py-2">Producto_id</TableHeadCell>
					<TableHeadCell class="py-2" >Unidades</TableHeadCell>
					<TableHeadCell class="py-2" >Precio</TableHeadCell>	 	
				</TableHead>
				<TableBody class="divide-y">	
					{#each items as item (item.producto_id)}
					<TableBodyRow class="hover:bg-hover-gray-light" style="text-align: center;">
					<TableBodyCell class="py-2">{item.producto_id}</TableBodyCell>
					<TableBodyCell class="py-2">{item.unidades}</TableBodyCell>
					<TableBodyCell class="py-2" style="text-align: right;">${item.precio.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableBodyCell>
					</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		  </div>
		</div> <!-------fin Area items-------------->					
		<div class="mt-2">
			<Button on:click={formClose} size="xs" class="bg-primary-500 h-8 ml-2 rounded">Cancelar</Button>				  
			<Button size="xs" on:click={reset} class="bg-primary-500 h-8 ml-2 mt-2 rounded">Actualizar</Button>
			<Button type="submit" on:submit={handleSubmit} size="xs" class="bg-primary-500 h-8 ml-2  rounded">Nuevo Pedido</Button>		
		</div>				  
	</form>	
  </div>
</main>

<style>
	.Area-pedido{
		background-color: rgb(253, 251, 251);
		min-height: 200px;
		border: 1px solid #b8b6b6;
		border-radius: 4px;
		overflow: scroll;		
	}		
</style>