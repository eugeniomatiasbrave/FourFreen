<script>
	import {Input,Button,P,Label,Modal,Table,TableBody,TableBodyCell,TableBodyRow,TableHead,TableHeadCell} from 'flowbite-svelte';
	import {onMount} from 'svelte';
	export let form;
	export let data;
	export const { clientes } = data;

	let searchTerm = '';

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
  
	function filterClientes() {
		filteredClientes = clientes.filter((client) => {
			return (
				client.cliente_id.toString().includes(searchTerm.toString()) ||
				client.razon_social.toString().includes(searchTerm.toString()) ||
				client.cuit.toString().includes(searchTerm.toString())
			);
			//client.domicilio_calle.toString().includes(searchTerm.toString()) ||
			//client.domicilio_altura.toString().includes(searchTerm.toString()) ||
			//client.localidad.toString().includes(searchTerm.toString()) ||
			//client.codigo_postal.toString().includes(searchTerm.toString()) ||
			//client.telefono.toString().includes(searchTerm.toString()) ||
			//client.email.toString().includes(searchTerm.toString()) ;
		});
	}

	function reset() {
		searchTerm = '';
		filteredClientes = clientes;
	}

</script>

<svelte:head>
	<title>Tabla de Cliente</title>
	<meta name="description" content="Clientes" />
</svelte:head>

