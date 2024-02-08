<script>
	
	import './style.css';
	import '../app.postcss';
	export let data;

  import { Drawer, Button, CloseButton, Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Img, A } from 'flowbite-svelte';
  import { ArrowRightToBracketSolid } from 'flowbite-svelte-icons';
  import { sineIn } from 'svelte/easing';
  import LogoFG from '$lib/img/LogoFG2.jpg';
  let hidden2 = true;
  let spanClass = 'flex-1 ms-3 py-4 whitespace-nowrap';
  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn
  };

  

</script>

<Sidebar class="bg-primary-500 text-white w-full">
	{#if data.usuario === undefined}
	<SidebarGroup class="bg-primary-500">
	  <SidebarItem class="bg-primary-500 hover:bg-primary-500 px-3 text-white">
		<svelte:fragment slot="icon">
			<a href="/login" class="bg-primary-500 hover:bg-primary-500 px-3 text-white-sm font-semibold flex group" style="margin-left: auto;" 
			data-sveltekit-preload-code="eager" data-placement="left"><ArrowRightToBracketSolid class="w-5 h-5 me-2 text-white
			 dark:text-white group-hover:text-white dark:group-hover:text-white"/>Inciar sesión</a>
		</svelte:fragment>
	 </SidebarItem>
   </SidebarGroup>
{:else}
	<div class="p-0 ms-3">	
		<Button on:click={() => (hidden2 = false)} class="text-white bg-primary-500 hover:bg-primary-800 border
			border-primary-500 focus:ring-1 focus:outline-none focus:ring-primary-500 font-medium rounded-lg 
			text-sm text-center inline-flex items-center dark:focus:ring-white dark:bg-gray-800 dark:border-white
			dark:text-white dark:hover:bg-gray-700 m-1 p-2 ">
			<svg class="w-5 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
			</svg>
		</Button>
	</div>
<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden2} id="sidebar2" class="w-1/5.5 border-r-4 border-secundary-500">
<Img src={LogoFG} class="w-64 mb-4 pb-2 border-b-2 border-gray-400" alt="FourGreen Logo" />
  <Sidebar>
	  <SidebarWrapper divClass="overflow-y-auto px-0 dark:bg-gray-800">	 
		  <SidebarGroup>
			  {#each data.menu as men }
			  <SidebarItem {spanClass}>
				<svelte:fragment slot="icon">
					<a href={men.ruta} on:click={()=> (hidden2 = true)} class="text-gray-800 px-2 text-white-sm font-semibold"
						 data-sveltekit-preload-code="eager" data-placement="left">{men.item}</a>	
				</svelte:fragment>
            </SidebarItem>
			{/each}	
			<SidebarItem >
				<svelte:fragment slot="icon">
					<a href="/logout" on:click={()=> (hidden2 = true)} class="text-primary-800 px-3 text-white-sm font-semibold" 
						data-sveltekit-preload-code="eager" data-placement="left">Cerrar sesión</a>
				</svelte:fragment>
			</SidebarItem>
		</SidebarGroup>
    </SidebarWrapper>
</Sidebar>
</Drawer>
{/if}

</Sidebar>
 <slot />

