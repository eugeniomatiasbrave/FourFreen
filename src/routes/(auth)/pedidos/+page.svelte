<script >
import {page} from '$app/stores';
import {Input,Button,P,Table,TableBody,TableBodyCell,TableBodyRow,TableHead,TableHeadCell} from 'flowbite-svelte';
import {goto} from '$app/navigation';
export let data;	
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
	goto(`/pedidos`);
}

</script>
	<svelte:head>
	<title>{titulo}</title>
	<meta name="description" content="Tabla de Pedidos"/>
	</svelte:head>

<main class="bg-gray-50 dark:bg-gray-900 sm:p-3 mx-1">
	<div class="my-4">
	  <P size="2xl" align="center">{titulo}</P>
	</div>	
 <div class="bg-white mx-auto p-1 pt-1 rounded border border-gray-200 shadow-md w-full xl:w-4/5"> <!----------------Div contenedor: tabla + add + Filtro--------->
   <div class="flex flex-col sm:flex-row justify-between items-center mx-auto w-full"><!-----cabecera Add + Filtro---------> 
	<div class="mb-2 sm:mb-0 w-full sm:w-auto"><!-------Boton nuevo pedido-------------->
	  <Button href='/pedidos/agregar' size="xs" class="bg-primary-500 rounded m-0 h-7 px-2 w-full sm:w-auto">
		<svg class="w-4 h-4 me-1 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
		fill="none" viewBox="0 0 20 20">
		<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
		d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
		</svg> Nuevo</Button>		
	</div><!-----------fin botton add-------------->
	<div class="flex items-center"><!----- Filtro--------->
		<Input type="text" id="search" bind:value={searchTerm} name="search" placeholder="Buscar Pedido" class="bg-white h-7 w-full sm:w-auto rounded" required/>
		<Button on:click={()=> filteredPedidos(searchTerm)} size="xs" class="bg-primary-500 h-7 ml-1 px-2  rounded">Buscar</Button>
		<Button on:click={reset} size="xs" class="bg-primary-500 h-7 ml-1 px-2  rounded">Actualizar</Button>		
	</div>			    
  </div> <!-----fin cabecera Add + Filtro--------->
  <div class="border-gray-900">
    <Table hoverable={true} class="mx-auto mt-1 border text-xs">  <!-------Table-------------->
	  <TableHead class="bg-primary-500 text-white" theadClass='text-xs' style="text-align: right;">
		<TableHeadCell class="py-2 px-0 ">Pedido Id</TableHeadCell>
		<TableHeadCell class="py-2 px-5">Cliente Id</TableHeadCell>
		<TableHeadCell class="py-2" style="text-align: left;">Cliente</TableHeadCell>
		<TableHeadCell class="py-2" style="text-align: center;">Fecha</TableHeadCell>			
		<TableHeadCell class="py-2">Estado Id</TableHeadCell>
		<TableHeadCell class="py-2" style="text-align: center;">Estado Pedido</TableHeadCell>
		<TableHeadCell class="py-2">Editar</TableHeadCell>
		<TableHeadCell class="py-2">Eliminar</TableHeadCell>
		<TableHeadCell class="py-2">Us id</TableHeadCell>
		<TableHeadCell class="py-2">Items</TableHeadCell>
		<TableHeadCell class="py-2">Detalle</TableHeadCell>
		<TableHeadCell class="py-2" style="text-align: right;">Tot. Uds</TableHeadCell>
		<TableHeadCell class="py-2" style="text-align: right;">Total</TableHeadCell>	
	</TableHead>
	<TableBody class="divide-y">
		{#each Pedido as pe}
		 <TableBodyRow class="hover:bg-hover-gray-light" style="text-align: center;">
            <TableBodyCell class="py-2">{pe.pedido_cab_id}</TableBodyCell>
			<TableBodyCell class="py-2">{pe.cliente_id}</TableBodyCell>
			<TableBodyCell class="py-2" style="text-align: left;">{pe.razon_social}</TableBodyCell>
			<TableBodyCell class="py-2" style="text-align: right;">{pe.fecha=new Intl.DateTimeFormat('es', {day: 'numeric', month: 'numeric', year: 'numeric'}).format(new Date(pe.fecha))}</TableBodyCell>				
			<TableBodyCell class="py-2"> 
				<a href={`/pedidos_estado/${pe.pedido_estado_id}`} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Estado: {pe.pedido_estado_id}</a> 
			</TableBodyCell>
			<TableBodyCell class="py-2">{pe.pedido_estado_nombre}</TableBodyCell>
			<TableBodyCell class="py-2">{pe.editar}</TableBodyCell>
			<TableBodyCell class="py-2">{pe.eliminar}</TableBodyCell>
			<TableBodyCell class="py-2">{pe.usuario_id}</TableBodyCell>
			<TableBodyCell class="py-2">{pe.items}</TableBodyCell>
			<TableBodyCell class="py-2">
			    <a href={`/pedidos/${pe.pedido_cab_id}/detalle`} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Detalle</a>
			</TableBodyCell> <!--detalle pedido-->
			<TableBodyCell class="py-2" style="text-align: right;">{pe.total_unidades}</TableBodyCell>
			<TableBodyCell class="py-2" style="text-align: right;">${pe.total_importe.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableBodyCell>		
			</TableBodyRow>
		{/each}
		</TableBody>
		</Table>
	</div>
  </div><!------------ -Div contenedor: tabla + add + Filtro-->
</main> 