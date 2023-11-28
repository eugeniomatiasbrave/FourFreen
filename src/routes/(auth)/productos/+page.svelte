<script>
	import {goto} from '$app/navigation';
	import {Input,Button,P,Table,TableBody,TableBodyCell,TableBodyRow,TableHead,TableHeadCell, Pagination} from 'flowbite-svelte';			
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
	
	/* ------ funcion Filtrar x nombre & precio----///
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

	//----------Pagianacion  ?????------------////////
	/*
	$: activeUrl = $page.url.searchParams.get('page');	
	$: {  pages.forEach((page) => {
			let splitUrl = page.href.split('?');
			let queryString = splitUrl.slice(1).join('?');
			const hrefParams = new URLSearchParams(queryString);
			let hrefValue = hrefParams.get('page');
			if (hrefValue === activeUrl) {
				page.active = true;
			} else {
				page.active = false;
			}
		});
		pages = pages;
	}
    const previous = () => {
    alert('Previous btn clicked. Make a call to your server to fetch data.');
    };
    const next = () => {
    alert('Next btn clicked. Make a call to your server to fetch data.');
    };
  */

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
	  <div class=" bg-white mx-auto p-1 pt-2 rounded shadow-md w-3/4 "><!----------------Div contenedor: tabla + add + Filtro--------->
			 <div class=" flex justify-between items-center mx-auto w-full"> <!-----cabecera Add + Filtro--------->
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
				<Table hoverable={true} class="mx-auto mt-2 border"> 		
				<TableHead class=" bg-primary-500 text-white"> <!------------------------cabecera celdas-->
					<TableHeadCell>
					  <div class="flex items-center">
						ID<a href="#2" on:click={()=>SortedProducto_id(sortOrder === 1 ? -1 : 1)} class="bg-primary-500 hover:bg-primary-500 rounded " 
						size="xs"><svg class="w-3.5 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
					    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
				        </svg></a>
				      </div>
				    </TableHeadCell>
				    <TableHeadCell>
					  <div class="flex items-center">	
					    NOMBRE<a href="#2" on:click={()=>SortedNombre(sortOrder === 1 ? -1 : 1)} class=" bg-primary-500 hover:bg-primary-500 rounded" 
					    size="xs"><svg class="w-3.5 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
				        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
				        </svg></a>
					  </div>
				    </TableHeadCell> 
				    <TableHeadCell>
						<div class="flex items-center">	
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
					{#each Productos as prod}
					<TableBodyRow class="hover:bg-hover-gray-light">
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

			<!------------------Pagianacion  ?????-------------->
			
		<!--<div>
				<Pagination {pages} on:previous={previous} on:next={next} icon>
					<svelte:fragment slot="prev">
					  <span class="sr-only">Previous</span>
					  <ChevronLeftOutline class="w-2.5 h-2.5" />
					</svelte:fragment>
					<svelte:fragment slot="next">
					  <span class="sr-only">Next</span>
					  <ChevronRightOutline class="w-2.5 h-2.5" />
					</svelte:fragment>
				  </Pagination>
			</div>  -->

		  </div> <!----------------fin Div contenedor: tabla + add + Filtro--------->	
	</main>






		
		
		
			