<script>
	import { Button } from 'flowbite-svelte';
	import {goto} from '$app/navigation';
	export let form;
</script>

<svelte:head>
	<title>Cerrar Sesión</title>
	<meta name="description" content="Cerrar Sesión" />
</svelte:head>

<main class="flex items-start justify-center min-h-screen pt-16">
	<div class="bg-white mx-auto p-2 pt-2 rounded border border-gray-200 shadow-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6"> 
		<div class="justify-between items-center mx-auto w-full"> 
			<div class="text-center my-3">
				<h1 class="text-2xl">Cierre de Sesión</h1>
				<h2 class="text-lg">¿Está seguro que quiere salir?</h2>
			</div>
			<form method="POST" class="grid gap-4">
				<footer class="text-center ">
				<Button type="submit" size="xs" class="bg-primary-500 h-8 ml-1 px-2 rounded">Confirmar</Button>				
                <Button on:click={() => goto('/')} size="xs" class="bg-primary-500 h-8 ml-1 px-2 rounded">Cancelar</Button>
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