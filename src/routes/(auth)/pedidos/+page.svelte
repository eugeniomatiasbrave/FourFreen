<script>
	export let data;
	export let form;
	export const {productos,clientes}=data;
    
	console.log(form)

    let isOpen=false;
	let selectedDate2;
    let selectedPedido_id;
	let selectedEditCantidad;
	let selectedRazonSocial;//seleccionan en el add
	let selectedProducto;
	let selectedCantidad;
	let precio;


	let formData=[
		{
		date: "7/7/2023",
		date2:"9/7/2023",
		pedido_id:1 ,
		selectedRazonSocial:"El ceibo sa",
		selectedProducto: "Lechuga azul",
		selectedCantidad: 2,
		precio:300,
		subtotal:600 
	    },{
		date: "8/7/2023",
		date2:"10/7/2023",
		pedido_id:2 ,
		selectedRazonSocial:"El Tilo sa",
		selectedProducto: "Repollo",
		selectedCantidad: 2,
		precio:300,
		subtotal:600 
	  }
	];
  
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

    function toggleModal() {
    isOpen = !isOpen;
    }

  </script>
  
  <svelte:head>
	<title>Pedidos</title>
	<meta name="description" content="Pedidos" />
  </svelte:head>
  
  <h2>Gestion de Pedidos</h2>
  
  <main class="container">

  <article>
	<form method="POST" action="?/addPedido"  on:submit={handleSubmit}>
	<table>
		<thead>
		  <tr>
			<th>Fecha</th>
			<th>Fecha2</th>
			<th>Pedido ID</th>
			<th>Cliente</th>
			<th>Producto</th>
			<th>Cantidad</th>
			<th>Precio</th>
			<th>SubTotal</th>
			<th>Acción</th>
		  </tr>
		</thead>		
		<tbody>
		  <tr>
			<td>
			  <input type="text" name="date" value={new Intl.DateTimeFormat('es',{day:'numeric',month:'numeric',year:'numeric'}).format(new Date())}>
			</td>
			<td>
			  <input type="date" name="date2">
			</td>
			<td>
			  <input type="text" name="pedido_id" value={Math.floor((Math.random() * (10000 - 1)) + 1)} />
			</td>
			<td>
			  <select name="selectedRazonSocial" bind:value={selectedRazonSocial} required>
				<option selected>Clientes</option>
				{#each data.clientes as cli}
				  <option value={cli.razon_social}>{cli.razon_social}</option>
				{/each}
			  </select>
			</td>
			<td>
			  <select name="selectedProducto" bind:value={selectedProducto} on:change={handleProductoChange} required>
				<option selected>Productos</option>
				{#each data.productos as prod}
				  <option value={prod.nombre} data-precio={prod.precio}>{prod.nombre}</option>
				{/each}
			  </select>
			</td>
			<td>
			  <input type="text" name="selectedCantidad" bind:value={selectedCantidad} required />
			</td>
			<td>
			  <input type="text" name="precio" value={precio} readonly />
			</td>
			<td>
			  <input type="text" name="subtotal" value={selectedCantidad * precio} readonly />
			</td>
			<td>
			  <button type="submit">add</button>
			</td>
		  </tr>
		</tbody>	
	  </table>  
	</form>
	  <table role="grid" >
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
			  <td>{formD.selectedCantidad}</td>
			  <td>{formD.precio}</td>
			  <td>{formD.subtotal}</td>
			  <td>

				<button on:click={()=>{   //<!-----------------------------------------Modal para editar-------->
					selectedPedido_id=formD.pedido_id;
					selectedDate2=formD.date2;
					selectedEditCantidad=formD.cantidad;
					toggleModal()}} class="outline">Editar</button>
				 {#if isOpen}
					<dialog open>
						<article>
							<div>
							<header>
								<a href="#close" aria-label="Close" class="close" on:click={toggleModal}></a>
									<p>Porfavor edite el producto!!</p>
							</header>	
							<form method="POST" action="?/editar">
									<input type="hidden" name="pedido_id" bind:value={selectedPedido_id} required>	
									<input type="text" name="date2" value={selectedDate2} required/>
									<input type="text" name="cantidad" value={selectedEditCantidad} required/>
									<footer>
										<button on:click={toggleModal}  class="secondary">Cancel</button>
										<button type="submit" >Confirm</button>
									</footer>  		
								</form>
							</div>
						</article>
						</dialog>
						{/if}

			  </td>
			  <td>
				<form method="POST" action="?/delete" on:submit={()=>{selectedPedido_id=formD.pedido_id}}  >
					<input type="hidden"  name="pedido_id" bind:value={selectedPedido_id}>	
					<button type="submit">Eliminar</button> 
				  </form>	
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
  tr,
  td,
  th,
  input,
  select,
  option,
  button {
    font-size: 15px;
    margin: 0;
    padding: 0;
    border: none;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    padding: 8px;
    text-align: left;
  }

  thead th {
    background-color: #f2f2f2;
  }

  tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tfoot th {
    text-align: right;
  }

  button {
    cursor: pointer;
  }

  input[type="text"],
  input[type="date"],
  select {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 6px;
	height: 40px;
  }
</style>
 