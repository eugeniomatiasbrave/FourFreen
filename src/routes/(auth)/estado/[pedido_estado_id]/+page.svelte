<script>

export let data

const estadoPedidoId= data.estadoPedidoId
console.log(estadoPedidoId)



/*	
	[
  {
    "pedido_estado_id": 10,
    "nombre": "Pedido Ingresado",
    "modificable": true,
    "anulable": true
  }
]
*/
</script>

<main class="container">

  <h4>Pedido_estado_id</h4>
  <article>
   <table>
      <thead>
        <tr>
          <th>pedido_estado_id</th>
          <th>nombre</th>
          <th>modificable</th>
          <th>anulable</th>
        </tr>
      </thead>
      <tbody>
          {#each estadoPedidoId as peEs  }       
          <tr>
            <td>{peEs.pedido_estado_id}</td>
            <td>{peEs.nombre}</td>
            <td>{peEs.modificable}</td>
            <td>{peEs.anulable}</td>   
          </tr>
          {/each}
          <footer>
            <div>
            <button  class="outline"><a href="/estado" style="color:white;">Volver</a></button>
          </div>
          <div>
            <button  class="outline">Editar</button>
          </div>
          <div>
            <button  class="outline">Guardar</button>
          </div>
          </footer>
      </tbody>
    </table>
  </article>
  </main>









