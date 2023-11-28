<script>
	import {Input,Button,P,Label,Modal,Table,TableBody,TableBodyCell,TableBodyRow,TableHead,TableHeadCell} from 'flowbite-svelte';
	import {onMount} from 'svelte';
	import { goto } from '$app/navigation';
	export let form;
	export let data;
	export const { clientes,sortrazonsocial, searchclientes } = data;

	let searchTerm = '';
	let sortOrder= 1

	let formModalAdd = false;
	let formModalEdit = false;
	let formModalDelete = false;

	let selectedCliente_id;
	let selectedRazon_social;
	let selectedCuit;
	let selectedLocalidad;
	let selectedDomicilio_calle;
	let selectedDomicilio_altura;
	let selectedCodigo_postal;
	let selectedTelefono;
	let selectedEmail;

	let filteredClientes = clientes;
	let SortRazonSocial = sortrazonsocial;
    let SearchClientes= searchclientes;
	//console.log(filteredClientes)

 onMount(() => {
   if (form?.success) {
    Swal.fire({
      icon: 'success',
      title: form.message,
      text: 'Cliente: ',
      backdrop: true,
      confirmButtonText: 'Volver',
      confirmButtonColor: 'rgb(69, 166, 175)'
    })}
    });

const filterClientes=(params)=>{
	let search=params;
	SearchClientes=searchclientes.filter(prod=>prod.razon_social.toLowerCase().includes(searchTerm.toLowerCase()));
	filteredClientes=SearchClientes; 
	goto(`/clientes?search=${search}`);		
}

const reset=()=>{
	searchTerm = '';
	filteredClientes = clientes;
}

