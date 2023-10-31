<script>


export let data;
export let form;
export const {productos, clientes}=data;

const pedidos = [{
	f_ingeso: "",
	f_entrega: "",
	pedido_id: "random",
	cliente: "",
    producto_id: "",
    cantidad: "",
    precio_ud: 300,
    valor_compra: "",
    check: true
}];

</script>

<svelte:head>
	<title>Pedidos</title>
	<meta name="description" content="Pedidos" />
</svelte:head>

<h2>Gestion de Pedidos</h2>
<main>
 <article>
  <form method="POST" action="?/addPedidos">
   <table role="grid">
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

<tbody>		
	<tr>
	<td><input type="date" id="date" name="date1" ></td>
	<td><input type="date" id="date" name="date2" ></td>
	<td><input type="text" name="#Pedido"/></td>
	<td><select id="fruit" required>
		<option value="" selected>Select cliente</option>
		<option>…</option>
	  </select></td>
	  <td><select id="fruit" required>
		<option value="" selected>Select producto</option>
		<option>…</option>
	  </select></td>
	<td><input type="text" name="cantidad"   /></td>
	<td><input type="text" name="precio"   /></td>
	<td><input type="text" name="subtotal"  /></td>
	<td><button type="submit">add</button></td>
	<td></td>
	</tr>
	</tbody>
	
 <!---{#each filteredProductos as prod}--->
 <tbody>
	<tr>
    <td>7/7/2023</td>
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

   <!---{/each}---->  
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
</form>
</article>

</main>

<style>

	
</style>
