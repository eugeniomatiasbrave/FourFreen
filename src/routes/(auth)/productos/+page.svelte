<script>
	import { goto} from '$app/navigation';
	import {Input,Button,P,Table,TableBody,TableBodyCell,TableBodyRow,TableHead,TableHeadCell} from 'flowbite-svelte';			
	export let data;
	import { selectedProductoId, selectedNombre, selectedPrecio } from './storeProd';
	export const {productos,productosSearch,sortPrecio,searchSortPrecio,sortNombre,sortProducto_id}=data;
    import { onDestroy } from 'svelte';

	
let producto_id;
let nombre;
let precio;

const unsubscribeProductoId = selectedProductoId.subscribe(value => {
 producto_id = value;
});

const unsubscribeNombre = selectedNombre.subscribe(value => {
  nombre = value;
});

const unsubscribePrecio = selectedPrecio.subscribe(value => {
  precio = value;
});

onDestroy(() => {
  unsubscribeProductoId();
  unsubscribeNombre();
  unsubscribePrecio();
});

console.log(productos.datos)

let searchTerm='';
let sortOrder= 1
let Productos=productos.datos
let filteredPrecio=sortPrecio.datos
let filteredProductos=productosSearch.datos
let filteredSortNombre=sortNombre.datos
let filteredSortedId=sortProducto_id.datos

	
const applyFilter=(params)=>{
	let search=params;
	filteredProductos=productosSearch.datos.filter(prod=>prod.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
	Productos=filteredProductos; 
	goto(`/productos?search=${search}`);		
	}

const reset=()=>{
    searchTerm='';
	Productos=productos.datos;
	}

const OrderedPrecio=(params)=>{
	sortOrder= -sortOrder;
	let sort=params;
	if (sort===1) {
		filteredPrecio=sortPrecio.datos.sort((a,b)=>a.precio - b.precio);
	    } else if (sort===-1) {
		filteredPrecio=sortPrecio.datos.sort((a,b)=>b.precio - a.precio);
	    }
		Productos=filteredPrecio;
		goto(`/productos?sort=precio:${sort}`);
	}
		
const SortedNombre=(params)=>{
	sortOrder= -sortOrder;
    let sort=params;
	if (sort===1) {
		filteredSortNombre=sortNombre.datos.sort((c,d)=>c.nombre.localeCompare(d.nombre));
	    } else if (sort===-1) {
		filteredSortNombre=sortNombre.datos.sort((c,d)=>d.nombre.localeCompare(c.nombre));
	    }
		Productos=filteredSortNombre;
		goto(`/productos?sort=nombre:${sort}`);
    }

const SortedProducto_id=(params)=>{
	sortOrder= -sortOrder;
	let sort=params;
	let newOrder=[...sortProducto_id.datos]
	if (sort===1) {
		filteredSortedId=newOrder.sort((e,f)=>e.producto_id - f.producto_id);
		} else if (sort===-1) {
		filteredSortedId=newOrder.sort((e,f)=>f.producto_id - e.producto_id);
		}
		Productos=filteredSortedId;
		goto(`/productos?sort=producto_id:${sort}`);
	}

</script>
			
<svelte:head>
	<title>Productos</title>
	<meta name="description" content="Productos" />
</svelte:head>
		
<main class="bg-gray-50 dark:bg-gray-900 sm:p-3">
  <div class="my-4">
	<P size="2xl" align="center">Tabla de Productos</P>
  </div>
	<!--------------------------Seccion tabla --> 	
	  <div class=" bg-white mx-auto p-1 pt-2 rounded border border-gray-200 shadow-md w-2/3"><!----------------Div contenedor: tabla + add + Filtro--------->
	
		<div class="flex flex-col sm:flex-row justify-between items-center mx-auto w-full"> 
		<div class="mb-2 sm:mb-0 w-full sm:w-auto"> 
		  <Button href={`/productos/${0}/agregar`} size="xs" class="bg-primary-500 rounded m-0 px-2 w-full sm:w-auto">
			<svg class="w-4 h-4 me-1 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
			fill="none" viewBox="0 0 20 20">
			<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
			 d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
			</svg> Nuevo</Button>    
		</div>
		<div class="flex items-center"> 
		  <Input type="text" bind:value={searchTerm} name="searchTerm" placeholder="Buscar Producto" required class=" bg-white h-8 w-full sm:w-auto rounded"  /> 
		  <Button size="xs" on:click={()=> applyFilter(searchTerm)} class="bg-primary-500 h-8 ml-1 px-2  rounded">Buscar</Button> 
		  <Button size="xs" on:click={reset} class="bg-primary-500 h-8 ml-1 px-2 rounded">Actualizar</Button>
		</div> 
	  </div>
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
			 <div class="overflow-x-auto"> <!-------------------------------Nueva tabla Flowbite-------> 
				<Table hoverable={true} class="mx-auto mt-2 border text-xs" > 		
				<TableHead class=" bg-primary-500 text-white" > <!------------------------cabecera celdas-->
					<TableHeadCell class="text-xs " >
					  <div class="flex items-center ">
						ID<a href="#2" on:click={()=>SortedProducto_id(sortOrder === 1 ? -1 : 1)} class="bg-primary-500 hover:bg-primary-500 rounded" 
						size="xs"><svg class="w-3.5 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
					    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
				        </svg></a>
				      </div>
				    </TableHeadCell>
				    <TableHeadCell >
					  <div class="flex items-center">	
					    NOMBRE<a href="#2" on:click={()=>SortedNombre(sortOrder === 1 ? -1 : 1)} class=" bg-primary-500 hover:bg-primary-500 rounded" 
					    size="xs"><svg class="w-3.5 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
				        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
				        </svg></a>
					  </div>
				    </TableHeadCell> 
				    <TableHeadCell >
						<div class="flex items-center justify-end ">	
						PRECIO<a href="#3" on:click={()=>OrderedPrecio(sortOrder === 1 ? -1 : 1)} class="bg-primary-500 hover:bg-primary-500 rounded" 
					    size="xs"><svg class="w-3.5 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
					    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
				        </svg></a>
					</div>
				</TableHeadCell>
				  <TableHeadCell class="">Editar
					<span class="sr-only">Editar</span>
				  </TableHeadCell>
				  <TableHeadCell class="">Eliminar
					<span class="sr-only">Eliminar</span>
				  </TableHeadCell>
				</TableHead><!----------------------fin cabecera celdas-->
				
				<TableBody class="divide-y">
					{#each Productos as {producto_id, precio, nombre }}
					<TableBodyRow class="hover:bg-hover-gray-light">
					<TableBodyCell >{producto_id}</TableBodyCell>
					<TableBodyCell >{nombre}</TableBodyCell>
					<TableBodyCell style="text-align: right;" >${precio.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</TableBodyCell>
					<TableBodyCell>
						<!------------------------------------------------------Editar producto--------------------->
						<a href={`/productos/${producto_id}/editar`}  
						on:click={()=>{
							          selectedProductoId.set(producto_id);
							          selectedNombre.set(nombre);
							          selectedPrecio.set(precio.toLocaleString('de-DE', { minimumFractionDigits: 2 }));
							
							          }}  
							 class="font-medium text-primary-600 hover:underline dark:text-primary-500"  
							
							>Editar</a>			
					</TableBodyCell>
					<TableBodyCell>		
						<a href={`/productos/${producto_id}/eliminar`} 
						on:click={() =>{
							selectedProductoId.set(producto_id);
							selectedNombre.set(nombre);
							selectedPrecio.set(precio.toLocaleString('de-DE', { minimumFractionDigits: 2 }));
							}}  	
						class="font-medium text-primary-600 hover:underline dark:text-primary-500">Eliminar</a> 
				   </TableBodyCell>
				</TableBodyRow>
				{/each}	
				</TableBody>
			  </Table>
			</div>
		  </div> <!----------------fin Div contenedor: tabla + add + Filtro--------->	
	</main>






		
		
		
			