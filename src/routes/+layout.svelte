<script>
	import './style.css';
	import '../app.postcss';
	import { Drawer, Button, Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Img } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	import LogoFG from '$lib/img/LogoFG2.jpg';
	import PageTransition from '$lib/Componentes/transition.svelte';
	import Brand from '$lib/Componentes/brand.svelte';
	import { page } from '$app/stores';
	export let data;

	// para cuando este lista la API..aqui puedo desestructurar 
	//el objeto menu y obtener un objeto para las paginas principales y otro objeto para las paginas de pedidos.
	// Con esto logro un menu desplegable con las paginas principales y un desplegable con las de pedidos.

	$: activeUrl = $page.url.pathname;

	let hidden2 = true;
	let spanClass = 'flex-1 px-0 py-4 whitespace-nowrap w-56';
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
</script>

<Sidebar class="bg-primary-500 text-white w-full ">
	{#if data.usuario === undefined}
		<div class="bg-primary-500 flex flex-col sm:flex-row justify-between w-full p-2 md:p-2 lg:justify-between">
			<div class="sx:my-1">
				<a href="/" active={activeUrl === '/'} class="text-white text-xl font-semibold ms-7 lg:text-2xl">FourGreens</a>
			</div>
			<ul class="flex flex-col sm:flex-row">
				<Brand />
				<li class="border-l border-b h-8 bg-white hover:border-primary-800 px-4 rounded-lg">
					<a href="/login" active={activeUrl === '/login'} class="text-primary-600 text-sm font-semibold">Iniciar sesión</a>
				</li>
			</ul>
		</div>
	{:else}
		<div class="bg-primary-500 flex flex-col sm:flex-row justify-between w-full py-2 lg:justify-between">
			<Button
				on:click={() => (hidden2 = false)}
				class="text-white bg-primary-500 hover:bg-primary-800 border
			border-primary-500 focus:ring-1 focus:outline-none focus:ring-primary-500 font-medium rounded-lg 
			text-sm text-center inline-flex items-center dark:focus:ring-white dark:bg-gray-800 dark:border-white
			dark:text-white dark:hover:bg-gray-700 py-1 ms-7 sx:justify-start"
			>
				<svg class="w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M1 1h15M1 7h15M1 13h15" />
				</svg>
			</Button>
			<ul class="flex flex-col sm:flex-row pe-2">
				<Brand />
				<li class="border-l border-b h-8 bg-white hover:border-primary-800 px-4 rounded-lg">
					<a href="/logout" active={activeUrl === '/logout'} class="text-primary-600 text-sm font-semibold">Cerrar sesión </a>
				</li>
			</ul>
		</div>
		<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden2} id="sidebar2" class="w-64 border-r-4 border-secundary-500">
			<Img src={LogoFG} class=" mb-4 pb-2 border-b-2 border-gray-400" alt="FourGreen Logo" />
			<SidebarItem {spanClass} class="">
				<svelte:fragment slot="icon">
					<a
						href="/"
						active={activeUrl === '/'}
						on:click={() => (hidden2 = true)}
						class=" w-52 text-gray-800 px-0 text-white-sm font-semibold"
						data-sveltekit-preload-code="eager"
						data-placement="left">Inicio</a
					>
				</svelte:fragment>
			</SidebarItem>
			<Sidebar class="w-52">
				<SidebarWrapper divClass="overflow-y-auto px-0 dark:bg-gray-800 w-52">
					<SidebarGroup class="w-52 px-0">
						{#each data.menu as men}
							<SidebarItem {spanClass} class="w-52 px-0">
								<svelte:fragment slot="icon">
									<a
										href={men.ruta}
										active={activeUrl === men.ruta}
										on:click={() => (hidden2 = true)}
										class="text-gray-800 px-2 text-white-sm font-semibold"
										data-sveltekit-preload-code="eager"
										data-placement="left">{men.item}</a
									>
								</svelte:fragment>
							</SidebarItem>
						{/each}
					</SidebarGroup>
				</SidebarWrapper>
			</Sidebar>
		</Drawer>
	{/if}
</Sidebar>

<PageTransition url={data.url}>
	<slot />
</PageTransition>

<style>
	li {
		margin: 0 7px 0 7px;
		padding-top: 2px;
	}

	@media (max-width: 640px) {
		li {
			margin: 3px 0px 3px 0px;
		}
	}
</style>
