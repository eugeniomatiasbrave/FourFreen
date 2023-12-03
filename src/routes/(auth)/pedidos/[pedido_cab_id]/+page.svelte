<script>
export let data

const detalle= data.detalle.datos
console.log(detalle)
  
</script>

<main class="container">

<h4>Detalle del Pedido:</h4>
<article>
 <table>
    <thead>
      <tr>
        <th>ID del pedido</th>
        <th>ID del producto</th>
        <th>Nombre del producto</th>
        <th>Unidades</th>
        <th>Precio</th>
        <th>Importe Total</th>
      </tr>
    </thead>
    <tbody>
        {#each detalle as det  }       
        <tr>
          <td>{det.pedido_cab_id}</td>
          <td>{det.producto_id}</td>
          <td>{det.producto_nombre}</td>
          <td>{det.unidades}</td>
          <td>{det.precio}</td>
          <td>{det.importe}</td>
        </tr>
        {/each}
        <footer>
          <div>
          <button  class="outline"><a href="/pedidos" style="color:white;">Cancelar</a></button>
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
