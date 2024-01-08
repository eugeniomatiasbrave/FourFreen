<script >
	import {page} from '$app/stores';
	import { Input, Button, P, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell} from 'flowbite-svelte';
	import {goto} from '$app/navigation';
	export let data;	
	export const { pedidos} = data;
	
	

	
	
	const estadoId = $page.url.searchParams.get('estado_id') || "0"
	 
	 let titulo = "";
	 switch (estadoId) {
		case "0":
			titulo = "Tabla de Pedidos";	
			break;
			case "10":
			titulo = "Pedidos Ingresados";
			break;
			case "20":
			titulo = "Pedidos confeccionados";
			break;
			case "30":
			titulo = "Pedidos entregados"; 
		default:
			break;
	 }
	

	let selected = "0";
	
	const ruta = () => {
		goto(`/pedidos?estado_id=${selected}`);
	}
	
	</script>
		<svelte:head>
		<title>{titulo}</title>
		<meta name="description" content="Pedidos"/>
		</svelte:head>
	
	<main class="bg-gray-50 dark:bg-gray-900 sm:p-3 mx-1 w-full ">
		<div class="my-4">
		  <P size="2xl" align="center">{titulo} </P>
		</div>
		<div class="bg-white mx-auto p-1 pt-1 my-3 rounded border border-gray-200 shadow w-full xl:w-1/4 ">
			<P size="xl" align="left"  >Búsqueda por estado</P>
			<select bind:value={selected}  id="small" required class="block w-full h-7 mb-1 text-xs py-0 text-gray-900 border
			border-gray-300 rounded bg-gray-50 focus:ring-secundary-800 focus:border-secundary-800 dark:bg-gray-700
			dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secundary-800
			dark:focus:border-secundary-800">
			  <option value="0">Seleccionar todos losEstado</option>
			  <option value="10">Pedidos Ingresados</option>
			  <option value="20">Pedidos Preparados</option>
			  <option value="30">Pedidos Entregados</option>
			</select>
			<Button on:click={ruta}  size="sm" class="
			bg-secundary-500 rounded my-1 h-7 px-2 w-full hover:bg-secundary-800
			border-gray-300  focus:ring-secundary-500 focus:border-secundary-500 dark:bg-gray-700
			dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secundary-500
			dark:focus:border-secundary-500">Buscar</Button>	 
		</div>	
	 <div class="bg-white mx-auto p-1 pt-1 rounded border border-gray-200 shadow-md w-full xl:w-4/5 "> <!----------------Div contenedor: tabla + add + Filtro--------->
	   <div class="flex flex-col sm:flex-row justify-between items-center mx-auto w-full"><!-----cabecera Add + Filtro---------> 
		<div class="mb-2 sm:mb-0 w-full sm:w-auto"><!-------Boton nuevo pedido-------------->
			<Button href='/pedidos/0' data-sveltekit-preload-code="hover" size="xs" class="bg-primary-500 rounded m-0 h-7 px-2 w-full sm:w-auto">
			<svg class="w-4 h-4 me-1 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
			fill="none" viewBox="0 0 20 20">
			<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
			d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
			</svg> Nuevo</Button>		
		</div><!-----------fin botton add-------------->
		<div class="flex items-center"><!----- Filtro--------->
			<Input type="text" id="search"  name="search" placeholder="Buscar Pedido" class="bg-white h-7 w-full sm:w-auto rounded" required/>
			<Button  size="xs" class="bg-primary-500 h-7 ml-1 px-2  rounded">Buscar</Button>
			<Button size="xs" class="bg-primary-500 h-7 ml-1 px-2  rounded">Actualizar</Button>		
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
			<TableHeadCell class="py-2">Us id</TableHeadCell>
			<TableHeadCell class="py-2">Items</TableHeadCell>
			<TableHeadCell class="py-2">Detalle</TableHeadCell>
			<TableHeadCell class="py-2" style="text-align: right;">Tot. Uds</TableHeadCell>
			<TableHeadCell class="py-2" style="text-align: right;">Total</TableHeadCell>	
		</TableHead>
		<TableBody class="divide-y">
			{#each pedidos.datos as pe}
			 <TableBodyRow class="hover:bg-hover-gray-light" style="text-align: center;">
				<TableBodyCell class="py-2">{pe.pedido_cab_id}</TableBodyCell>
				<TableBodyCell class="py-2">{pe.cliente_id}</TableBodyCell>
				<TableBodyCell class="py-2" style="text-align: left;">{pe.razon_social}</TableBodyCell>
				<TableBodyCell class="py-2" style="text-align: right;">{pe.fecha}</TableBodyCell>				
				<TableBodyCell class="py-2">  
				 <a href={`/pedidos_estado/${pe.pedido_estado_id}`} data-sveltekit-preload-code="hover" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Estado</a>
				</TableBodyCell>
				<TableBodyCell class="py-2">{pe.pedido_estado_nombre}</TableBodyCell>
				<TableBodyCell class="py-2">{pe.usuario_id}</TableBodyCell>
				<TableBodyCell class="py-2">{pe.items}</TableBodyCell>
				<TableBodyCell class="py-2">
					<a href={`/pedidos/${pe.pedido_cab_id}/detalle`} data-sveltekit-preload-code="hover" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Detalle</a>
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