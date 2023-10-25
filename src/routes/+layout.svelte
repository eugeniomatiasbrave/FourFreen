<script>
	
	import './style.css';
	import logo from '$lib/img/LogoFourGreens2021.png';
	export let data;
</script>

<nav class="grid">
	<div>
	<ul>
	  <li><a href="#1"><img src={logo} alt='logo1' width="25%"/></a></li>
	</ul>
   </div>
   <div>
	<ul>
	  <li >
		<ul >
			<li class="menu"><a href="/" >Showcase</a></li>
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
  </div>
  </nav>


<slot />

<style>
	img , ul , li {
		padding: 0;
		margin: 0;
	}
	
.menu , li {
	margin: 0 20px 0 20px ;
}

</style>




