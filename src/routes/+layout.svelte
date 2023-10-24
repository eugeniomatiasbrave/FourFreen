<script>
	import './style.css';
	export let data;
</script>

<nav>
	<ul>
	  <li><strong>Brand</strong></li>
	</ul>
	<ul>
	  <li>
		<ul>
			<li><a href="/" >Showcase</a></li>
			{#if data.usuario === undefined}
			<li><a href="/login" >Login</a></li>
			{:else}
			<li><a href="/productos">Productos</a></li>
			<li><a href="/pedidos">Pedidos</a></li>
			<li><a href="/clientes">Clientes</a></li>
			<li><a href="/logout" >Logout</a></li>
			{/if}
		</ul>
	  </li>
	</ul>
  </nav>
  
	
	  
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	  

<slot />



<style>
	
</style>
