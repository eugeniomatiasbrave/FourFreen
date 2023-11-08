<script>
	export let data;
	export let form;
	export const { productos, clientes } = data;

	console.log(form);

	let isOpen = false;
	let isOpenDel=false;
	let isOpenAdd=false;

	let selectedDate2;
	let selectedPedido_id;
	let selectedRazonSocial; //seleccionan en el add
	let selectedProducto;
	let selectedCantidad;
	let precio;
	let selectedEditCantidad;

	let formData = 
		        [ { 
		          pedido_id: 1,
		          date: "7/7/2023",
			      date2: '9/7/2023',
		          selectedRazonSocial: 'El ceibo sa',
		          item:{  
			            selectedProducto: 'Lechuga azul',
			            selectedCantidad: 2,
			            precio: 300
					    }
				 },
				{ 
                pedido_id: 2,
                date: "9/7/2023",
                date2: '10/7/2023',
                selectedRazonSocial: 'El Apio sa',
                item:{  
                      selectedProducto: 'Pala',
                      selectedCantidad: 2,
                      precio: 500
		              }
	               }
               ]      
            


function ModalAdd() {
  isOpenAdd = !isOpenAdd;
}

function toggleModal() {
	isOpen = !isOpen;
}

function ModalDelete() {
  isOpenDel = !isOpenDel;
}

function handleProductoChange(event) {
	const selectedIndex = event.target.selectedIndex;
	const selectedOption = event.target.options[selectedIndex];
	precio = selectedOption.getAttribute('data-precio');
	}

function handleSubmit(event) {
	event.preventDefault();
	const newFormData = {
		    pedido_id: event.target.pedido_id.value,
			date: event.target.date.value,
			date2: event.target.date2.value,	
			selectedRazonSocial,
			item: { selectedProducto,
			           selectedCantidad,
			           precio
					}	
		    };
		formData = [...formData, newFormData];
		console.log(formData);

    selectedPedido_id = Math.floor(Math.random()*(10000-1)+1); 
    selectedRazonSocial = 'Clientes';
    selectedProducto = 'Productos';
    selectedCantidad = '';
    precio = '';
		
	}

</script>

<svelte:head>
	<title>Pedidos</title>
	<meta name="description" content="Pedidos" />
</svelte:head>

<h2>Gestion de Pedidos</h2>

