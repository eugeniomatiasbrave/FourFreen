<script>
	import './style.css';
	import '../app.postcss';
	export let data;

  import { Drawer, Button, CloseButton, Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
  import { ArrowRightToBracketSolid } from 'flowbite-svelte-icons';
  import { sineIn } from 'svelte/easing';
  let hidden2 = true;
  let spanClass = 'flex-1 ms-3 whitespace-nowrap';
  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn
  };
</script>

<div class="p-4">	
<Button on:click={() => (hidden2 = false)} class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
	<svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
		<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
	</svg>
</Button>
</div>
<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden2} id="sidebar2">
  <div class="flex items-center">
    <CloseButton on:click={()=> (hidden2 = true)} class="mb-0 dark:text-white" />
  </div>
  <Sidebar>
    <SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
	 
		<SidebarGroup>
		  {#if data.usuario === undefined}
		   <SidebarItem>
			<svelte:fragment slot="icon">
			  <ArrowRightToBracketSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
			  <a href="/login" on:click={()=> (hidden2 = true)} data-sveltekit-preload-code="eager">Inciar sesión</a>
			</svelte:fragment>
		   </SidebarItem>
		  {:else}
		<SidebarGroup>
		  {#each data.menu as men }
            <SidebarItem {spanClass}>
             <svelte:fragment slot="icon">
		     	<a href={men.ruta} on:click={()=> (hidden2 = true)} data-sveltekit-preload-code="eager" data-placement="left">{men.item}</a>	
             </svelte:fragment>
            </SidebarItem>
		  {/each}	


		  <SidebarItem>
			  <svelte:fragment slot="icon">
				  <a href="/logout" on:click={()=> (hidden2 = true)} data-sveltekit-preload-code="eager" data-placement="left">Cerrar sesión</a>
			  </svelte:fragment>
			</SidebarItem>

		</SidebarGroup>
		{/if}
	  </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
</Drawer>
	


 <slot />

 