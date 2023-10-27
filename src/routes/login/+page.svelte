<script>
import '../style.css';
export let form;
</script>

	
 <!---------------------------col.2  Login-->
  <main class="container">
	<article>
	  <div>
		<hgroup>
			<h1>Login</h1>
			<h2>Por favor ingrese sus datos si esta logueado</h2>
		</hgroup>
        <form method="POST" >
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





<style>
	
	
	

 

</style>