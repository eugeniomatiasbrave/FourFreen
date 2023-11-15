<script>

    export let data;
    
    const estadoPedidoId= data.estadoPedidoId
    
    const {estados}= data
    console.log(estadoPedidoId)
    
    console.log(estados)
    

    </script>
    
    <main class="container">
    
        <div>
            <p>Estados</p>
            {#each estados as e }
                <li>
                   {e.nombre}
                </li>
            {/each}
        </div>
      <h4>Pedido_estado_id</h4>
      <article>
       <table>
          <thead>
            <tr>
              <th>pedido_estado_id</th>
              <th>nombre</th>
              <th>modificable</th>
              <th>anulable</th>
              <th>Siguiente estado</th>
            </tr>
          </thead>
          <tbody>
           
              {#each estadoPedidoId as peEs  } 
              
            
              <tr>
                <td >{peEs.pedido_estado_id}</td>
                <td>{peEs.nombre}</td>
                <td>
                    <div>
                     <button class="outline">{peEs.modificable}</button>
                    </div>
                </td>
                <td>
                    <div>
                      <button class="outline">{peEs.anulable}</button>
                    </div>
                </td> 
                <td>
                    <div>
                      <button  class="outline">Cambiar a confeccionado</button>
                    </div>
                </td>  
              </tr>

           

              {/each}

           
              <footer>
                <div>
                  <button  class="outline"><a href="/estado_id" style="color:white;">Volver</a></button>
                </div>   
              </footer>
          </tbody>
        </table>
      </article>
      </main>