<script>
	export let data;
</script>

<nav>
	<a href="/">Showcase</a>
	{#if data.usuario === undefined}
		<a href="/login">Login</a>
	{:else}
		<p>{data.usuario.nombre}</p>
		<a href="/productos">productos</a>
		<a href="/logout">Logout</a>
	{/if}
</nav>

<slot />
