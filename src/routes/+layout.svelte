<script>	
	import './style.css';
	export let data;
</script>
<nav>
	<a href="/">Home</a>	  
	  {#if data.usuario === undefined}
		  <a href="/login">Login</a>
	  {:else}
	       <ul>
			  {#each data.menu as {item, icono, tooltip, ruta} }		  
			  <li>				  
				  <a href={ruta}  data-tooltip="{tooltip}" data-placement="left">{item}</a>
			  </li>	
			  {/each}
			  <a href="/logout">Logout</a>
		  </ul>
	  {/if}
  </nav>

<slot/>


























































