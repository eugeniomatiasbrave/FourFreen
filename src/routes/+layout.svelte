<script>
	import './style.css';
	import '../app.postcss';
	import { Drawer, Button, Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Img, A } from 'flowbite-svelte';
	import { ArrowRightToBracketSolid } from 'flowbite-svelte-icons';
	import { sineIn } from 'svelte/easing';
	import LogoFG from '$lib/img/LogoFG2.jpg';
	
	import { page } from '$app/stores';
	
export let data;


	
$: activeUrl = $page.url.pathname;

  let hidden2 = true;
  let spanClass = 'flex-1 px-0 py-4 whitespace-nowrap w-56';
  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn
  };

  
</script>

<Sidebar class="bg-primary-500 text-white w-full">
	{#if data.usuario === undefined}
	<SidebarGroup class="bg-primary-500 flex justify-end" >
			<SidebarItem href="/login" active={activeUrl === '/login'} label="Iniciar sesión" data-placement="left" class=" border border-white border-2 px-0 h-8 m-1 me-3 bg-primary-500 hover:bg-primary-500 px-3 text-white-sm font-semibold" >
			  <svelte:fragment slot="icon">
				<ArrowRightToBracketSolid class="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-white
				 dark:group-hover:text-white" />
			  </svelte:fragment>
			</SidebarItem>  
    </SidebarGroup>
{:else}
	<div class="p-0 ms-3 flex group justify-between" >	
		<Button on:click={() => (hidden2 = false)} class="text-white bg-primary-500 hover:bg-primary-800 border
			border-primary-500 focus:ring-1 focus:outline-none focus:ring-primary-500 font-medium rounded-lg 
			text-sm text-center inline-flex items-center dark:focus:ring-white dark:bg-gray-800 dark:border-white
			dark:text-white dark:hover:bg-gray-700 m-1 p-2 ">
			<svg class="w-5 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
			</svg>
		</Button>
		<SidebarGroup class="bg-primary-500">
				<SidebarItem href="/logout" active={activeUrl === "/logout"} label="Cerrar sesión" class="border border-white border-2 h-8 my-1 me-2 bg-primary-500 hover:bg-primary-500 text-white-sm font-semibold flex group" >
				   <svelte:fragment slot="icon">
					 <ArrowRightToBracketSolid class="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-white
					  dark:group-hover:text-white" />
				   </svelte:fragment>
				 </SidebarItem>
			</SidebarGroup>
	</div>
<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden2} id="sidebar2" 
class="w-64 border-r-4 border-secundary-500">
<Img src={LogoFG} class=" mb-4 pb-2 border-b-2 border-gray-400" alt="FourGreen Logo" />
  <SidebarItem {spanClass} class="">
     <svelte:fragment slot="icon">
			<a href="/"  active={activeUrl === "/"} class=" w-52 text-gray-800 px-0 text-white-sm font-semibold "  
					data-sveltekit-preload-code="eager" data-placement="left">Inicio</a>
			</svelte:fragment>
  </SidebarItem>
  <Sidebar class="w-52">
	  <SidebarWrapper divClass="overflow-y-auto px-0 dark:bg-gray-800 w-52">	 
		  <SidebarGroup class="w-52 px-0" >
			  {#each data.menu as men }
			  <SidebarItem {spanClass} class="w-52 px-0" >
				<svelte:fragment slot="icon">
				<a href={men.ruta} active={activeUrl === men.ruta} on:click={()=> (hidden2 = true)} class="text-gray-800 px-2 text-white-sm font-semibold"
						 data-sveltekit-preload-code="eager" data-placement="left">{men.item}</a>			
				</svelte:fragment>	
              </SidebarItem>
		   {/each}		
		</SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
 </Drawer>
{/if}
</Sidebar>
 <slot />