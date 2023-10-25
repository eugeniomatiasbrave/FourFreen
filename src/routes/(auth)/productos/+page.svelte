<script>
export let data;
export let form;
export const { productos} = data;


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

<h1>Productos</h1>
	
<article class="container">	
	<div class="grid">
	    <div>
          <input type="search" id="search" bind:value={searchTerm} name="search" placeholder="Search">
		  <button  on:click|preventDefault={filterProductos}>Filtrar</button>
		  <button  on:click|preventDefault={reset}>Reset</button>
		 <!-- Search -->
	    </div>
	    <div>
	      <button on:click={ModalAdd} class="outline">add Productos</button> <!-----------------------------------------Modal para crear Prod-------->
	    </div>
	</div>	
	  {#if isOpenAdd}
		 <dialog open >
			<article>
			<div>
				<header>
					<a href="#close" aria-label="Close" class="close" on:click={ModalAdd}></a>
					<p>Porfavor Agregar nuevo producto!!</p>
				</header>	
			<form method="POST" action="?/addProd" >
			 <input type="text" name="nombre" placeholder="escribe aqui el producto" />
			 <input type="text" name="precio" placeholder="escribe aqui el precio" />
			 <footer>
				<a on:click={ModalAdd} href="#cancel" role="button" class="secondary">Cancel</a>
				<a type="submit" href="#confirm" role="button">Confirm</a>
			  </footer>
			</form>
			{#if form?.success}
			<span>Agregado</span>
			{/if}
		</div>
		</article>
		</dialog>
      {/if}	
	
  <table class="container">
  <tr>
	<th>Producto_id</th>
	<th>Nombre</th>
	<th>Precio</th>
	<th>Accion</th>
  </tr>

{#each filteredProductos as prod}
 <tbody>
	<tr>
	<td>{prod.producto_id}</td>
	<td>{prod.nombre}</td>
	<td>{prod.precio}</td>
	<td>	
	<button on:click={()=>{   //<!-----------------------------------------Modal para editar-------->
			selectedProducto=prod.producto_id;
			selectedNombre=prod.nombre;
			selectedPrecio=prod.precio;
			toggleModal();}} class="outline">Editar</button>
		 {#if isOpen}
			<dialog open>
				<article>
					<div>
					<header>
						<a href="#close" aria-label="Close" class="close" on:click={toggleModal}></a>
							<p>Porfavor edite el producto!!</p>
					</header>	
					<form method="POST" action="?/editar">
							<input type="hidden" name="producto_id" bind:value={selectedProducto}>	
							<input type="text" name="nombre" placeholder={selectedNombre}/>
							<input type="text" name="precio" placeholder={selectedPrecio}/>
							<footer>
								<a on:click={toggleModal} href="#cancel" role="button" class="secondary">Cancel</a>
								<a type="submit" href="#confirm" role="button">Confirm</a>
							  </footer>			
					    </form>
					</div>
				</article>
				</dialog>
				{/if}
			
<!----------------------------------Elimina el producto--------------------->
			  <form method="POST" action="?/delete" on:submit={()=>{selectedProducto=prod.producto_id;}}>
				<input type="hidden" name="producto_id" bind:value={selectedProducto}>	
                <button type="submit">Eliminar</button> 	
              </form>	
			</td>
		  </tr>
		</tbody>
      {/each}	
   </table>
</article>




  
  
  
  










  
  




















































