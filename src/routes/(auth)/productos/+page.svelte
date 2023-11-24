<script>
   			
	import {invalidate} from '$app/navigation';
	import {goto} from '$app/navigation';
	import {Input,Button,P,Table,TableBody,TableBodyCell,TableBodyRow,TableHead,TableHeadCell} from 'flowbite-svelte';			
	import {selectedProducto,selectedNombre,selectedPrecio,formModal,formModalEdit,formModalDelete} from './store';			
	export let data;
	export const {productos,productosSearch,sortPrecio, searchSortPrecio}=data;

	let searchTerm='';
	let sortOrder= 1; 
	//console.log(productos)
			
	let Productos=productos.datos
	let filteredPrecio=sortPrecio.datos
	
	
	const applySSP =(params)=>{
		let search= params;
		let sort=-1;
		
		let filteredSSP=searchSortPrecio.datos
		filteredSSP = searchSortPrecio.datos.filter(prod => prod.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
		Productos=filteredSSP; 
		goto(`/productos?search=${search}&sort=precio:${sort}`)
	}
	
	let filteredProductos=productosSearch.datos
	
	function applyFilter(params) {
		let search= params;
		filteredProductos = productosSearch.datos.filter(prod => prod.nombre.toLowerCase().includes(searchTerm.toLowerCase()));

		Productos=filteredProductos 
	    invalidate('/productos').then(() => {
		goto(`/productos?search=${search}`);	
		}); 
	}
	

	const Order=(params)=>{
			sortOrder= -sortOrder;
			let sort=params
			if (sort === 1) {
				filteredPrecio=sortPrecio.datos.sort((valorA,valorB)=>valorA.precio - valorB.precio);
				} else if (sort === -1) {
					filteredPrecio=sortPrecio.datos.sort((valorA,valorB)=> valorB.precio - valorA.precio);
				}
				Productos=filteredPrecio;
				goto(`/productos?sort=precio:${sort}`);
			}
		
	

	</script>
			
	<svelte:head>
		<title>Productos</title>
		<meta name="description" content="Productos" />
	</svelte:head>
		
	<main>
	<P size="2xl" align="center">Tabla de Productos</P>
		<div> <!--------------------------Seccion tabla --> 
		
		   <div><!----------------Div contenedor: tabla + add + Filtro--------->
			 <div class="flex justify-between items-center mx-auto w-full md:w-1/2"> <!-----cabecera Add + Filtro--------->
				<div> <!----------------------------boton add productos--------> 		
				  <Button href="/productos/registros" size="xs" class="bg-primary-500 rounded" on:click={()=>{formModal.set(true)}}>+ Add</Button>		
				</div>
				<div  class="flex items-center"> <!----------------Filtro--------->
				<Input  type="text" bind:value={searchTerm} name="searchTerm" placeholder="Search" required class="h-8 rounded"  />
				  <Button size="xs" on:click={() => applyFilter(searchTerm)} class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded" >Filtrar x nombre</Button>
				  <Button size="xs" on:click={() => applySSP(searchTerm)} class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded" >Filtrar x nombre&precio</Button>
				  <Button size="xs"  class="bg-primary-500 h-8 ml-2 rounded">Reset</Button>
				</div> 
			  </div>
			 <div class="overflow-x-auto"> <!-------------------------------Nueva tabla Flowbite-------> 
			  <Table hoverable={true} class="w-1/2 mx-auto mt-2"> 
				<TableHead class="bg-primary-500 text-white "> <!------------------------cabecera celdas-->
				  <TableHeadCell>Img</TableHeadCell>
				  <TableHeadCell>Id</TableHeadCell>
				  <TableHeadCell>Nombre</TableHeadCell>
				  <TableHeadCell ><Button on:click={() => Order(sortOrder === 1 ? -1 : 1)} class="bg-primary-500 hover:bg-primary-500 rounded">+ Precio -</Button></TableHeadCell>
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
		</div>	
	</main>
		
		
		
			