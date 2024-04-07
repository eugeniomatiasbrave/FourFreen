<script>
	import { goto } from '$app/navigation';
	import { Dropdown, Checkbox, Input, Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	import Titulo from '$lib/componentes/titulo.svelte';
	export let data;
	export const { clientes, sortrazonsocial, searchclientes, sortCliente_id } = data;

	let titulo = 'Tabla de Clientes';
	let searchTerm = '';
	let sortOrder = 1;

	//let Clientes = clientes;
	let SortRazonSocial = sortrazonsocial;
	let SearchClientes = searchclientes;
	let SortCliente_id = sortCliente_id;

	let filteredSortCliente_id = SortCliente_id.sort((e, f) => e.cliente_id - f.cliente_id);

	const SortedCliente_id = (params) => {
		sortOrder = -sortOrder;
		let sort = params;
		let newOrder = [...filteredSortCliente_id];
		if (sort === 1) {
			filteredSortCliente_id = newOrder.sort((e, f) => e.cliente_id - f.cliente_id);
		} else if (sort === -1) {
			filteredSortCliente_id = newOrder.sort((e, f) => f.cliente_id - e.cliente_id);
		}
		goto(`/clientes?sort=cliente_id:${sort}`);
	};

	const alternarSortId = () => {
		SortedCliente_id(sortOrder === 1 ? -1 : 1);
	};

	const filterClientes = (params) => {
		let search = params;
		SearchClientes = searchclientes.filter((cliente) => cliente.razon_social.toLowerCase().includes(searchTerm.toLowerCase()));
		filteredSortCliente_id = SearchClientes;
		goto(`/clientes?search=${search}`);
	};

	const reset = () => {
		searchTerm = '';
		filteredSortCliente_id = SortCliente_id.sort((e, f) => e.cliente_id - f.cliente_id);
		goto('/clientes');
	};

	const SortedRazonSocial = (params) => {
		sortOrder = -sortOrder;
		let sort = params;
		if (sort === 1) {
			SortRazonSocial = sortrazonsocial.sort((c, d) => c.razon_social.localeCompare(d.razon_social));
		} else if (sort === -1) {
			SortRazonSocial = sortrazonsocial.sort((c, d) => d.razon_social.localeCompare(c.razon_social));
		}
		filteredSortCliente_id = SortRazonSocial;
		goto(`/clientes?sort=razon_social:${sort}`);
	};

	const alternarSortRS = () => {
		SortedRazonSocial(sortOrder === 1 ? -1 : 1);
	};

	let visibleColumns = {
		cliente_id: true,
		razon_social: true,
		cuit: true,
		domicilio_calle: true,
		domicilio_altura: true,
		localidad: true,
		codigo_postal: true,
		telefono: true,
		email: true,
		editar: true,
		eliminar: true
	};

	function toggleColumn(column) {
		visibleColumns[column] = !visibleColumns[column];
	}
</script>

<svelte:head>
	<title>Tabla de Cliente</title>
	<meta name="description" content="Clientes" />
</svelte:head>

<main class="bg-gray-50 dark:bg-gray-900 m-0 w-full">
	<Titulo {titulo} />

	<div class=" bg-white mx-auto p-1 pt-1 rounded-lg border border-gray-300 shadow-md w-full xl:w-4/5">
		<!----------------Div contenedor: tabla + add + Filtro--------->
		<div class="flex flex-col sm:flex-row justify-between items-center mx-auto">
			<div class="mb-2 sm:mb-0 w-full sm:w-auto">
				<Button href={`/clientes/-1`} data-sveltekit-preload-code="hover" size="xs" class="bg-primary-500 rounded-lg m-0 h-7 px-3 w-full sm:w-auto ">
					<svg class="w-4 h-4 me-1 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
					</svg> Nuevo</Button
				>
			</div>
			<div class="flex items-center">
				<Input type="text" bind:value={searchTerm} name="searchTerm" placeholder="Buscar Cliente" required class=" bg-white h-7 w-full sm:w-auto rounded-lg" />
				<Button size="xs" on:click={() => filterClientes(searchTerm)} class="bg-primary-500 h-7 ml-1 px-3 rounded-lg">Buscar</Button>
				<Button size="xs" on:click={reset} class="bg-primary-500 h-7 ml-1 px-1 w-32 sm:w-32 rounded-lg">Borrar Filtro</Button>
			</div>
		</div>
		<div>
			<Table hoverable={true} class="mx-auto mt-1 border text-xs">
				<TableHead class="bg-primary-500 text-white" align="center" theadClass="text-xs">
					<TableHeadCell class="p-0 m-0 w-0 border-r ">
						<Button class="bg-primary-500 w-0 h-0">👀</Button>
						<Dropdown class="w-52 p-1 space-y-1 text-sm ">
							<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Checkbox bind:checked={visibleColumns.cliente_id} on:click={() => toggleColumn('cliente_id')}>Checked Cliente Id</Checkbox>
							</li>
							<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Checkbox bind:checked={visibleColumns.razon_social} on:click={() => toggleColumn('razon_social')}>Checked Nombre</Checkbox>
							</li>
							<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Checkbox bind:checked={visibleColumns.cuit} on:click={() => toggleColumn('cuit')}>Checked Cuit</Checkbox>
							</li>
							<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Checkbox bind:checked={visibleColumns.domicilio_calle} on:click={() => toggleColumn('cuit')}>Checked Calle</Checkbox>
							</li>
							<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Checkbox bind:checked={visibleColumns.domicilio_altura} on:click={() => toggleColumn('domicilio_altura')}>Checked Domicilio</Checkbox>
							</li>
							<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Checkbox bind:checked={visibleColumns.localidad} on:click={() => toggleColumn('localidad')}>Checked Localidad</Checkbox>
							</li>
							<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Checkbox bind:checked={visibleColumns.codigo_postal} on:click={() => toggleColumn('codigo_postal')}>Checked Codigo Postal</Checkbox>
							</li>
							<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Checkbox bind:checked={visibleColumns.telefono} on:click={() => toggleColumn('telefono')}>Checked Telefono</Checkbox>
							</li>
							<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Checkbox bind:checked={visibleColumns.email} on:click={() => toggleColumn('email')}>Checked Email</Checkbox>
							</li>
							<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Checkbox bind:checked={visibleColumns.editar} on:click={() => toggleColumn('editar')}>Checked Editar</Checkbox>
							</li>
							<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
								<Checkbox bind:checked={visibleColumns.eliminar} on:click={() => toggleColumn('eliminar')}>Checked Eliminar</Checkbox>
							</li>
						</Dropdown>
					</TableHeadCell>

					{#if visibleColumns.cliente_id}
						<TableHeadCell class="py-2">
							<div class="flex items-center justify-end">
								Id<button on:click={alternarSortId} class="bg-primary-500 hover:bg-primary-500 rounded">
									{#if sortOrder === 1}
										<svg class="w-2.5 h-4 ms-1.5 text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 8">
											<path stroke="currentColor" stroke-linecap="butt" stroke-linejoin="round" stroke-width="1" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7" />
										</svg>
									{:else}
										<svg class="w-2.5 h-4 ms-1.5 text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 8">
											<path stroke="currentColor" stroke-linecap="butt" stroke-linejoin="round" stroke-width="1" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
										</svg>
									{/if}
								</button>
							</div>
						</TableHeadCell>
					{/if}

					{#if visibleColumns.razon_social}
						<TableHeadCell class="py-2">
							<div class="flex items-center">
								Nombre
								<button on:click={alternarSortRS} class="bg-primary-500 hover:bg-primary-500 rounded">
									{#if sortOrder === 1}
										<svg class="w-2.5 h-4 ms-1.5 text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 8">
											<path stroke="currentColor" stroke-linecap="butt" stroke-linejoin="round" stroke-width="1" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7" />
										</svg>
									{:else}
										<svg class="w-2.5 h-4 ms-1.5 text-white-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 8">
											<path stroke="currentColor" stroke-linecap="butt" stroke-linejoin="round" stroke-width="1" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
										</svg>
									{/if}
								</button>
							</div>
						</TableHeadCell>
					{/if}
					{#if visibleColumns.cuit}
						<TableHeadCell class="py-2">Cuit</TableHeadCell>
					{/if}
					{#if visibleColumns.domicilio_calle}
						<TableHeadCell class="py-2">Calle</TableHeadCell>
					{/if}
					{#if visibleColumns.domicilio_altura}
						<TableHeadCell class="py-2">Altura</TableHeadCell>
					{/if}
					{#if visibleColumns.localidad}
						<TableHeadCell class="py-2">Localidad</TableHeadCell>
					{/if}
					{#if visibleColumns.codigo_postal}
						<TableHeadCell class="py-2">C. P.</TableHeadCell>
					{/if}
					{#if visibleColumns.telefono}
						<TableHeadCell class="py-2">Telefono</TableHeadCell>
					{/if}
					{#if visibleColumns.email}
						<TableHeadCell class="py-2">Email</TableHeadCell>
					{/if}
					{#if visibleColumns.editar}
						<TableHeadCell class="py-2">Editar</TableHeadCell>
					{/if}
					{#if visibleColumns.eliminar}
						<TableHeadCell class="py-2">Eliminar</TableHeadCell>
					{/if}
				</TableHead>
				<TableBody class="divide-y">
					{#each filteredSortCliente_id as { cliente_id, razon_social, cuit, domicilio_calle, domicilio_altura, localidad, telefono, email, codigo_postal }}
						<TableBodyRow class="hover:bg-hover-gray-light">
							<TableBodyCell class="py-2" align="center" />
							{#if visibleColumns.cliente_id}
								<TableBodyCell class="py-2" align="center">{cliente_id}</TableBodyCell>
							{/if}
							{#if visibleColumns.razon_social}
								<TableBodyCell class="py-2">{razon_social}</TableBodyCell>
							{/if}
							{#if visibleColumns.cuit}
								<TableBodyCell class="py-2" align="right">{cuit}</TableBodyCell>
							{/if}
							{#if visibleColumns.domicilio_calle}
								<TableBodyCell class="py-2">{domicilio_calle}</TableBodyCell>
							{/if}
							{#if visibleColumns.domicilio_altura}
								<TableBodyCell class="py-2" align="right">{domicilio_altura}</TableBodyCell>
							{/if}
							{#if visibleColumns.localidad}
								<TableBodyCell class="py-2">{localidad}</TableBodyCell>
							{/if}
							{#if visibleColumns.codigo_postal}
								<TableBodyCell class="py-2" align="right">{codigo_postal}</TableBodyCell>
							{/if}
							{#if visibleColumns.telefono}
								<TableBodyCell class="py-2" align="right">{telefono}</TableBodyCell>
							{/if}
							{#if visibleColumns.email}
								<TableBodyCell class="py-2">{email}</TableBodyCell>
							{/if}
							{#if visibleColumns.editar}
								<TableBodyCell class="py-2" align="center">
									<a href={`/clientes/${cliente_id}?action=editar`} data-sveltekit-preload-code="hover" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Editar</a>
								</TableBodyCell>
							{/if}
							{#if visibleColumns.eliminar}
								<TableBodyCell class="py-2" align="center"
									><!---------------------Elimina el cliente--------------------->
									<a href={`/clientes/${cliente_id}?action=eliminar`} data-sveltekit-preload-code="hover" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Eliminar</a>
								</TableBodyCell>
							{/if}
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</div>
	</div>
</main>

<style>
</style>
