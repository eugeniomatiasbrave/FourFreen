<script>
	import { Button } from 'flowbite-svelte';
	export let form;
</script>

<svelte:head>
	<title>Logout</title>
	<meta name="description" content="Logout" />
</svelte:head>


<main class="mx-auto">
	<article class="mx-auto">
		<div class="grid gap-4 justify-center">
			<div class="text-center">
				<h1 class="text-4xl">Logout</h1>
				<h2 class="text-lg">¿Está seguro que quiere salir?</h2>
			</div>
			<form method="POST" class="grid gap-4">
				<Button type="submit" class="bg-primary-500 rounded">Logout</Button>
				{#if form?.success}
					<span>Logueado</span>
				{/if}
			</form>
		</div>
	</article>
</main>

<style>
	
</style>