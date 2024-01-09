<script>
	import {Navbar,NavBrand,NavLi,NavUl,NavHamburger} from 'flowbite-svelte';
	import {goto} from '$app/navigation';
	//import {page} from '$app/stores';
	import './style.css';
	import '../app.postcss';
	export let data;
	
	
	
</script>

<Navbar class="p-0 ">
	<NavBrand href="/">
		<img src="" class="mr-3 h-6 sm:h-9" alt="" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">FourGreens</span>
	</NavBrand>
	<NavHamburger class="" />
	<NavUl >
	  {#if data.usuario === undefined}
		<NavLi href="/login" data-sveltekit-preload-code="eager">Inciar sesión</NavLi>
	  {:else}
		<NavUl>
			{#each data.menu as men }
			<NavLi>
			<a href={men.ruta} data-sveltekit-preload-code="eager" data-placement="left">{men.item}</a>	
			<!--<a href={men.ruta} on:click={() => window.location.href = men.ruta} data-sveltekit-preload-code="eager" data-placement="left">{men.item}</a>-->			</NavLi>
			{/each}		
			<NavLi href="/logout" data-sveltekit-preload-code="eager">Cerrar sesión</NavLi>	
		</NavUl>
	  {/if}
	</NavUl>
</Navbar>


<slot />
