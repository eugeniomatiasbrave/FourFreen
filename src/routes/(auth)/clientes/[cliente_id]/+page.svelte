<script >
import {Input,Button,Label} from 'flowbite-svelte'
import {onMount} from 'svelte';
import {page} from '$app/stores';
import {goto} from '$app/navigation';
export let data;
export let form;
export const {clienteId,clientes}=data;
  
let ClienteId=clienteId;
let Clientes=clientes;

let action = '';
let cliente_id = $page.params.cliente_id;
  
onMount(() => {
    if (cliente_id === "-1") {
        action = 'agregar';
    } else {
        action = $page.url.searchParams.get('action') || 'otraAccion';
    }
});
  
onMount(() => {
  if (form?.success) {
    Swal.fire({
      icon: 'success',
      title: form.message,
      backdrop: true,
      confirmButtonText: 'Volver',
      confirmButtonColor: 'rgb(69, 166, 175)'
    }).then((result) => {
      if (result.isConfirmed) {
        goto('/clientes');
      }
    });}});



</script>

 {#if action === 'editar'}
  {#each ClienteId as cliente }
  <main class="flex items-start justify-center min-h-screen pb-36">
  <div
    class="bg-white mx-auto p-1 pt-1 my-2 rounded-3xl border border-gray-300 shadow-2xl sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/4 transform transition duration-500 hover:scale-105"
  >
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold text-center py-4 bg-gradient-to-r
      from-secundary-400 from-10% via-primary-500 via-40% to-primary-500 to-70% text-transparent bg-clip-text">
        Editar Cliente !!
      </h1>
      <form method="POST" action="?/editar">
        <Input type="hidden" name="cliente_id" value={cliente.cliente_id} />
        <div class="grid grid-cols-2 gap-4">
          <Label class="space">
            <span>Nombre</span>
            <Input
              type="text"
              name="razon_social"
              value={cliente.razon_social}
              maxlength="30"
              on:change={(e) => {
                let razon_social = e.target.value;
                let existe = Clientes.some(
                  (cli) => cli.razon_social === razon_social
                );
                console.log(existe);
                if (existe) {
                  window.Swal.fire({
                    icon: "error",
                    title: "Cliente existente",
                    text: `Nombre: ${razon_social}.`,
                    backdrop: true,
                    confirmButtonText: "Volver",
                    confirmButtonColor: "rgb(69, 166, 175)",
                  });
                  e.target.value = "";
                }
              }}
              placeholder="Razon social"
              class="bg-white h-8 w-full rounded border border-gray-300 focus:outline-none focus:ring-2
                    focus:ring-primary-500 focus:border-transparent"
              required
            />
          </Label>
          <Label class="space">
            <span>Cuit</span>
            <Input
              type="number"
              name="cuit"
              bind:value={cliente.cuit}
              on:blur={(e) => {
                let cuit = e.target.value;
                if (cuit < 20000000000 || cuit > 30000000000) {
                  window.Swal.fire({
                    icon: "error",
                    title: "El cantidad de caracteres incorrectos.",
                    backdrop: true,
                    confirmButtonText: "Volver",
                    confirmButtonColor: "rgb(69, 166, 175)",
                  });
                  e.target.value = "";
                }
              }}
			    class="bg-white h-8 w-full rounded border border-gray-300 focus:outline-none focus:ring-2
          focus:ring-primary-500 focus:border-transparent"
              required
            />
          </Label>
          <Label class="space">
            <span>Calle</span>
            <Input
              type="text"
              name="domicilio_calle"
              value={cliente.domicilio_calle}
              class="bg-white h-8 w-full rounded border border-gray-300 focus:outline-none focus:ring-2
              focus:ring-primary-500 focus:border-transparent"
              required
            />
          </Label>
          <Label class="space">
            <span>Altura</span>
            <Input
              type="text"
              name="domicilio_altura"
              value={cliente.domicilio_altura}
              class="bg-white h-8 w-full rounded border border-gray-300 focus:outline-none focus:ring-2
                    focus:ring-primary-500 focus:border-transparent"
              required
            />
          </Label>
          <Label class="space">
            <span>Localidad</span>
            <Input
              type="text"
              name="localidad"
              value={cliente.localidad}
              class="bg-white h-8 w-full rounded border border-gray-300 focus:outline-none focus:ring-2
       focus:ring-primary-500 focus:border-transparent"
              required
            />
          </Label>
          <Label class="space">
            <span>Codigo.Postal</span>
            <Input
              type="text"
              name="codigo_postal"
              value={cliente.codigo_postal}
              class="bg-white h-8 w-full rounded border border-gray-300 focus:outline-none focus:ring-2
              focus:ring-primary-500 focus:border-transparent"
              required
            />
          </Label>
          <Label class="space">
            <span>Telefono</span>
            <Input
              type="text"
              name="telefono"
              value={cliente.telefono}
         class="bg-white h-8 w-full rounded border border-gray-300 focus:outline-none focus:ring-2
			         focus:ring-primary-500 focus:border-transparent"
              required
            />
          </Label>
          <Label class="space">
            <span>Email</span>
            <Input
              type="email"
              name="email"
              value={cliente.email}
              class="bg-white h-8 w-full rounded border border-gray-300 focus:outline-none focus:ring-2
              focus:ring-primary-500 focus:border-transparent"
              required
            />
          </Label>
        </div>
        <footer class="text-center mt-4">
          <Button
            type="submit"
            class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded-3xl shadow-2xl hover:shadow-3xl"
          >
            Confirmar
          </Button>
          <Button
            on:click={() => goto("/clientes")}
            class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded-3xl shadow-2xl hover:shadow-3xl"
          >
            Cancelar
          </Button>
        </footer>
      </form>
    </div>
  </div>
</main>


  
 {/each}

{:else if action === 'eliminar'}
 {#each ClienteId as cliente }
   <main class="flex items-center justify-center min-h-screen pb-36">
	<div class="bg-white mx-auto p-2 pt-2 my-2 rounded-3xl shadow-2xl border border-gray-300  w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/4">
		<div class="container mx-auto p-3">
	  <form class="flex flex-col space-y-2" method="POST" action="?/eliminar" >
		 <h3 class="text-3xl font-bold text-center  bg-gradient-to-r
     from-secundary-400 from-10% via-primary-500 via-40% to-primary-500 to-70% text-transparent bg-clip-text">
			Confirmar la eliminación!!
		  </h3>
		  <h5 class="text-lg font-bold text-center mb-4">{cliente.razon_social}</h5>
		 <Input type="hidden" name="cliente_id" value={cliente.cliente_id} class="bg-white h-8 rounded"/>
		 <footer class="text-center">  
		 <Button type="submit" class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded-3xl shadow-2xl hover:shadow-3xl">Confirmar</Button>
		 <Button on:click={() => goto('/clientes')} class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded-3xl shadow-2xl hover:shadow-3xl">Cancelar</Button>
		 </footer>
	  </form>
	</div>
    </div>
   </main>
 {/each}
 
 {:else if action === 'agregar'}
 <main class="flex items-start justify-center min-h-screen pb-16">
	<div
	  class="bg-white mx-auto p-4 pt-2 my-2 rounded-3xl border border-gray-300 shadow-xl sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/4 transform transition duration-500 hover:scale-105"
	>
	  <form method="POST" action="?/agregar">
      <h3 class="text-3xl font-bold text-center py-4 bg-gradient-to-r
               from-secundary-400 from-10% via-primary-500 via-40% to-primary-500 to-70% text-transparent bg-clip-text">
        Por favor agregar nuevo cliente!!
      </h3>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		  <Label class="space">
			<span>Razon Social</span>
			<Input
			  type="text"
			  name="razon_social"
			  maxlength="50"
			  on:change={(e) => {
				let razon_social = e.target.value;
				let existe = Clientes.some(
				  (cli) => cli.razon_social === razon_social
				);
				if (existe) {
				  window.Swal.fire({
					icon: "error",
					title: "Cliente existente",
					text: `Nombre: ${razon_social}.`,
					backdrop: true,
					confirmButtonText: "Volver",
					confirmButtonColor: "rgb(69, 166, 175)",
				  });
				  e.target.value = "";
				}
			  }}
			  placeholder="Agregar cliente"
			  class="bg-white h-8 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
			  required
			/>
		  </Label>
		  <Label class="space">
			<span>Cuit</span>
			<Input
			  type="number"
			  name="cuit"
			  on:blur={(e) => {
				let cuit = e.target.value;
				if (cuit < 20000000000 || cuit > 30000000000) {
				  window.Swal.fire({
					icon: "error",
					title: "El cantidad de caracteres incorrectos.",
					backdrop: true,
					confirmButtonText: "Volver",
					confirmButtonColor: "rgb(69, 166, 175)",
				  });
				  e.target.value = "";
				}
			  }}
        placeholder="Agregar Cuit"
			  class="bg-white h-8 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
			  required
			/>
		  </Label>
		  <Label class="space">
			<span>Calle</span>
			<Input
			  type="text"
			  name="domicilio_calle"
			  placeholder="Agregar calle"
        class="bg-white h-8 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
			  required
			/>
		  </Label>
		  <Label class="space">
			<span>Altura</span>
			<Input
			  type="text"
			  name="domicilio_altura"
			  placeholder="Agregar altura"
        class="bg-white h-8 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
			  required
			/>
		  </Label>
		  <Label class="space">
			<span>Localidad</span>
			<Input
			  type="text"
			  name="localidad"
			  placeholder="Agregar localidad"
        class="bg-white h-8 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
			  required
			/>
		  </Label>
		  <Label class="space">
			<span>Codigo Postal</span>
			<Input
			  type="text"
			  name="codigo_postal"
        placeholder="Agregar Codigo Postal"
        class="bg-white h-8 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
			  required
			/>
		  </Label>
		  <Label class="space">
			<span>Telefono</span>
			<Input
			  type="text"
			  name="telefono"
			  placeholder=" Agregar telefono"
			  maxlength="10"
        class="bg-white h-8 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
			  required
			/>
		  </Label>
		  <Label class="space">
			<span>Email</span>
			<Input
			  type="email"
			  name="email"
			  placeholder="Agregar email"
			  class="bg-white h-8 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
			  required
			/>
		  </Label>
		</div>
		<footer class="text-center mt-4">
		  <Button
			type="submit"
			class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded-2xl shadow-md hover:shadow-lg">
			Confirmar
		  </Button>
		  <Button
			on:click={() => goto("/clientes")}
			class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded-2xl shadow-md hover:shadow-lg">
			Cancelar
		  </Button>
		</footer>
	  </form>
	</div>
  </main>  
{/if}

