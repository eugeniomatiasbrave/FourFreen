<script>
import { page } from '$app/stores';
export let data;
export let form;
const estadoPedidoId= data.estadoPedidoId
    
//const {estados}= data
console.log(form)


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

 
//let pedido_estado_id = estados[1].pedido_estado_id;
//let nombre = estados[1].nombre;
//let modificable = estados[1].modificable;
//let anulable = estados[1].anulable;

//console.log(estadoPedidoId)
//console.log(estados)

</script>

<svelte:head>
	<title>{titulo}</title>
	<meta name="description" content="estado_id" />
	</svelte:head>

  
<main class="container">
  <h4>{titulo}</h4>
  <article>
    <form method="POST" action="?/confeccionado">
        
            <div>
             {#each estadoPedidoId as peEs }
                <h6> Estado actual:{peEs.pedido_estado_id} </h6><!--info-->
             {/each}
                <input type="hidden" name="nombre"  class="outline" > <!--envia-->
             
              <div>
                  Modificable: 
                <input type="button" name="modificable"  class="outline" ><!--envia-->
              </div>
                
              <div>
                Anulable:
                <input type="button" name="anulable"  class="outline" ><!--envia-->
              </div>
              <div>
                <label >
                  Cambiar a Confeccionado
                <input type="submit" name="pedido_estado_id"  class="outline"> <!--envia--> 
              </label>
              </div>
               
            </div> 

              <div>
                <button  class="outline"><a href="/pedidos?estado_id=10" style="color:white;">Cancelar</a></button>
              </div>   
           
          </form>
      </article>
  </main>