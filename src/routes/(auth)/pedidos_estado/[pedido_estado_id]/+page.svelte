<script>
import {Input,Button,Label,P,Checkbox,Table,TableBody,TableBodyCell,TableBodyRow,TableHead,TableHeadCell} from 'flowbite-svelte';
export let data;
export const {pedidoEstadoId,pedidosEstados} = data;
export let form;
const PedidoEstadoId= data.pedidoEstadoId
const PedidosEstados  = data.pedidosEstados  
console.log(PedidosEstados)
console.log(form)
/*
const estado_id = $page.url.searchParams.get('estado_id') || "10"
 let titulo = "";
 switch (estado_id) {
		case "10":
		titulo = estadoPedidoId[0].nombre
		break;
		case "20":
		titulo = "Pedidos Confeccionados"
		break;
		case "30":
		titulo = "Pedidos Entregados"
		break;
	default:
		break;
 }
 */
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
	<title></title>
	<meta name="description" content="estado_id" />
	</svelte:head>

  <div class="my-4">
    <P size="2xl" align="center"></P>
  </div>	

  <main class="flex items-start justify-center min-h-screen pb-36">
    <div class="bg-white mx-auto p-4 pt-2 my-2 rounded border border-gray-200 shadow-md sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/4">
      <div>
        {#each PedidoEstadoId as pEid }
        <h6> Estado actual:</h6><!--info-->
        <h6>- {pEid.pedido_estado_id}</h6><!--info-->
        <h6>- {pEid.nombre} </h6><!--info-->
        <h6>- {pEid.modificable} </h6><!--info-->
        <h6>- {pEid.anulable} </h6><!--info-->
        {/each}
      </div>  
        <form method="POST">  
          <P>Cambiar estado a ...</P>
              <div>
                <Button type="submit" class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded">Confirmar</Button>
                <Button  class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded"><a href="/pedidos" style="color:white;">Cancelar</a></Button>
              </div>          
      </form>
  </main>