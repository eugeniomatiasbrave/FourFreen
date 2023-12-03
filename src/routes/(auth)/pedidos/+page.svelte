<script >
import { page } from '$app/stores';
import {Input,Button,P,Label,Select,Modal,Table,TableBody,TableBodyCell,TableBodyRow,TableHead,TableHeadCell} from 'flowbite-svelte';
import {onMount} from 'svelte';
//import { goto } from '$app/navigation';
export let data;
export let form;
	
export const { pedidos, productos, clientes} = data;

const estado_id = $page.url.searchParams.get('estado_id') || "0"
 
 let titulo = ""
 switch (estado_id) {
	case "0":
		titulo = "Tabla de Pedidos"
		break;
		case "10":
		titulo = "Pedidos Ingresados"
		break;
		case "20":
		titulo = "Pedidos Confeccionados"
		break;
		case "30":
		titulo = "Pedidos Entregados"
		break;
	default:
		break;
 }


let items=[];
//let isOpenAdd = false;







// console.log(form)
// console.log(pedidos.datos);
let formModalAdd = false;
	
onMount(() => {
  if (form?.success) {
   Swal.fire({
     icon: 'success',
     title: form.message,
     text: 'Cliente: ',
     backdrop: true,
     confirmButtonText: 'Volver',
     confirmButtonColor: 'rgb(69, 166, 175)'
   })}
   });


function handleProductoChange(event) {
const selectedIndex = event.target.selectedIndex;
const selectedOption = event.target.options[selectedIndex];
precio = selectedOption.getAttribute('data-precio');
}

// ------------------------variables cabecera-----
let cliente_id;
let fecha = new Date().toISOString();
// ------------------------variables detalle items
let unidades;
let producto_id;
let precio;	
  
function handleAdd(event) {
    event.preventDefault();

  const newItem = {
       producto_id,
       unidades,
       precio,
     };
       items= [...items, newItem];
	// console.log(items)
  }

/*
function ModalAdd() {
  isOpenAdd=!isOpenAdd;
}
*/

let Pedido = pedidos.datos;
let selectedOption = '';
let searchTerm = '';

const filteredPedidos=()=> {
	Pedido = pedidos.datos.filter(pe => {
		return (selectedOption === '' || pe.pedido_estado_nombre.toString() === selectedOption) &&
		       (searchTerm === '' || pe.pedido_cab_id.toString().includes(searchTerm.toString()));
	});	 
}

const reset=()=> {
	searchTerm = '';
	selectedOption = '';
	Pedido = pedidos.datos;
}

const ModalClose =()=>{
	formModalAdd = false;
}

</script>

	<svelte:head>
	<title>{titulo}</title>
	<meta name="description" content="Tabla de Pedidos"/>
	</svelte:head>

<main class="bg-gray-50 dark:bg-gray-900 sm:p-3">
	
<P size="2xl" align="center" class="mb-8">{titulo}</P>
  