const ModalClose =()=>{
	formModalAdd = false;
	formModalEdit = false;
    formModalDelete = false;
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
	<div class=" bg-white mx-auto p-1 pt-2 border rounded shadow-md w-3/4"> <!----------------Div contenedor: tabla + add + Filtro--------->
	   <div class=" flex justify-between items-center mx-auto w-full"><!-----cabecera Add + Filtro--------->
		  <div class=""> <!-----Modal Add--------->
			  <div>
			   <Button on:click={() => (formModalAdd = true)} class="bg-primary-500 rounded h-8 p-2">Add</Button>
			  </div>
				<Modal bind:open={formModalAdd} size="xs" autoclose={false} class="w-full">
				  <form method="POST" action="?/addClient">
					<p>Porfavor Agregar nuevo cliente!!</p>
					<Label class="space-y-2"><span>Nombre</span>
					 <Input type="text" name="razon_social" placeholder="razon_social" class="bg-white h-8 rounded" required/>
					</Label>
					<Label class="space-y-2"><span>Cuit</span>
					  <Input type="number" name="cuit" placeholder="cuit" class="bg-white h-8 rounded" maxlength="11" required/>			
					</Label>
					<Label class="space-y-2">
						<span>Calle</span>
					    <Input type="text" name="domicilio_calle" placeholder="escribe aqui calle" class="bg-white h-8 rounded" required/>
					</Label>
					<Label class="space-y-2">
						<span>Altura</span>
					    <Input type="text" name="domicilio_altura" placeholder="altura" class="bg-white h-8 rounded" required/>
					</Label>
					<Label class="space-y-2">
						<span>Loc..</span>
					    <Input type="text" name="localidad" placeholder="localidad" class="bg-white h-8 rounded" required/>
					</Label>
					<Label class="space-y-2">
						<span>Cp.</span>
					<Input type="text" name="codigo_postal" placeholder="codigo postal" class="bg-white h-8 rounded" required/>
					</Label>
					<Label class="space-y-2">
						<span>Tel</span>
						<Input type="text" name="telefono" placeholder="telefono" class="bg-white h-8 rounded" required/>
					</Label>
					<Label class="space-y-2">
						<span>Email</span>
						<Input type="email" name="email" placeholder="email" class="bg-white h-8 rounded" required />
					</Label>		
					<Button on:click={ModalClose} class="bg-primary-500 h-8 ml-2 mt-2 rounded">Cancelar</Button>
					<Button type="submit" class="bg-primary-500 h-8 ml-2 mt-2 rounded">Confirmar</Button>												
				</form>	
			 </Modal>
			</div>
            <div class="flex items-center">
			  <Input type="text" id="search" bind:value={searchTerm} name="search" class="bg-white h-8 rounded" placeholder="Search" required/>
			  <Button on:click={()=> filterClientes(searchTerm)} class="bg-primary-500 h-8 ml-1 px-2 rounded">Buscar</Button>
			  <Button on:click={reset} class="bg-primary-500 h-8 ml-1 px-2 rounded">Reset</Button>		
		    </div>			    
		</div><!-----fin de cabecera Add + Filtro--------->
				<div class="">
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
								{#each filteredClientes as cli}
								<TableBodyRow class="hover:bg-hover-gray-light">
									<TableBodyCell>{cli.cliente_id}</TableBodyCell>
									<TableBodyCell>{cli.razon_social}</TableBodyCell>
									<TableBodyCell>{cli.cuit}</TableBodyCell>
									<TableBodyCell>{cli.domicilio_calle}</TableBodyCell>
									<TableBodyCell>{cli.domicilio_altura}</TableBodyCell>
									<TableBodyCell>{cli.localidad}</TableBodyCell>
									<TableBodyCell>{cli.codigo_postal}</TableBodyCell>
									<TableBodyCell>{cli.telefono}</TableBodyCell>
									<TableBodyCell>{cli.email}</TableBodyCell>
									<TableBodyCell>
										<Button on:click={()=>{ //<!----------------------------------Modal para edita cliente-------->
												selectedCliente_id = cli.cliente_id;
												selectedRazon_social = cli.razon_social;
												selectedCuit = cli.cuit;
												selectedLocalidad = cli.localidad;
												selectedDomicilio_calle = cli.domicilio_calle;
												selectedDomicilio_altura = cli.domicilio_altura;
												selectedCodigo_postal = cli.codigo_postal;
												selectedTelefono = cli.telefono;
												selectedEmail = cli.email;				
											    }} on:click={()=>(formModalEdit = true)}
											    class="bg-primary-500 h-8 ml-2 rounded">Editar</Button>
										<Modal bind:open={formModalEdit} size="xs" autoclose={false} class="w-full">		
											<form method="POST" action="?/editClient">			
												<Input type="hidden" name="cliente_id" bind:value={selectedCliente_id}/>
												<Label class="space-y-2">
												  <span>Razon Social</span>
												<Input name="razon_social"
												type="text"
												value={selectedRazon_social} class="bg-white h-8 rounded"
												required/>
											   </Label>
												<Label class="space-y-2">
												 <span>Cuit</span>	
												<Input
												  type="text"
												  name="cuit"
												  value={selectedCuit} class="bg-white h-8 rounded"
												  required/>
												</Label>
												<Label class="space-y-2">
												  <span>Dom</span>
												<Input
												type="text"
												name="domicilio_calle"
												value={selectedDomicilio_calle} class="bg-white h-8 rounded"
												required/>
												</Label>
												<Label class="space-y-2">
												<span>Dom. calle</span>
												<Input
													type="text"
													name="domicilio_altura"
													value={selectedDomicilio_altura} class="bg-white h-8 rounded"
													required/>
												</Label>
												<Label class="space-y-2">
													<span>Loc.</span>
												<Input
												    type="text"
													name="localidad"
													value={selectedLocalidad} class="bg-white h-8 rounded"
													required/>
												</Label>
												<Label class="space-y-2">
													<span>C.p</span>
												<Input
												    type="text"
													name="codigo_postal"
													value={selectedCodigo_postal} class="bg-white h-8 rounded"
													required/>
												</Label>
												<Label class="space-y-2">
													<span>Tel</span>
												<Input
													type="text"
													name="telefono"
													value={selectedTelefono} class="bg-white h-8 rounded"
													required/>
												</Label>
												<Label class="space-y-2">
													<span>Email</span>
												<Input
													type="email"
													name="email"
													value={selectedEmail} class="bg-white h-8 rounded"
													required/>
												</Label>
											<Button on:click={ModalClose} class="bg-primary-500 h-8 ml-2 rounded">Cancelar</Button>
											<Button type="submit" class="bg-primary-500 h-8 ml-2 rounded">Confirmar</Button>																																		
										</form>
										</Modal>		
									</TableBodyCell>
									<TableBodyCell><!---------------------Elimina el cliente--------------------->
										<Button on:click={() => { //<!-----------------------------------------Modal para eliminar-------->
												selectedCliente_id = cli.cliente_id;	
											    }} on:click={() => (formModalDelete = true)}
											    class="bg-primary-500 h-8 ml-2 rounded">Eliminar</Button>

										<form method="POST" action="?/deleteClient" on:submit={()=>{selectedCliente_id = cli.cliente_id;}}>
											<Modal bind:open={formModalDelete} size="xs" autoclose={false} class="w-full">
												<div>
													<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white"> Confirmar la eliminación  !!</h3>
													<P value={cli.razon_social}>Cliente:{cli.razon_social}</P> 
												<Input
												type="hidden"
												name="cliente_id"
												bind:value={selectedCliente_id}
												required/>
												<Button on:click={ModalClose} class="bg-primary-500 h-8 ml-2 rounded">Cancelar</Button>
												<Button type="submit" class="bg-primary-500 h-8 ml-2 rounded">Confirmar</Button>
					  </div>													
				    </Modal>
				   </form>									
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
