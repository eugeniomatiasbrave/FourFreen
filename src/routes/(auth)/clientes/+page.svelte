<script>
//import logo3 from '$lib/img/LogoFourGreen2.png';
export let form;
export let data;
export const { perfil} = data;

const clientes = [{
	img: "img",
    cliente_id: "1",
    nombre: "Clara Brave",
    email: "c@c.com",
    telefono: "1577777777",
    diereccion: "Habana 3355",
    textArea: "Compra mucho en FourGreen",
}];

const cliente={ 
	  img: "",
      cliente_id: "",
      nombre: "",
      email: "",
      telefono: "",
      diereccion: "",
      textArea: "" };

let searchTerm = '';

let isOpen = false;
let isOpenAdd = false;
let isOpenEd = false;
let isOpenTxtEd = false;

let selectedCliente_id;
let selectedNombre;
let selectedEmail;
let selectedTextArea;

function toggleModal() {
  isOpen = !isOpen;
}

function ModalAdd() {
  isOpenAdd = !isOpenAdd;
}

function ModalEd() {
  isOpenEd = !isOpenEd;
}

function ModalTxtEd(){
	isOpenTxtEd = !isOpenTxtEd;
}

let filteredClientes = clientes;

function filterClientes() {
     filteredClientes = clientes.filter(client => {
         return client.cliente_id.toString().includes(searchTerm.toString()) ||
		        client.nombre.toString().includes(searchTerm.toString()) ||
		        client.email.toString().includes(searchTerm.toString()) ;       
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

    <main class="container-xl">
	<div class="grid">
     <aside>
	<figure>
    <div>
		<input type="search" id="search" bind:value={searchTerm} name="search" placeholder="Search">
	  </div>
	  <div>
		<button on:click|preventDefault={filterClientes} class="outline">Filtrar</button>
		<button on:click|preventDefault={reset} class="outline">Reset</button>
	</figure>
</aside>
<section>
 <article >	
	<div>
	<div>
	    <button  on:click={ModalAdd} class="outline">add Clientes</button> <!---------------Modal para crear Clientes-------->
	</div>
	  {#if isOpenAdd}
		 <dialog open >
			<article>
			<div>
				<header>
					<a href="#close" aria-label="Close" class="close" on:click={ModalAdd}></a>
					<p>Porfavor Agregar nuevo cliente!!</p>
				</header>	
			<form method="POST" >
			 <input type="text" name="nombre" placeholder="escribe aqui el nombre" />
			 <input type="email" name="email" placeholder="escribe aqui el email" />
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
<th scope="col">Img</th>
<th scope="col">#Cliente</th>
<th scope="col">Nombre</th>
<th scope="col">Email</th>
<th scope="col">Telefono</th>
<th scope="col">Diereccion</th>
<th scope="col">Text Area</th>
<th scope="col">Editar</th>
<th scope="col">Eliminar</th>
</tr>
</thead>
{#each filteredClientes as cli}
 <tbody>
	<tr>
	<th scope="row">img</th>
	<td>{cli.cliente_id}</td>
    <td>{cli.nombre}</td>
    <td>{cli.email}</td>
    <td>{cli.telefono}</td>
    <td>{cli.diereccion}</td>
    <td>{cli.textArea}</td>
	<td>	
	<button on:click={()=>{   //<!-----------------------------------------Modal para editar-------->
			selectedCliente_id=cli.cliente_id;
			selectedNombre=cli.nombre;
			selectedEmail=cli.email;
			selectedTextArea=cli.textArea;
			ModalEd()}} class="outline">Editar</button>

		 {#if isOpenEd}
			<dialog open>
				<article>	
					<div>
					<form method="POST">
						  <input type="hidden" name="cliente_id" bind:value={selectedCliente_id}>
						  <label for="nombre">Nombre<input type="text" name="nombre"/></label>
						  <label for="lastname">Telefono<input type="text" name="telefono"/></label>
						  <label for="email">Email addre<input type="email" name="email"/></label>						
						  <label for="text">Text Area<input type="text" name="text"/></label>					 			  						
						<button on:click={ModalEd} class="secondary">Cancel</button>
						<button type="submit">Confirm</button>						 					  
					  </form>
					</div> 
					</article>
				</dialog>
				{/if}
			</td>
            <!----------------------------------Elimina el cliente--------------------->
             <td>
			  <form method="POST" on:submit={()=>{selectedCliente_id=cli.cliente_id}}  >
				<input type="hidden"  name="cliente_id" bind:value={selectedCliente_id}>	
				<button  type="submit" class="outline">Eliminar</button> 
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
</section>
</div>
</main>

</main>

<style>



</style>
	
	






   
	

