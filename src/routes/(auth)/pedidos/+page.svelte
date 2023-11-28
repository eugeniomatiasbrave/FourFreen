<script >
import { page } from '$app/stores';
import {Input,Button,P,Label,Modal,Table,TableBody,TableBodyCell,TableBodyRow,TableHead,TableHeadCell} from 'flowbite-svelte';
import {onMount} from 'svelte';
import { goto } from '$app/navigation';
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
let isOpenAdd = false;
// ------------------------variables cabecera-----
let cliente_id;
let fecha = new Date().toISOString();
// ------------------------variables detalle items
let unidades;
let producto_id;
let precio;	
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
  
function handleAdd(event) {
    event.prevenTableBodyCellefault();

  const newItem = {
       producto_id,
       unidades,
       precio,
     };
       items= [...items, newItem];
	// console.log(items)
  }


function ModalAdd() {
  isOpenAdd=!isOpenAdd;
}


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
  
<div class=" bg-white mx-auto p-1 pt-2 border rounded shadow-md w-4/5"> <!----------------Div contenedor: tabla + add + Filtro--------->
  <div class=" flex justify-between items-center mx-auto w-full"><!-----cabecera Add + Filtro--------->
	<div class=""> <!-------modal add-------------->
	   <div>
	     <Button on:click={() => (formModalAdd = true)} class="bg-primary-500 rounded h-8 p-2">Add</Button>
	   </div>
	   <Modal bind:open={formModalAdd} size="xs" autoclose={false} class="w-full">			
			<form  method="POST" action="?/addPedido">       	 
                <div > <!---------------------cabecera-------------->
				   <div>
					  <select  name="cliente_id"  bind:value={cliente_id} required>
						<option selected>cliente_id</option>
						{#each clientes as cli}
						<option  value={cli.cliente_id}>{cli.cliente_id} - {cli.razon_social}</option>
						{/each}
						</select>
					</div>
					<div>
						<Label>Fecha
						<Input type="text" name="fecha" bind:value={fecha} />
						</Label>
					</div>
			    </div> <!---------------------fin cabecera-------------->
			       <div> <!--revisar luego siesta demas-->
						  <div >	<!----------- detalles items-------------->   
							<Input type="hidden" name="items" value={JSON.stringify( items = items.map(item => ({
							                                       	...item,
								                                     precio: Number(item.precio)
							                                            }))
							    )}/>
							<select  bind:value={producto_id} on:change={handleProductoChange} required>
							<option selected>Productos</option>
							{#each productos.datos as prod}
							<option value={prod.producto_id} data-precio={prod.precio}>{prod.producto_id} - {prod.nombre}</option>
							{/each}
							</select>	
							<Label>Unidades
							<Input type="number"  bind:value={unidades} required />
							</Label>   
							<Label>Precio		
							<Input type="text" bind:value={precio} class="w" readonly required/>	
							</Label>
						  </div>					 
						  <div>	  
						     <Button  on:click={handleAdd} class="bg-primary-500 h-8 ml-1 px-2 rounded">Add item</Button>	
					      </div>	
						
					   <div id="Area-pedido">	<!-------Area items-------------->
						 <Table hoverable={true} class=" mt-2 border">  <!-------Table-------------->
							<TableHead class="bg-primary-500 text-white">
								<TableBodyRow>
									<TableHeadCell>Producto_id</TableHeadCell>
									<TableHeadCell>Unidades</TableHeadCell>
									<TableHeadCell>Precio</TableHeadCell>
								</TableBodyRow>
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
					   </div> <!-------fin Area items-------------->					
					   <div>
						<Button on:click={ModalClose} class="bg-primary-500 h-8 ml-2 mt-2 rounded">Cancelar</Button>				  
						<Button class="bg-primary-500 h-8 ml-2 mt-2 rounded">Reset</Button>
						<Button type="submit" class="bg-primary-500 h-8 ml-2 mt-2 rounded">Add Pedido</Button>		
					  </div>
				</form>	
	</Modal>
    </div> <!-----------fin de modal add-------------->

	<div class="flex items-center"><!----- Filtro--------->
		<Input type="text" id="search" bind:value={searchTerm} name="search" class="bg-white h-8 rounded" placeholder="Search" required/>
		<Button on:click={()=> filteredPedidos(searchTerm)} class="bg-primary-500 h-8 ml-1 px-2 rounded">Buscar</Button>
		<Button on:click={reset} class="bg-primary-500 h-8 ml-1 px-2 rounded">Reset</Button>		
	</div>			    
  </div> <!-----fin cabecera Add + Filtro--------->
  <div class="">
<Table hoverable={true} class=" mt-2 border">  <!-------Table-------------->
	<TableHead class="bg-primary-500 text-white">
		<TableHeadCell>Pedido Id</TableHeadCell>
		<TableHeadCell>Cliente Id</TableHeadCell>
		<TableHeadCell>Cliente</TableHeadCell>
		<TableHeadCell>Fecha</TableHeadCell>			
		<TableHeadCell>Estado Id</TableHeadCell>
		<TableHeadCell>Estado Pedido</TableHeadCell>
		<TableHeadCell>Editar</TableHeadCell>
		<TableHeadCell>Eliminar</TableHeadCell>
		<TableHeadCell>us id</TableHeadCell>
		<TableHeadCell>Items</TableHeadCell>
		<TableHeadCell>Detalle</TableHeadCell>
		<TableHeadCell>Tot.Uds</TableHeadCell>
		<TableHeadCell>Total</TableHeadCell>	
	</TableHead>
	<TableBody class="divide-y">
		{#each Pedido as pe}
		<TableBodyRow class="hover:bg-hover-gray-light">
            <TableBodyCell class="px-4">{pe.pedido_cab_id}</TableBodyCell>
			<TableBodyCell class="px-4">{pe.cliente_id}</TableBodyCell>
			<TableBodyCell class="px-4">{pe.razon_social}</TableBodyCell>
			<TableBodyCell class="px-2">{pe.fecha}</TableBodyCell>	
			<TableBodyCell class="px-4"> 
				<Button class="bg-primary-500 h-8 ml-1 px-2 rounded"><a href={`/estado_id/${pe.pedido_estado_id}`} style="color:white;">Estado:</a> {pe.pedido_estado_id}</Button>
			</TableBodyCell>
			<TableBodyCell class="px-4">{pe.pedido_estado_nombre}</TableBodyCell>
			<TableBodyCell class="px-4">{pe.editar}</TableBodyCell>
			<TableBodyCell class="px-4">{pe.eliminar}</TableBodyCell>
			<TableBodyCell class="px-4">{pe.usuario_id}</TableBodyCell>
			<TableBodyCell class="px-4">{pe.items}</TableBodyCell>
			<TableBodyCell class="px-4">
			    <Button class="bg-primary-500 h-8 ml-1 px-2 rounded"><a href={`/pedidos/${pe.pedido_cab_id}`} style="color:white;">Detalle</a></Button>
			</TableBodyCell> <!--detalle pedido-->
			<TableBodyCell class="px-4">{pe.total_unidades}</TableBodyCell>
			<TableBodyCell class="px-4">{pe.total_importe}</TableBodyCell>		
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
					<td>Total</td>
					<td>Total</td>
					<td/>
					<td/>
					<td/>
					<td/>
                    <td/>
					<td/>
				</tr>
			</tfoot>
		</Table>
	</div>
  </div><!------------ -Div contenedor: tabla + add + Filtro-->
</main> 

<style>
	#Area-pedido{
		background-color: rgb(253, 251, 251);
		max-height: 300px;
		border: 1px solid #4e4e4e;
		border-radius: 4px;
		overflow: scroll;
			
	}	
</style>