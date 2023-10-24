<script>
	import './style.css';
	export let data;
</script>

 <main>
  <nav class="container-fluid">
		<div><a href="/" >Showcase</a></div>
		{#if data.usuario === undefined}
		<div><a href="/login" >Login</a></div>
		{:else}
		<p>{data.usuario.nombre}</p>
		<div><a href="/productos">productos</a></div>
		<div><a href="/logout" >Logout</a></div>
		{/if}
  </nav>
</main>

<slot />



<style>
	
</style>
