<script >
	
	import { fade } from 'svelte/transition'
	import { browser } from '$app/environment';
	import {formatDate} from '$lib/DateUtils';
	import { page } from '$app/stores';	
	import { goto } from '$app/navigation';
	import {Dropdown, DropdownItem, DropdownDivider, Input, Button, Table, TableBody, TableBodyCell, Span,TableBodyRow, TableHead, TableHeadCell, Badge } from 'flowbite-svelte';
    import { ChevronDownSolid } from 'flowbite-svelte-icons';
	import Titulo from '$lib/componentes/titulo.svelte';
	

	export let data;
	export const { pedidos } = data;

	
	
	let Pedidos = pedidos.datos

	let cantAll = Pedidos.length;
	let cantIngresados= Pedidos.filter(p => p.pedido_estado_id === 10).length;
	let cantPreparados= Pedidos.filter(p => p.pedido_estado_id === 20).length;
	let cantEntregados= Pedidos.filter(p => p.pedido_estado_id === 30).length;
	let cantFacturados= Pedidos.filter(p => p.pedido_estado_id === 40).length;
	let cantCobrados= Pedidos.filter(p => p.pedido_estado_id === 50).length;
	
	let estadoId = parseInt($page.url.searchParams.get("estado_id")?.toString() || '0');
	
	const searchParams = new URLSearchParams(browser ? window.location.search : '?estado_id=0');
	//solucionar problema de redireccionamiento
	if (!searchParams.has('estado_id')) { // Si no hay estado_id, establece el estado_id en 0
		searchParams.set('estado_id', '0');// Establece el estado_id en 0
		goto(`?${searchParams.toString()}`); // Redirige a la página con el estado_id en 0
	}

	let mutatedData = Pedidos;
	
	$: estadoId = parseInt($page.url.searchParams.get("estado_id")?.toString() || '0');
	$: mutatedData = estadoId ? Pedidos.filter(p => p.pedido_estado_id === estadoId) : Pedidos;

	let titulo = "Todos los Pedidos"; // Título por defecto
	$: {
	    switch(estadoId) {
	        case 10:
	            titulo = "Pedidos Ingresados";
	            break;
	        case 20:
	            titulo = "Pedidos Preparados";
	            break;
			case 30:
	            titulo = "Pedidos Entregado";
	            break;
			case 40:
                titulo = "Pedidos Facturado";
                break;
			case 50:
                titulo = "Pedidos Cobrado";
                break;
	        default:
	            titulo = "Todos los Pedidos ";
	    }
	}

	function filterByEstadoId(newEstadoId) {
	    estadoId = newEstadoId; // Actualiza el estadoId actual
	    searchParams.set('estado_id', newEstadoId.toString());
	    goto(`?${searchParams.toString()}`);
	}

	 
</script>

<svelte:head>
	<title>{titulo}</title>
	<meta name="description" content="Pedidos"/>
