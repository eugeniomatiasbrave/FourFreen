<script>
	export let form;
</script>

<form method="POST">
	<p>Está seguro que quiere salir</p>
	<button type="submit">Logout</button>
	{#if form?.success}
		<span>Logueado</span>
	{/if}
</form>
