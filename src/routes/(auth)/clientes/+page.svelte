<script>
import {goto} from '$app/navigation';
import {Input,Button,P,Table,TableBody,TableBodyCell,TableBodyRow,TableHead,TableHeadCell} from 'flowbite-svelte';
export let data;
export const {clientes,sortrazonsocial,searchclientes,sortCliente_id} = data;

let searchTerm = '';
let sortOrder= 1

//let Clientes = clientes;
let SortRazonSocial = sortrazonsocial;
let SearchClientes= searchclientes;
let SortCliente_id = sortCliente_id;

let filteredSortCliente_id = SortCliente_id.sort((e,f)=>e.cliente_id - f.cliente_id);

const SortedCliente_id=(params)=>{
	sortOrder= -sortOrder;
	let sort=params;
	let newOrder=[...filteredSortCliente_id]
	if (sort===1) {
		filteredSortCliente_id=newOrder.sort((e,f)=>e.cliente_id - f.cliente_id);
		} else if (sort===-1) {
		filteredSortCliente_id=newOrder.sort((e,f)=>f.cliente_id - e.cliente_id);
		}
		goto(`/clientes?sort=cliente_id:${sort}`);
	}
 
const alternarSortId =()=> {
	SortedCliente_id(sortOrder === 1 ? -1 : 1);
}

const filterClientes=(params)=>{
	let search=params;
	SearchClientes=searchclientes.filter(cliente=>cliente.razon_social.toLowerCase().includes(searchTerm.toLowerCase()));
	filteredSortCliente_id=SearchClientes; 
	goto(`/clientes?search=${search}`);		
}

const reset=()=>{
	searchTerm = '';
	filteredSortCliente_id = SortCliente_id.sort((e,f)=>e.cliente_id - f.cliente_id);
	goto('/clientes')
}

const SortedRazonSocial=(params)=>{
  sortOrder= -sortOrder;
  let sort=params;
  if (sort===1) {
	SortRazonSocial=sortrazonsocial.sort((c,d)=>c.razon_social.localeCompare(d.razon_social));
    } else if (sort===-1) {
	SortRazonSocial=sortrazonsocial.sort((c,d)=>d.razon_social.localeCompare(c.razon_social));
    }
	filteredSortCliente_id=SortRazonSocial;
	goto(`/clientes?sort=razon_social:${sort}`);
  }

  const alternarSortRS =()=> {
	SortedRazonSocial(sortOrder === 1 ? -1 : 1);
}

</script>

<svelte:head>
	<title>Tabla de Cliente</title>
	<meta name="description" content="Clientes"/>
</svelte:head>

<main class="bg-gray-50 dark:bg-gray-900  mx-1 w-full  ">
<div class="my-4">
  <P size="2xl" align="center">Tabla de Clientes</P>
