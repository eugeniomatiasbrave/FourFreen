<script>
	import { page } from '$app/stores';
	import {Navbar,NavBrand,NavLi,NavUl,NavHamburger} from 'flowbite-svelte';
	import './style.css';
	import '../app.postcss';
	export let data;

	$: activeUrl = $page.url.pathname;

</script>

<Navbar class="p-0 border-b border-gray-200 ">
	<NavBrand href="/">
		<img src="" class="mr-3 h-6 sm:h-9" alt="" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">FourGreens</span>
	</NavBrand>
	<NavHamburger class="" />
	<NavUl >
	  {#if data.usuario === undefined}
		<NavLi href="/login" data-sveltekit-preload-code="eager">Inciar sesión</NavLi>
	  {:else}
		<NavUl {activeUrl}>
			{#each data.menu as men (men.ruta)}
			<NavLi>
			<a href={men.ruta} class:active={$page.url.pathname === men.ruta} data-sveltekit-preload-code="eager" data-placement="left">{men.item}</a>
        <!--<a href={men.ruta} on:click={() => window.location.href = men.ruta}
			 data-sveltekit-preload-code="eager" data-placement="left">{men.item}</a>-->
			</NavLi>
			{/each}	
			<NavLi href="/logout" data-sveltekit-preload-code="eager">Cerrar sesión</NavLi>	
		</NavUl>
	  {/if}
	</NavUl>
</Navbar>


<slot />
