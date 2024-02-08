<script>

import {enhance} from '$app/forms';
import { P,Alert} from 'flowbite-svelte';
import { fly } from 'svelte/transition';
import { sineIn } from 'svelte/easing';
import FooterForm from '$lib/Componentes/FooterForm.svelte';
import InputField from '$lib/Componentes/InputField.svelte';
import { ExclamationCircleSolid } from 'flowbite-svelte-icons';

import '../style.css';
export let form;
export let data;

console.log(form)
console.log(data)

let ruta="";
let textoboton1="Inciar sesión"; 
let textoboton2="Cancelar";

</script>

<svelte:head>
	<title>Inciar sesión</title>
	<meta name="description" content="Login" />
</svelte:head>

<main class="flex items-start justify-center pt-32">
	<div class="bg-white mx-auto p-4 rounded-3xl border border-gray-300 shadow-xl sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6">	
		<form method="POST" class="grid" use:enhance>
			<div class="text-center ">
				<P class="text-2xl font-bold text-center bg-gradient-to-r
				from-secundary-400 from-30% via-primary-500 via-50% to-primary-500 to-50% text-transparent bg-clip-text">Inciar sesión en FourGreens</P>	
			</div>
				<InputField type="text" name="username" placeholder="Usuario"/>
				<InputField type="password" name="password" placeholder="Contraseña"/>
				<FooterForm {ruta} {textoboton1} {textoboton2} />
		     </form>
			</div>
		</main>
			{#if form?.success === false}
             <div class="relative inset-0 flex items-center justify-center mt-2">
              <Alert class="border border-gray-200" dismissable transition={fly} params={{ x: -200, duration: 200, easing: sineIn}}>
               <ExclamationCircleSolid slot="icon" class="w-5 h-5" />
               <p>{form?.message}</p>
               </Alert>
             </div>
            {/if} 
		
		
		
		
		
		
		