<script>
	import '../style.css';
	export let form;
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login" />
</svelte:head>

<main class="container">
	<article class="login">
		<div>
			<hgroup>
				<h1>Login</h1>
				<h2>Por favor ingrese sus datos</h2>
			</hgroup>
			<form method="POST">
				<input type="text" name="username" placeholder="Usuario" required />
				<input type="password" name="password" placeholder="Contraseña" required />
				<button type="submit">login</button>
				{#if form?.success}
					<span>Logueado</span>
				{/if}
			</form>
		</div>
	</article>
</main>

<style>


.container {
	display: flex;
	justify-content: center;
	align-items: center;
}

.login{
	width: 400px;	
}
</style>
