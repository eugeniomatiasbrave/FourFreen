<script>
	
	import './style.css';
	import logo from '$lib/img/LogoFourGreens2021.png';
	export let data;
</script>

<nav class="grid">
	<div>
	  <a href="#1"><img src={logo} alt='logo1' width="25%"/></a>
    </div>
    <div>
		<a href="/" >Showcase</a>
		{#if data.usuario === undefined}
		<a href="/login">Login</a>
		{:else}
		<a href="/productos">Productos</a>
		<a href="/pedidos">Pedidos</a>
		<a href="/clientes">Clientes</a>
		<a href="/logout">Logout</a>
		{/if}	
    </div>
  </nav>

<slot/>

<style>


</style>




