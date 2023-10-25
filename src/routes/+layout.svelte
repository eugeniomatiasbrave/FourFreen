<script>
	import './style.css';
	import logo from '$lib/img/LogoFourGreens2021.png';
	export let data;
</script>

<nav>
	<ul>
	  <li><a href="#1"><img src={logo} alt='logo1' width="25%"/></a></li>
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
	img{
		padding: 0;
		margin: 0;
	}
</style>




