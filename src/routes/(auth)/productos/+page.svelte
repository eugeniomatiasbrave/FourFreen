<script>
export let data;
export let form;
export const { productos} = data;

let isOpen = false;

function toggleModal() {
  isOpen = !isOpen;
}

let selectedProducto;
let selectedNombre;
let selectedPrecio;

</script>

<main>	

  
  <table class="container">
  <tr>
	<th>Producto_id</th>
	<th>Nombre</th>
	<th>Precio</th>
	<th>Accion</th>
</tr>

{#each productos as prod}
<tbody>
	<tr>
	<td>{prod.producto_id}</td>
	<td>{prod.nombre}</td>
	<td>{prod.precio}</td>
	<td>
		<!---------------------------------------------------------------------------Modal para editar-------->
		<button on:click={()=>{ 
			selectedProducto=prod.producto_id;
			selectedNombre=prod.nombre;
			selectedPrecio=prod.precio;
			toggleModal();}} class="outline">Editar</button>

		 {#if isOpen}
			<dialog open>
				<article>
					<header>
						<a href="#close" aria-label="Close" class="close" on:click={toggleModal}></a>
							Porfavor edite el producto!!
					</header>	
					<form method="POST" action="?/editar">
							<input type="hidden" name="producto_id" bind:value={selectedProducto}>	
							<input type="text" name="nombre" placeholder={selectedNombre}/>
							<input type="text" name="precio" placeholder={selectedPrecio}/>
							<button on:click={toggleModal}>Cancelar</button>
							<button type="submit">Confirmar</button>
					    </form>
				</article>
				</dialog>
				{/if}
			
<!----------------------------------Elimina el producto--------------------->
			  <form method="POST" action="?/delete" on:submit={()=>{selectedProducto=prod.producto_id;}}>
				<input type="hidden" name="producto_id" bind:value={selectedProducto}>	
                <button type="submit">Eliminar</button> 	
              </form>	
			</td>
		  </tr>
		</tbody>
      {/each}	
   </table>


	
	<div class="container">
    <form method="POST" action="?/addProd" >
	 <input type="text" name="nombre" placeholder="escribe aqui el producto" />
	 <input type="text" name="precio" placeholder="escribe aqui el precio" />
	 <button type="submit">add Productos</button>
	 {#if form?.success}
	 <span>Agregado</span>
     {/if}
	</form>
   </div>
	
 

</main>


  
  
  
  










  
  




















































