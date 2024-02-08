<script>
import FooterForm from '$lib/Componentes/FooterForm.svelte';
import {goto} from '$app/navigation';
import {Button,P,Table,TableBody,TableBodyCell,TableBodyRow,TableHead,TableHeadCell} from 'flowbite-svelte';
export let data;
export let form;
export const {pedidoEstadoId,pedidosEstados} = data;
console.log(form)

const PedidoEstadoId= data.pedidoEstadoId

let ruta="pedidos";
let textoboton1="Confirmar"; 
let textoboton2="Cancelar";
//const PedidosEstados  = data.pedidosEstados  
//console.log(PedidosEstados)
/*
[
  {
    "pedido_estado_id": 10,
    "nombre": "Pedido Ingresado",
    "modificable": true,
    "anulable": true
  },
  {
    "pedido_estado_id": 20,
    "nombre": "Pedido Confeccionado",
    "modificable": true,
    "anulable": true
  },
  {
    "pedido_estado_id": 30,
    "nombre": "Pedido Entregado",
    "modificable": false,
    "anulable": true
  },
  {
    "pedido_estado_id": 40,
    "nombre": "Pedido Facturado",
    "modificable": false,
    "anulable": true
  },
  {
    "pedido_estado_id": 50,
    "nombre": "Pedido Cobrado",
    "modificable": false,
    "anulable": false
  },
  {
    "pedido_estado_id": 100,
    "nombre": "Pedido ANULADO",
    "modificable": false,
    "anulable": false
  }
]
/////////////////////////////////////////////
{
      "pedido_cab_id": 51,
      "cliente_id": 8,
      "razon_social": "La Maria 22",
      "fecha": "2023-12-13T10:54:23.000Z",
      "pedido_estado_id": 10,
      "pedido_estado_nombre": "Pedido Ingresado",
      "editar": true,
      "eliminar": true,
      "usuario_id": 1,
      "items": 1,
      "total_unidades": 6,
      "total_importe": 1800
    },
*/
</script>

<svelte:head>
	<title>Estado del pedido</title>
	<meta name="description" content="estado_id" />
</svelte:head>

  <main class="bg-gray-50 dark:bg-gray-900 sm:p-3">
    <div class="my-4">
      <h3 class="text-3xl font-bold text-center py-2 bg-gradient-to-r
      from-secundary-400 from-30% via-primary-500 via-50% to-primary-500 to-50% text-transparent bg-clip-text">Estado de pedido</h3>
      </div>
     <div class=" bg-white mx-auto p-1 pt-1 rounded border border-gray-200 shadow-md w-1/3">
      <div class="overflow-x-auto"> 
      <Table hoverable={true} class="mx-auto mt-1 border text-xs" > 		
        <TableHead class=" bg-primary-500 text-white" style="text-align: center;" theadClass='text-xs'> 
          <TableHeadCell class="py-2">Estado Id</TableHeadCell>
          <TableHeadCell class="py-2">Estado Pedido</TableHeadCell> 
          <TableHeadCell class="py-2">Modificable</TableHeadCell>
          <TableHeadCell class="py-2">Anulable</TableHeadCell>      
        </TableHead>
        <TableBody class="divide-y">
          {#each PedidoEstadoId as pEid }
          <TableBodyRow class=" hover:bg-hover-gray-light" style="text-align: center;">
           <TableBodyCell class="py-2">{pEid.pedido_estado_id}</TableBodyCell>
           <TableBodyCell class="py-2">{pEid.nombre}</TableBodyCell>
           <TableBodyCell class="py-2">{pEid.modificable}</TableBodyCell>
           <TableBodyCell class="py-2">{pEid.anulable}</TableBodyCell>
          </TableBodyRow>
          {/each}	
        </TableBody>
      </Table>
        <form method="POST" class="py-2"> 
         <P >Cambiar estado a ...</P>
         <FooterForm {ruta} {textoboton1} {textoboton2}/>
       </form>
      </div>
     </div>
    </main>	