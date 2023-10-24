<script>
	import '../style.css';
	export let form;
</script>

	
<div class="grid">
<div></div>

<!-----------login--------------->
<div>
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
	<a href="">Registrarse</a>
	</article>	
  </main>
</div>

<div></div>
</div>



<style>
	
</style>