</svelte:head>
{#key estadoId} <!--cada vez que cambia el estado_id se genera el efecto de fade (transition)-->

	<main class="bg-gray-50 dark:bg-gray-900 m-0 w-full " in:fade|global>
		<Titulo {titulo}/>
	 <div class="bg-white mx-auto p-1 pt-1 rounded-lg border border-gray-300 shadow-md w-full xl:w-4/5 "> <!--Div contenedor: tabla + add + Filtro--------->
		<div class="flex flex-col sm:flex-row justify-between items-center mx-auto w-full"><!-----cabecera Add + Filtro---------> 
			<div class="mb-2 sm:mb-0 w-full sm:w-auto"><!-------Boton nuevo pedido-------------->
				<Button href='/pedidos/0' data-sveltekit-preload-code="hover" size="xs" class="bg-primary-500 rounded-lg m-0 h-7 px-3 w-full sm:w-auto">
				<svg class="w-4 h-4 me-1 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
				fill="none" viewBox="0 0 20 20">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
				d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
				</svg> Nuevo</Button>			
			</div><!-----------fin botton add-------------->
			<div class="mx-auto flex justify-between-center">
				<Button color="light" class="rounded-lg h-7" >Estado de pedidos<ChevronDownSolid 
					class="w-3 h-3 ms-2 text-gray-500 dark:text-gray-100" /></Button>
			   <Dropdown>
				<DropdownItem on:click={() => filterByEstadoId(0)}>Todos los Pedidos 
					<Badge rounded class="w-4 h-4 ms-2 p-0 font-semibold text-primary-900 bg-gray-200 dark:text-primary-800 dark:bg-white">{cantAll}</Badge></DropdownItem>
				<DropdownDivider />
				<DropdownItem on:click={() => filterByEstadoId(10)}>Pedidos Ingresados 
					<Badge rounded class="w-4 h-4 ms-2 p-0 font-semibold text-primary-900 bg-gray-200 dark:text-primary-800 dark:bg-white">{cantIngresados}</Badge></DropdownItem>
				<DropdownItem on:click={() => filterByEstadoId(20)}>Pedidos Preparados 
					<Badge rounded class="w-4 h-4 ms-2 p-0 font-semibold text-primary-900 bg-gray-200 dark:text-primary-800 dark:bg-white">{cantPreparados}</Badge></DropdownItem>
				<DropdownItem on:click={() => filterByEstadoId(30)}>Pedidos Entregados
					<Badge rounded class="w-4 h-4 ms-2 p-0 font-semibold text-primary-900 bg-gray-200 dark:text-primary-800 dark:bg-white">{cantEntregados}</Badge></DropdownItem>
				<DropdownItem on:click={() => filterByEstadoId(40)}>Pedidos Facturados
					<Badge rounded class="w-4 h-4 ms-2 p-0 font-semibold text-primary-900 bg-gray-200 dark:text-primary-800 dark:bg-white">{cantFacturados}</Badge></DropdownItem>
				<DropdownItem on:click={() => filterByEstadoId(50)}>Pedidos Cobrados  
					<Badge rounded class="w-4 h-4 ms-4 p-0 font-semibold text-primary-900 bg-gray-200 dark:text-primary-800 dark:bg-white">{cantCobrados}</Badge></DropdownItem>
			  </Dropdown>
		    </div>
			<div class="flex items-center w-full sm:w-auto"><!----- Filtro--------->
				<Input type="text" id="search" name="search" placeholder="Buscar Pedido" class="bg-white h-7 w-full sm:w-auto rounded-lg" required/>
				<Button  size="xs" class="bg-primary-500 h-7 ml-1 px-3 rounded-lg">Buscar</Button>
				<Button size="xs" class="bg-primary-500 h-7 ml-1 px-3 rounded-lg">Actualizar</Button>		
			</div>			    
		 </div> <!-----fin cabecera Add + Filtro--------->
	  <div class="border-gray-900">
		<Table hoverable={true} class="mx-auto mt-1 border text-xs">  <!-------Table-------------->
		  <TableHead class="bg-primary-500 text-white" theadClass='text-xs' style="text-align: right;">
			<TableHeadCell class="py-2 px-0 ">Pedido Id</TableHeadCell>
			<TableHeadCell class="py-2" style="text-align: left;">Cliente</TableHeadCell>
			<TableHeadCell class="py-2" style="text-align: center;">Fecha</TableHeadCell>			
			<TableHeadCell class="py-2 px-0">Estado Id</TableHeadCell>
			<TableHeadCell class="py-2">Estado Pedido</TableHeadCell>
			<TableHeadCell class="py-2" >Detalle</TableHeadCell>
			<TableHeadCell class="py-2 px-0" style="text-align: center;">Us id</TableHeadCell>
			<TableHeadCell class="py-2">Items</TableHeadCell>
			<TableHeadCell class="py-2">Editar</TableHeadCell>
			<TableHeadCell class="py-2">Eliminar</TableHeadCell>
			<TableHeadCell class="py-2" style="text-align: right;">Tot. Uds</TableHeadCell>
			<TableHeadCell class="py-2" style="text-align: right;">Total</TableHeadCell>	
		</TableHead>
		<TableBody class="divide-y">
			{#each mutatedData as pe }  
			 <TableBodyRow class="hover:bg-hover-gray-light" style="text-align: center;">
				<TableBodyCell class="py-2"> {pe.pedido_cab_id}</TableBodyCell>
				<TableBodyCell class="py-2" style="text-align: left;">{pe.razon_social}</TableBodyCell>
				<TableBodyCell class="py-2" style="text-align: right;">{ formatDate(pe.fecha)}</TableBodyCell>			
				<TableBodyCell class="py-2">  
					<a href={`/pedidos_estado/${pe.pedido_estado_id}`} class="font-medium text-primary-600 hover:underline dark:text-primary-500">{pe.pedido_estado_id}</a>
				   </TableBodyCell>
				<TableBodyCell class="py-2" >
					<div class="pedido-estado pedido-estado-{pe.pedido_estado_nombre.toLowerCase().replace(/\s/g, '-')}">
						{pe.pedido_estado_nombre}
					</div>
				</TableBodyCell>
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
			<tfoot >
				<tr class="bg-gray-300 font-semibold text-gray-900 dark:text-white divide-y hover:bg-hover-gray-light ">
				  <th scope="row" class="py-2 text-center ps-3"></th>
				  <td class="py-2"> </td>
				  <td class="py-2"></td>
				  <td class="py-2"></td>
				  <td class="py-2"></td>
				  <td class="py-2"></td>
				  <td class="py-2 ps-6">{mutatedData.length}</td>
				  <td class="py-2"></td>
				  <td class="py-2"></td>
				  <td class="py-2"></td>
				  <td class="py-2 pe-6" style="text-align: right;">{ mutatedData.reduce((total, item) => total + item.total_unidades, 0)}</td>
				  <td class="py-2 text-right pe-6">$ { mutatedData.reduce((total, item) => total + item.total_importe, 0).toFixed(2)}</td> 
				</tr>
			  </tfoot>
			</Table>
		</div>
	  </div><!------------ -Div contenedor: tabla + add + Filtro-->
	</main> 

	{/key}


	<style>
		.pedido-estado {
		  padding: 6px 3px 6px 3px; 
		  margin: 0;
		  border: 1px solid #e3e2e2;
		  border-radius: 15px;
		  font-weight: bold;
		}
	  
		.pedido-estado-pedido-ingresado {
		  background-color: #f5fb9e; 
		}
	  
		.pedido-estado-pedido-confeccionado {
		  background-color: #fcd747; 
	    }

		.pedido-estado-pedido-entregado {
		  background-color: #cde986; 
		}
		
		.pedido-estado-pedido-facturado {
		  background-color: #9adee4;   
		}
		
		.pedido-estado-pedido-cobrado {
		  background-color: #69b6bd; 
		}
	  
		.pedido-estado-pedido-anulado {
		  background-color: #d3d3d3; 
		}
		
	  </style>





				