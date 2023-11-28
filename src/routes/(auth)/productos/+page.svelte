<script>
	import {goto} from '$app/navigation';
	import {Input,Button,P,Table,TableBody,TableBodyCell,TableBodyRow,TableHead,TableHeadCell} from 'flowbite-svelte';	
	import { ChevronDownSolid } from 'flowbite-svelte-icons';		
	import {selectedProducto,selectedNombre,selectedPrecio,formModal,formModalEdit,formModalDelete} from './store';			
	export let data;
	export const {productos,productosSearch,sortPrecio,searchSortPrecio,sortNombre,sortProducto_id}=data;
	
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
	
	/*
	const applySSP=(params)=>{
	  let search= params;
	  let sort=-1;
	  let filteredSSP=searchSortPrecio.datos
	  filteredSSP = searchSortPrecio.datos.filter(prod => prod.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
	  Productos=filteredSSP; 
	  goto(`/productos?search=${search}&sort=precio:${sort}`)
   }
   
*/
	
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
		
<main class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">

	<P size="2xl" align="center">Tabla de Productos</P>
	<!--------------------------Seccion tabla --> 	
		   <div class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5"><!----------------Div contenedor: tabla + add + Filtro--------->
			 <div class=" flex justify-between items-center mx-auto w-full md:w-1/2"> <!-----cabecera Add + Filtro--------->
				<div> <!----------------------------boton add productos--------> 		
				  <Button href="/productos/registros" size="xs" class="bg-primary-500 rounded px-2" on:click={()=>{formModal.set(true)}}>Add</Button>		
				</div>
				<div class="flex items-center"> <!----------------Filtro--------->
		         <Input type="text" bind:value={searchTerm} name="searchTerm" placeholder="Search" required class=" bg-white h-8 rounded"  /> 
			     <Button size="xs" on:click={()=> applyFilter(searchTerm)} class="bg-primary-500 h-8 ml-1 px-2 rounded">Buscar</Button> 
			<!--  <Button size="xs" on:click={()=> applySSP(searchTerm)} class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded" >Filtrar x nombre&precio</Button> -->
			     <Button size="xs" on:click={reset} class="bg-primary-500 h-8 ml-1 px-2 rounded">Reset</Button>
				</div> 
			  </div>
			 <div class="overflow-x-auto"> <!-------------------------------Nueva tabla Flowbite-------> 
			  <Table hoverable={true} class="w-1/2 mx-auto mt-2 "> 		
				<TableHead class="bg-primary-500 text-white"> <!------------------------cabecera celdas-->
				  <TableHeadCell>Img</TableHeadCell>
				  <TableHeadCell><Button on:click={()=>SortedProducto_id(sortOrder === 1 ? -1 : 1)} class="bg-primary-500 hover:bg-primary-500 rounded m-0 p-0" size="xs">ID<ChevronDownSolid class="w-3 h-3 ml-2 text-white dark:text-white"/></Button></TableHeadCell>
				  <TableHeadCell><Button on:click={()=>SortedNombre(sortOrder === 1 ? -1 : 1)} class="bg-primary-500 hover:bg-primary-500 rounded m-0 p-0" size="xs">NOMBRE<ChevronDownSolid class="w-3 h-3 ml-2 text-white dark:text-white"/></Button></TableHeadCell> 
				  <TableHeadCell><Button on:click={()=>OrderedPrecio(sortOrder === 1 ? -1 : 1)} class="bg-primary-500 hover:bg-primary-500 rounded m-0 p-0" size="xs">PRECIO<ChevronDownSolid class="w-3 h-3 ml-2 text-white dark:text-white"/></Button></TableHeadCell>
				  <TableHeadCell>Editar
					<span class="sr-only">Editar</span>
				  </TableHeadCell>
				  <TableHeadCell>Eliminar
					<span class="sr-only">Eliminar</span>
				  </TableHeadCell>
				</TableHead><!----------------------fin cabecera celdas-->
				
				<TableBody class="divide-y">
					{#each Productos as prod}
					<TableBodyRow class="hover:bg-hover-gray-light">
					<TableBodyCell>Img</TableBodyCell>
					<TableBodyCell>{prod.producto_id}</TableBodyCell>
					<TableBodyCell>{prod.nombre}</TableBodyCell>
					<TableBodyCell>{prod.precio}</TableBodyCell>
					<TableBodyCell>
						<!------------------------------------------------------Editar producto--------------------->
						<a href="/productos/registros" on:click={()=>{
							selectedProducto.set(prod.producto_id);
							selectedNombre.set(prod.nombre);
							selectedPrecio.set(prod.precio);
							formModalEdit.set(true);
							}}  
							class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a>			
					</TableBodyCell>
					<TableBodyCell>		
						<a href="/productos/registros" on:click={() => {
									   selectedProducto.set(prod.producto_id);
									   selectedNombre.set(prod.nombre);
									   formModalDelete.set(true);
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






		
		
		
			