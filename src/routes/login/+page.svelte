<script>
import {enhance} from '$app/forms';
import { Input, Button } from 'flowbite-svelte';
import {goto} from '$app/navigation';

import '../style.css';
export let form;
export let data;

console.log(form)
console.log(data)

</script>

<svelte:head>
	<title>Inciar sesión</title>
	<meta name="description" content="Login" />
</svelte:head>

<main class="flex items-start justify-center min-h-screen pt-16">
	<div class="bg-white mx-auto p-2  rounded-3xl border border-gray-300 shadow-xl w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6">	
		<form method="POST" class="grid gap-4" use:enhance>
			<div class="text-center ">
				<h1 class="text-2xl font-bold text-center py-2 bg-gradient-to-r
				from-secundary-400 from-30% via-primary-500 via-50% to-primary-500 to-50% text-transparent bg-clip-text">Inciar sesión en FourGreens</h1>	
			</div>
				<Input type="text" name="username" placeholder="Usuario" required class=" bg-white h-8 rounded-2xl w-full"/>
				<Input type="password" name="password" placeholder="Contraseña" class="bg-white h-8 rounded-2xl w-full" required/>
				<footer class="text-center py-1">
				 <Button type="submit" size="xs" class="bg-primary-500 h-8 rounded-2xl px-3">Inciar sesión</Button>				
				 <Button on:click={() => goto('/')} size="xs" class="bg-primary-500 h-8 rounded-2xl px-3">Cancelar</Button>
				</footer>	
			</form>
			</div>	
		</main>