</div>
	<div class=" bg-white mx-auto p-1 pt-1 border rounded shadow-md w-full  xl:w-2/3 "> <!----------------Div contenedor: tabla + add + Filtro--------->  
		<div class="flex flex-col sm:flex-row justify-between items-center mx-auto "> 
			<div class="mb-2 sm:mb-0 w-full sm:w-auto"> 
				<Button href={`/clientes/${0}/agregar`}  size="xs" class="bg-primary-500 rounded m-0 h-7 px-2 w-full sm:w-auto ">
				  <svg class="w-4 h-4 me-1 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
				  fill="none" viewBox="0 0 20 20">
				  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
				   d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
				  </svg> Nuevo</Button>    
			   </div>
			<div class="flex items-center"> 
			  <Input type="text" bind:value={searchTerm} name="searchTerm" placeholder="Buscar Cliente" required class=" bg-white h-7 w-full sm:w-auto rounded"  /> 
			  <Button size="xs" on:click={()=> filterClientes(searchTerm)} class="bg-primary-500 h-7 ml-1 px-2  rounded">Buscar</Button> 
			  <Button size="xs" on:click={reset} class="bg-primary-500 h-7 ml-1 px-2 w-32 sm:w-32 rounded">Borrar Filtro</Button>
			</div> 
		  </div>
			<div>
			 <Table hoverable={true} class="mx-auto mt-1 border text-xs">
				<TableHead class="bg-primary-500 text-white" align="center" theadClass='text-xs'>
					<TableHeadCell class="py-2" >
						<div class="flex items-center justify-end">
						  Id<button on:click={alternarSortId} class="bg-primary-500 hover:bg-primary-500 rounded">	
							  {#if sortOrder === 1}
							  <svg class="w-2.5 h-4 ms-1.5 text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 8">
							  <path stroke="currentColor" stroke-linecap="butt" stroke-linejoin="round" stroke-width="1" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"/>
							  </svg>
							  {:else}
							  <svg class="w-2.5 h-4 ms-1.5 text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 8">
							  <path stroke="currentColor" stroke-linecap="butt" stroke-linejoin="round" stroke-width="1" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
							  </svg>		
							  {/if}
						   </button>			      
						</div>
					  </TableHeadCell>
					<TableHeadCell class="py-2">
						<div class="flex items-center">	
							Nombre
							<button on:click={alternarSortRS} class="bg-primary-500 hover:bg-primary-500 rounded">	
										{#if sortOrder === 1}
										<svg class="w-2.5 h-4 ms-1.5 text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 8">
										<path stroke="currentColor" stroke-linecap="butt" stroke-linejoin="round" stroke-width="1" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"/>
										</svg>
										{:else}
										<svg class="w-2.5 h-4 ms-1.5 text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 8">
										<path stroke="currentColor" stroke-linecap="butt" stroke-linejoin="round" stroke-width="1" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
										</svg>	
										{/if}
									 </button>
								  </div>
							</TableHeadCell>
							<TableHeadCell class="py-2">Cuit</TableHeadCell>
							<TableHeadCell class="py-2">Calle</TableHeadCell>
							<TableHeadCell class="py-2">Altura</TableHeadCell>
							<TableHeadCell class="py-2">Localidad</TableHeadCell>
							<TableHeadCell class="py-2">C. P.</TableHeadCell>
							<TableHeadCell class="py-2">Telefono</TableHeadCell>
							<TableHeadCell class="py-2">Email</TableHeadCell>
							<TableHeadCell class="py-2">Editar
								<span class="sr-only">Editar</span>
							</TableHeadCell>
							<TableHeadCell class="py-2">Eliminar								
                                <span class="sr-only">Eliminar</span>
							</TableHeadCell>
						    </TableHead>
					    	<TableBody class="divide-y">
								{#each filteredSortCliente_id as {cliente_id,razon_social,cuit,domicilio_calle,domicilio_altura,localidad,telefono,email, codigo_postal}}
								<TableBodyRow class="hover:bg-hover-gray-light">
									<TableBodyCell class="py-2" align="center">{cliente_id}</TableBodyCell>
									<TableBodyCell class="py-2">{razon_social}</TableBodyCell>
									<TableBodyCell class="py-2" align="right">{cuit}</TableBodyCell>
									<TableBodyCell class="py-2">{domicilio_calle}</TableBodyCell>
									<TableBodyCell class="py-2" align="right">{domicilio_altura}</TableBodyCell>
									<TableBodyCell class="py-2">{localidad}</TableBodyCell>
									<TableBodyCell class="py-2" align="right">{codigo_postal}</TableBodyCell>
									<TableBodyCell class="py-2" align="right">{telefono}</TableBodyCell>
									<TableBodyCell class="py-2">{email}</TableBodyCell>
									<TableBodyCell class="py-2" align="center">
										<a href={`/clientes/${cliente_id}?action=editar`} 
											    class="font-medium text-primary-600 hover:underline dark:text-primary-500">Editar</a>								
									</TableBodyCell>
									<TableBodyCell class="py-2" align="center"><!---------------------Elimina el cliente--------------------->
										<a href={`/clientes/${cliente_id}?action=eliminar`}			
										   class="font-medium text-primary-600 hover:underline dark:text-primary-500">Eliminar</a>
				</TableBodyCell>
			 </TableBodyRow>
			{/each}
		 </TableBody>
	  </Table>
	</div>		
  </div>
</main>

<style>

</style>
