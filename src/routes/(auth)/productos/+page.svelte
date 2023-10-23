<script>
	//import { enhance } from '$app/forms';
	
	export let data;
	export let form;
	export const { productos} = data;

	let isOpen = false;

function toggleModal() {
  isOpen = !isOpen;
}


</script>

<main class="container">	
<table>
  <tr>
	<th scope="col">Producto_id</th>
	<th scope="col">Nombre</th>
	<th scope="col">Precio</th>
	<th scope="col">Accion</th>
</tr>

{#each productos as prod (prod.producto_id) }
<tbody>
	<td  >{prod.producto_id}</td>
	<td  >{prod.nombre}</td>
	<td  >{prod.precio}</td>
	<td>
		<!---------------------------------------------------------------------------Modal para editar-------->
	 <button on:click={toggleModal} class="outline"> Editar</button> 
		 {#if isOpen}
			<dialog open>
				<article>
					<header>
						<a href="#close" aria-label="Close" class="close" on:click={toggleModal}></a>
							Porfavor edite el producto!!
					</header>	
					<form method="POST" action="?/editar" >
							<input type="hidden" name="producto_id" bind:value={prod.producto_id} >	
							<input type="text" name="nombre" bind:value={prod.nombre} />
							<input type="text" name="precio"  bind:value={prod.precio}/>
							<button  on:click={toggleModal}>Cancelar</button>
							<button type="submit" >Confirmar</button>
					    </form>
					</article>
				</dialog>
				{/if}
			
			  <!-----------------Elimina el producto--------------------->
			 <div> 
			  <form method="POST" action="?/delete" >
				<input type="hidden" name="producto_id" >	
                <button type="submit"> Eliminar</button> 
				
              </form>	
			</div>
			</td>
		</tbody>
    {/each}	
	
    
    
</table>
</main>

<main class="container">
	<article>
    <form method="POST" action="?/addProd" >
	 <input type="text" name="nombre" placeholder="escribe aqui el producto" />
	 <input type="text" name="precio" placeholder="escribe aqui el precio" />
	 <button type="submit">add Productos</button>
	 
	
	 {#if form?.success}
	 <span>Agregado</span>
     {/if}
	
	</form>
	</article>
</main>


  
  
  
  










  
  




















































