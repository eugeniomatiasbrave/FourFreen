<script>

export let data;
export let form;
export const { productos, clientes}=data;



let selectedProdPrecio;
let selectedCantidad;

</script>

<svelte:head>
	<title>Pedidos</title>
	<meta name="description" content="Pedidos" />
</svelte:head>

<h2>Gestion de Pedidos</h2>

<main>
 <article>
<article class="container">
	<form method="POST" >
	
		<input type="date" name="date">
		<input type="date" name="date2">
		<input type="text" name="pedido" value={Math.floor((Math.random()*(10000-1))+1)}/>
		
		<select name="razon_social" id="clentes" required>
			<option selected>Clientes</option>
			{#each data.clientes as cli}
			  <option value={cli.id}>
				<li>{cli.razon_social}</li>
				</option>
			{/each}
		</select>

		 <select bind:value={selectedProdPrecio} required>
			<option>Productos</option>
			{#each data.productos as prod}
			<option selected value={prod.precio} >
				{prod.nombre}
			</option>
			{/each}
		
		 </select>
		<input type="text" name="cantidad" bind:value={selectedCantidad} required />
		<input type="text" name="precio" value={selectedProdPrecio} required />
		<input type="number" name="subtotal" value={selectedCantidad*selectedProdPrecio} />
		<button type="submit">add</button>
	</form>
</article>

   <table role="grid" class="container">
    <thead>
     <tr>
	<th scope="col">F_Ing.</th>
	<th scope="col">F_Entrega.</th>
	<th scope="col">#Pedido_id</th>
	<th scope="col">Cliente</th>
	<th scope="col">Producto</th>
	<th scope="col">Cantidad</th>
	<th scope="col">Precio</th>
	<th scope="col">SubTotal</th>
	<th scope="col">Accion</th>
	<th scope="col">Accion2</th>
	<th scope="col">Entregado</th>
  </tr>
</thead>

<!---- {#each data as dat}---->
 <tbody>
	<tr>
    <td>1</td>
	<td>7/7/2023</td>
	<td>#54776</td>
	<td>cliente</td>
	<td>Lechuga</td>
	<td>2</td>
	<td>$ 300</td>
	<td>$ 600</td>
    <td><button type="submit">Editar</button></td>
	<td><button type="submit">Eliminar</button></td>
	<td><label for="switch">
		<input type="checkbox" id="switch" name="switch" role="switch">
		</label>
	</td>
	</tr>
	</tbody>

   <!----{/each}-->
   <tfoot>
    <tr>
      <th scope="col"></th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>Total</td>
	  <td>Total</td>
	  <td>Total</td>
	  <td>Total</td>
	  <td></td>
    </tr>
  </tfoot> 	
   </table>

</article>

</main>

<style>

	
</style>
