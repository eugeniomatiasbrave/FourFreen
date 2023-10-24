<script>
	import '../style.css';
	export let form;
</script>

	
<div class="grid">
<div></div>

<!-----------login--------------->
<div>
  <main class="container">
	<article class="grid">
		<div>
			<hgroup>
				<h1>Sign in</h1>
				<h2>A minimalist layout for Login pages</h2>
			  </hgroup>
    <form method="POST">
	 <input type="text" name="username" placeholder="Usuario" />
	 <input type="password" name="password" placeholder="Contraseña" />
	 <button type="submit">login</button>
	{#if form?.success}
		<span>Logueado</span>
	{/if}
	</form>
	<a href="">Registrarse</a>
 </div>
	
	</article>	
  </main>
</div>

<div></div>
</div>



<style>
	
</style>