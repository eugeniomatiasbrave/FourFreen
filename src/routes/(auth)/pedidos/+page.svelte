<script>
import logo3 from '$lib/img/LogoFourGreen2.png';
	
</script>


<h1>Pedidos</h1>


<main >
<article class="container">
  <table role="grid">
	<thead>
  <tr>
	<th scope="col">Img</th>
	<th scope="col">#Pedido</th>
	<th scope="col">Producto</th>
	<th scope="col">Cantidad</th>
	<th scope="col">Precio</th>
	<th scope="col">SubTotal</th>
	<th scope="col">Check</th>
	<th scope="col">Accion</th>
  </tr>
</thead>
 <!---{#each filteredProductos as prod}--->
 <tbody>
	<tr>
	<th scope="row"><img src={logo3} alt='logo3' width="25%"/></th>
	<td>#54776</td>
	<td>Lechuga</td>
	<td>2</td>
	<td>$ 300</td>
	<td>$ 600</td>
	<td>Check</td>
    <td>Accion</td>
	</tr>
	</tbody>
   <!---{/each}---->  
   <tfoot>
    <tr>
      <th scope="col"></th>
      <td >Total</td>
      <td >Total</td>
      <td >Total</td>
      <td >Total</td>
      <td >Total</td>
	  <td >Total</td>
	  <td >Total</td>
    </tr>
  </tfoot> 	
   </table>
</article>
</main>

<style>

	
</style>
