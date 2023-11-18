<script>		

import { Input,Button,P,Modal,Table,TableBody,TableBodyCell,TableBodyRow,
			 TableHead,TableHeadCell } from 'flowbite-svelte';
import { selectedProducto, selectedNombre, selectedPrecio } from './store';			
export let data;
export let form;
export const {productos}=data;

		

let formModalDelete=false;

let filteredProductos = productos.datos;
	
function filterProductos() {
	filteredProductos = productos.datos.filter(prod => {
		return prod.producto_id.toString().includes(searchTerm.toString()) ||
			   prod.nombre.toString().includes(searchTerm.toString()) ||
			   prod.precio.toString().includes(searchTerm.toString()) ;       
		 }
		 );	 
	 }
	
let searchTerm = '';
	
function reset() {
	searchTerm = '';
	filteredProductos = productos.datos;
	}
	
</script>
	
<svelte:head>
	<title>Productos</title>
	<meta name="description" content="Productos" />
</svelte:head>

<P size="2xl" align="center">Tabla de Productos</P>
<div>
<ul>
  <li>
    <a href="productos/add_productos">Add Productos</a>
  </li>
  <li>
    <a href="productos/edit_productos">Edit Productos</a>
  </li>
</ul>
</div>

<main>
   <section > <!--------------------------Seccion tabla --> 
	  <div><!----------------------------Alert de la Accion -->
		{#if form?.success}
		 <span style="background-color: greenyellow;">{form.message}</span>
		{/if}
	  </div>
   <div><!----------------Div contenedor: tabla + add + Filtro--------->
	 <div class="flex justify-between items-center mx-auto w-full md:w-1/2"> <!-----cabecera Add + Filtro--------->
		<div> <!----------------------------boton add productos--------> 		
		  <Button href="productos/add_productos" size="xs" class="bg-primary-500 rounded">+ Add</Button>		
		</div>
		<div class="flex items-center"> <!----------------Filtro--------->
		  <Input type="text" bind:value={searchTerm} name="search" placeholder="Search" required class="h-8 rounded" />
		  <Button size="xs" on:click={filterProductos} class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded" >Filtrar</Button>
		  <Button size="xs" on:click={reset} class="bg-primary-500 h-8 ml-2 rounded">Reset</Button>
		</div> 
	  </div>
	 <div class="overflow-x-auto"> <!-------------------------------Nueva tabla Flowbite-------> 
	  <Table hoverable={true} class="w-1/2 mx-auto mt-2"> 
		<TableHead class="bg-primary-500 text-white "> <!------------------------cabecera celdas-->
		  <TableHeadCell>Img</TableHeadCell>
		  <TableHeadCell>Id</TableHeadCell>
		  <TableHeadCell>Nombre</TableHeadCell>
		  <TableHeadCell>Precio</TableHeadCell>
		  <TableHeadCell>Editar
			<span class="sr-only">Editar</span>
		  </TableHeadCell>
		  <TableHeadCell>Eliminar
			<span class="sr-only">Eliminar</span>
		  </TableHeadCell>
		</TableHead><!----------------------fin cabecera celdas-->
		<TableBody class="divide-y">
			{#each filteredProductos as prod}
		  <TableBodyRow class="hover:bg-hover-gray-light">
			<TableBodyCell>Img</TableBodyCell>
		    <TableBodyCell>{prod.producto_id}</TableBodyCell>
		    <TableBodyCell>{prod.nombre}</TableBodyCell>
		    <TableBodyCell>{prod.precio}</TableBodyCell>
			<TableBodyCell>
				<a href="productos/edit_productos" on:click={()=>{
					selectedProducto.set(prod.producto_id);
                    selectedNombre.set(prod.nombre);
                    selectedPrecio.set(prod.precio);
					}} 
					 class="font-medium text-primary-600 hover:underline dark:text-primary-500">
				     <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" 
					 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
					 d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"/>
                     </svg>
				Edit</a>			
			</TableBodyCell>
			<TableBodyCell>
			<!-------------------------------------modal Eliminar------------------------------------->
			<a href="#a" role="button"><svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
			  </svg></a> 
			<Modal bind:open={formModalDelete} size="xs" autoclose={false} class="w-full">
			  <form class="flex flex-col space-y-6" method="POST" action="?/delete"  >	
				<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Porfavor confirmar la eliminacion el producto !!</h3>
				<input type="hidden"  name="producto_id" >	
				<Button type="submit"  class=" bg-primary-500 w-full1 rounded">Confirmar</Button>
			  </form>
			</Modal>
		   </TableBodyCell>
		  </TableBodyRow>
		  {/each}	
		</TableBody>
	  </Table>
	</div>
  </div> <!----------------fin Div contenedor: tabla + add + Filtro--------->
</section>	
</main>

<style>
 
</style>

	