<div class=" bg-white mx-auto p-1 pt-2 border border-gray-200 rounded shadow-md w-4/5"> <!----------------Div contenedor: tabla + add + Filtro--------->
  <div class=" flex justify-between items-center mx-auto w-full mb-1"><!-----cabecera Add + Filtro--------->
	<div class=""> <!-------modal add-------------->
	   <div>
	     <Button on:click={() => (formModalAdd = true)} class="bg-primary-500 rounded h-8 p-2">+ Nuevo Producto</Button>
	   </div>
	   <form  method="POST" action="?/addPedido">       	 
	   <Modal bind:open={formModalAdd} size="xs" autoclose={false} class="w-full">			
                <div > <!---------------------cabecera ( nombre cliente y fecha)-------------->
				   <div>
					  <Select id="select-sm" size="sm"  class="mt-6 mb-4"  name="cliente_id"  bind:value={cliente_id}  required>
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
			    </div> <!---------------------fin cabecera-------------->
			       
						  <div >	<!----------- detalles items-------------->   
							<Input type="hidden" name="items" value={JSON.stringify( items = items.map(item => ({
							                                       	...item,
								                                     precio: Number(item.precio)
							                                            })) )}  />
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
						     <Button  on:click={handleAdd} class="bg-primary-500 h-8 ml-1 px-2 my-4 rounded">Add item</Button>	
					      </div>	
						
					   <div>	
						<div class="Area-pedido"> <!-------Area items-------------->
						 <Table hoverable={true}  class="border" >  <!-------Table-------------->
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
						<Button on:click={ModalClose} class="bg-primary-500 h-8 ml-2 rounded">Cancelar</Button>				  
						<Button class="bg-primary-500 h-8 ml-2 mt-2 rounded">Reset</Button>
						<Button type="submit" class="bg-primary-500 h-8 ml-2  rounded">Add Pedido</Button>		
					  </div>
					</Modal>
				</form>	
    </div><!-----------fin de modal add-------------->
	<div class="flex items-center"><!----- Filtro--------->
		<Input type="text" id="search" bind:value={searchTerm} name="search" class="bg-white h-8 rounded" placeholder="Search" required/>
		<Button on:click={()=> filteredPedidos(searchTerm)} class="bg-primary-500 h-8 ml-1 px-2 rounded">Buscar</Button>
		<Button on:click={reset} class="bg-primary-500 h-8 ml-1 px-2 rounded">Reset</Button>		
	</div>			    
  </div> <!-----fin cabecera Add + Filtro--------->
  <div class="border-gray-900">
<Table hoverable={true} class="border">  <!-------Table-------------->
	<TableHead class="bg-primary-500 text-white">
		<TableHeadCell>Pedido Id</TableHeadCell>
		<TableHeadCell>Cliente Id</TableHeadCell>
		<TableHeadCell>Cliente</TableHeadCell>
		<TableHeadCell>Fecha</TableHeadCell>			
		<TableHeadCell>Estado Id
			<span class="sr-only">Estado Id</span>
		</TableHeadCell>
		<TableHeadCell>Estado Pedido</TableHeadCell>
		<TableHeadCell>Editar</TableHeadCell>
		<TableHeadCell>Eliminar</TableHeadCell>
		<TableHeadCell>us id</TableHeadCell>
		<TableHeadCell>Items</TableHeadCell>
		<TableHeadCell>Detalle
			<span class="sr-only">Detalle</span>
		</TableHeadCell>
		<TableHeadCell>Tot. Uds</TableHeadCell>
		<TableHeadCell>Total</TableHeadCell>	
	</TableHead>
	<TableBody class="divide-y">
		{#each Pedido as pe}
		<TableBodyRow class="hover:bg-hover-gray-light">
            <TableBodyCell >{pe.pedido_cab_id}</TableBodyCell>
			<TableBodyCell >{pe.cliente_id}</TableBodyCell>
			<TableBodyCell >{pe.razon_social}</TableBodyCell>
			<TableBodyCell>{pe.fecha}</TableBodyCell>	
			<TableBodyCell> 
				<a href={`/estado_id/${pe.pedido_estado_id}`} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Estado: {pe.pedido_estado_id}</a> 
			</TableBodyCell>
			<TableBodyCell>{pe.pedido_estado_nombre}</TableBodyCell>
			<TableBodyCell>{pe.editar}</TableBodyCell>
			<TableBodyCell>{pe.eliminar}</TableBodyCell>
			<TableBodyCell>{pe.usuario_id}</TableBodyCell>
			<TableBodyCell>{pe.items}</TableBodyCell>
			<TableBodyCell>
			    <a href={`/pedidos/${pe.pedido_cab_id}`} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Detalle</a>
			</TableBodyCell> <!--detalle pedido-->
			<TableBodyCell>{pe.total_unidades}</TableBodyCell>
			<TableBodyCell>{pe.total_importe}</TableBodyCell>		
			</TableBodyRow>
		{/each}
		</TableBody>
		  <tfoot>
			<tr>
			 <th/>
				<td/>
				<td/>
				<td/>
				<td/>
				<td/>
				<td/>
				<td/>
				<td/>
				<td/>
				<td/>
                <td>Total<td/>
				<td>Total<td/>
			 </tr>
			</tfoot>
		</Table>
	</div>
  </div><!------------ -Div contenedor: tabla + add + Filtro-->
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