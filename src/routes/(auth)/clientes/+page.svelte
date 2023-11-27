<script>
	import {
		Input,
		Button,
		P,
		Label,
		Modal,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	export let form;
	export let data;
	export const { perfil, clientes } = data;

	let searchTerm = '';

	let formModalAdd = false;

	let isOpen = false;
	let isOpenAdd = false;
	let isOpenEd = false;
	let isOpenDel = false;

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

	

	function ModalEd() {
		isOpenEd = !isOpenEd;
	}

	function ModalDelete() {
		isOpenDel = !isOpenDel;
	}

	//console.log(filteredClientes)

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

<main  class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
	<P size="2xl" align="center">Tabla de Clientes</P>
	<div class="mt-8"> <!----------------Div contenedor: tabla + add + Filtro--------->
		<div class="flex justify-between items-center mx-auto w-full md:w-1/2"><!-----cabecera Add + Filtro--------->
				
					{#if form?.success}
						<span style="background-color: greenyellow;">{form.message}</span>
					{/if}
				
				  <div class="flex flex-wrap items-center">
					<Button on:click={() => (formModalAdd = true)} class="bg-primary-500 h-8 ml-2 rounded">add Clientes</Button>
					<Modal bind:open={formModalAdd} size="xs" autoclose={false} class="w-full">
						<form method="POST" action="?/addClient">
						<p>Porfavor Agregar nuevo cliente!!</p>
						<Label class="space-y-2">
							<span>Nombre</span>
									<Input
										type="text"
										name="razon_social"
										placeholder="escribe aqui razon_social" class="bg-white h-8 rounded"
										required/>
								</Label>
								<Label class="space-y-2">
									<span>Cuit</span>
									<Input
										type="number"
										name="cuit"
										placeholder="escribe aqui el cuit" class="bg-white h-8 rounded"
										maxlength="11"
										required/>
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

					<div class="ml-2">
			     	  <Input type="text" id="search" bind:value={searchTerm} name="search" class="bg-white h-8 rounded"	placeholder="Search" required/>
				    </div>
			       <div class="ml-2">
			        <Button on:click={filterClientes} class="bg-primary-500 h-8 ml-2 rounded">Buscar</Button>
				    <Button on:click={reset} class="bg-primary-500 h-8 ml-2 rounded">Reset</Button>
				  </div>
			    
		</div> <!-----fin de cabecera Add + Filtro--------->
				
					<Table hoverable={true} class="w-1/2 mx-auto mt-2">
						<TableHead class="bg-primary-500 text-white">
							<TableHeadCell scope="col">id</TableHeadCell>
							<TableHeadCell scope="col">Nombre</TableHeadCell>
							<TableHeadCell scope="col">Cuit</TableHeadCell>
							<TableHeadCell scope="col">Calle</TableHeadCell>
							<TableHeadCell scope="col">Altura</TableHeadCell>
							<TableHeadCell scope="col">Loc.</TableHeadCell>
							<TableHeadCell scope="col">CP.</TableHeadCell>
							<TableHeadCell scope="col">Telefono</TableHeadCell>
							<TableHeadCell scope="col">Email</TableHeadCell>
							<TableHeadCell scope="col">Editar</TableHeadCell>
							<TableHeadCell scope="col">Eliminar</TableHeadCell>
						</TableHead>
						{#each filteredClientes as cli}
							<TableBody>
								<TableBodyRow>
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
												ModalEd();
											}}
											class="outline">Editar</Button
										>

										{#if isOpenEd}
											<dialog open>
												<article>
													<div>
														<form method="POST" action="?/editClient">
															<input
																type="hidden"
																name="cliente_id"
																bind:value={selectedCliente_id}
															/>
															<label for="nombre"
																>Razon Social<input
																	type="text"
																	name="razon_social"
																	value={selectedRazon_social}
																	required
																/>
																<label for="cuit"
																	>Cuit<input
																		type="text"
																		name="cuit"
																		value={selectedCuit}
																		required
																	/>
																	<label for="domicilio_calle"
																		>Calle<input
																			type="text"
																			name="domicilio_calle"
																			value={selectedDomicilio_calle}
																			required
																		/>
																		<label for="domicilio_altura"
																			>Altura<input
																				type="text"
																				name="domicilio_altura"
																				value={selectedDomicilio_altura}
																				required
																			/>
																			<label for="localidad"
																				>Localidad<input
																					type="text"
																					name="localidad"
																					value={selectedLocalidad}
																					required
																				/>
																				<label for="codigo_postal"
																					>Codigo Postal<input
																						type="text"
																						name="codigo_postal"
																						value={selectedCodigo_postal}
																						required
																					/>
																					<label for="telefono"
																						>Telefono<input
																							type="text"
																							name="telefono"
																							value={selectedTelefono}
																							required
																						/>
																						<label for="email"
																							>Email<input
																								type="email"
																								name="email"
																								value={selectedEmail}
																								required
																							/>
																							<button on:click={ModalEd} class="secondary"
																								>Cancel</button
																							>
																							<button type="submit">Confirm</button>
																						</label></label
																					></label
																				></label
																			></label
																		></label
																	></label
																></label
															>
														</form>
													</div>
												</article>
											</dialog>
										{/if}
									</TableBodyCell>
									<TableBodyCell
										><!---------------------Elimina el cliente--------------------->
										<Button
											on:click={() => {
												//<!-----------------------------------------Modal para editar-------->
												selectedCliente_id = cli.cliente_id;
												ModalDelete();
											}}
											class="outline">Eliminar</Button
										>
										{#if isOpenDel}
											<dialog open>
												<article>
													<div>
														<header>
															<a
																href="#close"
																aria-label="Close"
																class="close"
																on:click={ModalDelete}
															/>
															<p>Porfavor confirmar la eliminacion el producto!!</p>
														</header>

														<form
															method="POST"
															action="?/deleteClient"
															on:submit={() => {
																selectedCliente_id = cli.cliente_id;
															}}
														>
															<input
																type="hidden"
																name="cliente_id"
																bind:value={selectedCliente_id}
																required
															/>
															<button on:click={ModalDelete} class="outline">Cancel</button>
															<button type="submit" class="outline">Confirmar</button>
														</form>
													</div>
												</article>
											</dialog>
										{/if}
									</TableBodyCell>
								</TableBodyRow>
							</TableBody>
						{/each}
					</Table>
				
			
		
	</div>
</main>

<style>
	/*
.Cli-main {
  padding: 0 100px 0 100px;
}
*/
</style>
