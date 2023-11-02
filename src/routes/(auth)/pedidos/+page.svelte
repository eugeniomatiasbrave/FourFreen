<script>
	export let data;
	export let form;
	export const { productos, clientes } = data;
  
	let selectedRazonSocial;
	let selectedProducto;
	let selectedCantidad;
	let precio;
	let formData = [];
  
	function handleProductoChange(event) {
	  const selectedIndex = event.target.selectedIndex;
	  const selectedOption = event.target.options[selectedIndex];
	  precio = selectedOption.getAttribute('data-precio');
	}
  
	function handleSubmit(event) {
	  event.preventDefault();
	  const newFormData = {
		date: event.target.date.value,
		date2: event.target.date2.value,
		pedido_id: event.target.pedido_id.value,
		selectedRazonSocial,
		selectedProducto,
		selectedCantidad,
		precio,
		subtotal: selectedCantidad * precio,
	  };
	  formData = [...formData, newFormData];
	  console.log(formData);
 

	}
  </script>
  
  <svelte:head>
	<title>Pedidos</title>
	<meta name="description" content="Pedidos" />
  </svelte:head>
  
  <h2>Gestion de Pedidos</h2>
  
  <main>
	<article class="container">
	  <form method="POST" on:submit={handleSubmit}>
		<input type="text" name="date" value={new Intl.DateTimeFormat('es', { day: 'numeric', month: 'numeric', year: 'numeric' }).format(new Date())}>
		<input type="date" name="date2">
		<input type="text" name="pedido_id" value={Math.floor((Math.random() * (10000 - 1)) + 1)} />
		<select name="selectedRazonSocial" bind:value={selectedRazonSocial} required>
		  <option selected>Clientes</option>
		  {#each data.clientes as cli}
			<option value={cli.razon_social}>{cli.razon_social}</option>
		  {/each}
		</select>
		<select name="selectedProducto" bind:value={selectedProducto} on:change={handleProductoChange} required>
		  <option selected>Productos</option>
		  {#each data.productos as prod}
			<option value={prod.nombre} data-precio={prod.precio}>{prod.nombre}</option>
		  {/each}
		</select>
		<input type="text" name="selectedCantidad" bind:value={selectedCantidad} required />
		<input type="text" name="precio" value={precio} readonly />
		<input type="text" name="subtotal" value={selectedCantidad * precio} readonly />
		<button type="submit">add</button>
	  </form>
  
	  <table role="grid" class="container">
		<thead>
		  <tr>
			<th scope="col">Fecha</th>
			<th scope="col">Fecha2</th>
			<th scope="col">Pedido ID</th>
			<th scope="col">Cliente</th>
			<th scope="col">Producto</th>
			<th scope="col">Cantidad</th>
			<th scope="col">Precio</th>
			<th scope="col">SubTotal</th>
			<th scope="col">Acción</th>
			<th scope="col">Acción2</th>
			<th scope="col">Entregado</th>
		  </tr>
		</thead>
		<tbody>
		  {#each formData as formD }
			<tr>
			  <td>{formD.date}</td>
			  <td>{formD.date2}</td>
			  <td>{formD.pedido_id}</td>
			  <td>{formD.selectedRazonSocial}</td>
			  <td>{formD.selectedProducto}</td>
			  <td >{formD.selectedCantidad}</td>
			  <td >{formD.precio}</td>
			  <td >{formD.subtotal}</td>
			  <td><button type="submit">Editar</button></td>
			  <td><button type="submit">Eliminar</button></td>
			  <td>
				<label for="switch">
				  <input type="checkbox" id="switch" name="switch" role="switch">
				</label>
			  </td>
			</tr>
		  {/each}
		</tbody>
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
			<td></td>
			<td></td>
		  </tr>
		</tfoot>
	  </table>
	</article>
  </main>
  
  <style>
	
  </style>