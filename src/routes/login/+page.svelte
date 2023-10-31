<script>
 import '../style.css';
 export let form;
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login"/>
</svelte:head>
 <!---------------------------col.2  Login-->
  <main class="container">
	<article>
	  <div>
		<hgroup>
			<h1>Login</h1>
			<h2>Por favor ingrese sus datos si esta logueado</h2>
		</hgroup>
        <form method="POST" >
	     <input type="text" name="username" placeholder="Usuario" required/>
	     <input type="password" name="password" placeholder="Contraseña" required/>
	     <button type="submit">login</button>
	     {#if form?.success}
		 <span>Logueado</span>
		
	     {/if}
	    </form>	
      </div>
   </article>	
  </main>

<style>
	

</style>