
<!--
<div>
			
	<button on:click={ModalItems} class="outline">Add items</button> 
	
	{#if isOpenItems }
	<dialog open class="">
		<article>
	<form     >  
		<div>		   
			<select name="selectedProducto" bind:value={selectedProducto} on:change={handleProductoChange} required>
			  <option selected>Productos</option>
				  {#each data.productos.datos as prod}
					<option value={prod.nombre} data-precio={prod.precio}>{prod.nombre}</option>
				  {/each}
			</select>	
			<label>Cantidad
			  <input type="text" name="selectedCantidad" bind:value={selectedCantidad} placeholder="Nº" class="w" required 
			</label>
		   
		   
			<label>Precio		
			  <input type="text" name="precio" value={precio ? precio : ''}  class="w" readonly required/>	
			</label>
			
			<div class> 
				<footer class="">	
					<button on:click={ModalItems} class="outline">Volver</button>
					<button on:click={handleItem} class="outline">Confirm Item</button>
				</footer>
			</div>
		</div>
	</form> 
</article>
  </dialog> 
  {/if}
<div>
</div>

-->