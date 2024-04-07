<script>
	import AlertError from '$lib/Componentes/AlertError.svelte';
	import { enhance } from '$app/forms';
	import { P, Button } from 'flowbite-svelte';
	import InputField from '$lib/Componentes/InputField.svelte';
	import { goto } from '$app/navigation';
	import '../style.css';
	export let form;
	export let data;
	console.log(form);
	console.log(data);
</script>

<svelte:head>
	<title>FourGreens-Inciar sesión</title>
	<meta name="description" content="Login" />
</svelte:head>

<main class="items-start justify-center pt-32">
	<div class="bg-white mx-auto p-5 rounded-3xl border border-gray-300 shadow-xl sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6">
		<form method="POST" class="grid" use:enhance>
			<div class="text-center">
				<P
					class="text-2xl font-bold text-center bg-gradient-to-r
				from-secundary-400 from-30% via-primary-500 via-50% to-primary-500 to-50% text-transparent bg-clip-text">Inciar sesión</P
				>
			</div>
			<InputField type="text" name="username" placeholder="Usuario" />
			<InputField type="password" name="password" placeholder="Contraseña" />
			<Button type="submit" class="bg-primary-500 h-8 mb-2 mt-3 md:mb-0 rounded-lg shadow-md hover:shadow-lg w-full">Inciar sesión</Button>
			<div class="divider">
				<hr class=" border-gray-300" />
				<p class="text-center text-xs text-gray-500 font-semibold mx-3">¿No tienes cuenta?</p>
				<hr class=" border-gray-300" />
			</div>
			<Button on:click={() => goto('/registro')} class="bg-primary-500 h-8">Registrarse</Button>
		</form>
		<Button on:click={() => goto('/')} class="bg-white hover:border-primary-800 border border-primary-500 hover:bg-white h-5 text-xs text-primary-600 mt-3 px-2">Volver</Button>
	</div>
</main>

{#if form?.success === false}
	<AlertError errorMessage={form?.message} class="bg-white shadow-xl" />
{/if}

<style>
	.divider {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.divider hr {
		flex: 1;
	}
</style>
