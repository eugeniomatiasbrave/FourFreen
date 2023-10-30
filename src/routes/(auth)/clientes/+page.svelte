<script>
export let form;
export let data;
export const { perfil, clientes} = data;
	  

let searchTerm = '';

let isOpen = false;
let isOpenAdd = false;
let isOpenEd = false;


let selectedCliente_id;
let selectedRazon_social;
let selectedCuit;
let selectedLocalidad;
let selectedDomicilio_calle;
let selectedDomicilio_altura;
let selectedCodigo_postal;
let selectedTelefono;
let selectedEmail;


function toggleModal() {
  isOpen = !isOpen;
}

function ModalAdd() {
  isOpenAdd = !isOpenAdd;
}

function ModalEd() {
  isOpenEd = !isOpenEd;
}


let filteredClientes = clientes;
console.log(filteredClientes)

function filterClientes() {
     filteredClientes = clientes.filter(client => {
         return client.cliente_id.toString().includes(searchTerm.toString()) ||
		        client.razon_social.toString().includes(searchTerm.toString()) ||
				client.cuit.toString().includes(searchTerm.toString()) 
				//client.domicilio_calle.toString().includes(searchTerm.toString()) ||
				//client.domicilio_altura.toString().includes(searchTerm.toString()) ||
				//client.localidad.toString().includes(searchTerm.toString()) ||
				//client.codigo_postal.toString().includes(searchTerm.toString()) ||
				//client.telefono.toString().includes(searchTerm.toString()) ||
		        //client.email.toString().includes(searchTerm.toString()) ;      
     });	 
 }

function reset() {
searchTerm = '';
filteredClientes = clientes;
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
</main>	
<main> 
<div class="grid">
  <div>
	<aside>
		<figure>
      <div>
		<input type="search" id="search" bind:value={searchTerm} name="search" placeholder="Search">
	  </div>
	  <div>
		<button on:click|preventDefault={filterClientes} class="outline">Filtrar</button>
		<button on:click|preventDefault={reset} class="outline">Reset</button>
	 </div>
	</figure>
	</aside>
  </div>
  <div>
 <article>	
	<div>
	<div>
	    <button  on:click={ModalAdd} class="outline">add Clientes</button> <!----Modal crear Clientes-------->
	</div>
	  {#if isOpenAdd}
		 <dialog open >
			<article>
			<div>
				<header>
					<a href="#close" aria-label="Close" class="close" on:click={ModalAdd}></a>
					<p>Porfavor Agregar nuevo cliente!!</p>
				</header>	
			<form method="POST" action="?/addClient">
			 <input type="text" name="razon_social" placeholder="escribe aqui razon_social"/>
			 <input type="text" name="cuit" placeholder="escribe aqui el cuit"/>
			 <input type="text" name="domicilio_calle" placeholder="escribe aqui calle"/>
			 <input type="text" name="domicilio_altura" placeholder="escribe aqui altura"/>
			 <input type="text" name="localidad" placeholder="escribe aqui localidad"/>
			 <input type="text" name="codigo_postal" placeholder="escribe aqui codigo postal"/>
			 <input type="text" name="telefono" placeholder="escribe aqui el telefono"/>
			 <input type="email" name="email" placeholder="escribe aqui el email"/>
			 <footer>
				<button on:click={ModalAdd} class="secondary">Cancel</button>
				<button type="submit">Confirm</button>
			  </footer>
			
			</form>
			{#if form?.success}
			<span>Agregado</span>
			{/if}
		</div>
		</article>
		</dialog>
      {/if}	
	</div>
	  
<figure>
  <table role="grid">
	<thead>
  <tr>
<th scope="col">cliente_id</th>
<th scope="col">razon_social</th>
<th scope="col">cuit</th>
<th scope="col">domicilio_calle</th>
<th scope="col">domicilio_altura</th>
<th scope="col">localidad</th>
<th scope="col">codigo_postal</th>
<th scope="col">telefono</th>
<th scope="col">email</th>
<th scope="col">Editar</th>
<th scope="col">Eliminar</th>
</tr>
</thead>
{#each filteredClientes as cli}
 <tbody>
	<tr>
	<td>{cli.cliente_id}</td>
    <td>{cli.razon_social}</td>
    <td>{cli.cuit}</td>
    <td>{cli.domicilio_calle}</td>
    <td>{cli.domicilio_altura}</td>
    <td>{cli.localidad}</td>
	<td>{cli.codigo_postal}</td>
	<td>{cli.telefono}</td>
	<td>{cli.email}</td>
	<td>	
	<button on:click={()=>{   //<!----------------------------------Modal para edita cliente-------->
			selectedCliente_id=cli.cliente_id;
			selectedRazon_social=cli.razon_social;
			selectedCuit=cli.cuit;
            selectedLocalidad=cli.localidad;
            selectedDomicilio_calle=cli.domicilio_calle;
            selectedDomicilio_altura=cli.domicilio_altura;
            selectedCodigo_postal=cli.codigo_postal;
            selectedTelefono=cli.telefono;
			selectedEmail=cli.email;
			ModalEd()}} class="outline">Editar</button>

		 {#if isOpenEd}
			<dialog open>
				<article>	
					<div>
					<form method="POST" action="?/editClient">
						  <input type="hidden" name="cliente_id" bind:value={selectedCliente_id}>
						  <label for="nombre">Razon Social<input type="text" name="razon_social" value={selectedRazon_social}/>
						  <label for="cuit">Cuit<input type="text" name="cuit"  value={selectedCuit}/>
						  <label for="domicilio_calle">Calle<input type="text" name="domicilio_calle" value={selectedDomicilio_calle} />
						  <label for="domicilio_altura">Altura<input type="text" name="domicilio_altura" value={selectedDomicilio_altura} />
						  <label for="localidad">Localidad<input type="text" name="localidad" value={selectedLocalidad} />
						  <label for="codigo_postal">Codigo Postal<input type="text" name="codigo_postal" value={selectedCodigo_postal} />
						  <label for="telefono">Telefono<input type="text" name="telefono" value={selectedTelefono}/>
						  <label for="email">Email<input type="email" name="email" value={selectedEmail}/>										 			  						
						<button on:click={ModalEd} class="secondary">Cancel</button>
						<button type="submit">Confirm</button>						 					  
					  </form>
					</div> 
					</article>
				</dialog>
				{/if}
			</td>         
             <td><!---------------------Elimina el cliente--------------------->
			  <form method="POST" action="?/deleteClient" on:submit={()=>{selectedCliente_id=cli.cliente_id}}  >
				<input type="hidden"  name="cliente_id" bind:value={selectedCliente_id}>	
				<button type="submit" class="outline">Eliminar</button> 
              </form>	  	
			</td>
		  </tr>
		</tbody>
      {/each}	
   </table>
   <tfoot><!-------foother de tabla-->
   </tfoot> 	
   </figure>
</article>
  </div>
</div>
</main>



<style>



</style>
	
	






   
	

