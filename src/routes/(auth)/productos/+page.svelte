<script>		
	import logo3 from '$lib/img/LogoFourGreen2.png';
	export let data;
	export let form;
	export const {productos}=data;
	
	let isOpen = false;
	let isOpenAdd = false;
	
	function toggleModal() {
	  isOpen = !isOpen;
	}
	
	let selectedProducto;
	let selectedNombre;
	let selectedPrecio;
	
	
	function ModalAdd() {
	  isOpenAdd = !isOpenAdd;
	}
	
	let filteredProductos = productos;
	
	function filterProductos() {
		 filteredProductos = productos.filter(prod => {
			 return prod.producto_id.toString().includes(searchTerm.toString()) ||
					prod.nombre.toString().includes(searchTerm.toString()) ||
					prod.precio.toString().includes(searchTerm.toString()) ;       
		 });	 
	 }
	
	let searchTerm = '';
	
	function reset() {
	  searchTerm = '';
	  filteredProductos = productos;
	}
	
	</script>
	
	<svelte:head>
		<title>Productos</title>
		<meta name="description" content="Productos" />
	</svelte:head>
	
	<h2>Tabla de Productos</h2>
	<main class="container">
		<div class="grid"> <!-------GRID col.1-->
		 <aside>
		  <figure>
		   <div>
			<input type="text" bind:value={searchTerm} name="search" placeholder="Search" required>
		   </div>
		   <div>
			<button  on:click|preventDefault={filterProductos} class="outline">Filtrar</button>
			<button  on:click|preventDefault={reset} class="outline">Reset</button>
		   </div>
		</figure>
		 </aside>
	<section>
	 
	 <article>
		<div>
		 <div>		
		   {#if form?.success}
			<span style="background-color: greenyellow;">{form.message}</span>
		   {/if}
		  </div>
		 <div>
			<button  on:click={ModalAdd} class="outline" >add Productos</button> <!-----------------------------------------Modal para crear Prod-------->	
		 </div>
		  {#if isOpenAdd}
			 <dialog open >
				<article>
				<div>
					<header>
					 <p>Porfavor Agregar nuevo producto!!</p>
					</header>	
				<form method="POST" action="?/addProd" >
				 <input type="text" name="nombre" placeholder="escribe aqui el producto" required/>
				 <input type="text" name="precio" placeholder="escribe aqui el precio" required/>
				 <footer>
					<button on:click={ModalAdd} class="secondary">Cancel</button>
					<button type="submit">Confirm</button>
				  </footer>
				</form>	
			</div>
			</article>
			</dialog>
		  {/if}		  
		</div>
		  
	<figure>
	  <table role="grid">
		<thead>
	  <tr>
		<th scope="col">Img</th>
		<th scope="col">Id</th>
		<th scope="col">Nombre</th>
		<th scope="col">Precio</th>
		<th scope="col">Editar</th>
		<th scope="col">Eliminar</th>
	  </tr>
	</thead>
	{#each filteredProductos as prod}
	 <tbody>
		<tr>
		<th scope="row"><img src={logo3} alt='logo3' width="25%"/></th>
		<td>{prod.producto_id}</td>
		<td>{prod.nombre}</td>
		<td>{prod.precio}</td>
		<td>	
		<button on:click={()=>{   //<!-----------------------------------------Modal para editar-------->
				selectedProducto=prod.producto_id;
				selectedNombre=prod.nombre;
				selectedPrecio=prod.precio;
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
								<input type="hidden" name="producto_id" bind:value={selectedProducto} required>	
								<input type="text" name="nombre" value={selectedNombre} required/>
								<input type="text" name="precio" value={selectedPrecio} required/>
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
	<!----------------------------------Elimina el producto--------------------->
				 <td>
				  <form method="POST" action="?/delete" on:submit={()=>{selectedProducto=prod.producto_id}}  >
					<input type="hidden"  name="producto_id" bind:value={selectedProducto}>	
					<button type="submit" class="outline">Eliminar</button> 
				  </form> 	
				</td>
			  </tr>
			</tbody>
		  {/each}	
	   </table>
	   </figure>
	</article>
	</section>
	</div>
	</main>
	
<style>
</style>
	