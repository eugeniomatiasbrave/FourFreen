<script>
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import AlertOk from '$lib/Componentes/AlertOk.svelte';
	import AlertError from '$lib/Componentes/AlertError.svelte';
	import EliminarCli from './EliminarCli.svelte';
	import FooterForm from '$lib/Componentes/FooterForm.svelte';
	import InputField from '$lib/Componentes/InputField.svelte';
	export let data;
	export let form;
	export const { clienteId, clientes } = data;

	let ruta = 'clientes';
	let textoboton1 = 'Confirmar';
	let textoboton2 = 'Cancelar';
	let errorMessage = '';
	let showError = false;

	let ClienteId = clienteId;
	let Clientes = clientes;

	let action = '';
	let cliente_id = $page.params.cliente_id;

	if (cliente_id === '-1') {
		action = 'agregar';
	} else {
		action = $page.url.searchParams.get('action') || 'otraAccion';
	}

	const validarExiste = (e) => {
		let razon_social = e.target.value;
		let existe = Clientes.some((cli) => cli.razon_social === razon_social);

		if (existe) {
			showError = true;
			errorMessage = 'Nombre de cliente existente!!';
		} else {
			showError = false;
		}
	};
</script>

{#if action === 'editar'}
	{#each ClienteId as cliente}
		<main class="flex items-start justify-center pt-16">
			<div
				class="bg-white mx-auto p-1 pt-1 my-2 rounded-3xl border border-gray-300 shadow-2xl sm:w-3/4 md:w-1/2
              lg:w-1/3 xl:w-1/4 2xl:w-1/4 transform transition duration-500 hover:scale-105"
			>
				<div class="container mx-auto p-4">
					<h1
						class="text-3xl font-bold text-center py-4 bg-gradient-to-r
      from-secundary-400 from-10% via-primary-500 via-40% to-primary-500 to-70% text-transparent bg-clip-text"
					>
						Editar Cliente !!
					</h1>
					<form method="POST" action="?/editar" use:enhance>
						<InputField type="hidden" name="cliente_id" value={cliente.cliente_id} />
						<div class="grid grid-cols-2 gap-4">
							<InputField name="razon_social" value={cliente.razon_social} maxlength="30" placeholder="Razon social" onValidate={validarExiste} />
							<InputField type="number" name="cuit" value={cliente.cuit} placeholder="Cuit" />
							<InputField type="text" name="domicilio_calle" value={cliente.domicilio_calle} placeholder="Calle" />
							<InputField type="text" name="domicilio_altura" value={cliente.domicilio_altura} placeholder="Altura" />
							<InputField type="text" name="localidad" value={cliente.localidad} placeholder="Localidad" />
							<InputField type="text" name="codigo_postal" value={cliente.codigo_postal} placeholder="Codigo.Postal" />
							<InputField type="text" name="telefono" value={cliente.telefono} placeholder="Telefono" />
							<InputField type="text" name="email" value={cliente.email} placeholder="E-mail" />
						</div>
						<FooterForm {ruta} {textoboton1} {textoboton2} />
					</form>
				</div>
			</div>
		</main>

		{#if showError}
			<AlertError {errorMessage} class="bg-white shadow-xl" />
		{/if}
	{/each}
{:else if action === 'agregar'}
	<main class="flex items-start justify-center pt-16">
		<div
			class="bg-white mx-auto p-4 pt-2 my-2 rounded-3xl border border-gray-300 shadow-xl sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/4
              transform transition duration-500 hover:scale-105"
		>
			<form method="POST" action="?/agregar" use:enhance>
				<h3
					class="text-3xl font-bold text-center py-4 bg-gradient-to-r from-secundary-400 from-10% via-primary-500 via-40%
            to-primary-500 to-70% text-transparent bg-clip-text"
				>
					Por favor agregar nuevo cliente!!
				</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<InputField name="razon_social" maxlength="50" placeholder="Razon social" onValidate={validarExiste} />
					<InputField type="number" name="cuit" placeholder="Cuit" />
					<InputField type="text" name="domicilio_calle" placeholder="Calle" />
					<InputField type="text" name="domicilio_altura" placeholder="Altura" />
					<InputField type="text" name="localidad" placeholder="Localidad" />
					<InputField type="text" name="codigo_postal" placeholder="Codigo.Postal" />
					<InputField type="text" name="telefono" placeholder="Telefono" />
					<InputField type="text" name="email" placeholder="E-mail" />
				</div>
				<FooterForm {ruta} {textoboton1} {textoboton2} />
			</form>
		</div>
	</main>
	{#if showError}
		<AlertError {errorMessage} />
	{/if}
{:else if action === 'eliminar'}
	<EliminarCli {data} {form} {action} {cliente_id} {ClienteId} {Clientes} />
{/if}

{#if form?.success}
	<AlertOk message={form?.message} {ruta} />
{/if}
