<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import './style.css';
	import '../app.postcss';
	export let data;
	
	$: activeUrl = $page.url.pathname;

</script>

<Navbar>
	<NavBrand href="/">
	  <img src="" class="mr-3 h-6 sm:h-9" alt="" />
	  <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">FourGreens</span>
	</NavBrand>

	<NavHamburger />
	<NavUl {activeUrl}>
	  
	  {#if data.usuario === undefined}
		<NavLi href="/login">Login</NavLi>
	  {:else}
		<NavUl>
			<NavLi>
				<a href="/productos" data-tooltip="Tooltip 1" data-placement="left">Tabla de productos</a>
			</NavLi>
			<NavLi>
				<a href="/clientes" data-tooltip="Tooltip 2" data-placement="left">Tabla de Clientes</a>
			</NavLi>

			<NavLi class="cursor-pointer">
				Pedidos<ChevronDownOutline class="w-3 h-3 ml-2 text-primary-800 dark:text-white inline" />
			  </NavLi>
			  <Dropdown class="w-44 z-20">
				<DropdownItem href="/pedidos">Pedidos</DropdownItem>
				<DropdownDivider />
				<DropdownItem href="/pedidos?estado_id=10">Pedidos Ingresados</DropdownItem>
				<DropdownDivider />
				<DropdownItem href="/pedidos?estado_id=20">Pedidos Preparados</DropdownItem>
				<DropdownDivider />
				<DropdownItem href="/pedidos?estado_id=30">Pedidos Entregados</DropdownItem>
			  </Dropdown>
			<NavLi href="/logout">Logout</NavLi>
		</NavUl>
	  {/if}
	</NavUl>
</Navbar>


<slot />