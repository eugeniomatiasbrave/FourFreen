<script>
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
	<title>FourGreens-Registro</title>
	<meta name="description" content="Registro" />
</svelte:head>

<main class="items-start justify-center pt-32">
	<div class="bg-white mx-auto p-5 rounded-3xl border border-gray-300 shadow-xl sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6">
		<form method="POST" class="grid" use:enhance>
			<div class="text-center">
				<P
					class="text-2xl font-bold text-center bg-gradient-to-r
					from-secundary-400 from-30% via-primary-500 via-50% to-primary-500 to-50% text-transparent bg-clip-text mb-2">Registrar Usuario</P
				>
			</div>
			<InputField type="email" name="email" placeholder="E-mail" />
			<InputField type="text" name="username" placeholder="Usuario" />
			<InputField type="password" name="password" placeholder="Contraseña" />
			<InputField type="password" name="confirm_password" placeholder="Repetir Contraseña" />
			<Button class="bg-primary-500 h-8 mt-3 ">Crear Usuario</Button>
		</form>
		<Button on:click={() => goto('/')} class="bg-white hover:border-primary-800 border border-primary-500 hover:bg-white h-5 text-xs text-primary-600 mt-3 px-2">Volver</Button>
	</div>
</main>
