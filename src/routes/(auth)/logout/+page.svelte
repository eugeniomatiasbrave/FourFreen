<script>
	import { Button } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import {goto} from '$app/navigation';
	export let form;
</script>

<svelte:head>
	<title>Cerrar Sesión</title>
	<meta name="description" content="Cerrar Sesión" />
</svelte:head>

<main class="flex items-start justify-center min-h-screen pt-16">
	<div class="bg-white mx-auto p-2 pt-2 rounded-3xl border border-gray-300 shadow-2xl  sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6"> 
		<div class="justify-between items-center mx-auto w-full"> 
			<div class="text-center my-3">
				<h1 class="text-2xl font-bold text-center py-2 bg-gradient-to-r
				from-secundary-400 from-30% via-primary-500 via-50% to-primary-500 to-50% text-transparent bg-clip-text">Cierre de Sesión</h1>
				<h2 class="text-lg pb-1">¿Está seguro que quiere salir?</h2>
			</div>
			<form method="POST" class="grid gap-4" use:enhance>
				<footer class="text-center ">
				<Button type="submit" size="xs" class="bg-primary-500 h-8 ml-1 px-3 rounded-2xl">Confirmar</Button>				
                <Button on:click={() => goto('/')} size="xs" class="bg-primary-500 h-8 ml-1 px-3 rounded-2xl">Cancelar</Button>
			    </footer>
				{#if form?.success}
					<span>Logueado</span>
				{/if}
			</form>
		</div>
	</div>	
</main>

<style>
	
</style>