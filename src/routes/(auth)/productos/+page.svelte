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

// unsubscrib y onDestroy  para podre usar store y no genere leak fuga de memoria ...comprobarlo.
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
	
const alternarSortPre =()=> {
	OrderedPrecio(sortOrder === 1 ? -1 : 1);
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

const alternarSortId =()=> {
	SortedProducto_id(sortOrder === 1 ? -1 : 1);
}

const sortedNombre=(params)=> {
    sortOrder = -sortOrder;
	let sort=params;
    filteredSortNombre=sortNombre.datos.sort((a, b) => {
      const nameA = a.nombre.toUpperCase();
      const nameB = b.nombre.toUpperCase();
      if (nameA < nameB) {
        return -1 * sortOrder;
      }
      if (nameA > nameB) {
        return 1 * sortOrder;
      }
      return 0;
    });
	Productos=filteredSortNombre;
	goto(`/productos?sort=nombre:${sort}`);
  }

  const alternarSort =()=> {
    sortedNombre(sortOrder === 1 ? -1 : 1);
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
						ID<button on:click={alternarSortId} class="bg-primary-500 hover:bg-primary-500 rounded">	
							{#if sortOrder === 1}
						<svg class="w-2.5 h-4 ms-1.5 text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 8">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"/>
						</svg>
						{:else}
						<!-- SVG para la flecha ascendente -->	
						 <svg class="w-2.5 h-4 ms-1.5 text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 8">
						 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
						 </svg>	
						 {/if}
						 </button>			      
				      </div>
				    </TableHeadCell>
					<TableHeadCell >
					<div class="flex items-center">	
					    NOMBRE
						<button on:click={alternarSort} class="bg-primary-500 hover:bg-primary-500 rounded">	
							{#if sortOrder === 1}
						<svg class="w-2.5 h-4 ms-1.5 text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 8">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"/>
						</svg>
						{:else}
						<!-- SVG para la flecha ascendente -->	
						 <svg class="w-2.5 h-4 ms-1.5 text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 8">
						 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
						 </svg>	
						 {/if}
						 </button>
					  </div>
				    </TableHeadCell> 
				    <TableHeadCell >
						<div class="flex items-center justify-end ">	
						PRECIO
						<button on:click={alternarSortPre} class="bg-primary-500 hover:bg-primary-500 rounded">	
							{#if sortOrder === 1}
						<svg class="w-2.5 h-4 ms-1.5 text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 8">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"/>
						</svg>
						{:else}
						<!-- SVG para la flecha ascendente -->	
						 <svg class="w-2.5 h-4 ms-1.5 text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 8">
						 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
						 </svg>	
						 {/if}
						 </button> 
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
































		
		
		
			