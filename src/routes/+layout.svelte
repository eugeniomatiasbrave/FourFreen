<script>
import { NavBrand,Sidebar, SidebarWrapper, SidebarBrand, SidebarItem, SidebarGroup } from 'flowbite-svelte';
import { ChartPieSolid, GridSolid,ShoppingCartSolid, MailBoxSolid, UserSolid, ArrowRightToBracketSolid, FileEditSolid } from 'flowbite-svelte-icons';

let spanClass = 'flex-1 ms-3 whitespace-nowrap';

import {page} from '$app/stores';
//import logo1 from '$lib/img/LogoFourGreens2021.png';
import './style.css';
import '../app.postcss';
export let data;
	
$: activeUrl = $page.url.pathname;

</script>

  <Sidebar class="">
	<SidebarWrapper>
	  <SidebarGroup >
		<NavBrand href="/">
			<img src="" class="mr-3 h-6 sm:h-9" alt="" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">FourGreens</span>
		</NavBrand>
		<SidebarGroup {activeUrl} >
			{#if data.usuario === undefined}
			  <SidebarItem>
				<svelte:fragment slot="icon">
				  <ArrowRightToBracketSolid class="w-5 h-5 mr-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
				  <a href="/login"  data-placement="left">Inciar sesión</a>
				</svelte:fragment>
			  </SidebarItem>
			{:else}
			  <SidebarGroup >
				<SidebarItem >
					<svelte:fragment slot="icon">
					  <GridSolid class="w-5 h-5 mr-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
					  <a href={data.menu[0].ruta}  data-placement="left">{data.menu[0].item}</a>
					</svelte:fragment>
				  </SidebarItem>
				  <SidebarItem >
					<svelte:fragment slot="icon">
					  <UserSolid class="w-5 h-5 mr-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
					  <a href={data.menu[1].ruta}  data-placement="left">{data.menu[1].item}</a>
					</svelte:fragment>	
				  </SidebarItem>
				  <SidebarItem >
					<svelte:fragment slot="icon">
					  <ShoppingCartSolid class="w-5 h-5 mr-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
					  <a href={data.menu[2].ruta}  data-placement="left">{data.menu[2].item}</a>
					</svelte:fragment>
				  </SidebarItem>
				  <SidebarItem >
					<svelte:fragment slot="icon">
					  <ShoppingCartSolid class="w-5 h-5 mr-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
					  <a href={data.menu[3].ruta}  data-placement="left">{data.menu[3].item}</a>
					</svelte:fragment>
				  </SidebarItem>
				  <SidebarItem >
					<svelte:fragment slot="icon">
					  <ShoppingCartSolid class="w-5 h-5 mr-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
					  <a href={data.menu[4].ruta}  data-placement="left">{data.menu[4].item}</a>
					</svelte:fragment>
				  </SidebarItem>
				  <SidebarItem >
					<svelte:fragment slot="icon">
					  <ShoppingCartSolid class="w-5 h-5 mr-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
					  <a href={data.menu[5].ruta}  data-placement="left">{data.menu[5].item}</a>
					</svelte:fragment>
				  </SidebarItem> 
				  <SidebarItem >
					<svelte:fragment slot="icon">
					  <FileEditSolid class="w-5 h-5 mr-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
					  <a href="/logout" data-placement="left">Cerrar sesión</a>
					</svelte:fragment>
				 </SidebarItem>	
			  </SidebarGroup>
			{/if}
		  </SidebarGroup>
	 </SidebarGroup>
	</SidebarWrapper>
</Sidebar>

<slot/>
  
  
<style>
</style>