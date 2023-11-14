<script >
	export let data;
	export let form;
	
	export const { pedidos, productos, clientes} = data;


let items=[];
	
console.log(form)
console.log(pedidos.datos);
	
let isOpenAdd = false;


function handleProductoChange(event) {
const selectedIndex = event.target.selectedIndex;
const selectedOption = event.target.options[selectedIndex];
precio = selectedOption.getAttribute('data-precio');
}

// ------------------------variables cabecera-----
  let cliente_id;
  let fecha = new Date().toISOString();
// ------------------------variables detalle items
  let unidades;
  let producto_id;
  let precio;
   
  function handleAdd(event) {
    event.preventDefault();

  const newItem = {
       producto_id,
       unidades,
       precio,
     };
       items= [...items, newItem];
	console.log(items)
  }


function ModalAdd() {
  isOpenAdd=!isOpenAdd;
}



</script>

	
	<svelte:head>
	<title>Pedidos</title>
	<meta name="description" content="Pedidos" />
	</svelte:head>

	
	
	
<h2>Gestion de Pedidos</h2>
<main class="container-fluid pedi-main">
  <article> <!--articule general-->

	<div>		
		{#if form?.success}
		  <span style="background-color: greenyellow;">{form.message}</span>
		{/if}
	   </div>
	<div> <!-------modal add-------------->
	   <button on:click={ModalAdd} class="outline">Add</button>

	{#if isOpenAdd}		
	    <dialog open >
		 <article>		
		  	
			<form  method="POST" action="?/addPedido">       	 
                <div > <!---------------------cabecera-------------->
				   <div>
					  <select  name="cliente_id"  bind:value={cliente_id} required>
						<option selected>cliente_id</option>
						{#each clientes as cli}
						<option  value={cli.cliente_id}>{cli.cliente_id} - {cli.razon_social}</option>
						{/each}
						</select>
					</div>
					<div>
						<label>Fecha
						<input type="text" name="fecha" bind:value={fecha} />
						</label>
					</div>
			    </div> <!---------------------fin cabecera-------------->
			       <div> <!--revisar luego siesta demas-->
						  <div >	<!----------- detalles items-------------->   
							<input type="hidden" name="items" value={JSON.stringify( items = items.map(item => ({
							                                       	...item,
								                                     precio: Number(item.precio)
							                                            }))
							    )}>
							<select  bind:value={producto_id} on:change={handleProductoChange} required>
							<option selected>Productos</option>
							{#each productos.datos as prod}
							<option value={prod.producto_id} data-precio={prod.precio}>{prod.producto_id} - {prod.nombre}</option>
							{/each}
							</select>	
							<label>Unidades
							<input type="number"  bind:value={unidades} required />
							</label>   
							<label>Precio		
							<input type="text" bind:value={precio} class="w" readonly required/>	
							</label>
						  </div>					 
						  <div>	  
						     <button  on:click={handleAdd} class="outline">Add item</button>	
					      </div>	
						
					   <div id="Area-pedido">	<!-------Area items-------------->
						 <table role="grid">  <!-------Table-------------->
							<thead>
								<tr>
									<th scope="col">Producto_id</th>
									<th scope="col">Unidades</th>
									<th scope="col">Precio</th>
								</tr>
							</thead>
						     <tbody>	
								{#each items as item (item.producto_id)}
								<tr>
								 <td>{item.producto_id}</td>
								 <td>{item.unidades}</td>
								 <td>{item.precio}</td>
							    </tr>
								{/each}
							</tbody>
						 </table>
					   </div> <!-------fin Area items-------------->					
					   <div>	  
						<button on:click={ModalAdd} class="outline">Cancelar</button>
						<button  class="outline">Reset</button>
						<button  type="submit" class="outline">Add Pedido</button>		
					  </div>
				</form>	
				
	 </article>
   </dialog>
 {/if}
    </div> <!-----------fin de modal add-------------->
<table role="grid">  <!-------Table-------------->
			<thead>
				<tr>
					<th scope="col">pedido_cab_id</th>
					<th scope="col">cliente_id</th>
					<th scope="col">Cliente</th>
					<th scope="col">Fecha</th>			
					<th scope="col">ped_est_id</th>
					<th scope="col">ped_est_nomb</th>
					<th scope="col">editar</th>
					<th scope="col">eliminar</th>
					<th scope="col">us_id</th>
					<th scope="col">items</th>
					<th scope="col">Detalle</th>
					<th scope="col">total_uni</th>
					<th scope="col">total</th>
				</tr>
			</thead>
			<tbody>
				{#each pedidos.datos as pe}
					<tr>
                        <td>{pe.pedido_cab_id}</td>
						<td>{pe.cliente_id}</td>
						<td>{pe.razon_social}</td>
						<td>{pe.fecha}</td>	
						<td>{pe.pedido_estado_id}</td>
						<td>{pe.pedido_estado_nombre}</td>
						<td>{pe.editar}</td>
						<td>{pe.eliminar}</td>
						<td>{pe.usuario_id}</td>
						<td>{pe.items}</td>
						<td>
						<button class="outline"><a href={`/pedidos/${pe.pedido_cab_id}`} style="color:white;"> Detalle:{pe.pedido_cab_id}</a></button>

						</td> <!--detalle pedido-->
						<td>{pe.total_unidades}</td>
						<td>{pe.total_importe}</td>		
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
					<td />
					<td />
                    <td />
					<td/>
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
	button, label {
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

	input[type='number'],
	input[type='text']
	 {
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
/*
	.w-2{
		width: 600px;
	}
*/
	#Area-pedido{
		background-color: rgb(253, 251, 251);
		max-height: 300px;
		border: 1px solid #4e4e4e;
		border-radius: 4px;
		overflow: scroll;
			
	}	
</style>
