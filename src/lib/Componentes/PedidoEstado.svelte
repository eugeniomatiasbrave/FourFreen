<!-- PedidoEstado.svelte -->

<script>
    export let estado; // Propiedad para recibir el estado actual
  </script>
  
 
  
  <div class="pedido-estado {estado === 'Pedido Ingresado' ? 'pedido-ingresado' : ''}">
    {estado}
  </div>
  