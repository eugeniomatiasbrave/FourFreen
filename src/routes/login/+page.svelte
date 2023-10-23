<script>
	export let form;
</script>


<main class="container">
	<article>
    <form method="POST">
	 <input type="text" name="username" placeholder="Usuario" />
	 <input type="password" name="password" placeholder="Contraseña" />
	 <button type="submit">login</button>
	{#if form?.success}
		<span>Logueado</span>
	{/if}
	</form>
	</article>
</main>