<script>
import FooterForm from '$lib/Componentes/FooterForm.svelte';
import { enhance } from '$app/forms';
export let form;

console.log(form)

let ruta="";
let textoboton1="Confirmar"; 
let textoboton2="Cancelar";

</script>

<svelte:head>
	<title>Cerrar Sesión</title>
	<meta name="description" content="Cerrar Sesión" />
</svelte:head>

<main class="flex items-start justify-center pt-32">
	<div class="bg-white mx-auto p-2 pt-2 rounded-3xl border border-gray-300 shadow-2xl  sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6"> 
		<div class="justify-between items-center mx-auto w-full"> 
			<div class="text-center ">
				<h1 class="text-2xl font-bold text-center py-2 bg-gradient-to-r
				from-secundary-400 from-30% via-primary-500 via-50% to-primary-500 to-50% text-transparent bg-clip-text">Cierre de Sesión</h1>
				<h2 class="text-lg pb-1">¿Está seguro que quiere salir?</h2>
			</div>
			<form method="POST" class="grid gap-3" use:enhance>
				<FooterForm {ruta} {textoboton1} {textoboton2} />
			</form>
		</div>
	</div>	
</main>