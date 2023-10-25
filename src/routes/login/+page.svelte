<script>
import '../style.css';
export let form;

let isOpen = false;

function toggleModal() {
  isOpen = !isOpen;
}

</script>

	
<div class="grid">
<div></div>
<!----------------------------login--------------->
<div>
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
	<!----------------------------------------------------------------Modal de Registro-------->
	<a href="#1" on:click={toggleModal}>Registrarse</a>
 {#if isOpen}
	<dialog open>
		<article>
			<div>
			<header>
				<a href="#close" aria-label="Close" class="close" on:click={toggleModal}></a>
				<h3>Registro</h3>
			</header>	
			<form method="POST" action="?/registro">
					
					<input type="text" name="username" placeholder="Usuario" />
					<input type="text" name="password" placeholder="Contraseña" />
					
					<button type="submit" class="outline">Crear Cuenta</button>
			    </form>
			</div>
		</article>
		</dialog>
		{/if}	
    </div>
  </article>	
  </main>
</div>

<div></div>
</div>



<style>
	
</style>