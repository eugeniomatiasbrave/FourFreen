<script>
	export let form;
</script>

<svelte:head>
	<title>Logout</title>
	<meta name="description" content="Logout" />
</svelte:head>

<div class="grid">
	<div></div>

<div>
  <main class="container">
  <article>
   <form method="POST">
	<p>Está seguro que quiere salir</p>
	<button type="submit">Logout</button>
	{#if form?.success}
		<span>Logueado</span>
	{/if}
</form>
</article>
</main>
</div>

<div></div>

</div>

<style>
	article{
		max-width: 600px;
	}
</style>