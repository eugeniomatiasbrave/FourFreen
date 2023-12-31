<script>
import { enhance } from '$app/forms';
import { Input, Button } from 'flowbite-svelte';
import {goto} from '$app/navigation';
import '../style.css';

</script>

<svelte:head>
	<title>Inciar sesión</title>
	<meta name="description" content="Login" />
</svelte:head>

<main class="flex items-start justify-center min-h-screen pt-16">
		<div class="bg-white mx-auto p-2 pt-2 rounded border border-gray-200 shadow-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6">
			<div class="text-center my-3">
				<h1 class="text-2xl">Inciar sesión en FourGreens</h1>
				<h2 class="text-lg">Por favor ingrese sus datos</h2>	
			</div>
			<form method="POST" use:enhance class="grid gap-4">
				<Input type="text" name="username" placeholder="Usuario" required class=" bg-white h-8 rounded w-full"/>
				<Input type="password" name="password" placeholder="Contraseña" class="bg-white h-8 rounded w-full" required/>
				<footer class="text-center ">
				 <Button type="submit" size="xs" class="bg-primary-500 h-8 rounded">Inciar sesión</Button>				
				 <Button on:click={() => goto('/')} size="xs" class="bg-primary-500 h-8  rounded">Cancelar</Button>
				</footer>
			</form>

		</div>	
</main>