<main class="container-fluid pedi-main">
  <article>
	  <div> <!----------------Form add------------------->
		<button on:click={ModalAdd} class="outline">Add</button>
		{#if isOpenAdd}

	    <dialog open class="">
		 <article>		
		  <div>	
					
	       <form method="POST" action="?/addPedido" on:submit={handleSubmit} class="w-2">
								
            
			<div class=""> <!-------Row cabecera del form-----------------> 
              
             <div>
				<label >Nº Pedido
					<input type="text" name="pedido_id" value={Math.floor(Math.random()*(10000-1)+1)} class="w"/>
				   </label>
				</div>

               <div>
			       <label>Fecha
				     <input type="text"  name="date" value={new Intl.DateTimeFormat('es',{day: 'numeric',month: 'numeric',year: 'numeric'}).format(new Date())} class="w"/>
				    </label>

				    <label >Fecha de entrega
				     <input type="date" name="date2"/>
				    </label>
			    </div>

				   <div>
				  <select name="selectedRazonSocial" bind:value={selectedRazonSocial} required>
					<option selected>Clientes</option>
						{#each data.clientes as cli}
						  <option value={cli.razon_social}>{cli.razon_social}</option>
						{/each}
				  </select>
				</div>
				
			<div class=""> <!-------Row detalle del form----------------->
                  <div>
				  <select name="selectedProducto" bind:value={selectedProducto} on:change={handleProductoChange} required>
					<option selected>Productos</option>
						{#each data.productos.datos as prod}
						  <option value={prod.nombre} data-precio={prod.precio}>{prod.nombre}</option>
						{/each}
				  </select>	

				  <label>Cantidad
				    <input type="text" name="selectedCantidad" bind:value={selectedCantidad} class="w" required />
				  </label>
				</div>

				<div>
				  <label>Precio		
				    <input type="text" name="precio" value={precio} class="w" readonly />	
				  </label>

				</div>
			</div>
		</div>

		<div>
			<button >Agregar</button>
		</div>
				   
			<div>	<!------Row descripcion pedido----------------->
			 <div id="Area-pedido"> 
			
			 </div>
		   </div>
                 
            <div class> <!-------Row footer del form----------------->
				<footer class="">	
					 <button on:click={ModalAdd} class="outline">Cancel</button>
                     <button type="submit" class="outline">Confirm</button>
				</footer>
		    </div>

		</form>

	</div>
  </article>
</dialog>
	
{/if}
		   
</div>  <!-------------fin de form add-->

		<table role="grid">
			<thead>
				<tr>
					<th scope="col">Pedido ID</th>
					<th scope="col">Fecha</th>
					<th scope="col">Fecha2</th>			
					<th scope="col">Cliente</th>
					<th scope="col">Producto</th>
					<th scope="col">Cantidad</th>
					<th scope="col">Precio</th>
					<th scope="col">Acción</th>
					<th scope="col">Acción2</th>
					<th scope="col">Entregado</th>
				</tr>
			</thead>
			<tbody>
				{#each formData as formD}
					<tr>
						<td>{formD.pedido_id}</td>
						<td>{formD.date}</td>
						<td>{formD.date2}</td>	
						<td>{formD.selectedRazonSocial}</td>
						<td>{formD.item.selectedProducto}</td>
						<td>{formD.item.selectedCantidad}</td>
						<td>{formD.item.precio}</td>
						<td>
							<button
								on:click={() => {
									//<!-----------------------------------------Modal para editar-------->
									selectedPedido_id = formD.pedido_id;
									selectedDate2 = formD.date2;
									selectedEditCantidad = formD.detalle.cantidad;
									toggleModal();
								}}
								class="outline">Editar</button>
							{#if isOpen}
								<dialog open>
									<article>
										<div>
											<header>
												<a href="#close" aria-label="Close" class="close" on:click={toggleModal} />
												<p>Porfavor edite el producto!!</p>
											</header>
											<form method="POST" action="?/editar">
												<input
													type="hidden"
													name="pedido_id"
													bind:value={selectedPedido_id}
													required
												/>
												<input type="text" name="date2" value={selectedDate2} required />
												<input type="text" name="cantidad" value={selectedEditCantidad} required />
												<footer>
													<button on:click={toggleModal} class="secondary">Cancel</button>
													<button type="submit">Confirm</button>
												</footer>
											</form>
										</div>
									</article>
								</dialog>
							{/if}
						</td>
						<td>
							<button on:click={()=>{   //<!-----------------------------------------Modal para elimanar-------->
								selectedPedido_id = formD.pedido_id;
								ModalDelete()}} class="outline">Eliminar</button>
							 {#if isOpenDel}
								<dialog open>
									<article>
										<div>
										<header>
											<a href="#close" aria-label="Close" class="close" on:click={ModalDelete}></a>
												<p>Porfavor confirmar la eliminacion el producto!!</p>
										</header>	
																										
									<form method="POST" action="?/delete"
										  on:submit={() => {selectedPedido_id = formD.pedido_id;}}>
										<input type="hidden" name="pedido_id" bind:value={selectedPedido_id} />
										<button on:click={ModalDelete}  class="outline">Cancel</button>
										<button type="submit" class="outline">Confirmar</button> 
									</form>												
								</div>
									</article>
									</dialog>
									{/if}		
						</td>
						<td>
						  <label for="switch">
						   <input type="checkbox" id="switch" name="switch" role="switch" />
						  </label>
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<th scope="col" />
					<td />
					<td />
					<td />
					<td />
					<td>Total</td>
					<td>Total</td>
					<td />
					<td />
				</tr>
			</tfoot>
		</table>
	</article>
</main>

<style>
	.pedi-main {
		padding: 0 200px 0 200px;
	}
	
article{
	background-color: rgb(241, 241, 241);
} 
	tr,
	td,
	th,
	input,
	select,
	option,
	button, p , label{
		font-size: 15px;
		margin: 0;
		padding: 0;	
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

	input[type='text'],
	input[type='date'] {
		border: 1px solid #c5c3c3;
        border-radius: 4px;
        padding: 6px;
        height: 40px;
		background-color: #fdf9f9;
	   }


	select {
		border: 1px solid #a8a7a7;
		border-radius: 4px;
		padding: 6px;
		height: 40px;
		background-color: #f1f1f1;
	}

	.w {
		width: 100px;
	} 

	.w-2{
		width: 600px;
	}

	#Area-pedido{
		background-color: rgb(253, 251, 251);
        height: 200px;
		border: 1px solid #4e4e4e;
		border-radius: 4px;
	
	}

	
</style>
