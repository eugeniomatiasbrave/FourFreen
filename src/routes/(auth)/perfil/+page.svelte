
<script>
export let data;
export const { perfil} = data;

let isOpen = false;

function toggleModal() {
  isOpen = !isOpen;
}

</script>

<div>
<!----------------------------------------------------------------Modal de editar Usuario-------->
<a href="#1" on:click={toggleModal}>Datos Usuario</a>
 {#if isOpen}
   <dialog open>
	<article>
		<div>
		<header>
			<a href="#close" aria-label="Close" class="close" on:click={toggleModal}></a>	
			<div>
				<h6>Datos Usuario</h6>
				<p>{perfil.nombre}</p>
				<p>{perfil.email}</p>
				<p>{perfil.creado}</p>
			</div>
		</header>	
		<button on:click={toggleModal} class="outline">Volver</button>  
		</div>
	</article>
	</dialog>
	{/if} <!----------- fin de modal editar-->

</div>

	<style>
		 p , h6 {
     margin: 0;
     padding: 0;
		}
	</style>