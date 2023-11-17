<script>
	import { Input, Button } from 'flowbite-svelte';
	import '../style.css';
	export let form;
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login" />
</svelte:head>

<main class="mx-auto">
	<article class="mx-auto  ">
		<div class="grid gap-4 justify-center ">
			<div class="text-center">
				<h1 class="text-4xl">Login</h1>
				<h2 class="text-lg">Por favor ingrese sus datos</h2>
			</div>
			<form method="POST" class="grid gap-4">
				<Input type="text" name="username" placeholder="Usuario" required class="w-full rounded" />
				<Input type="password" name="password" placeholder="Contraseña" required class="w-full rounded" />
				<Button type="submit" class="bg-primary-500 w-full rounded">Login</Button>
				{#if form?.success}
					<span>Logueado</span>
				{/if}
			</form>
		</div>
	</article>
</main>



<style>
/*

.container {
	display: flex;
	justify-content: center;
	align-items: center;
}

.login{
	width: 400px;	
}

*/
</style>