<main class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
  <P size="2xl" align="center" class="mb-8">Tabla de Clientes</P>
	<div class=""> <!----------------Div contenedor: tabla + add + Filtro--------->
	   <div class=" flex justify-between items-center mx-auto w-full md:w-1/2 "><!-----cabecera Add + Filtro--------->
		  <div class="flex flex-wrap items-center">
			  <Button on:click={() => (formModalAdd = true)} class="bg-primary-500 h-8 ml-2 rounded">+ add</Button>
				<Modal bind:open={formModalAdd} size="xs" autoclose={false} class="w-full">
				  <form method="POST" action="?/addClient">
					<p>Porfavor Agregar nuevo cliente!!</p>
					<Label class="space-y-2"><span>Nombre</span>
					 <Input type="text" name="razon_social" placeholder="escribe aqui razon_social" class="bg-white h-8 rounded" required/>
					</Label>
					<Label class="space-y-2"><span>Cuit</span>
					  <Input type="number" name="cuit" placeholder="escribe aqui el cuit" class="bg-white h-8 rounded" maxlength="11" required/>			
					</Label>
								<Label class="space-y-2">
									<span>Calle</span>
									<Input
										type="text"
										name="domicilio_calle"
										placeholder="escribe aqui calle" class="bg-white h-8 rounded"
										required/>
								</Label>
								<Label class="space-y-2">
									<span>Altura</span>
									<Input
										type="text"
										name="domicilio_altura"
										placeholder="escribe aqui altura" class="bg-white h-8 rounded"
										required/>
								</Label>
								<Label class="space-y-2">
									<span>Loc..</span>
									<Input
										type="text"
										name="localidad"
										placeholder="escribe aqui localidad" class="bg-white h-8 rounded"
										required/>
								</Label>
								<Label class="space-y-2">
									<span>Cp.</span>
									<Input
										type="text"
										name="codigo_postal"
										placeholder="escribe aqui codigo postal" class="bg-white h-8 rounded"
										required/>
								</Label>
									<Label class="space-y-2">
										<span>Tel</span>
									<Input
										type="text"
										name="telefono"
										placeholder="escribe aqui el telefono" class="bg-white h-8 rounded"
										required/>
								</Label>
									<Label class="space-y-2">
										<span>Email</span>
									<Input type="email" name="email" placeholder="escribe aqui el email" class="bg-white h-8 rounded" required />
								</Label>		
								<Button class="bg-primary-500 h-8 ml-2 mt-2 rounded">Cancel</Button>
								<Button type="submit" class="bg-primary-500 h-8 ml-2 mt-2 rounded">Confirm</Button>												
								</form>	
					</Modal>
				  </div>

                 <div class="flex flex-wrap justify-end items-start">
					<div class="ml-2">
			     	  <Input type="text" id="search" bind:value={searchTerm} name="search" class="bg-white h-8 rounded"	placeholder="Search" required/>
				    </div>
			        <div class="ml-2">
			         <Button on:click={filterClientes} class="bg-primary-500 h-8 ml-2 rounded">Buscar</Button>
				     <Button on:click={reset} class="bg-primary-500 h-8 ml-2 rounded">Reset</Button>
				    </div>
				</div>			    
		</div><!-----fin de cabecera Add + Filtro--------->
				<div class="overflow-x-auto">
					<Table hoverable={true} class="w-1/2 mx-auto mt-2">
						<TableHead class="bg-primary-500 text-white">
							<TableHeadCell>id</TableHeadCell>
							<TableHeadCell>Nombre</TableHeadCell>
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
										<Button
											on:click={() => {
												//<!----------------------------------Modal para edita cliente-------->
												selectedCliente_id = cli.cliente_id;
												selectedRazon_social = cli.razon_social;
												selectedCuit = cli.cuit;
												selectedLocalidad = cli.localidad;
												selectedDomicilio_calle = cli.domicilio_calle;
												selectedDomicilio_altura = cli.domicilio_altura;
												selectedCodigo_postal = cli.codigo_postal;
												selectedTelefono = cli.telefono;
												selectedEmail = cli.email;
												
											}}  on:click={() => (formModalEdit = true)}
											class="bg-primary-500 h-8 ml-2 rounded">Editar</Button>
											
										
											<form method="POST" action="?/editClient">
											<Modal  bind:open={formModalEdit} size="xs" autoclose={false} class="w-full">		
																
															<Input
																type="hidden"
																name="cliente_id"
																bind:value={selectedCliente_id}/>

																<Label class="space-y-2">
																	<span>Razon Social</span>
																<Input
																	type="text"
																	name="razon_social"
																	value={selectedRazon_social} class="bg-white h-8 rounded"
																	required
																/>
															</Label>
																<Label class="space-y-2">
																	<span>Cuit</span>
																
																	<Input
																		type="text"
																		name="cuit"
																		value={selectedCuit} class="bg-white h-8 rounded"
																		required
																	/>
																</Label>
																	<Label class="space-y-2">
																		<span>Dom</span>
																	<Input
																			type="text"
																			name="domicilio_calle"
																			value={selectedDomicilio_calle} class="bg-white h-8 rounded"
																			required
																		/>
																	</Label>
																		<Label class="space-y-2">
																			<span>Dom. calle</span>
																		<Input
																				type="text"
																				name="domicilio_altura"
																				value={selectedDomicilio_altura} class="bg-white h-8 rounded"
																				required
																			/>
																		</Label>
																			<Label class="space-y-2">
																				<span>Loc.</span>
																			<Input
																					type="text"
																					name="localidad"
																					value={selectedLocalidad} class="bg-white h-8 rounded"
																					required
																				/>
																			</Label>
																				<Label class="space-y-2">
																					<span>C.p</span>
																				<Input
																						type="text"
																						name="codigo_postal"
																						value={selectedCodigo_postal} class="bg-white h-8 rounded"
																						required
																					/>
																				</Label>
																					<Label class="space-y-2">
																						<span>Tel</span>
																					<Input
																							type="text"
																							name="telefono"
																							value={selectedTelefono} class="bg-white h-8 rounded"
																							required
																						/>
																					</Label>
																						<Label class="space-y-2">
																							<span>Email</span>
																						<Input
																								type="email"
																								name="email"
																								value={selectedEmail} class="bg-white h-8 rounded"
																								required/>
												                                     	</Label>
											<Button on:click={formModalEdit} class="bg-primary-500 h-8 ml-2 rounded">Cancel</Button>
											<Button type="submit" class="bg-primary-500 h-8 ml-2 rounded">Confirm</Button>																																		
										</Modal>
									</form>
										
									</TableBodyCell>
									<TableBodyCell
										><!---------------------Elimina el cliente--------------------->
										<Button
											on:click={() => {
												//<!-----------------------------------------Modal para editar-------->
												selectedCliente_id = cli.cliente_id;
												
											}} on:click={() => (formModalDelete = true)}
											class="bg-primary-500 h-8 ml-2 rounded">Eliminar</Button>

										<form method="POST" action="?/deleteClient"
											    on:submit={() => {
												selectedCliente_id = cli.cliente_id;
											    }}>
											<Modal bind:open={formModalDelete} size="xs" autoclose={false} class="w-full">
													<div>
														<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white"> Confirmar la eliminación  !!</h3>
														<P value={cli.razon_social}>Cliente:{cli.razon_social}</P> 
														
															<Input
																type="hidden"
																name="cliente_id"
																bind:value={selectedCliente_id}
																required/>
															<Button on:click={formModalDelete} class="bg-primary-500 h-8 ml-2 rounded">Cancel</Button>
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
