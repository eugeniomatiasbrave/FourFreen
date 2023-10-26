<script>
import '../style.css';
export let form;
</script>

	
<div class="grid">
<div></div> <!---------------------col.1-->

<div> <!---------------------------col.2  Login-->
  <main class="container">
	<article class="grid">
		<div>
			<hgroup>
				<h1>Login</h1>
				<h2>Por favor ingrese sus datos si esta logueado</h2>
			  </hgroup>
    <form method="POST" action="?/login">
	 <input type="text" name="username" placeholder="Usuario" />
	 <input type="password" name="password" placeholder="Contraseña" />
	 <button type="submit">login</button>
	{#if form?.success}
		<span>Logueado</span>
	{/if}
	

	</form>	
    </div>
  </article>	
  </main>
</div>
<div></div> <!----------------------------col.3-->
</div>


<style>
	
</style>