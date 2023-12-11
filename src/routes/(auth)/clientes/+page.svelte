<script>
import {goto} from '$app/navigation';
import {Input,Button,P,Table,TableBody,TableBodyCell,TableBodyRow,TableHead,TableHeadCell} from 'flowbite-svelte';
export let data;
import { selectedClienteId,selectedRazon_social,selectedCuit,
		selectedLocalidad,selectedDomicilio_calle,selectedDomicilio_altura,
		selectedCodigo_postal,selectedTelefono,selectedEmail} from './storeCli';
export const { clientes,sortrazonsocial, searchclientes } = data;

let searchTerm = '';
let sortOrder= 1

/*
let cliente_id;
let razon_social;
let cuit;
let localidad;
let domicilio_calle;
let domicilio_altura;
let codigo_postal;
let telefono;
let email;
*/

let Clientes = clientes;
let SortRazonSocial = sortrazonsocial;
let SearchClientes= searchclientes;
	//console.log(filteredClientes)


const filterClientes=(params)=>{
	let search=params;
	SearchClientes=searchclientes.filter(prod=>prod.razon_social.toLowerCase().includes(searchTerm.toLowerCase()));
	Clientes=SearchClientes; 
	goto(`/clientes?search=${search}`);		
}

const reset=()=>{
	searchTerm = '';
	Clientes = clientes;
}



const SortedRazonSocial=(params)=>{
  sortOrder= -sortOrder;
  let sort=params;
  if (sort===1) {
	SortRazonSocial=sortrazonsocial.sort((c,d)=>c.razon_social.localeCompare(d.razon_social));
    } else if (sort===-1) {
	SortRazonSocial=sortrazonsocial.sort((c,d)=>d.razon_social.localeCompare(c.razon_social));
    }
	filteredClientes=SortRazonSocial;
	goto(`/clientes?sort=razon_social:${sort}`);
  }

</script>

<svelte:head>
	<title>Tabla de Cliente</title>
	<meta name="description" content="Clientes"/>
</svelte:head>

<main class="bg-gray-50 dark:bg-gray-900 sm:p-3">
  <P size="2xl" align="center" class="mb-8">Tabla de Clientes</P>
	<div class=" bg-white mx-auto p-1 pt-2  border rounded shadow-md w-3/4"> <!----------------Div contenedor: tabla + add + Filtro--------->
	   
		<div class="flex flex-col sm:flex-row justify-between items-center mx-auto w-full"> 
			<div class="mb-2 sm:mb-0 w-full sm:w-auto"> 
			  <Button href={`/clientes/${0}/agregar`} size="xs" class="bg-primary-500 rounded m-0 px-2 w-full sm:w-auto">
				<svg class="w-4 h-4 me-1 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
				fill="none" viewBox="0 0 20 20">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
				 d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
				</svg> Nuevo</Button>    
			</div>
			<div class="flex items-center"> 
			  <Input type="text" bind:value={searchTerm} name="searchTerm" placeholder="Buscar Producto" required class=" bg-white h-8 w-full sm:w-auto rounded"  /> 
			  <Button size="xs" on:click={()=> filterClientes(searchTerm)} class="bg-primary-500 h-8 ml-1 px-2  rounded">Buscar</Button> 
			  <Button size="xs" on:click={reset} class="bg-primary-500 h-8 ml-1 px-2 rounded">Actualizar</Button>
			</div> 
		  </div>
	
				<div >
					<Table hoverable={true} class=" mt-2 border">
						<TableHead class="bg-primary-500 text-white">
							<TableHeadCell>id</TableHeadCell>
							<TableHeadCell>
							<div class="flex items-center">	
								NOMBRE<a href="#5" on:click={()=>SortedRazonSocial(sortOrder === 1 ? -1 : 1)} class=" bg-primary-500 hover:bg-primary-500 rounded" 
								size="xs"><svg class="w-3.5 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
								<path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
							    </svg></a>
						    </div>
							</TableHeadCell>
							<TableHeadCell>Cuit</TableHeadCell>
							<TableHeadCell>Calle</TableHeadCell>
							<TableHeadCell>Altura</TableHeadCell>
							<TableHeadCell>Loc.</TableHeadCell>
							<TableHeadCell>CP.</TableHeadCell>
							<TableHeadCell>Telefono</TableHeadCell>
							<TableHeadCell>Email</TableHeadCell>
							<TableHeadCell>Editar
								<span class="sr-only">Editar</span>
							</TableHeadCell>
							<TableHeadCell>Eliminar								
                                <span class="sr-only">Eliminar</span>
							</TableHeadCell>
						    </TableHead>
					    	<TableBody class="divide-y">
								{#each Clientes as {cliente_id,razon_social,cuit,domicilio_calle,domicilio_altura,localidad,telefono,email, codigo_postal}}
								<TableBodyRow class="hover:bg-hover-gray-light">
									<TableBodyCell>{cliente_id}</TableBodyCell>
									<TableBodyCell>{razon_social}</TableBodyCell>
									<TableBodyCell>{cuit}</TableBodyCell>
									<TableBodyCell>{domicilio_calle}</TableBodyCell>
									<TableBodyCell>{domicilio_altura}</TableBodyCell>
									<TableBodyCell>{localidad}</TableBodyCell>
									<TableBodyCell>{codigo_postal}</TableBodyCell>
									<TableBodyCell>{telefono}</TableBodyCell>
									<TableBodyCell>{email}</TableBodyCell>
									<TableBodyCell>
										<a href={`/clientes/${cliente_id}/editar`} on:click={()=>{ //<!---------------------------------- edita cliente-------->
												selectedClienteId.set(cliente_id);
												selectedRazon_social.set(razon_social);
                                                selectedCuit.set(cuit);
                                                selectedLocalidad.set(localidad);
                                                selectedDomicilio_calle.set(domicilio_calle);
                                                selectedDomicilio_altura.set(domicilio_altura);
                                                selectedCodigo_postal.set(codigo_postal);
                                                selectedTelefono.set(telefono);
                                                selectedEmail.set(email);		
											    }} 
											    class="font-medium text-primary-600 hover:underline dark:text-primary-500">Editar</a>				
										
									</TableBodyCell>
									<TableBodyCell><!---------------------Elimina el cliente--------------------->
										<a href={`/clientes/${cliente_id}/eliminar`} on:click={() => { //<!----------------------------------eliminar-------->
												selectedClienteId.set(cliente_id);
												selectedRazon_social.set(razon_social);	
											    }}
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
