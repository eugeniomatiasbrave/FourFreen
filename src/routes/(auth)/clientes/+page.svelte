<script>
import logo3 from '$lib/img/LogoFourGreen2.png';
export let data;
export const { perfil} = data;

let isOpen = false;

function toggleModal() {
  isOpen = !isOpen;
}


</script>

<main>
<h1>Clientes</h1>
<div>
	<a href="#10" on:click={toggleModal}>Datos Usuario</a>
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
		{/if} 
	</div>
	

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
	
	






   
	

