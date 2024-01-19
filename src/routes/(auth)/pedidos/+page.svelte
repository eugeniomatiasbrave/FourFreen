<script >
	//import {goto} from '$app/navigation';
	import { page } from '$app/stores';
	import { Input, Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	export let data;
	export const { pedidos } = data;
	
let Pedidos = pedidos.datos		
const estadoId = $page.url.searchParams.get("estado_id") || "0";

let titulo = "";
	switch (estadoId) {
		case "0":
		titulo = "Tabla de Pedidos";	
		break;
		case "10":
		titulo = "Pedidos Ingresados";	
		break;
		case "20":
		titulo = "Pedidos Confeccionados";	
		break;
		case "30":
		titulo = "Pedidos Entregados";	
		break;
		default: 
		break;
	}
					
/*				
function filterEstadoId10() {
    if (estadoId !== 0) {            
        searchParams.set('estado_id', '10')	 
	  } else {
	        searchParams.set('estado_id', '0')
	    }
        goto(`?${searchParams.toString()}`);
}
	*/	
	
//const searchParams = new URLSearchParams($page.url.searchParams);
let selected="0" ;

const ruta = () => {
		window.location.href = ( `/pedidos?estado_id=${selected}`);
	}


</script>
	<main class="bg-gray-50 dark:bg-gray-900 sm:p-3 mx-1 w-full ">
		<div class="my-4">
		  <h3 class="text-3xl font-bold text-center py-2 bg-gradient-to-r
			 from-secundary-400 from-30% via-primary-500 via-50% to-primary-500 to-50% text-transparent bg-clip-text">{titulo}</h3>
		</div>
	 <div class="bg-white mx-auto p-1 pt-1 rounded-2xl border border-gray-300 shadow-md w-full xl:w-4/5 "> <!--Div contenedor: tabla + add + Filtro--------->
		<div class="flex flex-col sm:flex-row justify-between items-center mx-auto w-full"><!-----cabecera Add + Filtro---------> 
			<div class="mb-2 sm:mb-0 w-full sm:w-auto"><!-------Boton nuevo pedido-------------->
				<Button href='/pedidos/0' data-sveltekit-preload-code="hover" size="xs" class="bg-primary-500 rounded-2xl m-0 h-7 px-3 w-full sm:w-auto">
				<svg class="w-4 h-4 me-1 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
				fill="none" viewBox="0 0 20 20">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
				d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
				</svg> Nuevo</Button>
						
			</div><!-----------fin botton add-------------->
		  <div class="flex items-center w-full sm:w-auto">
			<div>
			 <select bind:value={selected} id="small" required class="block w-full h-7 text-xs py-0 text-gray-900 border
			border-gray-300 rounded-b-2xl cursor-pointer bg-gray-50 focus:ring-gray-50 focus:border-primary-500 dark:bg-gray-700
			dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
			dark:focus:border-primary-500">
			  <option value="0">Todos los Pedidos</option>
			  <option value="10">Pedidos Ingresados</option>
			  <option value="20">Pedidos Confeccionado</option>
			  <option value="30">Pedidos Entregados</option>
			  <option value="40">Pedidos Facturado</option>
			  <option value="50">Pedidos Cobrado</option>
			</select>
		  </div>
		  <div>
			<Button type="button"  on:click={ruta} size="xs" class=" rounded-lg mx-1 px-1 
			bg-white  h-7 w-full hover:bg-primary-500 text-primary-500
			border border-primary-500  focus:ring-gray-50 focus:border-primary-500 dark:bg-gray-700
			dark:border-gray-600 dark:placeholder-gray-400 hover:text-white dark:focus:ring-gray-200
			"><svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
			</svg></Button>
		  </div>	
	   </div> 
			<div class="flex items-center w-full sm:w-auto"><!----- Filtro--------->
				<Input type="text" id="search" name="search" placeholder="Buscar Pedido" class="bg-white h-7 w-full sm:w-auto rounded-2xl" required/>
				<Button  size="xs" class="bg-primary-500 h-7 ml-1 px-3 rounded-2xl">Buscar</Button>
				<Button size="xs" class="bg-primary-500 h-7 ml-1 px-3 rounded-2xl">Actualizar</Button>		
			</div>			    
		 </div> <!-----fin cabecera Add + Filtro--------->
	  <div class="border-gray-900">
		<Table hoverable={true} class="mx-auto mt-1 border text-xs">  <!-------Table-------------->
		  <TableHead class="bg-primary-500 text-white" theadClass='text-xs' style="text-align: right;">
			<TableHeadCell class="py-2 px-0 ">Pedido Id</TableHeadCell>
			<TableHeadCell class="py-2" style="text-align: left;">Cliente</TableHeadCell>
			<TableHeadCell class="py-2" style="text-align: center;">Fecha</TableHeadCell>			
			<TableHeadCell class="py-2 px-0">Estado Id</TableHeadCell>
			<TableHeadCell class="py-2">Detalle</TableHeadCell>
			<TableHeadCell class="py-2" >Estado Pedido</TableHeadCell>
			<TableHeadCell class="py-2 px-0" style="text-align: center;">Us id</TableHeadCell>
			<TableHeadCell class="py-2">Items</TableHeadCell>
			<TableHeadCell class="py-2">Editar</TableHeadCell>
			<TableHeadCell class="py-2">Eliminar</TableHeadCell>
			<TableHeadCell class="py-2" style="text-align: right;">Tot. Uds</TableHeadCell>
			<TableHeadCell class="py-2" style="text-align: right;">Total</TableHeadCell>	
		</TableHead>
		<TableBody class="divide-y">
			{#each Pedidos  as pe }  
			 <TableBodyRow class="hover:bg-hover-gray-light" style="text-align: center;">
				<TableBodyCell class="py-2"> {pe.pedido_cab_id}</TableBodyCell>
				<TableBodyCell class="py-2" style="text-align: left;">{pe.razon_social}</TableBodyCell>
				<TableBodyCell class="py-2" style="text-align: right;">{pe.fecha=new Intl.DateTimeFormat('es', {day: 'numeric', month: 'numeric', year: 'numeric'}).format(new Date(pe.fecha))}</TableBodyCell>				
				<TableBodyCell class="py-2"><a href={`/pedidos_estado/${pe.pedido_estado_id}`}  
					class="font-medium text-primary-600 hover:underline dark:text-primary-500">{pe.pedido_estado_id}</a></TableBodyCell>
				<TableBodyCell class="py-2">{pe.pedido_estado_nombre}</TableBodyCell>
				<TableBodyCell class="py-2"> 
					<a href={`/pedidos/${pe.pedido_cab_id}/detalle`}  
					class="font-medium text-primary-600 hover:underline dark:text-primary-500"> Detalle</a>
				</TableBodyCell> <!--detalle pedido-->
				<TableBodyCell class="py-2">{pe.usuario_id}</TableBodyCell>
				<TableBodyCell class="py-2">{pe.items}</TableBodyCell>
				<TableBodyCell class="py-2">{pe.editar}</TableBodyCell>
				<TableBodyCell class="py-2">{pe.eliminar}</TableBodyCell>
				<TableBodyCell class="py-2" style="text-align: right;">{pe.total_unidades}</TableBodyCell>
				<TableBodyCell class="py-2" style="text-align: right;">
					${pe.total_importe.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableBodyCell>		
				</TableBodyRow>
			{/each}
			</TableBody>
			</Table>
		</div>
	  </div><!------------ -Div contenedor: tabla + add + Filtro-->
	</main> 

<style>
	.rounded-b-2xl {
        border-radius: 1.5rem 0.5rem 0.5rem 1.5rem;
    }
	



</style>

				